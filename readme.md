Member:
1. Muhammad Syaifullah Al Arief
2. Muhammad Luthfi Zuhair

Reference URL:
1. https://pinchofyum.com/ 
2. https://cookieandkate.com/

# Techstack
- Authentication: JWT Auth
- Frontend: React, Tailwind, Context API, Eslint, Prettier, Jest
- Backend: expressJS, prisma, CORS, JWT, bcrypt, Jest
- Database: PostgreSQL, Cloudinary
- Devops: Docker

# Suggested Features for Extra Points

- Responsiveness: Optimal di desktop dan mobile.
- Dark Mode: Tambahkan fitur light/dark mode untuk pengalaman pengguna yang lebih baik.
- Pagination atau Infinite Scroll: Untuk artikel atau resep panjang.
- Bookmark: Fitur menyimpan artikel ke "favorites" (dengan localStorage atau user-auth).
- Integrasi Media Sosial: Tombol share untuk membagikan resep ke Facebook, Twitter, dsb.

# Functional Requirements (Fitur Utama)
# a. Homepage

- Deskripsi: Tampilan utama blog dengan hero section (foto makanan menarik), daftar artikel/resep terbaru, dan kategori makanan.
- Fitur:
    - Carousel atau grid untuk artikel unggulan.
    - Search bar untuk mencari artikel/resep.
    - Filter berdasarkan kategori.

# b. Blog Post (Resep atau Artikel)

- Deskripsi: Halaman detail untuk setiap artikel/resep.
- Fitur:
- Judul, deskripsi singkat, dan foto makanan.
- Informasi bahan-bahan dan langkah-langkah memasak (terstruktur).
- Waktu memasak, porsi, tingkat kesulitan.
- Rating atau komentar dari pengguna (opsional).

# c. Kategori Makanan

- Deskripsi: Halaman dengan daftar makanan berdasarkan kategori (e.g., Breakfast, Dessert, Vegetarian).
- Fitur:  
	- Daftar kategori dengan ikon atau gambar.
	- Grid atau list artikel yang terkait kategori.

# d. Halaman Tentang dan Kontak

- Deskripsi: Memberikan informasi tentang pemilik blog dan cara menghubungi.
- Fitur:
  - Profil singkat.
  - Formulir kontak.
  - Link media sosial.

# e. Admin Dashboard (Opsional untuk Portofolio)

- Deskripsi: Halaman backend untuk mengelola artikel dan kategori.
- Fitur:
    - CRUD Artikel (Create, Read, Update, Delete).
    - Manajemen Kategori.
