FROM php:8.2-fpm

# Met à jour les paquets et installe nginx, composer, ainsi que les dépendances
RUN apt-get update && apt-get install -y \
    nginx \
    unzip \
    git \
    curl \
    libpq-dev \
    libmariadb-dev-compat \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Crée les dossiers nécessaires
RUN mkdir -p /app /run/php

# Copie les fichiers de l'application
COPY . /app

# Définit le dossier de travail
WORKDIR /app/backend

# Installe les dépendances PHP (whoops, jwt, dotenv)
RUN composer install && composer dump-autoload

# Copie la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port
EXPOSE 8080

# Démarre PHP-FPM + nginx
CMD php-fpm -D && nginx -g 'daemon off;'
