import { test, expect, Page } from '@playwright/test';

/**
 * Skrip bantu untuk 6 test case tambahan hasil masukan QA (Sub-bab 4.2.14):
 * PRM-01..03 (kode promo, BVA), QTY-01 (ubah kuantitas), FLT-01..02 (kombinasi filter).
 *
 * PENTING:
 *  - Selector di bawah adalah perkiraan; sesuaikan dengan DOM situs live (cek via
 *    `npx playwright codegen https://rizzflow-theta.vercel.app`).
 *  - Skrip BERHENTI sebelum pembayaran (tidak ada klik "Bayar").
 *  - Kode promo diminta dari pemilik dan diberikan lewat environment variable:
 *      PROMO_VALID="KODE" PROMO_MIN_SUBTOTAL=10000 npx playwright test tests/rizzflow-tambahan.spec.ts
 *  - Hasil aktual diisi ke Excel/laporan SETELAH dijalankan; jangan diisi sebelum eksekusi.
 */
const BASE_URL = 'https://rizzflow-theta.vercel.app';
const EVID = '../03-evidence-pengujian/evidence';
const PROMO_VALID = process.env.PROMO_VALID;
const PROMO_MIN = Number(process.env.PROMO_MIN_SUBTOTAL || 0);

async function bukaKatalog(page: Page) {
  await page.goto(BASE_URL);
  await page.getByText(/Katalog/i).first().click();
}
async function tambahProduk(page: Page, kali = 1) {
  const tambah = page.getByRole('button', { name: '+' }).first();
  for (let i = 0; i < kali; i++) await tambah.click();
}
async function bukaKeranjang(page: Page) {
  await page.getByText(/Keranjang Belanja/i).first().click();
}
function promoInput(page: Page) {
  return page.locator('input[placeholder*="promo" i]').first();
}
async function terapkan(page: Page, kode: string) {
  await promoInput(page).fill(kode);
  await page.getByRole('button', { name: /Terapkan|Pakai|Gunakan/i }).first().click();
}

test.describe('Tambahan masukan QA (Not Run sampai dieksekusi)', () => {
  test('PRM-01: kode promo valid', async ({ page }) => {
    test.skip(!PROMO_VALID, 'Set PROMO_VALID (kode dari pemilik)');
    await bukaKatalog(page); await tambahProduk(page); await bukaKeranjang(page);
    await terapkan(page, PROMO_VALID!);
    await expect(page.locator('body')).toContainText(/diskon|potongan|hemat/i);
    await page.screenshot({ path: `${EVID}/PRM-01.png`, fullPage: true });
  });

  test('PRM-02: kode promo kosong / tidak valid / spasi / huruf kecil', async ({ page }) => {
    await bukaKatalog(page); await tambahProduk(page); await bukaKeranjang(page);
    const totalAwal = await page.locator('body').innerText();
    await terapkan(page, '');
    await terapkan(page, 'TIDAKADA99');
    await page.screenshot({ path: `${EVID}/PRM-02_tidak-valid.png`, fullPage: true });
    // Total tidak boleh berubah untuk kode tidak valid.
    expect(await page.locator('body').innerText()).toContain(totalAwal.match(/Rp\s?[\d.]+/)?.[0] ?? 'Rp');
    if (PROMO_VALID) {
      await terapkan(page, ` ${PROMO_VALID} `);
      await page.screenshot({ path: `${EVID}/PRM-02_spasi.png`, fullPage: true });
      await terapkan(page, PROMO_VALID.toLowerCase());
      await page.screenshot({ path: `${EVID}/PRM-02_hurufkecil.png`, fullPage: true });
    }
  });

  test('PRM-03: nilai batas minimal pembelian (min-1, min, min+1)', async ({ page }) => {
    test.skip(!PROMO_VALID || !PROMO_MIN, 'Set PROMO_VALID dan PROMO_MIN_SUBTOTAL; N/A bila promo tanpa batas');
    await bukaKatalog(page); await tambahProduk(page); await bukaKeranjang(page);
    await terapkan(page, PROMO_VALID!);
    await page.screenshot({ path: `${EVID}/PRM-03.png`, fullPage: true });
    // Atur jumlah/produk agar subtotal = min-1, min, min+1 lalu catat hasil secara manual
    // (kombinasi harga produk berbeda per situs; lengkapi sesuai data aktual).
  });

  test('QTY-01: ubah kuantitas produk', async ({ page }) => {
    await bukaKatalog(page); await tambahProduk(page, 2); await bukaKeranjang(page);
    await page.screenshot({ path: `${EVID}/QTY-01_jumlah2.png`, fullPage: true });
    const kurang = page.getByRole('button', { name: /^(-|−|–)$/ }).first();
    await kurang.click(); await kurang.click();
    await page.screenshot({ path: `${EVID}/QTY-01_jumlah0.png`, fullPage: true });
    await expect(page.locator('body')).not.toContainText(/-\d|NaN|undefined/);
  });

  test('FLT-01: kombinasi kategori + kata kunci', async ({ page }) => {
    await bukaKatalog(page);
    await page.getByText('Template Excel').first().click();
    const cari = page.locator('input[placeholder*="Cari" i], input[type="search"]').first();
    await expect(cari).toBeVisible();
    await cari.fill('excel');
    await page.screenshot({ path: `${EVID}/FLT-01_cocok.png`, fullPage: true });
    await cari.fill('zzzzzz');
    await expect(page.locator('body')).toContainText(/belum ditemukan|0 produk/i);
    await page.screenshot({ path: `${EVID}/FLT-01_kosong.png`, fullPage: true });
  });

  test('FLT-02: ganti kategori setelah mengetik dan reset', async ({ page }) => {
    await bukaKatalog(page);
    const cari = page.locator('input[placeholder*="Cari" i], input[type="search"]').first();
    await cari.fill('e');
    await page.getByText('E-Book').first().click();
    await page.screenshot({ path: `${EVID}/FLT-02_ebook.png`, fullPage: true });
    await page.getByText('Semua').first().click();
    const reset = page.getByRole('button', { name: /Reset Filter/i });
    if (await reset.count()) await reset.first().click();
    await page.screenshot({ path: `${EVID}/FLT-02_reset.png`, fullPage: true });
  });
});
