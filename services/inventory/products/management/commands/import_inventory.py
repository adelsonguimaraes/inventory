import polars as pl
from django.core.management.base import BaseCommand
from products.models import Product, Category

class Command(BaseCommand):
    help = 'ETL de alta performance: Importa produtos via Polars'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Caminho do arquivo CSV')

    def handle(self, *args, **options) -> None:
        file_path = options['csv_file']

        # --- EXTRACT ---
        # Polars é extremamente rápido na leitura de arquivos
        try:
            df = pl.read_csv(file_path)
        except Exception as e:
            self.stderr.write(f"Erro ao ler arquivo: {e}")
            return

        # --- TRANSFORM (Sintaxe Lazy/Expressiva) ---
        # Normalizamos os dados em lote antes de iterar
        df = df.with_columns([
            pl.col("name").str.strip_chars().alias("name"),
            pl.col("sku").str.to_uppercase().str.strip_chars().alias("sku"),
            pl.col("price").cast(pl.Float64),
            pl.col("quantity").cast(pl.Int64)
        ]).filter(
            pl.col("sku").is_not_null() & pl.col("name").is_not_null()
        )

        # --- LOAD ---
        self.stdout.write(f"Carregando {df.height} registros...")
        
        # Convertemos para dicionários para facilitar a iteração no Django ORM
        for row in df.to_dicts():
            category, _ = Category.objects.get_or_create(name=row['category'])
            
            Product.objects.update_or_create(
                sku=row['sku'],
                defaults={
                    'name': row['name'],
                    'price': row['price'],
                    'stock_quantity': row['quantity'],
                    'category': category
                }
            )
        
        self.stdout.write(self.style.SUCCESS('ETL Polars concluído!'))