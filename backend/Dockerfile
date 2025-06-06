FROM php:8.2-fpm

# Met à jour les paquets et installe les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    nginx \
    unzip \
    git \
    curl \
    libpq-dev \
    libmariadb-dev-compat \
    && apt-get clean

# Installe les extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_mysql

# Crée les dossiers nécessaires
RUN mkdir -p /app /run/php

# Copie les fichiers de l'application
COPY . /app

# Définit le dossier de travail
WORKDIR /app

# Installe les dépendances PHP avec Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer install \
    && composer dump-autoload

# Copie la configuration nginx (assure-toi que nginx.conf est bien corrigé)
COPY nginx.conf /etc/nginx/nginx.conf

# Donne les bons droits (important pour PHP-FPM)
RUN chown -R www-data:www-data /app

# Expose le port
EXPOSE 8080

# Démarre PHP-FPM + nginx
CMD php-fpm -D && nginx -g 'daemon off;'
