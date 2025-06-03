# Utilise l'image PHP 8.2 avec FPM
FROM php:8.2-fpm

# Met à jour les paquets et installe les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    nginx \
    unzip \
    git \
    curl \
    libpq-dev \
    libmariadb-dev-compat \   # Ajout de libmariadb-dev pour la compatibilité avec MySQL
    libpdo-mysql-dev \         # Installe les bibliothèques nécessaires pour PDO MySQL
    && docker-php-ext-install pdo pdo_mysql \  # Installe les extensions PHP pour PDO et MySQL
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Crée les dossiers nécessaires
RUN mkdir -p /app /run/php

# Copie les fichiers de l'application dans le conteneur
COPY . /app

# Définit le dossier de travail
WORKDIR /app

# Installe les dépendances PHP avec Composer
RUN composer install && composer dump-autoload

# Copie la configuration Nginx dans le conteneur
COPY nginx.conf /etc/nginx/nginx.conf

# Donne les bons droits (important pour PHP-FPM)
RUN chown -R www-data:www-data /app

# Expose le port 8080 pour Nginx
EXPOSE 8080

# Démarre PHP-FPM et Nginx (en mode non-daemon)
CMD php-fpm -D && nginx -g 'daemon off;'
