from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from .serializers import RegisterSerializer, ProfileSerializer
from .models import User
from typing import Any

class RegisterView(generics.CreateAPIView):
    """
        View para registro de novos usuários. 
        Permite acesso público (AllowAny).
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny,]
    serializer_class = RegisterSerializer

class ProfileView(APIView):
    """
        View para exibir o perfil do usuário autenticado.
        Requer autenticação (IsAuthenticated).
    """
    permission_classes = [IsAuthenticated,]

    def get(self, request: Any, *args: Any) -> Response:
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)