# 🐛 Laporan Bug & Temuan Pengujian (Bug Report) — Website RizzFlow

**Objek Uji:** Website RizzFlow (`https://rizzflow-theta.vercel.app/`)  
**Standar Acuan:** ISO/IEC/IEEE 29119-5:2024  
**Versi Laporan:** 1.5 (27 November 2026)  
**Tim Penguji (Kelompok 3 — Teknik Informatika, Universitas Pamulang):**
* Azaria Bunga (`231011400808`)
* Bagus Saputro (`231011402742`)
* Dhemes Ichsan Ramadhani (`231011401260`)
* Dika Chafizh Hizbulloh (`231011400064`)

**Repositori:** [https://github.com/dikachafidh/Kelompok-3-Testing-QA](https://github.com/dikachafidh/Kelompok-3-Testing-QA)

---

## 📊 Ringkasan Temuan Keseluruhan (25 Temuan)

| Kategori Pengujian | Rentang ID | Jumlah | Sebaran Severity | Status |
| :--- | :--- | :---: | :--- | :---: |
| **Insiden Black-Box & Non-Fungsional** | `INC-01` – `INC-10` | 10 | Sedang (6), Rendah (4) | Open |
| **Temuan White-Box (Unit & API Test)** | `W-01` – `W-12` | 12 | Kritis (2), Tinggi (2), Sedang (5), Rendah (3) | Open |
| **Temuan Analisis Statis Kode** | `S-01` – `S-03` | 3 | Sedang (1), Rendah–Sedang (1), Rendah (1) | Open |
| **Total Temuan** | **25 Temuan** | **25** | **Kritis (2), Tinggi (2), Sedang (12), Rendah (9)** | **Open** |

> **Catatan Lingkungan & Etika:** Seluruh pengujian langsung pada situs *live* dilakukan berdasarkan izin tertulis dari pemilik RizzFlow (Faris Maulana, 22 November 2026). Pengujian *white-box* dan analisis statis dieksekusi pada lingkungan simulasi lokal tanpa menggunakan situs produksi.

---

## 1. Daftar Insiden Black-Box & Non-Fungsional (`INC-01` s.d. `INC-10`)

### `INC-01` — Tutup Detail Produk Mengembalikan Pengguna ke Home dan Menghapus Filter
* **Test Case Terkait:** `PRD-04`
* **Modul:** Navigasi / Detail Produk
* **Severity:** Sedang
* **Status:** Open
* **Deskripsi Masalah:** Menutup modal/panel detail produk menggunakan tombol `X` saat berada di tab **Katalog** mengembalikan pengguna ke halaman **Home** dan mereset filter kategori yang sedang aktif.
* **Langkah Reproduksi:**
  1. Buka tab **Katalog** di RizzFlow.
  2. Pilih salah satu filter kategori (misalnya **E-Book**).
  3. Klik salah satu kartu produk untuk membuka modal detail produk.
  4. Klik tombol tutup (`X`) pada modal detail produk.
* **Hasil yang Diharapkan:** Modal detail tertutup dan pengguna tetap berada di tab **Katalog** dengan posisi *scroll* dan filter kategori yang sama.
* **Hasil Aktual:** Modal tertutup, tetapi halaman berpindah ke tab **Home** dan filter kategori hilang.
* **Analisis Penyebab (Dugaan):** Fungsi `closeOverlayCleanly` memanggil `history.back()`, lalu *handler* `popstate` mendeteksi overlay sudah tertutup dan mengatur ulang tab aktif kembali ke `Home`.
* **Bukti:** `03-evidence-pengujian/evidence/PRD-04.png`

---

### `INC-02` — Metadata Berbagi Sosial Menunjuk ke `localhost:3000` pada Situs Live
* **Test Case Terkait:** `CNT-01`
* **Modul:** Konten & Teknis (SEO / Open Graph)
* **Severity:** Sedang
* **Status:** Open
* **Deskripsi Masalah:** Tag metadata `og:url`, `og:image`, dan `twitter:image` pada situs produksi masih mengarah ke alamat pengembangan lokal (`http://localhost:3000`).
* **Langkah Reproduksi:**
  1. Buka situs *live* `https://rizzflow-theta.vercel.app/`.
  2. Periksa kode sumber halaman (*View Page Source*) atau inspeksi elemen `<head>`.
  3. Cari tag meta `og:url`, `og:image`, dan `twitter:image`.
* **Hasil yang Diharapkan:** Seluruh metadata URL dan gambar menunjuk ke domain produksi (`https://rizzflow-theta.vercel.app/`).
* **Hasil Aktual:** `og:url` bernilai `http://localhost:3000`, sedangkan `og:image` dan `twitter:image` bernilai `http://localhost:3000/logo.jpg`, sehingga pratinjau tautan gagal memuat gambar saat dibagikan.
* **Saran Perbaikan:** Perbarui variabel lingkungan `NEXT_PUBLIC_APP_URL` atau konfigurasi `metadataBase` ke domain produksi.
* **Bukti:** `03-evidence-pengujian/evidence/CNT-01_web_fetch.txt`

---

### `INC-03` — Rasio Kontras Teks Rendah di Bawah Standar WCAG AA
* **Test Case Terkait:** `ACC-04`
* **Modul:** Aksesibilitas
* **Severity:** Sedang
* **Status:** Open
* **Deskripsi Masalah:** Ditemukan elemen teks berwarna hijau muda (`#6b9071`) di atas latar terang dengan rasio kontras hanya `3,2:1` hingga `3,58:1` (di bawah ambang batas minimal WCAG 2.1 AA sebesar `4,5:1` untuk teks normal).
* **Langkah Reproduksi:**
  1. Buka halaman **Beranda** dan **Katalog** pada tampilan *mobile* maupun *desktop*.
  2. Jalankan audit aksesibilitas menggunakan `axe-core` atau Chrome DevTools.
* **Hasil yang Diharapkan:** Seluruh teks normal memiliki rasio kontras minimal `4,5:1`.
* **Hasil Aktual:** Audit `axe-core` mencatat 7 elemen pelanggaran (`serious`) pada tampilan HP dan 7–8 elemen pada tampilan *desktop* di beranda dan katalog.
* **Saran Perbaikan:** Gelapkan warna teks hijau sekunder agar mencapai rasio kontras $\ge 4,5:1$.
* **Bukti:** `03-evidence-pengujian/evidence/ACC-04.png`, `ACC-04_axe.txt`

---

### `INC-04` — Belum Tersedia Halaman Syarat & Ketentuan Maupun Kebijakan Privasi
* **Test Case Terkait:** `CNT-04`
* **Modul:** Konten & Kepatuhan
* **Severity:** Sedang
* **Status:** Open
* **Deskripsi Masalah:** Situs mengumpulkan alamat email pembeli saat *checkout* dan menampilkan klaim *"Garansi 100%"* serta *"Layanan Resmi"*, namun belum menyediakan dokumen **Syarat & Ketentuan** maupun **Kebijakan Privasi**.
* **Langkah Reproduksi:**
  1. Periksa bagian **Beranda**, **Footer**, halaman **Layanan**, dan alur **Checkout**.
  2. Cari tautan atau halaman yang memuat Syarat & Ketentuan serta Kebijakan Privasi.
* **Hasil yang Diharapkan:** Tersedia tautan dan halaman khusus untuk Syarat & Ketentuan serta Kebijakan Privasi yang menjelaskan pengelolaan data email dan ketentuan garansi.
* **Hasil Aktual:** Penjelasan garansi tersedia di tab detail produk dan FAQ, tetapi tautan/halaman Syarat & Ketentuan serta Kebijakan Privasi tidak ditemukan (`false`).
* **Bukti:** `03-evidence-pengujian/evidence/CNT-04.png`

---

### `INC-05` — Input Email 250 Karakter Diterima Tanpa Batas Panjang di Checkout
* **Test Case Terkait:** `CRT-07`
* **Modul:** Keranjang & Checkout
* **Severity:** Rendah
* **Status:** Open
* **Deskripsi Masalah:** Kolom input alamat email pada halaman *checkout* menerima masukan sepanjang 250 karakter dan tetap membuat pesanan baru tanpa validasi batas panjang maksimum.
* **Langkah Reproduksi:**
  1. Tambahkan produk ke keranjang dan buka halaman **Checkout**.
  2. Masukkan alamat email valid sepanjang 250 karakter pada kolom email.
  3. Klik tombol **Bayar**.
* **Hasil yang Diharapkan:** Input yang melebihi batas panjang wajar (standar RFC 5321 maksimal 254 karakter) ditolak dengan pesan validasi yang jelas.
* **Hasil Aktual:** Input 250 karakter diterima di sisi UI maupun server dan menghasilkan 1 pesanan baru.
* **Bukti:** `03-evidence-pengujian/evidence/CRT-07.png`

---

### `INC-06` — Halaman 404 Bawaan Bahasa Inggris Tanpa Tautan Kembali ke Beranda
* **Test Case Terkait:** `REL-01`
* **Modul:** Reliabilitas / Penanganan Galat
* **Severity:** Rendah
* **Status:** Open
* **Deskripsi Masalah:** Mengakses rute URL yang tidak terdaftar menampilkan halaman *error* 404 bawaan Next.js dalam bahasa Inggris tanpa tombol navigasi kembali ke beranda.
* **Langkah Reproduksi:**
  1. Buka URL acak yang tidak ada, misalnya `https://rizzflow-theta.vercel.app/halaman-tidak-ada`.
* **Hasil yang Diharapkan:** Menampilkan halaman 404 kustom berbahasa Indonesia yang ramah pengguna beserta tombol kembali ke beranda.
* **Hasil Aktual:** Menampilkan teks standar `"404 | This page could not be found."` tanpa tautan kembali (`false`).
* **Bukti:** `03-evidence-pengujian/evidence/REL-01.png`

---

### `INC-07` — Ukuran Target Sentuh Tombol Ikon (+) di Bawah Usulan 44x44 px
* **Test Case Terkait:** `ACC-05`
* **Modul:** Aksesibilitas / Antarmuka Mobile
* **Severity:** Rendah
* **Status:** Open
* **Deskripsi Masalah:** Tiga tombol ikon tambah ke keranjang (`+`) pada kartu produk di beranda memiliki dimensi `36x36 px`, di bawah usulan ukuran target sentuh nyaman sebesar `44x44 px` (meskipun masih di atas batas minimum WCAG 2.2 sebesar `24x24 px`).
* **Langkah Reproduksi:**
  1. Buka halaman beranda pada viewport perangkat seluler.
  2. Inspeksi dimensi elemen tombol `+` pada masing-masing kartu produk.
* **Hasil yang Diharapkan:** Area target sentuh tombol minimal `44x44 px` untuk kenyamanan interaksi layar sentuh.
* **Hasil Aktual:** Seluruh 3 tombol ikon berukuran `36x36 px` (atribut `aria-label` sudah tersedia).
* **Bukti:** `03-evidence-pengujian/evidence/ACC-05.png`

---

### `INC-08` — Ketidakkonsistenan Teks `<title>` dengan `og:title` dan `twitter:title`
* **Test Case Terkait:** `CNT-02`
* **Modul:** Konten & Teknis (SEO)
* **Severity:** Rendah
* **Status:** Open
* **Deskripsi Masalah:** Judul tab browser (`<title>`) pada situs *live* berbeda redaksinya dengan judul pada metadata berbagi media sosial (`og:title` dan `twitter:title`).
* **Langkah Reproduksi:**
  1. Periksa tag `<title>`, `og:title`, dan `twitter:title` pada kode sumber beranda situs *live*.
* **Hasil yang Diharapkan:** Judul halaman dan judul metadata berbagi konsisten.
* **Hasil Aktual:** `<title>` berisi `'RizzFlow — Toko Produk Digital, E-Book, Template & Layanan Kustom'`, sedangkan `og:title` dan `twitter:title` berisi `'RizzFlow — Toko Produk Digital & Layanan Kustom Instan'`.
* **Bukti:** `03-evidence-pengujian/evidence/CNT-01_web_fetch.txt`

---

### `INC-09` — Nilai Largest Contentful Paint (LCP) Beranda Mobile Melebihi Ambang 2,5 Detik
* **Test Case Terkait:** `PRF-01`
* **Modul:** Performa (Core Web Vitals)
* **Severity:** Sedang
* **Status:** Open
* **Deskripsi Masalah:** Pengukuran Google Lighthouse 13.5.0 mode Mobile (4 percobaan) menghasilkan median LCP sebesar **2,9 detik**, melewati batas ideal *Core Web Vitals* ($\le 2,5\text{ detik}$).
* **Langkah Reproduksi:**
  1. Buka situs *live* di Google Chrome Incognito tanpa ekstensi.
  2. Jalankan Lighthouse audit kategori *Performance* mode *Mobile* sebanyak 4 kali.
* **Hasil yang Diharapkan:** Median LCP $\le 2,5\text{ detik}$ dan CLS $\le 0,1$.
* **Hasil Aktual:** LCP tercatat `2,9 s / 2,9 s / 1,1 s / 2,9 s` (median `2,9 s`; gagal di 3 dari 4 percobaan). Hambatan utama berasal dari *element render delay* (`1,4–2,2 s`), bukan respons server (TTFB `39–94 ms`). Nilai CLS tetap `0`.
* **Bukti:** `03-evidence-pengujian/lighthouse/` (berkas JSON) & `Gambar 8.3.23`

---

### `INC-10` — Ukuran File Gambar Thumbnail PNG Terlalu Besar (~1,9 MB)
* **Test Case Terkait:** `PRF-01` (serta terkonfirmasi pada `PRF-03` & `PRF-04`)
* **Modul:** Performa / Optimasi Aset
* **Severity:** Sedang
* **Status:** Open
* **Deskripsi Masalah:** Salah satu aset gambar thumbnail produk menggunakan format PNG tidak terkompresi (`thumb_1793719784505_ChatGP...png`) berukuran **1.905 kB (~1,9 MB)**, menyebabkan total transfer halaman awal mencapai `2,4–2,5 MB` dan memperlambat waktu muat penuh pada jaringan *Slow 4G* hingga `27,89 detik`.
* **Langkah Reproduksi:**
  1. Buka Chrome DevTools tab **Network** dengan opsi *Disable cache* aktif.
  2. Muat ulang halaman beranda dan urutkan permintaan berdasarkan ukuran (*Size*).
* **Hasil yang Diharapkan:** Ukuran aset gambar teroptimasi (WebP/JPEG) sehingga total transfer halaman $\le 2\text{ MB}$.
* **Hasil Aktual:** File PNG tunggal memakan ~1,9 MB; Lighthouse memperkirakan penghematan sebesar `1.926 KiB` jika gambar dioptimalkan.
* **Bukti:** `03-evidence-pengujian/lighthouse/PRF-01_run3.json`, `PRF-03_network-size.jpg`, `PRF-04_slow-4g.jpg`

---

## 2. Daftar Temuan White-Box Sisi Server (`W-01` s.d. `W-12`)

Temuan berikut ditemukan melalui pengujian *unit* dan integrasi API menggunakan **Vitest** pada lingkungan simulasi lokal (81 *test* lulus, 14 gagal dari total 95 *test*; *statement coverage* `95,4%`, *function coverage* `100%`).

| ID | Lokasi / Berkas | Deskripsi Temuan | Bukti Pengujian (`Vitest`) | Severity | Saran Perbaikan |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **`W-01`** | `src/app/api/orders/[invoice]/route.ts` | *Endpoint* cek pesanan publik tanpa autentikasi mengembalikan seluruh detail pesanan termasuk **email pembeli** dan **`qris_string`**. Selain itu, nomor invoice menggunakan pola waktu yang mudah ditebak (risiko enumerasi IDOR). | `promo-orders.test.ts`: respons publik tidak boleh memuat email | **Kritis** | Batasi respons publik hanya pada status pembayaran; gunakan token acak panjang (UUID/hash) pada tautan status pesanan. |
| **`W-02`** | `src/app/api/checkout/route.ts` | Nama kolom saat *insert* ke tabel `order_items` tidak sesuai dengan `schema.sql` (kode menggunakan `price_at_purchase`, sedangkan skema mendefinisikan `unit_price NOT NULL`), dan *error* hasil *insert* tidak diperiksa. | `checkout.test.ts`: kolom `order_items` ada di `schema.sql` | **Tinggi** | Samakan nama kolom dengan skema database nyata (`unit_price`) dan tangani galat *insert* dengan *rollback* atau respons gagal. |
| **`W-03`** | `src/app/api/webhooks/doku/route.ts` | Handler *webhook* pembayaran DOKU tidak memvalidasi kesesuaian nominal pembayaran yang diterima dengan nilai `final_amount` pada database pesanan. | `webhook.test.ts`: nominal harus sama dengan `final_amount` | **Tinggi** | Tolak *webhook* (HTTP 400) apabila nominal bayar tidak sama persis dengan `final_amount` pesanan. |
| **`W-04`** | `src/app/api/webhooks/doku/route.ts` | Pemeriksaan status lalu pembaruan status pesanan tidak bersifat atomik (*race condition*), sehingga dua *request webhook* bersamaan dapat memicu pengiriman email produk dua kali. | `webhook.test.ts`: dua webhook bersamaan hanya satu email | **Sedang** | Gunakan *conditional update* atomik di database (mis. `UPDATE orders SET status = 'PAID' WHERE id = ... AND status = 'PENDING'`). |
| **`W-05`** | `src/app/api/webhooks/doku/route.ts` | Mode simulasi menerima header `SIMULATION_BYPASS` tanpa verifikasi tanda tangan HMAC. Sangat berbahaya jika variabel lingkungan simulasi tidak sengaja aktif di server produksi. | `webhook.test.ts` (lulus; perilaku disengaja pada mode dev) | **Kritis** *(bila env salah)* | Pastikan mode simulasi nonaktif di produksi dan tolak secara eksplisit header `SIMULATION_BYPASS` saat `NODE_ENV === 'production'`. |
| **`W-06`** | `src/lib/doku.ts` & `api/checkout` | Inkonsistensi perhitungan diskon promo: nilai `max_discount_amount = 0` diartikan *tanpa batas* di *checkout* tetapi menghasilkan *diskon 0* di pratinjau; metode pembulatan juga berbeda (`Math.round` vs `Math.floor`). | `doku.test.ts` & `checkout.test.ts` (2 kasus konsistensi) | **Sedang** | Gunakan satu fungsi perhitungan bersama (`calculatePromoDiscount`) dan tetapkan aturan eksplisit untuk nilai `0` atau `null`. |
| **`W-07`** | `src/app/api/checkout/route.ts` | API *checkout* menerima kuantitas barang berupa angka pecahan (desimal) dan nilai ekstrem tanpa batas atas, padahal skema database memakai tipe `INTEGER`. | `checkout.test.ts`: jumlah pecahan; jumlah 1 miliar | **Sedang** | Validasi `Number.isInteger(qty)` dengan rentang wajar (mis. `1` s.d. `100`). |
| **`W-08`** | `src/app/api/checkout/route.ts` | Pesan galat internal server (*exception message*) diteruskan langsung ke respons HTTP 500 yang diterima pembeli. | `checkout.test.ts`: pesan galat internal | **Sedang** | Kembalikan pesan kesalahan umum kepada klien dan catat detail teknisnya hanya di log server. |
| **`W-09`** | `src/lib/doku.ts` | Jika respons API DOKU tidak menyertakan `qr_string`, sistem menggantinya dengan string QR buatan (*fallback*) dan tetap membuat pesanan di database. | `doku.test.ts`: respons tanpa `qr_string` | **Sedang** | Lempar *error* kegagalan pembuatan tagihan QRIS dan batalkan pembuatan pesanan. |
| **`W-10`** | `src/app/api/checkout/route.ts` | Kode promo yang digunakan pembeli saat *checkout* tidak tersimpan ke kolom `promo_code_used` pada tabel pesanan. | `checkout.test.ts`: tersimpan di `promo_code_used` | **Rendah** | Simpan kode promo yang tervalidasi ke kolom `promo_code_used` saat *insert* pesanan. |
| **`W-11`** | `src/app/api/promo/validate/route.ts` | Endpoint validasi promo menerima input `subtotal` bukan angka sehingga menghasilkan kalkulasi `NaN`. | `promo-orders.test.ts`: subtotal bukan angka | **Rendah** | Validasi masukan menggunakan `typeof subtotal === 'number' && Number.isFinite(subtotal)`. |
| **`W-12`** | `src/app/api/checkout/route.ts` | Tidak ada validasi panjang maksimum string pada alamat email pembeli di sisi server. | `checkout.test.ts`: email sangat panjang | **Rendah** | Batasi panjang email maksimal 254 karakter sesuai standar RFC. |

---

## 3. Daftar Temuan Analisis Statis Kode (`S-01` s.d. `S-03`)

Dijalankan pada salinan kode sumber lokal (Next.js `16.4.4`, TypeScript `5`, ESLint `9`) pada 18 November 2026. *(Catatan: pemeriksaan tipe `tsc --noEmit` lulus dengan `0` galat).*

| ID | Alat Pemeriksaan | Hasil Temuan | Rincian Teknis | Severity | Saran Perbaikan |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **`S-01`** | `ESLint` (`eslint-config-next`) | **6 Error** dan **13 Peringatan** pada 34 berkas | • **6 Error (`react-hooks/set-state-in-effect`):** Pemanggilan `setState` secara sinkron di dalam `useEffect` pada `checkout/page.tsx:137`, `admin/page.tsx:141`, `AdminPromosSettingsTab.tsx:71`, `ProductDetailSheet.tsx:42`, `ShopTabView.tsx:56`, dan `StorefrontClient.tsx:122`.<br>• **13 Warning (`@next/next/no-img-element`):** Penggunaan tag HTML `<img>` standar alih-alih komponen `next/image` pada 8 berkas. | **Rendah–Sedang** | Refaktor logika sinkronisasi *state* agar tidak memicu *cascading render* di dalam `useEffect`, serta migrasikan `<img>` ke `next/image` untuk optimasi gambar otomatis. |
| **`S-02`** | `npm audit --omit=dev` | **1 Kerentanan Moderat** | Versi Next.js `16.2.0`–`16.4.4` memiliki dua *security advisory* terkait fungsi `'use cache'` / `unstable_cache`. Berdasarkan penelusuran kode, fitur tersebut tidak digunakan sehingga dampak eksploitasi minimal. | **Rendah** | Tingkatkan versi dependensi `next` ke versi `16.4.6` atau yang lebih baru. |
| **`S-03`** | `ESLint` (`rule: complexity`, ambang batas `10`) | **32 Fungsi** melebihi ambang kompleksitas siklomatik $V(G) > 10$ | Fungsi dengan kompleksitas tertinggi ditemukan pada:<br>• `api/messages/route.ts` ($V(G) = 52$)<br>• `ServicesTabView.tsx` ($V(G) = 45$)<br>• `AdminPromosSettingsTab.tsx` ($V(G) = 39$)<br>• `AdminServicesTab.tsx` ($V(G) = 36$)<br>• `AdminCatalogTab.tsx` ($V(G) = 30$)<br>• `webhooks/doku/route.ts` ($V(G) = 27$)<br>• `checkout/route.ts` ($V(G) = 25$) | **Sedang** | Pecah fungsi monolitik menjadi sub-fungsi *helper* modular dengan tanggung jawab tunggal dan tambahkan *unit test* pada rute `api/messages`. |