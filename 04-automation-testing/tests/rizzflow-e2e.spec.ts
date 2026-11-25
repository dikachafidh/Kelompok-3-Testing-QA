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
    const searchInput = page.locator('input[placeholder*="Cari"], input[type="search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill(`<>"'&`);
      await expect(page.locator('body')).not.toContainText('Application error');
      await page.screenshot({ path: `${EVIDENCE_DIR}/evidence-auto-02-xss-check.png` });
    }
  });

  test('AUTO-03: Akses langsung halaman /checkout saat keranjang kosong (CRT-06)', async ({ page }) => {
    await page.goto(`${BASE_URL}/checkout`);
    await expect(page.locator('body')).toContainText(/Keranjang/i);
    await page.screenshot({ path: `${EVIDENCE_DIR}/evidence-auto-03-empty-checkout.png` });
  });
});