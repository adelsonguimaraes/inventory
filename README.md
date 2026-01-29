🚀 Inventory: Microservices Inventory System
Sistema escalável de controle de inventário de TI focado em rastreabilidade e isolamento de dados.

🏗️ Arquitetura do Sistema
O projeto utiliza uma arquitetura de microserviços desacoplados, garantindo que uma falha no serviço de inventário não afete a autenticação dos usuários.

API Gateway (Nginx): Ponto único de entrada, gerenciando rotas e CORS.

Identity Service (Django): Gestão de usuários e emissão de tokens JWT.

Inventory Service (Django): Core de negócio com banco de dados PostgreSQL independente.

Frontend (React + TS): Interface SPA de alta performance com persistência de sessão.

🛠️ Decisões Técnicas (Diferenciais)
Para a defesa técnica, destacamos:

Database per Service: Cada microserviço possui seu próprio banco PostgreSQL, impedindo o acoplamento via banco de dados.

Stateless Auth: O serviço de inventário valida o JWT de forma independente, sem consultar o banco de identidade a cada requisição.

Type Safety: Uso rigoroso de TypeScript no Front e Type Hinting (PEP 484) no Back.

Persistência de Estado: Implementação de loading states e localStorage para evitar redirecionamentos indesejados no refresh (F5).

📊 KPIs do Dashboard
O sistema oferece visão em tempo real de:

Valor Total do Ativo: Cálculo dinâmico do patrimônio em estoque.

Alertas de Estoque Crítico: Identificação visual e estatística de itens abaixo do limite de segurança.

Rastreabilidade: Log de transações para cada entrada e saída de material.

🚀 Como Rodar o Projeto
O ambiente é totalmente conteinerizado para garantir que o projeto rode exatamente igual em qualquer máquina.

Bash
# Clone o repositório
git clone https://github.com/adelsonguimaraes/inventory

# Suba toda a infraestrutura (Gateway, Databases, Microservices, Frontend)
```
docker-compose up --build
```
Acesso:

Frontend: http://localhost:5173

API Gateway: http://localhost:80

Swagger Identity: http://localhost/api/auth/docs

Swagger Inventory: http://localhost/api/inventory/docs

⚖️ Conformidade e Padrões
Backend: PEP 8 (Style), PEP 257 (Docstrings), SOLID.

Frontend: ESLint, Prettier, Tailwind CSS, Context API.