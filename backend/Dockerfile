FROM php:8.2-fpm

# Installe nginx
RUN apt-get update && apt-get install -y nginx

# Crée les dossiers nécessaires
RUN mkdir -p /app /run/php

# Copie les fichiers de l'app
COPY . /app

# Copie la config nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Dossier de travail
WORKDIR /app

# Expose le port
EXPOSE 8080

# Commande de démarrage : lance php-fpm en arrière-plan, puis nginx
CMD php-fpm -D && nginx -g 'daemon off;'
