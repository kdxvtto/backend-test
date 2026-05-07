# POS API

RESTful API untuk aplikasi Point of Sale. API ini menangani order, item order, add-on, pembayaran, dan report penjualan berdasarkan data transaksi yang tersimpan di database.

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- Zod
- Swagger UI / OpenAPI

Project ini menggunakan raw SQL melalui repository layer. ORM tidak digunakan karena mengikuti requirement challenge.

## Struktur Project

```txt
backend/src/
  configs/        koneksi database
  controllers/    handler request dan response HTTP
  databases/      schema, migration, dan seed
  docs/           postman, dbdiagram, opeanAPI specs
  middlewares/    error handling dan not found handler
  repositories/   query database
  routes/         definisi endpoint
  services/       business logic
  utils/          helper umum
  validations/    schema validasi Zod
```

Alur request:

```txt
routes -> validation -> controller -> service -> repository -> database
```

## Environment Variables

Project ini membaca konfigurasi dari `.env.example`.

```env
PORT=3000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=admin1234
DB_NAME=pos_db
DB_SSL=false
```

Sesuaikan `DB_USER`, `DB_PASS`, dan `DB_NAME` dengan konfigurasi MySQL lokal.

## Setup Lokal

Install dependency:

```bash
npm install
```

Buat database:

```bash
mysql -u root -p -e "CREATE DATABASE pos_db;"
```

Jalankan migration dan seed:

```bash
npm run migrate:seed
```

Jalankan server development:

```bash
npm run dev
```

Server berjalan di:

```txt
http://localhost:3000
```

Health check:

```txt
GET /
GET /health
```

## Scripts

```bash
npm run dev
```

Menjalankan server dengan nodemon.

```bash
npm start
```

Menjalankan server dengan node.

```bash
npm run migrate
```

Menjalankan file SQL di `backend/src/databases/migrations`.

```bash
npm run seed
```

Menjalankan file SQL di `backend/src/databases/seeds`.

```bash
npm run migrate:seed
```

Menjalankan migration lalu seed.

## API Documentation

Swagger UI:

```txt
http://localhost:3000/api-docs
```

OpenAPI JSON:

```txt
http://localhost:3000/openapi.json
```

Postman collection:

```txt
docs/postman_collection.json
```

## Endpoint Utama

```txt
POST /orders
GET /orders
GET /orders/:id
PUT /orders/:id
GET /reports/product-sales
GET /reports/sales
```

Endpoint tambahan untuk testing data master:

```txt
GET /products
POST /products
GET /products/:id
PUT /products/:id
DELETE /products/:id

GET /add-ons
POST /add-ons
GET /add-ons/:id
PUT /add-ons/:id
DELETE /add-ons/:id
```

## Schema Diagram

File DBML untuk dbdiagram.io:

```txt
docs/dbdiagram/pos_api.dbml
```

Cara pakai:

1. Buka dbdiagram.io
2. Buat diagram baru
3. Copy isi `docs/dbdiagram/pos_api.dbml`
4. Paste ke editor dbdiagram.io

## Migration dan Seed

Migration membuat struktur tabel utama:

- `products`
- `add_ons`
- `product_add_ons`
- `orders`
- `order_items`
- `order_item_add_ons`
- `payments`

Seed mengisi data dummy berupa menu fast food sederhana:

- minimal 10 product
- add-on seperti extra cheese, sauce, upgrade drink, dan topping lain
- relasi product dengan add-on yang tersedia

## Keputusan Arsitektur

Project dipisah menjadi route, controller, service, dan repository agar tanggung jawab tiap layer jelas.

- Route fokus pada endpoint dan middleware validasi.
- Controller fokus pada request/response HTTP.
- Service menyimpan business logic seperti hitung total order, validasi stok, payment, dan transaction.
- Repository fokus pada raw SQL dan akses database.
- Middleware menangani error response dan route yang tidak ditemukan.

Order dibuat menggunakan transaction karena prosesnya menyentuh beberapa tabel sekaligus: `orders`, `order_items`, `order_item_add_ons`, `payments`, dan update stok product. Jika salah satu proses gagal, semua perubahan dibatalkan agar data tetap konsisten.

## Alasan Desain Schema

`products` dan `add_ons` disimpan sebagai data master. Keduanya memiliki `price` dan `cost_price` agar report bisa menghitung revenue dan net profit.

`product_add_ons` digunakan sebagai tabel pivot karena satu product bisa memiliki banyak add-on, dan satu add-on bisa dipakai oleh banyak product.

`orders` menyimpan ringkasan transaksi seperti customer, status, subtotal, discount, tax, dan total.

`order_items` menyimpan item yang dibeli dalam satu order. Field `product_name`, `unit_price`, dan `unit_cost` disimpan sebagai snapshot agar histori order tetap benar walaupun data product berubah kedepannya.

`order_item_add_ons` menyimpan add-on yang dipilih pada tiap item order. Field `add_on_name`, `unit_price`, dan `unit_cost` juga disimpan sebagai snapshot.

`payments` dipisahkan dari `orders` agar detail pembayaran lebih jelas dan mudah dikembangkan jika nanti ada metode pembayaran lain.

Report dihitung dari order dengan status `paid`, sehingga revenue dan net profit hanya berasal dari transaksi yang sudah dibayar.

## Deployment

Live URL:

```txt
https://backend-test-development-53c4.up.railway.app/
```

API dideploy menggunakan Railway, sedangkan database MySQL menggunakan Aiven.

Environment variables di Railway:

```env
DB_HOST="aivenhost"
DB_NAME="def db"
DB_PASS=example
DB_PORT="aivenport"
DB_SSL="true"
DB_USER="fromaiven"
NODE_ENV="development"
```

Setelah variable Railway diisi, jalankan migration dan seed ke database Aiven:

```bash
railway run -s backend-test npm run migrate:seed
```
