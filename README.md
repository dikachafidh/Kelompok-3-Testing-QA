# Laporan Pengujian Perangkat Lunak (QA) — Website RizzFlow

Dokumentasi lengkap perencanaan, perancangan *test case* berbasis *keyword* (ISO/IEC/IEEE 29119-5:2024), eksekusi pengujian *black-box*, *non-functional*, dan *white-box*, log 25 temuan *defect*, serta validasi praktisi QA untuk aplikasi web **RizzFlow** (`https://rizzflow-theta.vercel.app/`).

---

## 📋 1. Informasi Proyek & Tim Penyusun

* **Objek Uji (SUT):** Website RizzFlow — `https://rizzflow-theta.vercel.app/`
* **Pemberi Izin Objek Uji:** Faris Maulana (Pemilik RizzFlow — Izin tertulis 22 Nov 2026 s.d. 1 Jan 2027)
* **Standar Acuan:** ISO/IEC/IEEE 29119-5:2024 (*Keyword-Driven Testing*) & Silabus Pengujian Perangkat Lunak (Modul 1–16)
* **Mata Kuliah / Dosen Pengampu:** Software Testing / Quality Assurance — Asep Erlan Maulana, S.Kom., M.Kom.
* **Institusi:** Program Studi Teknik Informatika, Fakultas Ilmu Komputer, Universitas Pamulang (2026)
* **Peninjau / Narasumber QA:** Maulida Rizki (QA Engineer — Perbankan)
* **Tim Penguji (Kelompok 3):**
  * **Azaria Bunga** (`231011400808`) — Pengujian *Usability* (11 responden), survei SUS, & evaluasi heuristik
  * **Bagus Saputro** (`231011402742`) — Pengujian Katalog/Detail Produk, wawancara praktisi QA, & analisis kesenjangan
  * **Dhemes Ichsan Ramadhani** (`231011401260`) — Pengelolaan *keyword*, referensi IEEE, & matriks Excel *test case*
  * **Dika Chafizh Hizbulloh** (`231011400064`) — Desain *test case*, uji *white-box* (Vitest), otomasi E2E (Playwright), performa, keamanan dasar, & kompatibilitas

---

## 📁 2. Struktur Direktori Repositori

Seluruh artefak pengujian pada repositori ini diorganisasikan ke dalam 5 folder bernomor berikut:

```text
rizzflow-qa-testing/
├── 01-rencana-pengujian/        # Bukti izin pemilik objek uji, Test Plan, & cakupan pengujian
├── 02-test-cases/               # Matriks 81 Test Case (Lampiran_2_Daftar_Test_Case_RizzFlow.xlsx) & Definisi Keyword
├── 03-whitebox-automation/      # Skrip Unit/API White-Box (Vitest) & E2E UI Automation (Playwright)
├── 04-laporan-defect/           # Log detail 25 bug report (INC-01–10, W-01–12, S-01–03) & catatan wawancara QA
├── 05-bukti-pengujian/          # 51 file screenshot bukti eksekusi manual, Lighthouse, SUS, & terminal otomasi
└── README.md                    # Laporan akhir pengujian lengkap (dokumen utama)
```

### Panduan Penempatan File per Folder
1. **`01-rencana-pengujian/`**: Berisi bukti email permohonan dan persetujuan izin pengujian dari pemilik RizzFlow (`bukti-izin-owner-01.jpeg`, `bukti-izin-owner-02.jpeg`).
2. **`02-test-cases/`**: Berisi file Excel master **`Lampiran_2_Daftar_Test_Case_RizzFlow.xlsx`** (3 *sheet*: Ringkasan Pengujian, Daftar 81 Test Case, dan Definisi Keyword ISO 29119-5).
3. **`03-whitebox-automation/`**: Berisi konfigurasi pengujian otomatis (`package.json`, `playwright.config.ts`), skrip E2E Playwright (`tests/rizzflow-e2e.spec.ts`, `tests/rizzflow-tambahan.spec.ts`), dan *unit test* white-box Vitest (`unit-tests/whitebox-promo.test.ts`).
4. **`04-laporan-defect/`**: Berisi instrumen serta catatan wawancara validasi QA profesional (`Wawancara_Validasi_QA_RizzFlow-v2.docx`) dan catatan log temuan.
5. **`05-bukti-pengujian/`**: Berisi seluruh tangkapan layar eksekusi (*evidence* manual `NAV-01` s.d. `FLT-02`, *report* JSON Lighthouse `PRF-01` & `PRF-02`, rekap *usability* `USB-01` s.d. `USB-07`, serta bukti terminal Playwright/Vitest).

---

## 🎯 3. Ruang Lingkup & Pemetaan Modul Perkuliahan (Pertemuan 1–16)

Pengujian dilakukan menggunakan pendekatan *hybrid* pada perangkat **MSI GF63 Thin 11UC** (Intel Core i7-11800H, RAM 16 GB, Windows 11) dan **Poco X6 Pro** (Android 16) yang mencakup seluruh materi Pertemuan 1 hingga 16:

| Tahap Pengujian | Relevansi Modul (Pertemuan 1–16) | Metode & Teknik yang Diterapkan | Artefak / Bukti pada RizzFlow |
| :--- | :--- | :--- | :--- |
| **Tahap 1: Perencanaan & Standar Uji** | Pertemuan 1–4 & 13–14 (*Konsep Dasar QA, Test Plan, ISO/IEC/IEEE 29119-5*) | Penyusunan *Test Plan*, persetujuan izin tertulis pemilik, & arsitektur *Keyword-Driven* (*simple* & *composite keyword*). | `01-rencana-pengujian/` & `02-test-cases/` |
| **Tahap 2: Analisis Statis & White-Box Unit** | Pertemuan 5–7 (*White-Box Testing, Basis Path, Cyclomatic Complexity V(G), Coverage*) | Pemeriksaan tipe (`tsc`), lint & kompleksitas siklomatik (`ESLint`), serta *unit test* logika promo & tanda tangan HMAC. | `03-whitebox-automation/unit-tests/` (*Statement* 95,4%, *Function* 100%) |
| **Tahap 3: Pengujian Integrasi & Kontrak API** | Pertemuan 8 (*Integration Testing & Pengujian API*) | Pengujian integrasi alur *checkout*, validasi promo, cek pesanan, *webhook* DOKU, & kontrak skema Supabase. | Suite Vitest 95 *test case* (mengungkap 12 temuan `W-01`–`W-12`) |
| **Tahap 4: Pengujian Sistem Fungsional** | Pertemuan 9–10 (*Black-Box: Equivalence Partitioning, BVA, Decision Table, Error Guessing*) | Eksekusi 47 *test case* fungsional *end-to-end* (Navigasi, Pencarian, Katalog, Detail Produk, Keranjang/Checkout, Layanan Kustom, Kuantitas, Filter, & Promo). | `NAV-01` s.d. `SVC-06` & `PRM-01` s.d. `FLT-02` (41 Pass, 2 Fail, 4 Blocked) |
| **Tahap 5: Pengujian Non-Fungsional & Usability** | Pertemuan 11–12 (*Usability/SUS, Performance, Compatibility, Security, Accessibility*) | Audit Lighthouse & Slow 4G, uji lintas browser/perangkat, inspeksi HTTPS/XSS, audit kontras WCAG, & survei SUS 11 responden. | `USB-01` s.d. `ACC-05` (Skor SUS **80,0**; 26 Pass, 7 Fail, 1 Blocked) |
| **Tahap 6: Otomasi Regresi E2E & Validasi QA** | Pertemuan 15–16 (*Test Automation Framework & QA Review*) | Otomasi regresi E2E UI pada situs *live* dengan Playwright dan validasi dokumen oleh praktisi QA profesional. | `AUTO-01` s.d. `AUTO-03` (Playwright 3/3 Pass) & `04-laporan-defect/` |

---

## 📊 4. Ringkasan Eksekutif Hasil Pengujian

| Kategori Pengujian | Metode / Alat | Total | Pass | Fail | Blocked | Tingkat Kelulusan |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Functional / Black-Box Utama** (`NAV`–`SVC`) | Keyword-Driven, EP, BVA, Decision Table | 41 | 38 | 2 | 1 | 95,0% *(dari 40 dieksekusi)* |
| **Tambahan Masukan QA** (`PRM`, `QTY`, `FLT`) | BVA & Decision Table (Situs *Live*) | 6 | 3 | 0 | 3 | 100,0% *(dari 3 dieksekusi)* |
| **Usability & Quality-in-Use** (`USB`) | Task-Based Testing & SUS (11 Responden) | 7 | 7 | 0 | 0 | **100,0%** *(Skor SUS: **80,0**)* |
| **Compatibility** (`CMP`) | Cross-Browser & Cross-Device | 6 | 6 | 0 | 0 | **100,0%** |
| **Performance Efficiency** (`PRF`) | Google Lighthouse 13.5 & DevTools Slow 4G | 5 | 4 | 1 | 0 | 80,0% |
| **Reliability, Security, Content, Accessibility** | Error Guessing, Inspeksi Non-Intrusif, `axe-core` | 16 | 9 | 6 | 1 | 60,0% *(dari 15 dieksekusi)* |
| **Subtotal Black-Box & Non-Fungsional** | **ISO/IEC/IEEE 29119-5:2024** | **81** | **67** | **9** | **5** | **88,2%** *(dari 76 dieksekusi)* |
| **White-Box (Unit & API Test)** | **Vitest** (Simulasi Server & Kontrak Skema) | **95** | **81** | **14** | **0** | **85,3%** *(14 Fail = Temuan Kode)* |
| **Otomasi Regresi E2E UI** (`AUTO-01`–`03`) | **Playwright** (Situs *Live*) | **3** | **3** | **0** | **0** | **100,0%** |

> **Catatan Status `Blocked` (5 Test Case):** `CRT-10` (pembayaran QRIS sungguhan & pengiriman email), `SEC-04` (cek kode pesanan kustom aktif), serta `PRM-01` s.d. `PRM-03` (kode promo aktif) tidak dijalankan demi mematuhi batasan izin tertulis dari pemilik RizzFlow.

---

## 🧪 5. Rekapitulasi 81 Test Case Black-Box & Non-Fungsional

*(Matriks lengkap langkah berbasis keyword, data uji, dan hasil aktual tersedia pada file `02-test-cases/Lampiran_2_Daftar_Test_Case_RizzFlow.xlsx`)*

| Sub-Bab & Modul Uji | Rentang ID | Total | Pass | Fail | Blocked | Ringkasan Hasil Eksekusi |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **4.2.1 Navigasi** | `NAV-01` – `NAV-09` | 9 | 9 | 0 | 0 | Seluruh tab header, bilah bawah HP, logo, tombol CTA, dan navigasi *Back/Forward* berjalan normal. |
| **4.2.2 Pencarian** | `SRC-01` – `SRC-07` | 7 | 7 | 0 | 0 | Pencarian kata kunci ada/tidak ada, input kosong, 1–100 karakter, *case-insensitive*, dan karakter spesial lulus. |
| **4.2.3 Katalog & Kategori** | `CAT-01` – `CAT-05` | 5 | 5 | 0 | 0 | Filter kategori (E-Book, Template Excel, Template PPT kosong), urutan harga Termurah, & lencana tampil akurat. |
| **4.2.4 Detail Produk** | `PRD-01` – `PRD-04` | 4 | 3 | 1 | 0 | `PRD-04` **Fail**: Menutup modal detail produk via tombol `X` mengembalikan tab ke *Home* & menghapus filter. |
| **4.2.5 Keranjang & Checkout** | `CRT-01` – `CRT-10` | 10 | 8 | 1 | 1 | `CRT-07` **Fail**: Email 250 karakter diterima tanpa batas panjang; `CRT-10` **Blocked** (izin pembayaran nyata). |
| **4.2.6 Layanan Kustom** | `SVC-01` – `SVC-06` | 6 | 6 | 0 | 0 | 4 layanan kustom tampil, cek kode pesanan (`ABC-0000`, kosong, spasi tepi) & validasi form berjalan baik. |
| **4.2.7 Usability & SUS** | `USB-01` – `USB-07` | 7 | 7 | 0 | 0 | 11 dari 11 responden menyelesaikan tugas 100% dalam < 50 detik; rata-rata skor **SUS = 80,0** (*Good/Acceptable*). |
| **4.2.8 Compatibility** | `CMP-01` – `CMP-06` | 6 | 6 | 0 | 0 | Responsif tanpa *horizontal scroll* di Chrome 157, Edge 158, Firefox 160 Android (Poco X6 Pro), & zoom 200%. |
| **4.2.9 Performance** | `PRF-01` – `PRF-05` | 5 | 4 | 1 | 0 | `PRF-01` **Fail**: Median LCP Mobile 2,9 detik (> 2,5 s) akibat gambar thumbnail PNG berukuran 1,9 MB. |
| **4.2.10 Reliabilitas** | `REL-01` – `REL-02` | 2 | 1 | 1 | 0 | `REL-01` **Fail**: Halaman 404 menampilkan bawaan bahasa Inggris tanpa tautan kembali ke beranda. |
| **4.2.11 Keamanan Dasar** | `SEC-01` – `SEC-04` | 4 | 3 | 0 | 1 | Redirect HTTP→HTTPS aktif, bebas *mixed content*, sanitasi XSS `<>"'&` aman; `SEC-04` **Blocked** (izin). |
| **4.2.12 Konten & Teknis** | `CNT-01` – `CNT-05` | 5 | 2 | 3 | 0 | `CNT-01` & `CNT-02` **Fail** (`og:url`/`og:image` menunjuk `localhost:3000`); `CNT-04` **Fail** (tidak ada halaman T&C/Privasi). |
| **4.2.13 Aksesibilitas** | `ACC-01` – `ACC-05` | 5 | 3 | 2 | 0 | `ACC-04` **Fail** (7–8 elemen kontras rendah < 4,5:1); `ACC-05` **Fail** (tombol `+` 36×36 px di bawah usulan 44 px). |
| **4.2.14 Masukan QA** | `PRM-01` – `FLT-02` | 6 | 3 | 0 | 3 | `QTY-01`, `FLT-01`, `FLT-02` lulus 100% di situs *live*; `PRM-01` s.d. `PRM-03` **Blocked** (izin promo aktif). |

---

## ⚙️ 6. Pengujian White-Box, Analisis Statis, & Otomasi (`03-whitebox-automation/`)

Pengujian *white-box* dijalankan pada logika sisi server RizzFlow menggunakan **Vitest** (*Statement Coverage* **95,4%**, *Branch Coverage* **87,66%**, *Function Coverage* **100%**), disertai pemeriksaan statis (`tsc`, `ESLint`, `npm audit`) dan otomasi E2E **Playwright** pada situs *live*:

* **Suite White-Box (95 Test):** `doku.test.ts` (24 test), `checkout.test.ts` (42 test), `promo-orders.test.ts` (13 test), dan `webhook.test.ts` (16 test) menghasilkan **81 Passed** dan **14 Failed** (14 *test* yang gagal merupakan pembuktian otomatis atas temuan cacat logika kode `W-01` s.d. `W-12`).
* **Analisis Statis:** `tsc --noEmit` (0 error), `ESLint` (6 error `react-hooks/set-state-in-effect`, 13 peringatan `no-img-element`, serta 32 fungsi melebihi ambang *Cyclomatic Complexity* > 10 dengan nilai tertinggi 52 pada `api/messages/route.ts`), dan `npm audit` (1 kerentanan moderat pada Next 16.4.4).
* **Otomasi E2E UI (Playwright):** 3 skenario regresi (`AUTO-01` muat beranda, `AUTO-02` sanitasi XSS pencarian, `AUTO-03` proteksi akses `/checkout` kosong) dieksekusi pada situs *live* dengan hasil **3/3 Passed**.

### Cara Menjalankan Skrip Otomasi

```bash
# 1. Masuk ke folder otomasi pengujian
cd 03-whitebox-automation

# 2. Instal dependensi
npm install

# 3. Jalankan Unit Test White-Box (Vitest)
npx vitest run unit-tests/

# 4. Jalankan Automated E2E UI Test pada situs live (Playwright)
npx playwright test
```

---

## 🚨 7. Katalog Lengkap 25 Temuan Defect

### A. Insiden Black-Box & Non-Fungsional (10 Temuan)

| ID | Test Case | Ringkasan Temuan | Severity | Status | Bukti (`05-bukti-pengujian/`) |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **INC-01** | `PRD-04` | Menutup modal detail produk dengan tombol `X` dari tab Katalog mengembalikan pengguna ke *Home* dan menghapus filter kategori aktif. | Sedang | Open | `PRD-04.png` |
| **INC-02** | `CNT-01` | Pada situs *live*, tag metadata `og:url`, `og:image`, dan `twitter:image` masih menunjuk ke `http://localhost:3000`. | Sedang | Open | `CNT-01_web_fetch.txt` |
| **INC-03** | `ACC-04` | Ditemukan 7 elemen (HP) dan 8 elemen (desktop) dengan rasio kontras warna rendah (3,2–3,58:1; teks `#6b9071` di bawah batas WCAG AA 4,5:1). | Sedang | Open | `ACC-04.png` |
| **INC-04** | `CNT-04` | Tidak tersedia halaman Syarat & Ketentuan maupun Kebijakan Privasi meskipun situs mengumpulkan email pembeli. | Sedang | Open | `CNT-04.png` |
| **INC-05** | `CRT-07` | Input email sepanjang 250 karakter diterima di form *checkout* dan berhasil membuat pesanan tanpa validasi batas maksimal karakter. | Rendah | Open | `CRT-07.png` |
| **INC-06** | `REL-01` | Akses ke rute tidak valid menampilkan halaman 404 bawaan berbahasa Inggris tanpa tombol/tautan kembali ke beranda. | Rendah | Open | `REL-01.png` |
| **INC-07** | `ACC-05` | Ukuran area sentuh tombol ikon tambah keranjang `(+)` sebesar 36×36 px berada di bawah usulan target sentuh mobile 44×44 px. | Rendah | Open | `ACC-05.png` |
| **INC-08** | `CNT-02` | Teks tag `<title>` tidak konsisten dengan `og:title` dan `twitter:title` pada halaman produksi. | Rendah | Open | `CNT-01_web_fetch.txt` |
| **INC-09** | `PRF-01` | Median *Largest Contentful Paint* (LCP) beranda Mobile mencapai **2,9 detik** (melebihi ambang ideal 2,5 detik) akibat *element render delay*. | Sedang | Open | `PRF-01_run1..3.json` |
| **INC-10** | `PRF-01` | Aset gambar thumbnail produk berformat PNG berukuran ~1,9 MB membuat total transfer halaman mencapai 2,5 MB. | Sedang | Open | `PRF-03_network-size.jpg` |

### B. Temuan White-Box Sisi Server (12 Temuan)

| ID | Ringkasan Temuan Kode & API (Lingkungan Simulasi) | Severity | Status | Saran Perbaikan |
| :--- | :--- | :---: | :---: | :--- |
| **W-01** | Endpoint cek pesanan tanpa autentikasi mengembalikan seluruh data pesanan termasuk email pembeli & `qris_string`; pola nomor invoice mudah ditebak. | **Kritis** | Open | Kembalikan data minimal & gunakan token acak panjang pada tautan status. |
| **W-02** | Nama kolom `order_items` di kode (`price_at_purchase`) tidak cocok dengan skema (`unit_price NOT NULL`) dan galat *insert* tidak diperiksa. | **Tinggi** | Open | Samakan nama kolom dengan `schema.sql` dan tangani *error* database. |
| **W-03** | Handler *webhook* pembayaran DOKU tidak memvalidasi kesesuaian nominal pembayaran dengan `final_amount` pesanan. | **Tinggi** | Open | Tolak *webhook* apabila nominal yang dibayarkan berbeda dengan tagihan. |
| **W-04** | Pembaruan status pembayaran tidak atomik; dua request *webhook* bersamaan berpotensi mengirim email file produk dua kali. | Sedang | Open | Gunakan *conditional update* berbasis status `PENDING`. |
| **W-05** | Mode simulasi menerima header `SIMULATION_BYPASS` tanpa verifikasi jika variabel lingkungan simulasi aktif di produksi. | **Kritis** *(bila env salah)* | Open | Pastikan mode simulasi nonaktif dan blokir header *bypass* di produksi. |
| **W-06** | Nilai `max_discount_amount = 0` diartikan tanpa batas di *checkout*, tetapi menghasilkan diskon 0 pada pratinjau; fungsi pembulatan berbeda (`round` vs `floor`). | Sedang | Open | Gunakan satu fungsi perhitungan bersama antara pratinjau dan *checkout*. |
| **W-07** | Kuantitas barang pada payload API menerima bilangan pecahan dan angka tanpa batas atas meskipun tipe kolom database `INTEGER`. | Sedang | Open | Validasi input kuantitas sebagai bilangan bulat positif dengan batas wajar. |
| **W-08** | Pesan galat internal server diteruskan langsung ke respons pembeli pada status HTTP 500. | Sedang | Open | Tampilkan pesan kesalahan umum ke pengguna dan simpan detail di log server. |
| **W-09** | Respons DOKU tanpa `qr_string` diganti dengan string QR buatan dan pesanan tetap dibuat di database. | Sedang | Open | Batalkan pembuatan pesanan dan lempar galat jika `qr_string` kosong. |
| **W-10** | Kode promo yang berhasil digunakan pembeli tidak tersimpan ke kolom `promo_code_used`. | Rendah | Open | Simpan kode promo ke kolom `promo_code_used` saat proses *insert*. |
| **W-11** | Endpoint validasi promo menerima nilai `subtotal` non-numerik sehingga menghasilkan kalkulasi `NaN`. | Rendah | Open | Tambahkan validasi `Number.isFinite()` pada parameter `subtotal`. |
| **W-12** | Validasi panjang maksimal alamat email pembeli (254 karakter) belum diterapkan pada API *checkout*. | Rendah | Open | Batasi panjang maksimal input email sesuai standar RFC (maks. 254 karakter). |

### C. Temuan Analisis Statis Kode Sumber (3 Temuan)

| ID | Alat Analisis | Ringkasan Temuan | Severity | Status |
| :--- | :--- | :--- | :---: | :---: |
| **S-01** | `ESLint` | Ditemukan 6 error `react-hooks/set-state-in-effect` pada 6 komponen React serta 13 peringatan penggunaan tag `<img>` standar alih-alih `next/image`. | Rendah-Sedang | Open |
| **S-02** | `npm audit` | Terdapat 1 kerentanan tingkat moderat pada paket `next` versi `16.4.4` terkait fungsi *cache* (disarankan pembaruan ke `16.4.6`). | Rendah | Open |
| **S-03** | `ESLint (complexity)` | 32 fungsi memiliki *Cyclomatic Complexity* > 10 (tertinggi pada `api/messages/route.ts` dengan kompleksitas 52) yang meningkatkan risiko regresi. | Sedang | Open |

---

## 🎙️ 8. Validasi Praktisi QA & Kesimpulan Akhir

### Tinjauan Praktisi QA (`04-laporan-defect/Wawancara_Validasi_QA_RizzFlow-v2.docx`)
* **Narasumber:** Maulida Rizki (QA Engineer — 3 Tahun Pengalaman di Industri Perbankan, wawancara 25 November 2026).
* **Hasil Validasi & Tindak Lanjut:**
  1. Seluruh kombinasi pengujian (*black-box* berbasis keyword ISO 29119-5, *white-box* Vitest, *usability* SUS, *performance*, dan otomasi Playwright) dinilai sudah selaras dengan praktik penjaminan mutu aplikasi web skala kecil-menengah di industri.
  2. Berdasarkan masukan narasumber pada 27 November 2026, tim menyesuaikan klasifikasi *severity* temuan kritis (`W-01` dan `W-05` dinaikkan menjadi **Kritis**; `W-02` dan `W-03` menjadi **Tinggi**) serta menambahkan 6 *test case* baru pada Sub-bab 4.2.14 (`PRM-01` s.d. `PRM-03`, `QTY-01`, `FLT-01`, dan `FLT-02`).

### Kesimpulan Kelayakan Sistem
Secara fungsionalitas inti dan daya guna (*usability*), **Website RizzFlow** berjalan baik dan mudah digunakan oleh pembeli (tingkat kelulusan *black-box* **88,2%** dari 76 skenario dieksekusi, skor SUS **80,0** dari 11 responden, dan kompatibilitas **100%** lintas browser/perangkat). Namun, sebelum aplikasi melayani volume transaksi yang lebih besar, pemilik sistem **sangat disarankan** untuk memprioritaskan perbaikan:
1. **Keamanan & Integritas Data Server (`W-01`, `W-02`, `W-03`, `W-05`):** Pembatasan data publik pada endpoint cek pesanan, penyelarasan skema kolom `order_items`, verifikasi nominal *webhook*, serta penonaktifan *bypass* simulasi di lingkungan produksi.
2. **Performa & Aksesibilitas (`INC-09`, `INC-10`, `INC-03`):** Kompresi aset gambar thumbnail PNG (1,9 MB) ke format WebP untuk menurunkan LCP di bawah 2,5 detik serta peningkatan rasio kontras teks hijau muda agar memenuhi standar WCAG AA.
3. **Navigasi & Kelengkapan Informasi (`INC-01`, `INC-02`, `INC-04`):** Perbaikan *state* penutupan modal detail produk agar tidak menghapus filter katalog, pembaruan metadata `og:url` dari `localhost` ke domain produksi, serta penambahan halaman Syarat & Ketentuan dan Kebijakan Privasi.

---

## 📚 9. Referensi

1. **ISO/IEC/IEEE 29119-5:2024**, *Software and systems engineering — Software testing — Part 5: Keyword-driven testing*, Dec. 2024.
2. S. Gidvarowart *et al.*, “Automated API testing with Karate framework: A case study of an online assessment web application,” in *Proc. 20th Int. Joint Conf. Comput. Sci. Softw. Eng. (JCSSE)*, 2023, pp. 309–314, doi: `10.1109/JCSSE58229.2023.10202050`.
3. M. Leotta, B. García, F. Ricca, and J. Whitehead, “Challenges of end-to-end testing with Selenium WebDriver and how to face them: A survey,” in *Proc. IEEE 16th Int. Conf. Softw. Testing, Verification Validation (ICST)*, 2023, pp. 339–350, doi: `10.1109/ICST57152.2023.00039`.
4. N. Wehner *et al.*, “A vital improvement? Relating Google’s Core Web Vitals to actual web QoE,” in *Proc. 14th Int. Conf. Quality of Multimedia Experience (QoMEX)*, 2022, pp. 1–6, doi: `10.1109/QoMEX55416.2022.9900881`.
5. R. Ismailova and Y. Inal, “Comparison of online accessibility evaluation tools: An analysis of tool effectiveness,” *IEEE Access*, vol. 10, pp. 58233–58239, 2022, doi: `10.1109/ACCESS.2022.3179375`.
