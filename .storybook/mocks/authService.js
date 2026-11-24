import { validPassword } from '../../src/utils/password';

export async function login({ email, password }) {
  if (!email || !password || email.startsWith('error'))
    throw new Error('The email or password is incorrect. Please try again.');

  return { name: 'Alex Morgan', email };
}

export async function signup({ name, email, password }) {
  if (!validPassword(password))
    throw new Error('Choose a password that meets all four requirements.');

  return { name, email };
}

export async function requestPasswordReset(email) {
  if (email.startsWith('error'))
    throw new Error('The reset request could not be completed. Please try again.');
}

// Stories keep identity in their workspace provider, never in browser storage.
export function rememberUser() {}

export function readSession() {
  return null;
}

export function clearSession() {}
