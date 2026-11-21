import { appConfig } from '../config/appConfig';

const messages = {
  EMAIL_EXISTS: 'An account with this email already exists. Please log in.',
  INVALID_LOGIN_CREDENTIALS: 'The email or password is incorrect. Please try again.',
  INVALID_PASSWORD: 'The email or password is incorrect. Please try again.',
  EMAIL_NOT_FOUND: 'The email or password is incorrect. Please try again.',
  USER_DISABLED: 'This account is disabled. Please contact support.',
  OPERATION_NOT_ALLOWED: 'This sign-in method is not enabled. Please try another method.',
  PASSWORD_LOGIN_DISABLED: 'Email sign-in is currently unavailable. Please continue with Google.',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts. Please wait a moment and try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
};

/** Firebase's public Web API; never uses Admin SDK credentials or service-account keys. */
async function firebaseRequest(action, body) {
  let response;
  try {
    response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/${action}?key=${encodeURIComponent(appConfig.firebaseApiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      },
    );
  } catch {
    throw new Error('Unable to reach the account service. Check your connection and try again.');
  }
  const data = await response.json();
  if (!response.ok) {
    const code = data.error?.message?.split(' : ')[0];
    throw Object.assign(
      new Error(
        messages[code] || 'The account service could not complete your request. Please try again.',
      ),
      { code },
    );
  }
  return data;
}

function identity({ localId, email, displayName }) {
  if (typeof localId !== 'string' || typeof email !== 'string')
    throw new Error('The account service returned an invalid account. Please try again.');
  return { id: localId, email, name: displayName || email, provider: 'firebase' };
}

export async function firebaseEmailAccount(signingUp, { name, email, password }) {
  const data = await firebaseRequest(
    signingUp ? 'accounts:signUp' : 'accounts:signInWithPassword',
    {
      email: email.trim(),
      password,
      returnSecureToken: true,
      ...(signingUp && { displayName: name.trim() }),
    },
  );
  return identity({ ...data, displayName: data.displayName || (signingUp ? name.trim() : '') });
}

export async function firebasePasswordReset(email) {
  try {
    await firebaseRequest('accounts:sendOobCode', { requestType: 'PASSWORD_RESET', email });
  } catch (error) {
    // Give the same response for unknown addresses to avoid exposing account registration.
    if (error.code !== 'EMAIL_NOT_FOUND') throw error;
  }
}
