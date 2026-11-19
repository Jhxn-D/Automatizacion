import { test, expect } from '@playwright/test';

test.describe('Catalogo y Carrito - Toolshop', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('CP-01 Busqueda exitosa con resultados', {
    tag: ['@smoke', '@busqueda'],
    annotation: { type: 'HU', description: 'HU-01 Busqueda de productos' },
  }, async ({ page }) => {
    await page.locator('[data-test="search-query"]').fill('Hammer');
    await page.locator('[data-test="search-submit"]').click();

    await expect(page.locator('[data-test="product-name"]').first()).toContainText('Hammer');
  });

  test('CP-02 Busqueda sin coincidencias', {
    tag: ['@busqueda'],
    annotation: { type: 'HU', description: 'HU-01 Busqueda de productos' },
  }, async ({ page }) => {
    await page.locator('[data-test="search-query"]').fill('xyz123987');
    await page.locator('[data-test="search-submit"]').click();

    await expect(page.locator('[data-test="no-results"]')).toHaveText('There are no products found.');
  });

  test('CP-03 Filtrar catalogo por categoria', {
    tag: ['@filtros'],
    annotation: { type: 'HU', description: 'HU-02 Filtrado de productos' },
  }, async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Power Tools' }).click();

    await expect(page.locator('a.card').first()).toBeVisible();
  });

  test('CP-04 Agregar producto al carrito', {
    tag: ['@smoke', '@carrito'],
    annotation: { type: 'HU', description: 'HU-03 Agregar producto al carrito' },
  }, async ({ page }) => {
    await page.locator('a.card').filter({ hasText: 'Combination Pliers' }).first().click();
    await expect(page.locator('[data-test="product-name"]')).toHaveText('Combination Pliers');

    await page.locator('[data-test="add-to-cart"]').click();

    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  });

});