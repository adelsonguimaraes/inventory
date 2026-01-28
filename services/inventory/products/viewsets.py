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