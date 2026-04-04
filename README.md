<h1 align="center">🧠 Neural Mind Scanner</h1>

<p align="center">
  <strong>Sistem Deteksi Kesadaran Berbasis AI</strong><br/>
  <em>Mengubah keluh kesah manusia menjadi ribuan baris log jaringan neuron secara real-time</em>
</p>

<p align="center">
  <a href="#fitur-utama">Fitur</a> •
  <a href="#teknologi">Teknologi</a> •
  <a href="#instalasi">Instalasi</a> •
  <a href="#penggunaan">Penggunaan</a> •
  <a href="#keamanan">Keamanan</a> •
  <a href="#lisensi">Lisensi</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License MIT" />
</p>

---

## 📖 Tentang

**Neural Mind Scanner** adalah aplikasi web interaktif yang mensimulasikan pemindaian pikiran manusia menggunakan kecerdasan buatan Google Gemini. Pengguna cukup menuliskan keluh kesah atau pikiran mereka, dan sistem akan:

1. **Menganalisis** tingkat kekacauan pikiran (0–100%)
2. **Men-generate** ribuan baris log jaringan neuron secara real-time
3. **Memvisualisasikan** fluktuasi kesadaran dalam bentuk grafik interaktif
4. **Memberikan diagnosis** berupa saran pengobatan atau ramalan masa depan positif

> *"Karena terkadang, pikiran kita butuh di-debug juga."*

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🎭 **Splash Screen Dinamis** | Animasi loading dengan ikon emosi yang berubah-ubah |
| ⚡ **Glitch Header** | Efek teks scramble ala terminal hacker yang berulang setiap 5 detik |
| 🧪 **AI Analysis** | Analisis kekacauan pikiran menggunakan Google Gemini AI |
| 📊 **Live Chart** | Grafik fluktuasi kesadaran real-time menggunakan Recharts |
| 💻 **Terminal Log** | Ribuan baris log neural yang di-generate berdasarkan tingkat kekacauan |
| 📋 **Export** | Salin atau unduh seluruh log neural sebagai file `.txt` |
| 🔒 **Security Layer** | Anti-inspect, anti-DevTools, anti-copy, anti-drag |
| 🌐 **IP Rotation** | Alamat IP berubah-ubah secara otomatis setiap 4 detik |
| 📱 **Responsive** | Tampilan optimal di desktop, tablet, dan mobile |
| 🎨 **Dark Brutalist UI** | Desain hitam-putih minimalis dengan estetika terminal |

---

## 🛠️ Teknologi

```
Frontend Framework  : React 19 + TypeScript
Build Tool          : Vite 6
Styling             : Tailwind CSS 4
AI Engine           : Google Gemini 3 Flash Preview
Charts              : Recharts
Icons               : Lucide React
Animation           : Framer Motion
```

---

## 📦 Instalasi

### Prasyarat

- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- [Google Gemini API Key](https://ai.google.dev/)

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/naufalshdq/neural-mind-scanner.git
cd neural-mind-scanner

# 2. Install dependensi
npm install

# 3. Konfigurasi API Key
cp .env.example .env.local
# Edit .env.local dan masukkan GEMINI_API_KEY Anda

# 4. Jalankan aplikasi
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🚀 Deployment (Netlify)

Aplikasi ini sudah dikonfigurasi untuk dideploy dengan mudah ke [Netlify](https://www.netlify.com/).

### Langkah Deployment:
1. Hubungkan repository GitHub ini ke akun Netlify Anda.
2. Netlify akan otomatis membaca konfigurasi `netlify.toml` (`npm run build` dan folder `dist`).
3. Buka **Site Settings** > **Environment Variables**.
4. Tambahkan _variable_ baru:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Masukkan API Key rahasia dari Google AI Studio.
5. Klik **Deploy / Trigger Deploy**.
6. Selesai! Web Anda sekarang live dengan proteksi aktif.

---

## 🚀 Penggunaan

1. **Buka** aplikasi di browser Anda
2. **Tunggu** splash screen selesai memuat
3. **Tuliskan** keluh kesah atau pikiran Anda di kolom input
4. **Klik** tombol "Mulai Pemindaian"
5. **Amati** proses pemindaian di terminal log dan grafik real-time
6. **Baca** diagnosis yang muncul setelah pemindaian selesai
7. **Salin** atau **unduh** hasil log neural jika diinginkan

### Interpretasi Hasil

| Tingkat Kekacauan | Status | Diagnosis |
|-------------------|--------|-----------|
| 0–25% | 🟢 Stabil | Ramalan masa depan positif & petunjuk arah kehidupan |
| 26–50% | 🟡 Normal | Saran positif & motivasi |
| 51–75% | 🟠 Waspada | Saran pengobatan & quotes penyemangat |
| 76–100% | 🔴 Kritis | Rekomendasi konsultasi psikolog & saran intensif |

---

## 🔒 Keamanan

Neural Mind Scanner dilengkapi dengan beberapa lapisan keamanan client-side:

| Layer | Proteksi |
|-------|----------|
| **Anti-Inspect** | Blokir F12, Ctrl+Shift+I/J/C |
| **Anti-Source** | Blokir Ctrl+U (View Source) |
| **Anti-Save** | Blokir Ctrl+S dan Ctrl+P |
| **Anti-Copy** | Pencegahan copy di luar area input |
| **Anti-Drag** | Pencegahan drag & drop elemen |
| **Anti-Select** | Pencegahan seleksi teks di luar area input |
| **DevTools Detection** | Deteksi pembukaan Developer Tools (produksi) |
| **Right-Click Block** | Menonaktifkan menu konteks klik kanan |
| **IP Masking** | Alamat IP proxy yang berubah setiap 4 detik |
| **Console Warning** | Peringatan di console browser |

> [!WARNING]
> Fitur keamanan client-side bersifat pencegahan dan bukan jaminan mutlak. Untuk keamanan tingkat lanjut, selalu lindungi API Key di sisi server.

---

## 📁 Struktur Proyek

```
neural-mind-scanner/
├── src/
│   ├── App.tsx          # Komponen utama aplikasi
│   ├── main.tsx         # Entry point React
│   └── index.css        # Stylesheet global & animasi
├── index.html           # Template HTML
├── vite.config.ts       # Konfigurasi Vite
├── tsconfig.json        # Konfigurasi TypeScript
├── package.json         # Dependensi & script
├── .env.example         # Template variabel environment
├── .gitignore           # File yang diabaikan Git
├── LICENSE              # Lisensi MIT
└── README.md            # Dokumentasi (file ini)
```

---

## 🤝 Kontribusi

Kontribusi sangat dihargai! Silakan buka issue atau pull request jika Anda memiliki ide atau menemukan bug.

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buka Pull Request

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<p align="center">
  Dibuat dengan 🧠 oleh <strong>naufalshdq</strong><br/>
  <sub>© 2026 Neural Mind Scanner — Semua hak dilindungi.</sub>
</p>
