# ── Etapa 1: compilar ─────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

ARG API_URL=http://localhost:9090

COPY package*.json ./
RUN npm ci

COPY . .

# Inyecta la URL real antes de compilar
RUN sed -i "s|%%API_URL%%|${API_URL}|g" src/environments/environment.prod.ts

RUN npm run build -- --configuration=production

# ── Etapa 2: servir con Nginx ─────────────────────────────────
FROM nginx:stable-alpine
COPY --from=build /app/dist/pro-academic/browser /usr/share/nginx/html

RUN printf 'server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]