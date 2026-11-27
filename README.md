# Pengujian Perangkat Lunak & Quality Assurance — Website RizzFlow

Repositori dokumentasi, artefak pengujian berbasis *keyword* (**ISO/IEC/IEEE 29119-5:2024**), pengujian *white-box*, dan skrip otomatisasi *End-to-End* (E2E) pada aplikasi toko produk digital **RizzFlow** (`[https://rizzflow-theta.vercel.app/](https://rizzflow-theta.vercel.app/)`).

- **Mata Kuliah:** Software Testing / Quality Assurance
- **Program Studi:** Teknik Informatika — Fakultas Ilmu Komputer, Universitas Pamulang (2026)
- **Dosen Pengampu:** Asep Erlan Maulana, S.Kom., M.Kom.
- **Objek Uji:** [RizzFlow Digital Store](https://rizzflow-theta.vercel.app/) *(pengujian dilakukan berdasarkan izin tertulis pemilik objek uji pada 22 November 2026)*

---

## Anggota Kelompok 3 & Pembagian Tugas

| Nama Anggota | NIM | Peran & Kontribusi Utama |
| :--- | :--- | :--- |
| **Dika Chafizh Hizbulloh** | 231011400064 | Desain *test case*, pengujian *white-box* (Vitest), skrip otomasi E2E (Playwright), performa jaringan (Lighthouse/DevTools), keamanan dasar, kompatibilitas perangkat, dan kompilasi laporan |
| **Azaria Bunga** | 231011400808 | Pengujian *usability* berbasis tugas (11 responden), perhitungan skor *System Usability Scale* (SUS), dan evaluasi heuristik (`USB-01` s.d. `USB-07`) |
| **Bagus Saputro** | 231011402742 | Eksekusi pengujian katalog & detail produk pada situs *live* (`CAT`, `PRD`), pelaksanaan wawancara praktisi QA profesional, dan analisis kesenjangan praktik industri |
| **Dhemes Ichsan Ramadhani** | 231011401260 | Pengelolaan struktur *keyword* (ISO 29119-5), penyusunan daftar *test case* Excel, referensi jurnal IEEE, dan struktur repositori bukti |

---

## Struktur Repositori

```text
Kelompok-3-Testing-QA/
├── 01-administrasi-izin/                  # Bukti email permohonan & persetujuan tertulis pemilik RizzFlow
├── 02-laporan-pengujian/                  # Dokumen laporan lengkap Word & PDF (ISO/IEC/IEEE 29119-5:2024)
├── 03-evidence-pengujian/
│   ├── evidence/                          # Screenshot bukti eksekusi pengujian fungsional, kompatibilitas, jaringan, keamanan, & aksesibilitas
│   ├── lighthouse/                        # Laporan JSON & tangkapan layar pengukuran performa Google Lighthouse
│   ├── usb/                               # Bukti pengujian usability berbasis tugas & rekap kuesioner SUS (11 responden)
│   └── automation-whitebox/               # Screenshot bukti eksekusi terminal & browser Playwright serta Vitest
├── 04-automation-testing/
│   ├── tests/                             # Skrip Automated E2E UI Test situs live (Playwright: AUTO-01 s.d. AUTO-03)
│   └── unit-tests/                        # Skrip White-Box Basis Path Unit Test (Vitest)
├── 05-validasi-QA/                        # Instrumen & catatan wawancara validasi praktisi QA profesional
├── Lampiran_2_Daftar_Test_Case_RizzFlow.xlsx  # Daftar 78 test case lengkap (75 black-box/non-fungsional + 3 E2E), definisi keyword, & rekapitulasi
└── README.md