# Run
## Yêu cầu
- BE: PHP >= 8.2
- FE: nodejs > 20

## Setup
### BE
```
cp .env.example .emv # sau đó sửa APP_URL -> thêm port
composer install
php artisan migrate
php artisan serve
```
```
# gen swagger
php artisan l5-swagger:generate
```

### FE
```
npm ci
npm run dev
```

```
# gen sdk
npm run sdk:gen
```
