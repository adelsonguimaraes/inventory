🎯 Objetivo do Projeto
Desenvolver um sistema escalável de controle de inventário de equipamentos de TI, focando em rastreabilidade, integridade de dados e separação de responsabilidades utilizando uma arquitetura de microserviços.

🛠️ Stack Tecnológica
Backend: Python 3.12+ (Django & Django REST Framework).

Frontend: React (Vite) + TypeScript.

Database: PostgreSQL (um banco por serviço para isolamento real).

Comunicação: REST (Síncrona) e Docker para orquestração.

📏 Padrões e PEPs (Obrigatórios)
Para a defesa técnica, seguiremos rigorosamente:

PEP 8: Guia de estilo de código (indentação, nomes de variáveis).

PEP 484 & 526: Type Hinting (Tipagem estática no Python).

PEP 257: Convenções de Docstrings para documentação de métodos.

PEP 621: Uso de pyproject.toml para gerenciamento de dependências moderno.

SOLID & DRY: Princípios de design de software aplicados tanto no Django quanto no React.

Com certeza. O checklist é o seu mapa de guerra para a apresentação. Agora que a Fase 2 está sólida, precisamos estruturar a Fase 3 (Negócio) e a Fase 4 (Frontend), além de uma fase final de polimento.

Aqui está o checklist atualizado com os próximos passos estratégicos:

📑 README.md: TechStock Microservices (Master)
✅ Checklist de Desenvolvimento Atualizado
🟢 Fase 1: Infraestrutura e Setup

[x] Criar docker-compose.yml com redes isoladas e bancos independentes.

[x] Configurar Dockerfile (Ubuntu 24.04 + PEP 668 bypass).

[x] Configurar Gateway (Nginx) para roteamento de tráfego.

[x] Configurar DevContainer para o ambiente de desenvolvimento.

[x] Validar comunicação entre Gateway e Django.

🔵 Fase 2: Identity Service (Auth)

[x] Setup do projeto Django e criação do app accounts.

[x] Implementação do CustomUser Model (E-mail como login + PEP 484).

[x] Migração do banco SQLite padrão para PostgreSQL (Docker).

[x] Implementação de autenticação JWT (SimpleJWT).

[x] Endpoint de Registro e Perfil via Serializers.

[x] Configuração do Swagger (OpenAPI 3) para documentação.

🟠 Fase 3: Inventory Service (Core Business)

[x] Criação do serviço inventory_service e banco PostgreSQL dedicado.

[x] Modelagem de dados: Category e Product.

[x] Implementação de ViewSets para CRUD completo.

[x] Integração de Segurança: Validar o JWT do Identity Service (Stateless).

[x] Modelagem de StockTransaction (Histórico de entradas/saídas).

[x] Relatórios simples de estoque (Status consolidado via @action).

[x] Configuração do Swagger para o Inventory Service.

Excelente! Ver o fluxo completo (Autenticação → Listagem → Atualização → Cadastro) funcionando em uma arquitetura de microserviços é uma vitória enorme. Isso prova que sua fundação técnica — Docker, Nginx, Django e React — está sólida.

Com o CRUD de Produtos praticamente fechado, vamos atualizar nosso progresso para refletir essa conquista:

🟢 Fase 4: Frontend Web (React + TypeScript) - Status
[x] Setup do projeto React com Vite e Tailwind CSS.

[x] Implementação de Axios Interceptors para gestão do JWT.

[x] Implementação de Context API para gestão de estado.

[x] Tela de Login e Registro.

[x] Dashboard de Inventário:

[x] Listagem de produtos em tempo real.

[x] Atualização rápida de estoque (Quick Actions).

[x] Cadastro de novos produtos com modal.

# Defesa 1
🧐 Pontos de Atenção para a Defesa Técnica
Isolamento de Dados: Explicar por que cada microserviço tem seu próprio banco de dados (evitar acoplamento).

Contratos: Como o TypeScript no Front garante que não quebraremos a comunicação com o Backend.

Segurança: Uso de variáveis de ambiente e proteção de rotas no Gateway.

# Defesa 2
🧐 Notas para a Defesa Técnica (O que já conquistamos):
Resiliência de Ambiente: Superamos o desafio da PEP 668 no Docker, garantindo que o ambiente use as melhores práticas de isolamento do Python em sistemas Linux modernos.

Arquitetura de Dados: Explicamos a transição do SQLite para o PostgreSQL, justificando o uso de um banco de dados relacional robusto para garantir a integridade dos dados de inventário.

Padronização: O uso do CustomUser logo no início evita o "débito técnico" de migrar usuários no futuro, algo comum em projetos que não seguem as melhores práticas desde o dia 1.

# Defesa 3
🛡️ Notas Adicionais para a Defesa
Microservices vs. Monólito: "Ao iniciarmos a Fase 3, provaremos a escalabilidade do sistema. O serviço de Inventário poderá crescer independentemente do serviço de Identidade, podendo inclusive ser escrito em outra linguagem no futuro, se necessário."

Interoperabilidade: "Mesmo sendo serviços distintos, eles compartilham o mesmo segredo de assinatura JWT, permitindo que o inventory_service confie na identidade do usuário sem precisar consultar o banco de dados do identity_service a cada requisição."


## Comands
- Identity Service Commands
```
docker compose exec identity_service python3 manage.py startapp accounts
docker compose exec identity_service python3 manage.py makemigrations
docker compose exec identity_service python3 manage.py migrate
```

- Inventory Service Commands
```
docker compose exec inventory_service python3 manage.py startapp products
docker compose exec inventory_service python3 manage.py makemigrations
docker compose exec inventory_service python3 manage.py migrate
```