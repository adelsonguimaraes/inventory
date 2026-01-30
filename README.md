# 📦 Inventory Management System (Microservices)
Sistema robusto de gestão de inventário baseado em microserviços, com foco em escalabilidade, mensageria assíncrona e integridade de dados.

# 🚀 Tecnologias e Arquitetura
O projeto utiliza uma arquitetura distribuída para garantir separação de responsabilidades e escalabilidade.

🔹 Backend (Microserviços)
* Django & Django REST Framework: Framework principal para as APIs.

* Microserviço de Identidade: Gestão de usuários e autenticação JWT.

* Microserviço de Inventário: Gestão de produtos, categorias e transações.

* Celery & Redis: Processamento de tarefas assíncronas (como alertas de estoque).

* Nginx (API Gateway): Ponto único de entrada que roteia as requisições para os serviços corretos.

🔹Frontend
* React (Vite): Interface performática e moderna.

* Tailwind CSS: Estilização baseada em utilitários para UI * responsiva.

* Lucide React: Conjunto de ícones leves.

* Vitest & React Testing Library: Suite de testes unitários e de comportamento.

🔹Infraestrutura
* Docker & Docker Compose: Containerização de todos os serviços.

* PostgreSQL: Banco de dados relacional para persistência de dados.

# 📋 Requisitos e Ambiente
Para rodar este projeto, você precisará de:

* Docker (v20.10+)

* Docker Compose (v2.0+)

* Git

# 🛠️ Configuração e Instalação
Siga os passos abaixo para subir o ambiente completo:

1. Clonar o Repositório:

    ```
    git clone https://github.com/adelsonguimaraes/inventory
    cd inventory
    ```

2. Subir os Containers: O Docker Compose irá construir as imagens e iniciar os bancos de dados, o gateway, os microserviços e o frontend.

    ```
    docker compose up -d --build
    ```
3. Executar Migrations: Garanta que as tabelas do banco de dados sejam criadas:

    ```
    docker compose exec identity_service python3 manage.py migrate
    docker compose exec inventory_service python3 manage.py migrate
    ```

4. Executar ETL para alimentar a base de dados

    ```
    docker compose exec inventory_service python3 manage.py import_inventory products_data.csv
    ```

# Como acessar:

* Frontend: http://localhost:5173

* Gateway (API): http://localhost:8080

* Identity Docs (Swagger): http://localhost:8080/api/auth/docs/

* Inventory Docs (Swagger): http://localhost:8080/api/inventory/docs/

* Mailpit (Email de testes): http://localhost:8025/

# 🧪 Executando Testes
O projeto conta com uma suite de testes para garantir a confiabilidade das regras de negócio.

🔹 Backend (Django)

Para rodar os testes de integração das ViewSets e validação de estoque:

    docker compose exec inventory_service python3 manage.py test products
    

🔹 Frontend (Vitest)
Para rodar os testes unitários de componentes e lógica de interface:

    docker compose exec frontend npm test

# ⚙️ Principais Funcionalidades
* Autenticação Centralizada: Login via Microserviço de Identity com emissão de Tokens JWT.

* Gestão de Estoque: Atualização em tempo real com histórico de movimentações.

* Alertas Críticos: Identificação visual de itens abaixo do nível mínimo.

* Arquitetura Event-Driven: Uso de Celery para tarefas que não devem bloquear o fluxo principal.

# 🛠 Comandos Úteis
* Ver logs de um serviço específico: 
    
    ```
    docker compose logs -f inventory_service
    ```

* Criar superusuário (Admin): 

    ```
    docker compose exec identity_service python3 manage.py createsuperuser
    ```

* Parar o ambiente: 
    
    ```
    docker compose down
    ```

## 📊 Expansibilidade: BI & ETL
A arquitetura foi pensada para suportar pipelines de dados. A tabela de `StockTransactions` funciona como um Event Log ideal para processos de ETL, permitindo:
1. Extração de logs de movimentação via scripts Python (Pandas/FastAPI).
2. Transformação de dados para cálculo de giro de estoque.
3. Carga em Data Warehouses para visualização em ferramentas como PowerBI ou Grafana.