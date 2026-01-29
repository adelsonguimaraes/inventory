from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import Product, Category, StockTransaction
from unittest.mock import patch

class ProductStockTests(APITestCase):
    def setUp(self):
        # 1. Cria um usuário para passar pela autenticação do Django
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # 2. Configura os dados
        self.category = Category.objects.create(name="Teste", description="Desc")
        self.product = Product.objects.create(
            name="Teclado",
            sku="TEC-123",
            price=150.0,
            stock_quantity=20,
            category=self.category
        )
        self.url = reverse('product-update-stock', kwargs={'pk': self.product.pk})

    # Usamos o 'patch' para interceptar a chamada ao serviço de Identidade
    # mude 'products.views.validate_user_remotely' para o caminho real do seu import
    @patch('products.viewsets.validate_user_remotely')
    def test_update_stock_decrements_correctly(self, mock_validate):
        """Testa se o PATCH reduz o estoque e cria transação"""
        # Simulamos que o serviço de identidade respondeu "True" (autorizado)
        mock_validate.return_value = True
        
        data = {'quantity': -5}
        response = self.client.patch(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock_quantity, 15)

    @patch('products.viewsets.validate_user_remotely')
    def test_prevent_negative_stock(self, mock_validate):
        """Testa se o sistema impede que o estoque fique abaixo de zero"""
        mock_validate.return_value = True
        
        data = {'quantity': -50}
        response = self.client.patch(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)