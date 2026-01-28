from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import StockTrasaction

@receiver(post_save, sender=StockTrasaction)
def update_stock(sender, instance: StockTrasaction, **kwargs) -> None:
    """
        Sinal para atualizar a quantidade em estoque do produto
        após uma transação de estoque ser salva.
    """
    if created:
        product = instance.product
        if instance.type == 'IN':
            product.stock_quantity += instance.quantity
        elif instance.type == 'OUT':
            product.stock_quantity -= instance.quantity
        product.save()