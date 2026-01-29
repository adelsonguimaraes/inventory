import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def validate_user_remotely(user_id, auth_token):
    """
    Chama o Identity Service através do Gateway para validar o usuário.
    """
    url = f"http://gateway:80/api/auth/validate/{user_id}/"
    
    headers = {
        "Authorization": auth_token,
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers, timeout=2)
        if response.status_code == 200:
            return response.json()
        return None
    except requests.exceptions.RequestException as e:
        logger.error(f"Erro ao contatar Identity Service: {e}")
        return None