/**
 * Single place where environment variables are read.
 * Everything has a sensible default so `npm test` works out of the box.
 */
function readInteger(name: string, fallback: number, min: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === '') return fallback;

  const value = Number(raw);
  if (!Number.isInteger(value) || value < min) {
    throw new Error(`Environment variable ${name} must be an integer >= ${min}, received "${raw}".`);
  }
  return value;
}

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  isCI: !!process.env.CI,
  ciRetries: readInteger('RETRIES', 2, 0),
  ciWorkers: readInteger('WORKERS', 2, 1),
};
