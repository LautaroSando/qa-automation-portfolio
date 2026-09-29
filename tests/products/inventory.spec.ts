import { test, expect } from '../../fixtures';
import { productCatalog } from '../../test-data/products';
import { formatPrice, namesOf, sortByName } from '../../utils/products';

test.describe('Products - inventory', () => {
  test('shows the Products page to an authenticated user', async ({ authenticatedProductsPage, page }) => {
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(authenticatedProductsPage.title).toHaveText('Products');
  });

  test('lists every product of the catalog in the default A to Z order', async ({ authenticatedProductsPage }) => {
    await expect(authenticatedProductsPage.items).toHaveCount(productCatalog.length);
    await expect(authenticatedProductsPage.itemNames).toHaveText(namesOf(sortByName(productCatalog, 'asc')));
  });

  test('shows name, description, price, image and add-to-cart button for each product', async ({
    authenticatedProductsPage,
  }) => {
    for (const product of productCatalog) {
      await test.step(product.name, async () => {
        const card = authenticatedProductsPage.productCard(product.name);

        await expect(card).toHaveCount(1);
        await expect(card.getByTestId('inventory-item-desc')).toHaveText(/\S/);
        await expect(card.getByTestId('inventory-item-price')).toHaveText(formatPrice(product.price));
        await expect(card.getByRole('img', { name: product.name })).toBeVisible();
        await expect(card.getByRole('button', { name: 'Add to cart' })).toBeEnabled();
      });
    }
  });
});
