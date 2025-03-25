FROM php:8.2-cli
WORKDIR /app
COPY . .
RUN composer install --no-dev --optimize-autoloader
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
