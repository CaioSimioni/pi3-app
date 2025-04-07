# Open Source Hospital Management System

An open-source hospital management system designed to streamline and optimize hospital operations. This system provides tools for managing patients, scheduling, medical records, staff, finances, inventory, and more.

![Welcome Screen](./public/images/tela-welcome.png)

## 🚀 Features

This system offers comprehensive tools for patient management, including electronic medical records, appointment scheduling, and treatment tracking. It also supports staff and medical team management with features like shift scheduling, communication tools, and specialty registration. Financial operations are streamlined with billing, insurance management, and financial reporting, while inventory and pharmacy control ensure proper tracking of medications and materials.

Additional features include laboratory and exam management, emergency care tracking, and business intelligence tools for generating reports and dashboards. The system prioritizes security and compliance, offering access control, record auditing, and adherence to regulations like LGPD and HIPAA.

## 🔧 Installation and Deployment

You can run this project in two ways:

### ✅ Method 1 - Local environment (requires PHP, Node, etc.)

**Prerequisites:**

- PHP >= 8.3
- Composer
- Node.js >= 20.x
- MySQL or SQLite
- PHP Extensions: `mbstring`, `xml`, `bcmath`, `curl`, `zip`, `pdo`, `sqlite3`, `mysql`, `gd`, `tokenizer`

**Steps:**

```bash
# 1. Clone the repository
git clone https://github.com/your-repo/pi3-laravel.git
cd pi3-laravel

# 2. Install PHP dependencies
composer install

# 3. Install JS dependencies
yarn install

# 4. Compile assets
yarn build

# 5. Configure the environment
cp .env.example .env
php artisan key:generate

# 6. Set up the database in .env
# DATABASE_URL, DB_CONNECTION, DB_DATABASE, etc.

# 7. Run migrations and seeds
php artisan migrate --seed

# 8. Start the server
php artisan serve
```

Access at: [http://localhost:8000](http://localhost:8000)

### 🐳 Method 2 - Docker (isolated, ready for development)

**Prerequisites:**

- Docker installed

**Steps:**

```bash
# 1. Clone the repository
git clone https://github.com/your-repo/pi3-laravel.git
cd pi3-laravel

# 2. Build the image
docker build -t pi3-laravel .

# 3. Run the container
docker run -p 8080:8080 --rm pi3-laravel
```

Access at: [http://localhost:8080](http://localhost:8080)

> The Dockerfile handles everything: installs dependencies, creates `.env`, compiles assets, runs migrations, and starts the app.

## 📲 Usage

- Access `http://localhost:8000` (local mode) or `http://localhost:8080` (Docker).
- Log in with the default admin account (if it exists) or register a new one.

![Dashboard Screen](./public/images/tela-dashboard.png)

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

We welcome contributions! Please follow these steps:

```bash
# 1. Fork the project
# 2. Create a new branch
git checkout -b feature/feature-name

# 3. Make changes and commit
git commit -m "feat: description of the change"

# 4. Push the branch
git push origin feature/feature-name

# 5. Open a Pull Request
```

For major changes, open an issue first to discuss the proposal.

## 📬 Contact

Have questions, bugs, or suggestions? Open an issue here on GitHub, and we'll address it!
