// Shared test data — credentials come from environment variables, never hardcoded.
// Locally they load from the .env file (gitignored); on GitHub Actions from repo Secrets.
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable "${name}". ` +
        `Locally: copy .env.example to .env and fill it in. ` +
        `On GitHub: add it under Settings > Secrets and variables > Actions.`
    );
  }
  return value;
}

export const USERS = {
  standard: {
    username: requireEnv('SAUCE_USERNAME'),
    password: requireEnv('SAUCE_PASSWORD'),
  },
};

export const WRONG_PASSWORD = 'wrong_password';
