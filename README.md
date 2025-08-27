# Gencidev Notes API 📝

API sederhana untuk manajemen catatan dengan autentikasi JWT menggunakan Node.js, Express, dan MySQL.

## 🚀 Fitur

- **Autentikasi**: Register dan Login dengan JWT
- **CRUD Notes**: Buat, baca, edit, dan hapus catatan
- **Database**: MySQL dengan koneksi pool
- **Security**: Password hashing dengan bcrypt
- **Modern**: Menggunakan ES Modules (ESM)

## 📋 Prerequisites

Pastikan sudah terinstall:

- [Node.js](https://nodejs.org/) (v14 atau lebih baru)
- [XAMPP](https://www.apachefriends.org/) (untuk MySQL)
- [Postman](https://www.postman.com/) (untuk testing API)
- [Git](https://git-scm.com/) (untuk clone repository)

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/dzakyahnaf/gencidev-notes-api.git
cd gencidev-notes-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database (XAMPP)

1. **Buka XAMPP Control Panel**
2. **Start Apache dan MySQL**
3. **Buka phpMyAdmin** (http://localhost/phpmyadmin)
4. **Buat database baru** dengan nama `gencidev_notes`
5. **Buat tabel yang diperlukan:**

```sql
-- Tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel notes
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. Konfigurasi Environment (Opsional)

Buat file `.env` di root directory (opsional, karena sudah ada default values):

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=gencidev_notes
JWT_SECRET=your-secret-key
PORT=3000
```

## 🚀 Cara Menjalankan

### 1. Pastikan XAMPP Running

- Buka **XAMPP Control Panel**
- **Start Apache** (untuk phpMyAdmin)
- **Start MySQL** (untuk database)

### 2. Jalankan Development Server

```bash
npm run dev
```

Atau untuk production:

```bash
npm start
```

Server akan berjalan di: **http://localhost:3000**

### 3. Verifikasi Server

Buka browser dan akses:

- **http://localhost:3000** - Welcome message
- **http://localhost:3000/health** - Health check

## 🧪 Testing dengan Postman

### 1. Import Collection (Opsional)

Atau buat request manual sesuai dokumentasi di bawah.

### 2. Base URL

```
http://localhost:3000
```

### 3. Endpoints

#### **Authentication**

**Register User**

```
POST /auth/register
Content-Type: application/json

{
  "username": "dzaky",
  "password": "123456"
}
```

**Login User**

```
POST /auth/login
Content-Type: application/json

{
  "username": "dzaky",
  "password": "123456"
}
```

Response login akan memberikan token JWT:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Notes (Perlu Authorization)**

Untuk semua endpoint notes, tambahkan header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Create Note**

```
POST /notes
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is my first note content"
}
```

**Get All Notes**

```
GET /notes
Authorization: Bearer YOUR_JWT_TOKEN
```

**Get Note by ID**

```
GET /notes/1
Authorization: Bearer YOUR_JWT_TOKEN
```

**Update Note**

```
PUT /notes/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Updated Note Title",
  "content": "Updated note content"
}
```

**Delete Note**

```
DELETE /notes/1
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📁 Struktur Project

```
gencidev-notes-api/
├── src/
│   ├── config/
│   │   └── db.js          # Konfigurasi database MySQL
│   ├── controllers/
│   │   ├── auth.js        # Controller autentikasi
│   │   └── notes.js       # Controller notes
│   ├── middlewares/
│   │   └── auth.js        # Middleware JWT authentication
│   ├── routes/
│   │   ├── auth.js        # Routes autentikasi
│   │   ├── notes.js       # Routes notes
│   │   └── index.js       # Main routes
│   └── index.js           # Entry point aplikasi
├── package.json
└── README.md
```

## 🛠️ Scripts

```bash
# Development (with nodemon)
npm run dev

# Production
npm start

# Run tests (belum dikonfigurasi)
npm test
```

## 🔧 Troubleshooting

### Database Connection Error

- Pastikan XAMPP MySQL sudah running
- Cek apakah database `gencidev_notes` sudah dibuat
- Verifikasi tabel `users` dan `notes` sudah ada

### Port Already in Use

- Ganti port di environment variable `PORT`
- Atau matikan aplikasi yang menggunakan port 3000

### JWT Token Invalid

- Pastikan token di-copy dengan benar dari response login
- Cek apakah token sudah expired (default: 1 jam)

### Request Body Undefined

- Pastikan Content-Type header adalah `application/json`
- Pastikan body request dalam format JSON yang valid

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Dzaky Ahnaf**

- GitHub: [@dzakyahnaf](https://github.com/dzakyahnaf)
