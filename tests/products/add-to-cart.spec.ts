import { test, expect } from '../../fixtures';
import { products } from '../../test-data/products';
import { namesOf, pricesOf } from '../../utils/products';

test.describe('Products - add to cart', () => {
  test('adds a single product and updates the cart badge', async ({ authenticatedProductsPage }) => {
    const product = products.backpack;
    await expect(authenticatedProductsPage.cartBadge).toBeHidden();

    await authenticatedProductsPage.addToCart(product.name);

    await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
    await expect(authenticatedProductsPage.cartButton(product.name)).toHaveText('Remove');
  });

  test('adds several products and shows exactly those products in the cart', async ({
    authenticatedProductsPage,
    cartPage,
    page,
  }) => {
    const selected = [products.onesie, products.fleeceJacket, products.redTShirt];

    await authenticatedProductsPage.addToCart(...namesOf(selected));
    await expect(authenticatedProductsPage.cartBadge).toHaveText(String(selected.length));

    await authenticatedProductsPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.items).toHaveCount(selected.length);
    await expect(cartPage.itemNames).toHaveText(namesOf(selected));
    await expect(cartPage.itemPrices).toHaveText(pricesOf(selected));
  });
});
