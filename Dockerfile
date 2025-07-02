# Stage 1: Build a produção do aplicativo React
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json para instalar as dependências
# Isso aproveita o cache do Docker se as dependências não mudarem
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Constrói o aplicativo para produção
# Certifique-se de que seu 'npm run build' gera os arquivos estáticos na pasta 'dist'
RUN npm run build

# Stage 2: Servir o aplicativo usando Nginx
# Usamos uma imagem Nginx slim para um container leve
FROM nginx:stable-alpine AS production

# Copia a configuração padrão do Nginx para servir sua aplicação React
# Isso pode ser ajustado se você tiver uma configuração Nginx específica
COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: Se você tiver um arquivo de configuração Nginx personalizado, copie-o
# Exemplo: COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 do container
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]