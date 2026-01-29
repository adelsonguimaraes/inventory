from django.core.mail import send_mail
from celery import shared_task
import requests
import logging
import time

logger = logging.getLogger(__name__)

@shared_task
def alert_critical_stock(product_name, current_stock):
    """
    Simula um processamento pesado (ex: gerar um PDF de relatório 
    ou enviar alerta para o Identity) sem travar o usuário.
    """

    time.sleep(5) # Simula lentidão
    logger.info(f"📢 ALERTA: Produto {product_name} está com estoque baixo ({current_stock} unidades)!")

    send_mail(
        '🚨 ALERTA: Estoque Crítico!',
        f'O produto {product_name} atingiu {current_stock} unidades.',
        'sistema@inventory.com',
        ['admin@spassu.com'],
        fail_silently=False,
    )
    
    return True