FROM php:8.2-fpm

# Installe nginx, composer, et d'autres dépendances
RUN apt-get update && apt-get install -y nginx unzip git curl libpq-dev libmysqlclient-dev \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Crée les dossiers nécessaires
RUN mkdir -p /app /run/php

# Copie les fichiers de l'application
COPY . /app

# Expose le port 8080 pour l'accès HTTP
EXPOSE 8080

# Installer les dépendances PHP (whoops, jwt, dotenv)
WORKDIR /app
RUN composer install && composer dump-autoload

# Copier la configuration nginx dans le conteneur
COPY nginx.conf /etc/nginx/nginx.conf

# Lancer PHP-FPM et Nginx en arrière-plan
CMD php-fpm -D && nginx -g 'daemon off;'
