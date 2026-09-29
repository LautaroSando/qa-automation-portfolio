import { type Product } from '../test-data/products';

export type SortDirection = 'asc' | 'desc';

/** Formats a price the way SauceDemo renders it, e.g. 7.9 -> "$7.90". */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function sortByName(items: readonly Product[], direction: SortDirection): Product[] {
  const sign = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => a.name.localeCompare(b.name) * sign);
}

export function sortByPrice(items: readonly Product[], direction: SortDirection): Product[] {
  const sign = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => (a.price - b.price) * sign);
}

export const namesOf = (items: readonly Product[]): string[] => items.map((item) => item.name);

export const pricesOf = (items: readonly Product[]): string[] => items.map((item) => formatPrice(item.price));
