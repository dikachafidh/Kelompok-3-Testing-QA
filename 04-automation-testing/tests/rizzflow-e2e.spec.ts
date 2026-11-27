import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rizzflow-theta.vercel.app';
const EVIDENCE_DIR = '../03-evidence-pengujian/automation-whitebox';

test.describe('RizzFlow Automated E2E & Regression Suite (ISO 29119-5)', () => {
  test('AUTO-01: Memuat halaman utama dan memastikan judul RizzFlow tampil', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/RizzFlow/i);
    await page.screenshot({ path: `${EVIDENCE_DIR}/evidence-auto-01-home.png`, fullPage: true });
  });

  test('AUTO-02: Pencarian katalog dengan karakter khusus XSS aman (SEC-03)', async ({ page }) => {
    await page.goto(BASE_URL);
    // Perbaikan: kolom cari dibuka lebih dulu dari tab Katalog dan WAJIB terlihat,
    // sehingga test tidak lulus "kosong" bila elemen tidak ditemukan.
    await page.getByText(/Katalog/i).first().click();
    const searchInput = page.locator('input[placeholder*="Cari" i], input[type="search"]').first();
    await expect(searchInput).toBeVisible();

    let dialogMuncul = false;
    page.on('dialog', async (d) => { dialogMuncul = true; await d.dismiss(); });

    const payload = `<img src=x onerror=alert(1)><script>alert(1)</script>"'&`;
    await searchInput.fill(payload);
    await expect(page.locator('body')).not.toContainText('Application error');
    // Payload tidak boleh dieksekusi dan tidak boleh menjadi elemen DOM baru.
    expect(dialogMuncul).toBe(false);
    await expect(page.locator('img[src="x"]')).toHaveCount(0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/evidence-auto-02-xss-check.png` });
  });

  test('AUTO-03: Akses langsung halaman /checkout saat keranjang kosong (CRT-06)', async ({ page }) => {
    await page.goto(`${BASE_URL}/checkout`);
    await expect(page.locator('body')).toContainText(/Keranjang/i);
    await page.screenshot({ path: `${EVIDENCE_DIR}/evidence-auto-03-empty-checkout.png` });
  });
});
