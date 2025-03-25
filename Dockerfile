FROM php:8.2-cli

# 1. Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    unzip \
    libsqlite3-dev \
    sqlite3 \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# 2. Instalar extensões PHP
RUN docker-php-ext-install pdo pdo_sqlite

# 3. Configurar ambiente
RUN mkdir -p /database && chmod -R 777 /database

WORKDIR /app
COPY . .

# 4. Instalar Composer e dependências
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-dev --optimize-autoloader

# 5. Configurar permissões
RUN chmod -R 777 storage bootstrap/cache

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
