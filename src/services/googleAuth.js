import { appConfig } from '../config/appConfig';
import { request } from './formsApi';

let client;

/** Load popup support on auth screens, keeping Firebase credentials in memory only. */
export function prepareGoogleSignIn() {
  if (!appConfig.firebaseApiKey || !appConfig.firebaseAuthDomain)
    return Promise.reject(new Error('Google sign-in is not configured. Please use email sign-in.'));
  if (!client) {
    client = Promise.all([import('firebase/app'), import('firebase/auth')])
      .then(([app, sdk]) => {
        const existing = app.getApps().find(({ name }) => name === 'formeo-google');
        const firebaseApp =
          existing ||
          app.initializeApp(
            {
              apiKey: appConfig.firebaseApiKey,
              authDomain: appConfig.firebaseAuthDomain,
              projectId: appConfig.firebaseProjectId,
            },
            'formeo-google',
          );
        const auth = existing
          ? sdk.getAuth(firebaseApp)
          : sdk.initializeAuth(firebaseApp, {
              persistence: sdk.inMemoryPersistence,
              popupRedirectResolver: sdk.browserPopupRedirectResolver,
            });
        const provider = new sdk.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return { auth, provider, signInWithPopup: sdk.signInWithPopup, signOut: sdk.signOut };
      })
      .catch((error) => {
        client = null;
        throw error;
      });
  }
  return client;
}

export async function googleUser() {
  const { auth, provider, signInWithPopup, signOut } = await prepareGoogleSignIn();
  try {
    const { user } = await signInWithPopup(auth, provider);
    if (!user.uid || !user.email || !user.emailVerified)
      throw new Error('Google could not verify your account. Please try again.');
    return {
      id: user.uid,
      name: user.displayName || user.email,
      email: user.email,
      provider: 'firebase',
    };
  } catch (error) {
    const messages = {
      'auth/popup-closed-by-user': 'Sign-in was cancelled. You can try again when ready.',
      'auth/popup-blocked': 'Allow popups for this site, then try Google sign-in again.',
      'auth/unauthorized-domain':
        'Google sign-in is unavailable on this domain. Please use email sign-in.',
      'auth/account-exists-with-different-credential':
        'This email already uses another sign-in method. Please log in with that method.',
    };
    throw new Error(
      messages[error.code] ||
        'Google sign-in could not be completed. Check your connection and try again.',
      { cause: error },
    );
  } finally {
    // The app stores an identity record; it never persists Firebase access or refresh tokens.
    await signOut(auth);
  }
}

export async function mockGoogleUser() {
  if (!appConfig.useMock) throw new Error('Mock sign-in is not enabled.');
  const user = await request('/auth/google', { method: 'POST', body: '{}' });
  if (typeof user?.name !== 'string' || typeof user?.email !== 'string' || user.provider !== 'mock')
    throw new Error('The sign-in service returned an invalid account.');
  return user;
}
