export async function prepareGoogleSignIn() {}

export async function mockGoogleUser() {
  return { name: 'Alex Morgan', email: 'alex@example.com', provider: 'mock' };
}

export const googleUser = mockGoogleUser;
