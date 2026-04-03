import { cookies } from "next/headers";
import { decryptSensitiveValue, encryptSensitiveValue } from "./encryption";

export const USER_API_KEY_COOKIE_NAME = "gwa_user_api_key";

export async function setEncryptedUserApiKeyCookie(apiKey: string) {
  const cookieStore = await cookies();
  const encryptedValue = encryptSensitiveValue(apiKey);

  cookieStore.set(USER_API_KEY_COOKIE_NAME, encryptedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearEncryptedUserApiKeyCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_API_KEY_COOKIE_NAME);
}

export async function getDecryptedUserApiKeyFromCookie() {
  const cookieStore = await cookies();
  const encryptedValue = cookieStore.get(USER_API_KEY_COOKIE_NAME)?.value;

  if (!encryptedValue) {
    return null;
  }

  try {
    return decryptSensitiveValue(encryptedValue);
  } catch {
    return null;
  }
}

export async function hasUserApiKeyCookie() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(USER_API_KEY_COOKIE_NAME)?.value);
}