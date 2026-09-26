# E-commerce-api

A simple e-commerce backend API built with **Express.js, Prisma, and SQLite**.

## Technologies

* Node.js
* Express.js
* Prisma
* SQLite
* JWT
* bcrypt
* Multer
* express-validator
* dotenv

## Features

* User registration and login
* JWT authentication
* Category CRUD
* Product CRUD
* Product image upload
* User image upload, list, and delete
* Add, list, and remove favorites
* Request validation and centralized error handling

## Installation

```bash
git clone https://github.com/MobinaTabari/E-commerce-api.git
cd E-commerce-api
npm install
```

Create a `.env` file:

```env
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_jwt_secret
```

Run the project:

```bash
npm run dev
```

## Database

The project uses Prisma with SQLite.

```bash
npx prisma migrate dev
npx prisma generate
```

## API

Main endpoints:

* `/api/auth`
* `/api/categories`
* `/api/products`
* `/api/users/images`
* `/api/favorites`

Protected endpoints require a JWT Bearer Token.

## Postman

The Postman collection is organized into:

* Auth
* Categories
* Products
* Users
* Favorites

## Image Uploads

Images are uploaded using **Multer** and stored in:

```text
uploads/products
uploads/users
```

Uploaded files are served through `/uploads`.
