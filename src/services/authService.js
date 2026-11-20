const accountKey = 'formeo.demo.accounts';
function readAccounts() {
  try {
    const data = JSON.parse(localStorage.getItem(accountKey) || '[]');
    return Array.isArray(data)
      ? data.filter(
          (account) =>
            account &&
            typeof account.name === 'string' &&
            typeof account.email === 'string' &&
            typeof account.salt === 'string' &&
            typeof account.digest === 'string',
        )
      : [];
  } catch {
    return [];
  }
}
async function digest(password, salt) {
  const bytes = new TextEncoder().encode(salt + password);
  const result = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(result)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
export async function signup({ name, email, password }) {
  const accounts = readAccounts();
  const normalized = email.trim().toLowerCase();
  if (accounts.some((a) => a.email === normalized))
    throw new Error('An account with this email already exists in this browser.');
  const salt = crypto.randomUUID();
  const account = {
    name: name.trim(),
    email: normalized,
    salt,
    digest: await digest(password, salt),
  };
  localStorage.setItem(accountKey, JSON.stringify([...accounts, account]));
  return { name: account.name, email: account.email };
}
export async function login({ email, password }) {
  const account = readAccounts().find((a) => a.email === email.trim().toLowerCase());
  if (!account || account.digest !== (await digest(password, account.salt)))
    throw new Error('Email or password is incorrect. Create a demo account in this browser first.');
  return { name: account.name, email: account.email };
}
export function rememberUser(user, remember) {
  clearSession();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem('formeo.demo.session', JSON.stringify(user));
}
export function readSession() {
  try {
    const user = JSON.parse(
      sessionStorage.getItem('formeo.demo.session') ||
        localStorage.getItem('formeo.demo.session') ||
        'null',
    );
    return user && typeof user.name === 'string' && typeof user.email === 'string' ? user : null;
  } catch {
    return null;
  }
}
export function clearSession() {
  localStorage.removeItem('formeo.demo.session');
  sessionStorage.removeItem('formeo.demo.session');
}
