from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

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

    @action(detail=False, methods=['get'], url_path='status-stock')
    def status_stock(self, request):
        """
            Retorna um resumo rápido do total de produtos em estoque e quantos estão abaixo do mínimo.
        """
        total_products = self.queryset.count()
        critical_items = self.queryset.filter(stock_quantity__lt=10).count()

        return Response({
            'total_products': total_products,
            'critical_items': critical_items,
            'message': 'Existem itens que precisam de reposição!' if critical_items > 0 else 'Estoque saudável.'
        })

    @action(detail=True, methods=['patch'], url_path='update-stock')
    def update_stock(self, request, pk=None):
        """
            Incrementa ou decrementa a quantidade de estoque de um produto
        """
        product = self.get_object()
        quantity_change = request.data.get('quantity', 0)

        try:
            quantity_change = int(quantity_change)
        except ValueError:
            return Response({'error': 'Quantidade inválida.'}, status=400)

        if product.stock_quantity + quantity_change < 0:
            return Response(
                {"error": f"Operação inválida. Estoque atual ({product.stock_quantity}) insuficiente."},
                status=400
            )

        product.stock_quantity += quantity_change
        product.save()

        serializer = self.get_serializer(product)
        return Response(serializer.data)