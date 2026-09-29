import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../test-data/users';

type Pages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  authenticatedProductsPage: ProductsPage;
};

/**
 * Extended `test` that provides ready-to-use page objects.
 *
 * - `loginPage` is already navigated to the login screen.
 * - `authenticatedProductsPage` logs in as the standard user and lands on the inventory.
 *   Login goes through the UI on purpose: it takes about a second on SauceDemo and keeps
 *   every test self-contained, so no shared session file has to be created or cleaned up.
 */
export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  authenticatedProductsPage: async ({ loginPage, productsPage, page }, use) => {
    await loginPage.login(users.standard);
    await page.waitForURL('**/inventory.html');
    await use(productsPage);
  },
});

export { expect } from '@playwright/test';
