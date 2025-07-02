# Projeto Kanban JusCash - Frontend

Este repositório contém o código-source do frontend da aplicação Kanban da JusCash, desenvolvida em React com Vite e estilização Tailwind CSS.

## Visão Geral do Projeto

O sistema Kanban da JusCash é uma ferramenta intuitiva para gerenciamento de publicações, otimizando o fluxo de trabalho desde a extração (web scraping) até a conclusão da análise. A interface principal organiza as publicações em colunas de um quadro Kanban, permitindo fácil visualização, filtro e movimentação dos cards conforme o progresso.

**Principais funcionalidades implementadas:**

* **Autenticação de Usuário:**
    * Telas de Login e Cadastro completas com campos, botões e links para navegação entre elas.
    * Validações de e-mail e senha no frontend, incluindo requisitos de segurança da senha (mínimo 8 caracteres, maiúscula, minúscula, número, caractere especial).
    * Feedback visual claro para erros de validação abaixo dos campos e mensagens de erro gerais para credenciais inválidas ou falhas no servidor.
    * Redirecionamento automático para a tela principal (Kanban) após login ou cadastro bem-sucedido.
    * Animação de carregamento (spinner) nos botões de login e cadastro durante o processamento.
    * Funcionalidade de link "Esqueceu sua senha?".
    * Mensagem de boas-vindas exibida via "toast" após cadastro bem-sucedido.
    * Indicação visual de campos obrigatórios com asterisco `*`.

* **Gestão de Publicações (Quadro Kanban):**
    * Visualização em formato Kanban com quatro colunas: "Novas Publicações", "Publicações Lidas", "Enviadas para Advogado Responsável", e "Concluídas".
    * Movimentação de cards (drag and drop) entre as colunas, com regras de transição bem definidas para garantir o fluxo de trabalho. Mensagens de erro são exibidas para movimentos não permitidos.
    * Carregamento incremental (scroll infinito) de publicações em cada coluna, com um limite inicial de 30 cards por coluna.
    * Cards de publicação exibem informações resumidas (número do processo, datas, autor), com fallback "Não encontrado" para dados ausentes.
    * Acesso a detalhes completos de publicações via modal clicável nos cards.

* **Modal de Detalhes da Publicação:**
    * Exibe informações completas da publicação em formato somente leitura.
    * Pode ser fechado clicando fora da área do modal ou no botão "X".

* **Sistema de Busca e Filtros:**
    * Barra de busca por texto livre (número de processo, autor, réu, advogado).
    * Filtro por intervalo de datas de disponibilização no DJE.
    * Busca otimizada com **debounce** para evitar requisições excessivas enquanto o usuário digita.
    * Design responsivo para os campos de busca e filtro.

* **Navegação (Navbar):**
    * Barra de navegação fixa com o logo da JusCash à esquerda e botão de "Sair" à direita.
    * Funcionalidade de logout que finaliza a sessão e redireciona para a tela de login.

* **Experiência de Usuário e Responsividade:**
    * Interface responsiva, adaptando-se a diferentes tamanhos de tela (desktop e mobile) para uma experiência consistente.
    * Persistência de sessão do usuário enquanto logado.

## Requisitos para Execução Local

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* [Node.js](https://nodejs.org/) (versão 18 ou superior, recomendado 20.x)
* [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) ou [Yarn](https://yarnpkg.com/) (alternativa ao npm)
* [Docker](https://www.docker.com/products/docker-desktop) (opcional, para execução via container)

**Variáveis de Ambiente:**

O projeto utiliza variáveis de ambiente para a configuração da API. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```dotenv
VITE_API_BASE_URL=http://localhost:3000/api # URL da sua API de backend
VITE_API_TIMEOUT=10000 # Timeout para requisições em ms
VITE_ENABLE_MOCK_DATA=false # Defina como 'true' para ativar dados de login de teste no formulário de login (apenas desenvolvimento)
```
Instruções de Instalação e Execução
Siga os passos abaixo para configurar e executar o frontend localmente:

Clone o repositório:

```Bash
git clone [URL_DO_SEU_REPOSITORIO]
cd nome-do-diretorio-do-projeto
Instale as dependências:
```
```Bash

npm install
# ou
yarn install
Inicie o servidor de desenvolvimento:
```
```Bash

npm run dev
# ou
yarn dev
```
O aplicativo estará disponível em http://localhost:5173 (ou outra porta indicada pelo Vite).


## Exemplos de Requisições à API
O frontend interage com as seguintes rotas da API (backend):

### Autenticação:

POST /api/auth/login - Login de usuário

POST /api/auth/register - Cadastro de novo usuário

POST /api/auth/logout - Logout de usuário

GET /api/auth/me - Obter perfil do usuário logado (requer token de autenticação)

### Publicações:

GET /api/publicacoes - Listar publicações (suporta filtros search, data_inicio, data_fim, status, page, limit)

Ex: GET /api/publicacoes?search=numero_processo_exemplo&status=nova&page=1&limit=30

PUT /api/publicacoes/{id}/status - Atualizar status de uma publicação

Body: { "status": "lida" } (ou enviada_adv, concluida)

GET /api/publicacoes/stats - Obter estatísticas das publicações

## Fluxo de Trabalho do Kanban
O Kanban é a interface principal para gerenciar as publicações, que seguem o seguinte fluxo:

Novas Publicações: Cards aparecem nesta coluna após serem extraídos.

Publicações Lidas: Movidas para cá após revisão inicial.

Restrição: Não podem retornar para "Novas" nem ir diretamente para "Concluídas".

Enviadas para Advogado Responsável: Destino para publicações que precisam de análise legal.

Permissão: Somente podem vir de "Publicações Lidas".

Retorno: Podem voltar para "Publicações Lidas" se necessário.

Concluídas: Coluna final para publicações já analisadas e finalizadas.

Restrição: Uma vez aqui, os cards não podem mais ser movidos.

A movimentação é feita por arrastar e soltar (drag and drop), e o status da publicação é atualizado automaticamente no backend a cada movimento válido.