# ASBensi Pramuka - Laravel, Inertia, React, ShadcnUI

A web application for managing Pramuka (Indonesian Scout) activities built with Laravel, Inertia.js, React, and ShadcnUI.

## Features

- User Authentication & Authorization
- Member Management
- Activity Tracking
- Event Management
- Achievement Records
- Reports Generation

## Tech Stack

- Laravel 10
- Inertia.js
- React
- ShadcnUI
- MySQL

## Requirements

- PHP >= 8.1
- Node.js >= 16
- Composer
- MySQL

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/asbensi-pramuka-laravel-inertia-react-shadcnui.git
cd asbensi-pramuka-laravel-inertia-react-shadcnui
```

2. Install PHP dependencies
```bash
composer install
```

3. Install Node.js dependencies
```bash
npm install
```

4. Configure environment variables
```bash
cp .env.example .env
php artisan key:generate
```

5. Setup database and run migrations
```bash
php artisan migrate
```

6. Start development servers
```bash
php artisan serve
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
