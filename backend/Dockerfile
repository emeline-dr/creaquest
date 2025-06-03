# Utilise PHP avec FPM
FROM php:8.2-fpm

# Installe nginx
RUN apt-get update && apt-get install -y nginx

# Crée les dossiers nécessaires
RUN mkdir -p /app /run/php

# Copie tous les fichiers dans le conteneur
COPY . /app

# Copie la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Déclare le dossier de travail
WORKDIR /app

# Expose le port attendu par Railway
EXPOSE 8080

# Démarre PHP-FPM et nginx
CMD service php8.2-fpm start && nginx -g 'daemon off;'
