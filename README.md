# Bundle Builder

---

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd bundle-builder
```

---

## ⚙️ Backend Setup

### 1.Install dependencies

```bash
cd backend
npm install
```

### 2. Environment setup

if env not exist

```env
DATABASE_URL=""
```

⚠️ **Important Note**

The default backend port is **8000**.

If you change the backend port, make sure to also update the frontend API configuration accordingly to ensure proper communication between frontend and backend.

### 3. Run backend

```bash
npm run dev:start
``
```

---

## 🎨 Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## ⚠️ What is NOT Fully Implemented

### 1. Authentication

- JWT authentication was **not implemented**
- No guards were applied on:
  - Products
  - Packages
  - Protected routes

---

### 2. File / Image Uploads

- Cloudinary integration was **not completed**
- Product image upload and update currently work without a full cloud storage pipeline

---

### 3. Business Logic Refinement

- Some parts of the bundle-building logic are still under refinement
- Edge cases and validation rules may need further improvement

---

## 🧠 Tradeoffs / Notes

- Focus was placed on core functionality (bundle creation + cart flow) first
- Authentication and media handling were deferred to keep the core system working end-to-end
- Database structure is stable but may require adjustments if authentication is introduced later

---

## 📌 Future Improvements

- Add JWT authentication + role-based access control
- Integrate Cloudinary for image handling
- Add a validation layer for bundle-building rules
- Improve error handling and edge cases
- Add unit/integration tests

---

## 🏁 Summary

The project is fully runnable from a clean clone using the following steps:

1. Install backend dependencies
2. Run backend (`npm run dev:start`)
3. Install frontend dependencies
4. Run frontend (`npm run dev`)

⚠️ The backend must be running before starting the frontend.
