FROM php:8.2-fpm

# Installe les dépendances nécessaires, y compris les bibliothèques pour PDO et pdo_mysql
RUN apt-get update && apt-get install -y nginx unzip git curl libpq-dev libmysqlclient-dev \
    && docker-php-ext-install pdo pdo_mysql

# Installe Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Crée les dossiers nécessaires
RUN mkdir -p /app /run/php

# Copie les fichiers de l'app
COPY . /app

# Définir le dossier de travail
WORKDIR /app

# Installer les dépendances PHP (whoops, jwt, dotenv)
RUN composer install \
    && composer dump-autoload

# Copie la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port
EXPOSE 8080

# Démarrer PHP-FPM + nginx
CMD php-fpm -D && nginx -g 'daemon off;'
