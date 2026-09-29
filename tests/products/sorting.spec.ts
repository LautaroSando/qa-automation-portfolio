import { test, expect } from '../../fixtures';
import { type SortOption } from '../../pages/ProductsPage';
import { productCatalog } from '../../test-data/products';
import { namesOf, pricesOf, sortByName, sortByPrice } from '../../utils/products';

interface SortScenario {
  title: string;
  option: SortOption;
  /**
   * Sort applied before the one under test. Starting from the opposite order guarantees the list
   * really changes, otherwise "Name (A to Z)" would pass without doing anything because it is the default.
   */
  startFrom: SortOption;
  field: 'itemNames' | 'itemPrices';
  expected: string[];
}

const sortScenarios: SortScenario[] = [
  {
    title: 'sorts products by name from A to Z',
    option: 'nameAsc',
    startFrom: 'nameDesc',
    field: 'itemNames',
    expected: namesOf(sortByName(productCatalog, 'asc')),
  },
  {
    title: 'sorts products by name from Z to A',
    option: 'nameDesc',
    startFrom: 'nameAsc',
    field: 'itemNames',
    expected: namesOf(sortByName(productCatalog, 'desc')),
  },
  {
    title: 'sorts products by price from low to high',
    option: 'priceAsc',
    startFrom: 'priceDesc',
    field: 'itemPrices',
    expected: pricesOf(sortByPrice(productCatalog, 'asc')),
  },
  {
    title: 'sorts products by price from high to low',
    option: 'priceDesc',
    startFrom: 'priceAsc',
    field: 'itemPrices',
    expected: pricesOf(sortByPrice(productCatalog, 'desc')),
  },
];

test.describe('Products - sorting', () => {
  for (const { title, option, startFrom, field, expected } of sortScenarios) {
    test(title, async ({ authenticatedProductsPage }) => {
      await authenticatedProductsPage.sortBy(startFrom);
      await expect(authenticatedProductsPage[field]).not.toHaveText(expected);

      await authenticatedProductsPage.sortBy(option);

      await expect(authenticatedProductsPage[field]).toHaveText(expected);
    });
  }
});
