from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import AnonymousUser

class SimpleUser:
    """
    Classe de usuário simples para representar um usuário autenticado.
    """
    def __init__(self, user_id):
        self.id = user_id
        self.is_authenticated = True

class StatelessJWTAuthentication(JWTAuthentication):
    """
    Classe JWT de autenticação personalizada que não cria ou usa sessões.
    """
    def get_user(self, validated_token):
        """
        Retorna o usuário associado ao token validado.
        Se o token for inválido ou não houver usuário, retorna AnonymousUser.
        """
        user_id = validated_token.get("user_id")
        if not user_id:
            raise Exception("Token inválido.")
        return SimpleUser(user_id)