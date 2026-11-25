# Laporan Pengujian Kualitas Perangkat Lunak — RizzFlow

**URL Aplikasi:** `https://rizzflow-theta.vercel.app`  
**Standar Acuan:** ISO/IEC 25010 (Functional Suitability, Security, dan Accessibility / Usability)  

---

## Ringkasan Hasil Pengujian

| Kategori Pengujian | Kode Uji | Jumlah Skenario | Status | Catatan Utama |
| :--- | :--- | :---: | :---: | :--- |
| **Keranjang & Checkout (Functional Suitability)** | `CRT-01` – `CRT-09` | 9 | Lulus dengan Catatan | Ditemukan celah validasi panjang maksimal (*max-length*) email 250 karakter dan *text overflow* pada halaman invoice. |
| **Keamanan Dasar (Security)** | `SEC-01` – `SEC-03` | 3 | Lulus | HTTPS aktif, tidak ada kebocoran data sensitif pada DevTools, dan sanitasi karakter khusus pencarian aman. |
| **Aksesibilitas (Accessibility / Usability)** | `ACC-01` – `ACC-05` | 5 | Lulus dengan Catatan | Skor Lighthouse Accessibility **96/100**; beberapa elemen teks `#6B9071` memiliki rasio kontras warna rendah. |

---

## 1. Pengujian Fitur Keranjang Belanja & Checkout (`CRT-01` – `CRT-09`)

Pengujian dilakukan untuk memverifikasi kelengkapan fungsional (*Functional Completeness*), kebenaran perhitungan (*Functional Correctness*), serta validasi input pada alur pemesanan produk digital.

### Tabel Kasus Uji (`CRT-01` – `CRT-09`)

| Kode | Skenario Pengujian | Input / Aksi | Hasil yang Diharapkan | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **CRT-01** | Tambah 1 produk ke keranjang | Menambahkan produk *7 Jurus Sakti Kata Sambutan* (`Rp6.999`) | Keranjang menampilkan `1` item dengan total `Rp6.999` | Keranjang menampilkan `(1)` item dan total pembayaran `Rp6.999` | **PASS** |
| **CRT-02** | Ubah kuantitas produk di keranjang | Menambah jumlah produk menjadi `3` unit | Total pembayaran terhitung `3 × Rp6.999 = Rp20.997` | Keranjang menampilkan `(3)` item dan total `Rp20.997` | **PASS** |
| **CRT-03** | Tambah beberapa jenis produk berbeda | Menambahkan *Kumpulan Rumus Matematika SMA* (`Rp5.000`) & *Template Excel UMKM* (`Rp29.000`) | Total item `5` dan total pembayaran terakumulasi menjadi `Rp54.997` | Keranjang menampilkan `(5)` item dan total `Rp54.997` | **PASS** |
| **CRT-04** | Hapus seluruh produk dari keranjang | Menghapus semua item menggunakan ikon hapus | Keranjang menampilkan status kosong dan tombol lanjut bayar hilang | Muncul pesan *"Keranjang masih kosong"* dengan jumlah `(0)` | **PASS** |
| **CRT-05** | Tambah ulang produk setelah keranjang dikosongkan | Menambahkan kembali 1 unit produk ke keranjang | Keranjang kembali memuat 1 item dan siap menuju checkout | Keranjang menampilkan `(1)` item dengan total `Rp6.999` | **PASS** |
| **CRT-06** | Akses halaman checkout saat keranjang kosong | Mengakses halaman `/checkout` tanpa item di keranjang | Sistem menolak proses checkout dan mengarahkan kembali ke katalog | Muncul tampilan *"Keranjang Belanja Kosong"* beserta tombol *"Jelajahi Katalog Produk"* | **PASS** |
| **CRT-07** | Validasi format email tidak lengkap | Mengisi input email dengan `"abcd"` lalu klik bayar | Sistem menolak dan menampilkan pesan error format email | Muncul pesan: *"Format email belum lengkap (harus menyertakan tanda "@", contoh: nama@email.com)."* (Pesanan dibuat: `0`) | **PASS** |
| **CRT-08** | Validasi input email kosong | Mengosongkan kolom email lalu klik bayar | Sistem menolak dan menampilkan pesan wajib isi email | Muncul pesan: *"Alamat email penerima wajib diisi terlebih dahulu."* (Pesanan dibuat: `0`) | **PASS** |
| **CRT-09a** | Validasi email valid dengan spasi di tepi (*whitespace*) | Mengisi email `" a@b.co "` lalu klik bayar | Spasi tepi dipangkas otomatis (*trim*) menjadi `a@b.co` dan pesanan dibuat | Input diterima sebagai `a@b.co`, tombol berubah menjadi *"Menyiapkan Kode QRIS..."*, dan invoice `#INV-1795506527697-945` berhasil dibuat (Pesanan dibuat: `1`) | **PASS** |
| **CRT-09b** | Uji batas panjang karakter email (*Boundary Value Analysis*) | Mengisi email sepanjang `250 karakter` lalu klik bayar | Sistem membatasi panjang karakter email sesuai standar RFC (maks. 254/batas wajar UI) atau mencegah *layout break* | Email `250 karakter` diterima tanpa batas panjang, invoice `#INV-1795506726077-325` terbuat (Pesanan dibuat: `1`), namun teks email melebar keluar (*overflow*) dari kotak invoice | **DEFECT (Minor)** |

### Bukti Screenshot (`CRT-01` – `CRT-09`)

#### CRT-01: Tambah 1 Produk ke Keranjang
![Bukti CRT-01](./03-evidence-pengujian/evidence/crt-01.png)

#### CRT-02: Ubah Kuantitas Produk Menjadi 3 Item
![Bukti CRT-02](./03-evidence-pengujian/evidence/crt-02.png)

#### CRT-03: Kombinasi Multi-Produk di Keranjang (5 Item)
![Bukti CRT-03](./03-evidence-pengujian/evidence/crt-03.png)

#### CRT-04: Kondisi Keranjang Kosong Setelah Item Dihapus
![Bukti CRT-04](./03-evidence-pengujian/evidence/crt-04.png)

#### CRT-05: Tambah Ulang Produk ke Keranjang
![Bukti CRT-05](./03-evidence-pengujian/evidence/crt-05.png)

#### CRT-06: Penolakan Halaman Checkout Saat Keranjang Kosong
![Bukti CRT-06](./03-evidence-pengujian/evidence/crt-06.png)

#### CRT-07: Validasi Error Format Email (`"abcd"`)
![Bukti CRT-07](./03-evidence-pengujian/evidence/crt-07.png)

#### CRT-08: Validasi Error Email Kosong
![Bukti CRT-08](./03-evidence-pengujian/evidence/crt-08.png)

#### CRT-09a: Input Email `" a@b.co "` (Trim Spasi & Pembuatan Invoice QRIS)
![Bukti CRT-09a Proses](./03-evidence-pengujian/evidence/crt-09-loading.png)
![Bukti CRT-09a Invoice](./03-evidence-pengujian/evidence/crt-09-invoice.png)

#### CRT-09b: Input Email 250 Karakter (Diterima Tanpa Batas Panjang & Text Overflow)
![Bukti CRT-09b](./03-evidence-pengujian/evidence/crt-09-250char.png)

---

## 2. Pengujian Keamanan Dasar (`SEC-01` – `SEC-03`)

Pengujian dilakukan untuk mengevaluasi aspek *Confidentiality* dan *Integrity* pada sisi klien (*client-side*).

### Tabel Kasus Uji (`SEC-01` – `SEC-03`)

| Kode | Skenario Pengujian | Metode / Input | Hasil yang Diharapkan | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **SEC-01** | Enkripsi transportasi data (HTTPS) | Mengakses `https://rizzflow-theta.vercel.app` pada browser | Koneksi berjalan aman menggunakan protokol HTTPS yang valid | Halaman utama dimuat penuh melalui HTTPS tanpa peringatan sertifikat | **PASS** |
| **SEC-02** | Inspeksi *Network* & *Console* DevTools | Memeriksa tab *Network* dan *Console* saat memuat halaman utama | Tidak ada *error* aplikasi maupun kebocoran *API key* / kredensial rahasia | Seluruh *request* (`products`, `categories`, `store_settings`) berstatus `200`/`304` dan *Console* bersih dari galat | **PASS** |
| **SEC-03** | Uji sanitasi input & potensi XSS pada pencarian | Memasukkan karakter khusus `<>'"&` ke kolom pencarian Katalog | Input ditangani sebagai teks biasa tanpa mengeksekusi skrip berbahaya | Aplikasi menampilkan status *"0 Produk Tersedia"* dan pesan *"Produk tidak ditemukan"* dengan aman | **PASS** |

### Bukti Screenshot (`SEC-01` – `SEC-03`)

#### SEC-01: Verifikasi Protokol HTTPS pada Halaman Utama
![Bukti SEC-01](./03-evidence-pengujian/evidence/sec-01.png)

#### SEC-02: Pengecekan Network & Console DevTools
![Bukti SEC-02](./03-evidence-pengujian/evidence/sec-02.png)

#### SEC-03: Uji Karakter Khusus `<>'"&` pada Kolom Pencarian Katalog
![Bukti SEC-03](./03-evidence-pengujian/evidence/sec-03.png)

---

## 3. Pengujian Aksesibilitas (`ACC-01` – `ACC-05`)

Pengujian dilakukan menggunakan audit otomatis **Google Lighthouse** serta pengujian navigasi *keyboard* untuk mengukur kemudahan akses antarmuka (*Accessibility* / *Usability*).

### Tabel Kasus Uji (`ACC-01` – `ACC-05`)

| Kode | Skenario Pengujian | Elemen / Objek Uji | Hasil yang Diharapkan | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **ACC-01** | Audit skor aksesibilitas keseluruhan (Lighthouse) | Halaman utama RizzFlow | Skor aksesibilitas mencapai kategori baik ($\ge 90$) | Lighthouse memberikan skor **96/100** | **PASS** |
| **ACC-02** | Kontras warna teks subjudul bagian katalog | `p.text-xs.text-[#6B9071]` (*"Ketuk produk untuk detail lengkap..."*) | Rasio kontras memenuhi standar WCAG AA ($\ge 4.5:1$) | Terdeteksi gagal kontras warna pada audit Lighthouse | **DEFECT (Minor)** |
| **ACC-03** | Kontras warna deskripsi singkat & harga coret kartu produk | `p.text-[11px].text-[#6B9071]` dan `span.text-[10px].text-[#6B9071].line-through` (`Rp49.000`, `Rp27.000`, `Rp99.000`) | Rasio kontras teks sekunder & harga coret terbaca jelas | Terdeteksi gagal kontras warna pada ketiga kartu produk | **DEFECT (Minor)** |
| **ACC-04** | Kontras warna teks hak cipta pada *footer* | `footer.text-[#6B9071]` (*"© 2026 RizzFlow. Seluruh hak cipta dilindungi."*) | Teks *footer* memiliki rasio kontras yang memadai | Terdeteksi gagal kontras warna pada elemen *footer* | **DEFECT (Minor)** |
| **ACC-05** | Indikator fokus navigasi *keyboard* (*Focus Ring*) | Tombol menu navigasi (`Home`, `Katalog`, `Layanan`) | Muncul garis tepi fokus yang jelas saat berpindah menggunakan tombol `Tab` | Tombol **Katalog** menampilkan *outline* fokus hitam tebal dengan jelas | **PASS** |

### Bukti Screenshot (`ACC-01` – `ACC-05`)

#### ACC-01 & ACC-02: Skor Lighthouse (96) dan Temuan Kontras Subjudul Katalog
![Bukti ACC-01 dan ACC-02](./03-evidence-pengujian/evidence/acc-01.png)

#### ACC-03: Temuan Kontras Deskripsi & Harga Coret Kartu Produk
![Bukti ACC-03](./03-evidence-pengujian/evidence/acc-02.png)

#### ACC-04: Temuan Kontras Teks Produk Ketiga dan Footer
![Bukti ACC-04](./03-evidence-pengujian/evidence/acc-03.png)

#### ACC-05: Indikator Fokus Keyboard pada Menu Navigasi
![Bukti ACC-05](./03-evidence-pengujian/evidence/acc-04.png)

---

## 4. Rekomendasi Perbaikan

1. **Validasi Panjang Karakter Email & Penanganan Overflow (`CRT-09b`):**
   - Menambahkan pembatasan panjang karakter input email pada form *checkout* (misalnya maksimal `100`–`150` karakter) beserta pesan validasi yang informatif.
   - Menambahkan properti CSS `break-all` atau `truncate` pada elemen penampil alamat email di kartu *invoice* agar teks panjang tidak keluar dari batas kontainer.
2. **Peningkatan Rasio Kontras Warna (`ACC-02` – `ACC-04`):**
   - Menggelapkan kode warna teks sekunder dari `#6B9071` menjadi warna hijau tua yang lebih kontras (misalnya `#3D5A45` atau `#2F4836`) agar seluruh teks deskripsi, harga coret, dan *footer* memenuhi standar kontras WCAG AA.

---

## Referensi

[1] A. Stefani, E. Vamvatsikou, and B. Vassiliadis, “Insights into B2C E-Commerce Quality Using ISO 25010,” *Journal of Software Engineering and Applications*, vol. 16, no. 11, pp. 622–639, 2023.

[2] A. S. Sikder, “Revolutionizing Web User Experience: A Pioneering Investigation Into Web Performance Optimization’s Impact on User Experience and Business Success,” *International Journal of Imminent Science & Technology*, vol. 1, no. 1, pp. 186–198, 2023.
