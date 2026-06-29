# Bundle Builder - Backend

## 🛠️ Tech Stack

- NestJS
- PostgreSQL
- TypeORM

---

## 📦 Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=<your_postgresql_connection_string>
```

> **Note:** The project uses PostgreSQL. Make sure your database is accessible before running the application.

---

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone <repository_url>
```

### 2. Navigate to the project directory

```bash
cd <project_directory>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Seed the database

```bash
npm run seed
```

### 5. Start the development server

```bash
npm run start:dev
```

---

## 📝 Notes

- The database should be seeded before running the application for the first time.
- The default server port is **8000**.
- If you change the backend port, make sure to update the frontend API configuration accordingly.

---

## ⚠️ What is Not Fully Implemented

- JWT authentication has not been implemented.
- Route guards have not been added to protected endpoints.
- Cloudinary integration for image uploads is not complete.
- Some bundle-building business logic and edge-case validations are still under refinement.
