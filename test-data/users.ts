export interface Credentials {
  username: string;
  password: string;
}

// Public demo credentials published on https://www.saucedemo.com
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  nonExistent: { username: 'nobody_user', password: 'secret_sauce' },
  wrongPassword: { username: 'standard_user', password: 'wrong_password' },
  missingPassword: { username: 'standard_user', password: '' },
  empty: { username: '', password: '' },
} satisfies Record<string, Credentials>;
