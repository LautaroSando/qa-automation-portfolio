import { type Locator, type Page } from '@playwright/test';

/** Business name of each sort option mapped to the value of SauceDemo's sort dropdown. */
export const sortOptions = {
  nameAsc: 'az',
  nameDesc: 'za',
  priceAsc: 'lohi',
  priceDesc: 'hilo',
} as const;

export type SortOption = keyof typeof sortOptions;

export class ProductsPage {
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.inventoryList = page.getByTestId('inventory-list');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  /**
   * The card of a single product, located by its exact visible name.
   * Matching by name instead of SauceDemo's generated ids (e.g. "add-to-cart-sauce-labs-backpack")
   * keeps tests readable and independent of how the app builds those ids.
   */
  productCard(name: string): Locator {
    return this.items.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  /**
   * The button that toggles between "Add to cart" and "Remove" on a product card.
   * Filtered by name because SauceDemo also gives the image and title links role="button".
   */
  cartButton(name: string): Locator {
    return this.productCard(name).getByRole('button', { name: /^(Add to cart|Remove)$/ });
  }

  async addToCart(...productNames: string[]): Promise<void> {
    for (const name of productNames) {
      await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
    }
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortSelect.selectOption(sortOptions[option]);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
