from rest_framework import serializers
from .models import User
from typing import Any, Dict

class RegisterSerializer(serializers.ModelSerializer):
    """
        Serializer para registro de novos usuários.
        Valida e cria instâncias do modelo User.
    """

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'department']

    def create(self, validated_data: Dict[str, Any]) -> User:

        # create_user para garantir que a senha seja corretamente hasheada
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            department=validated_data.get('department', '')
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    """
        Serializer para o modelo User.
        Utilizado para exibir informações do usuário.
    """

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'department']