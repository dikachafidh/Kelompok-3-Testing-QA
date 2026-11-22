# Hasil Lighthouse (Dika Chafizh Hizbulloh)

Situs: https://rizzflow-theta.vercel.app/
Tanggal: 22 November 2026
Alat: Lighthouse 13.5.0 (Chrome DevTools, Windows, Chrome 157)
Mode: Mobile (412x823), throttling simulasi (RTT 150 ms, 1,6 Mbps, CPU 4x lebih lambat)

## PRF-01: Beranda, mode Navigation (4 percobaan)

| Percobaan | Waktu | Performance | FCP | LCP | TBT | CLS | Speed Index | Sumber |
|---|---|---|---|---|---|---|---|---|
| 1 | 18.51 | 90 | 1,0 s | 2,9 s | 220 ms | 0 | 4,0 s | screenshot |
| 2 | 18.57 | 93 | 1,0 s | 2,9 s | 50 ms | 0 | 4,0 s | rizzflow-theta.vercel.app-20261122T185703.json |
| 3 | 18.58 | 100 | 1,0 s | 1,1 s | 50 ms | 0 | 2,9 s | rizzflow-theta.vercel.app-20261122T185822.json |
| 4 | 19.08 | 95 | 0,9 s | 2,9 s | 60 ms | 0 | 2,9 s | rizzflow-theta.vercel.app-20261122T190817.json |
| **Median** | | **94** | **1,0 s** | **2,9 s** | **55 ms** | **0** | **3,5 s** | |

Status: **Fail** (median LCP 2,9 s melebihi ambang 2,5 s; CLS 0 lulus).

Temuan:
- Elemen LCP berupa teks (menu "Layanan" atau judul hero). Waktu terbesar ada pada element render delay (1,4 sampai 2,2 s); TTFB hanya 39 sampai 94 ms.
- Gambar thumbnail PNG sekitar 1,9 MB; total transfer beranda sekitar 2,4 MB dari 26 request.

## PRF-02: Interaksi katalog, mode Timespan (3 percobaan)

RizzFlow adalah aplikasi satu halaman, sehingga katalog dan detail produk berada pada URL yang sama dengan beranda.

Interaksi yang dilakukan:
1. Menekan menu "Katalog" di bagian bawah
2. Mengganti filter ke "E-Book"
3. Scroll ke bawah
4. Mengganti filter ke "Template Excel"
5. Scroll ke bawah
6. Mengganti filter ke "Semua"
7. Scroll ke bawah
8. Membuka satu produk, lalu menutupnya

| Percobaan | Waktu | TBT | CLS | INP | Performance | Sumber |
|---|---|---|---|---|---|---|
| 1 | 19.15 | 10 ms | 0 | 70 ms | 100 | rizzflow-theta.vercel.app-20261122T191535.json |
| 2 | 19.16 | 0 ms | 0 | 80 ms | 100 | rizzflow-theta.vercel.app-20261122T191639.json |
| 3 | 19.17 | 20 ms | 0 | 90 ms | 100 | rizzflow-theta.vercel.app-20261122T191732.json |
| **Median** | | **10 ms** | **0** | **80 ms** | **100** | |

Status: **Pass** untuk interaksi (CLS lulus, INP jauh di bawah 200 ms). LCP tidak dapat diukur pada mode Timespan; nilainya mengikuti PRF-01.

## Catatan
- Percobaan 2 sampai 4 pada PRF-01 hanya kategori Performance; percobaan 1 empat kategori.
- Berkas JSON dan screenshot disimpan di folder ini.