## Project Structure

```
CVRP/
├── gui/
│   └── mobile/              # React Native mobile app (Expo)
│       ├── app/             # App screens and navigation
│       ├── components/      # Reusable UI components
│       ├── constants/       # App constants (theme, etc.)
│       ├── hooks/           # Custom React hooks
│       └── assets/          # Images and static assets
├── nest/
│   └── vrp-backend/         # NestJS backend server
│       ├── src/             # Source code
│       │   ├── auth/        # Authentication module (JWT, login, register)
│       │   ├── app.module.ts
│       │   ├── main.ts
│       │   └── ...
│       ├── prisma/          # Database schema and migrations
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── test/            # E2E tests
│       └── package.json
├── Docs/                    # Project documentation
└── README.md
```

🚀 Fitur Utama
Proyek ini menyelesaikan masalah Capacitated Vehicle Routing Problem (CVRP) menggunakan pendekatan hibrida dua tahap: K-Means Clustering untuk pengelompokan dan Algoritma Genetika (GA) untuk optimasi jalur.
1. Tahap Pengelompokan (K-Means Clustering)

Algoritma ini digunakan sebagai langkah pertama (Cluster-First) untuk membagi beban kerja ke beberapa kurir.

    Fungsi: Mengelompokkan titik-titik pengiriman (pelanggan) berdasarkan kedekatan geografis (Latitude/Longitude).

    Proses:

        Menentukan jumlah cluster (k) berdasarkan jumlah kendaraan yang tersedia.

        Algoritma menghitung centroid (titik tengah) dan mengalokasikan setiap pelanggan ke kurir terdekat.

    Constraint (Kendala): Algoritma dimodifikasi untuk mematuhi Kapasitas Kendaraan (maxCapacity). Jika total berat paket dalam satu cluster melebihi kapasitas motor/mobil kurir, sistem akan menyeimbangkan ulang atau memindahkan paket ke cluster lain.

2. Tahap Optimasi Rute (Genetic Algorithm)

Setelah pelanggan dikelompokkan ke masing-masing kurir, Algoritma Genetika digunakan sebagai langkah kedua (Route-Second) untuk mencari urutan kunjungan terbaik (Traveling Salesman Problem).

    Fungsi: Menentukan urutan pengiriman (Sequence) dari Depot -> Pelanggan A -> Pelanggan B -> ... -> Depot agar total jarak tempuh seminimal mungkin.

    Komponen GA:

        Populasi: Kumpulan kemungkinan rute acak.

        Fitness Function: Menilai kualitas rute berdasarkan total jarak (semakin pendek semakin baik).

        Selection & Crossover: Menggabungkan bagian rute terbaik dari "induk" untuk menghasilkan rute baru yang lebih efisien.

        Mutation: Menukar urutan kunjungan secara acak untuk mencegah algoritma terjebak pada solusi lokal (local optima).

📊 Alur Kerja Sistem
Cuplikan kode

graph TD;
    A[Data Paket & Lokasi] --> B[K-Means Clustering];
    B -->|Bagi Area| C{Cek Kapasitas Kendaraan};
    C -- Over Capacity --> B;
    C -- Valid --> D[Cluster 1: Driver A];
    C -- Valid --> E[Cluster 2: Driver B];
    D --> F[Genetic Algorithm];
    E --> G[Genetic Algorithm];
    F --> H[Rute Optimal Driver A];
    G --> I[Rute Optimal Driver B];
    
👤 Autentikasi & Role-based Access

    Multi-Role: Mendukung pendaftaran dan login sebagai ADMIN atau DRIVER (Kurir).

    Secure Auth: Enkripsi password menggunakan bcrypt.

    Persistent Login: Menggunakan AsyncStorage untuk menjaga sesi user tetap aktif.

🚚 Fitur Kurir (Driver)

    Profil Kendaraan: Input otomatis plat nomor dan kapasitas muatan (Max Capacity) saat registrasi.

    Rute Kirim: Tampilan rute pengiriman yang optimal.

    Ringkasan Paket: Monitoring data paket yang harus diantar.

🛠️ Fitur Admin

    Dashboard Ringkasan: Melihat statistik kurir dan paket secara real-time.

    Kelola Kurir: Fitur untuk memantau aktivitas dan performa driver.

    Manajemen Sistem: Otoritas penuh untuk konfigurasi parameter VRP.

🛠️ Tech Stack

Frontend:

    React Native (Expo SDK)

    Expo Router (File-based Routing)

    TypeScript

    React Native Paper / Themed Components

Backend:

    NestJS (Node.js Framework)

    Prisma ORM (Database Management)

    PostgreSQL / MySQL

    Bcrypt (Security)

⚙️ Cara Menjalankan (Local Setup)

Jika Anda ingin menjalankan proyek ini setelah melakukan git clone, ikuti langkah-langkah berikut:
1. Persiapan Backend

    Masuk ke folder backend: cd backend

    Install dependensi: npm install

    Konfigurasi file .env (isi dengan koneksi database Anda):
    Cuplikan kode

    DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

    Jalankan migrasi database: npx prisma migrate dev

    Jalankan server: npm run start:dev

2. Persiapan Frontend (Mobile)

    Masuk ke folder frontend: cd frontend

    Install dependensi: npm install

    PENTING: Ubah API_URL di file konfigurasi atau komponen sesuai dengan IP Address lokal komputer Anda:
    JavaScript

    const API_URL = 'http://IP_ADDRESS_ANDA:3000/auth/register';

    Jalankan Expo: npx expo start

3. Cara Menjalankan di Perangkat

    Mobile (Expo Go): Scan QR Code menggunakan aplikasi Expo Go di Android atau Kamera di iOS (Pastikan HP dan Laptop di Wi-Fi yang sama).

    Web: npm run web di terminal untuk membuka versi browser.
