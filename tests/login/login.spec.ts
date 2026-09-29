import { test, expect } from '../../fixtures';
import { type Credentials, users } from '../../test-data/users';
import { loginErrors } from '../../test-data/messages';

interface RejectedLogin {
  title: string;
  credentials: Credentials;
  expectedError: string;
}

const rejectedLogins: RejectedLogin[] = [
  {
    title: 'shows an error for a non-existent user',
    credentials: users.nonExistent,
    expectedError: loginErrors.invalidCredentials,
  },
  {
    title: 'shows an error for an incorrect password',
    credentials: users.wrongPassword,
    expectedError: loginErrors.invalidCredentials,
  },
  {
    title: 'shows a required-username error when both fields are empty',
    credentials: users.empty,
    expectedError: loginErrors.usernameRequired,
  },
  {
    title: 'shows a required-password error when only the username is provided',
    credentials: users.missingPassword,
    expectedError: loginErrors.passwordRequired,
  },
  {
    title: 'shows a locked-out error for a blocked user',
    credentials: users.lockedOut,
    expectedError: loginErrors.lockedOut,
  },
];

test.describe('Login', () => {
  test('logs in successfully with valid credentials', async ({ loginPage, productsPage, page }) => {
    await loginPage.login(users.standard);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(productsPage.title).toHaveText('Products');
    await expect(productsPage.inventoryList).toBeVisible();
  });

  for (const { title, credentials, expectedError } of rejectedLogins) {
    test(title, async ({ loginPage, page }) => {
      await loginPage.login(credentials);

      await expect(loginPage.errorMessage).toHaveText(expectedError);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }
});
