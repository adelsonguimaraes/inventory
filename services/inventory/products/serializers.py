from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    """
        Serializer para o modelo Category.
        Utilizado para operações CRUD de categorias de produtos.
    """

    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class ProductSerializer(serializers.ModelSerializer):
    """
        Serializer para o modelo Product.
        Utilizado para operações CRUD de produtos.
    """
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = ['id', 'name', 'category_name', 'price', 'category', 'stock_quantity', 'created_at']