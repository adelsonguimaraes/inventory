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
    
    # Aqui o Celery poderia avisar o Identity Service
    # url = "http://gateway:8080/api/auth/notify-admin/"
    # requests.post(url, json={"msg": f"Repor {product_name}"})
    
    return True