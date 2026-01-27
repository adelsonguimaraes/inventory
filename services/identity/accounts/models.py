from django.contrib.auth.models import AbstractUser
from django.db import models
from typing import List

class User(AbstractUser):
    """
        Modelo de usuário customizado que utiliza e-mail como identificador único.
        
        Este modelo estende AbstractUser para permitir futuras expansões 
        no perfil do usuário sem quebrar o esquema do banco de dados.
    """
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100, blank=True, null=True)

    USERNAME_FIELD: str = 'email'
    REQUIRED_FIELDS: list[str] = ['username']

    def __str__(self) -> str:
        return f"{self.email}"