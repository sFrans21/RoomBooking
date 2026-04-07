# Room Booking System - Take Home Test

Sistem manajemen pemesanan ruangan berbasis web yang dibangun menggunakan Django (Backend) dan React Vite (Frontend). Proyek ini mencakup autentikasi JWT, manajemen ruangan, dan proteksi bentrok jadwal secara real-time.

---

## Tech Stack

- **Backend:** Python 3.12, Django 5.x, Django Rest Framework (DRF), SimpleJWT
- **Frontend:** React 18 (Vite), TypeScript, Tailwind CSS v4
- **Database:** MySQL

---

## Persiapan Instalasi

Pastikan kamu sudah menginstal **Python**, **Node.js**, dan **MySQL Server** di mesin lokalmu.

### 1. Setup Backend (Django)

**Masuk ke folder backend:**

```bash
cd backend
```

**Buat & aktifkan Virtual Environment:**

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

**Install Dependencies:**

```bash
pip install -r requirements.txt
```

> Atau install manual: `django`, `djangorestframework`, `django-cors-headers`, `djangorestframework-simplejwt`, `mysqlclient`

**Konfigurasi Database:**

Buka MySQL dan buat database baru:

```sql
CREATE DATABASE room_booking;
```

Sesuaikan `DATABASES` di `core/settings.py` dengan user dan password MySQL lokalmu.

**Migrasi Database & Buat Admin:**

```bash
python manage.py migrate
python manage.py createsuperuser
```

**Jalankan Server:**

```bash
python manage.py runserver
```

---

### 2. Setup Frontend (React)

**Masuk ke folder frontend:**

```bash
cd frontend
```

**Install Dependencies:**

```bash
npm install
```

**Jalankan Aplikasi:**

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

---

## 📝 Catatan Penting (Troubleshooting)

- **CORS Policy:** Jika Frontend berjalan di port selain `5173` (misal: `5174`), pastikan untuk menambahkannya di `CORS_ALLOWED_ORIGINS` pada file `backend/core/settings.py`.

- **Autentikasi:** Hampir seluruh fitur (kecuali daftar ruangan) diproteksi. Kamu harus melakukan **Registrasi** akun baru atau login menggunakan akun **Superuser** untuk mulai melakukan pemesanan.

- **Validasi Jadwal:** Sistem secara otomatis menolak pemesanan jika:
  - Waktu mulai berada di masa lalu.
  - Waktu selesai lebih awal dari waktu mulai.
  - Terdapat pesanan lain di ruangan yang sama pada jam tersebut.

---

## Struktur API Utama

| Method   | Endpoint              | Deskripsi                            | Auth |
| -------- | --------------------- | ------------------------------------ | ---- |
| `POST`   | `/api/register/`      | Pendaftaran user baru                | ❌   |
| `POST`   | `/api/login/`         | Mendapatkan token JWT                | ❌   |
| `GET`    | `/api/rooms/`         | Melihat daftar ruangan yang tersedia | ❌   |
| `POST`   | `/api/bookings/`      | Membuat pesanan baru                 | ✅   |
| `GET`    | `/api/bookings/`      | Melihat riwayat pesanan pribadi      | ✅   |
| `DELETE` | `/api/bookings/{id}/` | Membatalkan pesanan                  | ✅   |

---

## 👨‍💻 Author

**Samuel** — Fullstack Developer Candidate
