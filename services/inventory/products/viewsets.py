from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.exceptions import PermissionDenied
from .services import validate_user_remotely

class CategoryViewSet(viewsets.ModelViewSet):
    """
        ViewSet para o modelo Category.
        Fornece operações CRUD para categorias de produtos.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
        ViewSet para o modelo Product.
        Fornece operações CRUD para produtos.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    ordering = ['-id']

    def perform_create(self, serializer):
        """
            Sobrescreve a criação para validar o usuário no Identity Service.
        """ 
        token = self.request.headers.get('Authorization')
        user_id = self.request.user.id

        if not validate_user_remotely(user_id, token):
            raise PermissionDenied("Usuário inválido ou não autenticado.")

        serializer.save()


    @action(detail=False, methods=['get'], url_path='status-stock')
    def status_stock(self, request):
        """
            Retorna um resumo rápido do total de produtos em estoque e quantos estão abaixo do mínimo.
        """
        total_products = self.queryset.count()
        critical_items = self.queryset.filter(stock_quantity__lt=10).count()
        total_value = sum(p.price * p.stock_quantity for p in self.queryset)

        return Response({
            'total_products': total_products,
            'critical_items': critical_items,
            'total_value': total_value,
            'message': 'Existem itens que precisam de reposição!' if critical_items > 0 else 'Estoque saudável.'
        })

    @action(detail=True, methods=['patch'], url_path='update-stock')
    def update_stock(self, request, pk=None):
        product = self.get_object()
        
        token = request.headers.get('Authorization')
        if not validate_user_remotely(request.user.id, token):
            return Response(
                {'error': 'Usuário não autorizado pelo serviço de Identidade.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        quantity_change = request.data.get('quantity', 0)

        try:
            quantity_change = int(quantity_change)
        except (ValueError, TypeError):
            return Response({'error': 'Quantidade inválida.'}, status=400)

        if product.stock_quantity + quantity_change < 0:
            return Response(
                {"error": f"Estoque insuficiente. Disponível: {product.stock_quantity}"},
                status=400
            )

        from .models import StockTransaction # Import local para evitar circular import
        
        StockTransaction.objects.create(
            product=product,
            quantity=abs(quantity_change),
            type='IN' if quantity_change > 0 else 'OUT',
            user_id=request.user.id,
            notes="Ajuste rápido via Dashboard"
        )

        # Recarregamos o produto para pegar o valor atualizado pelo Signal
        product.refresh_from_db()
        
        serializer = self.get_serializer(product)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='history')
    def history(self, request, pk=None):
        product = self.get_object()
        transactions = product.transactions.all().order_by('-created_at')
        
        data = [{
            "id": t.id,
            "type": t.type,
            "quantity": t.quantity,
            "user_id": t.user_id,
            "date": t.created_at.strftime("%d/%m/%Y %H:%M"),
            "notes": t.notes
        } for t in transactions]
        
        return Response(data)