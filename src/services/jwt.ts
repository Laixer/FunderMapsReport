// Use previous verion as example: https://github.com/Laixer/FunderMapsClientApp/blob/master/src/services/auth.ts#L3
// From line 130

import { type JwtPayload, jwtDecode } from "jwt-decode";
import api from "./api";

// ****************************************************************************
//  Interface
// ****************************************************************************

interface FundermapsJwtPayload extends JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string,
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string,
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string,
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
  "cfo": string,
  "cfor": string
}

interface AuthorizationHeader {
  Authorization: string
}

// ****************************************************************************
//  Private
// ****************************************************************************

// localStorage keys
const access_token_key = 'access_token';

/**
 * Gets the stored access token.
 */
const getAccessToken = (): string | null => {
  return localStorage.getItem(access_token_key);
}

/**
 * Get the access token from storage and decode it.
 */
const getAccessTokenDecoded = (token?: string | null): FundermapsJwtPayload => {
  token = token ?? getAccessToken();
  if (!token) {
    throw new Error('Could not get access token when requesting user');
  }

  return jwtDecode<FundermapsJwtPayload>(token);
}


// ****************************************************************************
//  Public
// ****************************************************************************

/**
 * Whether an access token is available, expired or not
 */
export const hasAccessToken = (): boolean => {
  return getAccessToken() !== null;
}

export const hasAccessTokenExpired = (token?: string | null): boolean => {
  try {
    token = token ?? getAccessToken();
    if (!token) {
      return true;
    }

    const decoded = jwtDecode<FundermapsJwtPayload>(token);

    if (decoded?.exp) {
      // Use an early expiration timeout (30 seconds)
      return (Date.now() / 1000) >= (decoded.exp - 30);
    }
  } catch (e) {
    console.error(e);
  }
  return true;
}

/**
 * Check whether the user has credentials stored
 * Note: the credentials may be invalid. It's up to the server to verify the token.
 */
export const hasNonExpiredToken = (token?: string | null): boolean => {
  return !hasAccessTokenExpired(token);
}

/**
 * return authorization header with jwt token, or an empty object
 */
export const getAuthHeader = (): AuthorizationHeader | {} => {
  const token = getAccessToken();
  return (hasNonExpiredToken(token))
    ? { 'Authorization': 'Bearer ' + token }
    : {};
}

/**
 * Get information from the token
 *  : string|number|string[]|null 
 */
export const getClaimFromAccessToken = (claim: string) => {
  if (hasNonExpiredToken()) {
    const parsed = getAccessTokenDecoded();
    return parsed?.[claim as keyof FundermapsJwtPayload] || null;
  }

  return null;
}

/**
 * Store the access token in local storage
 */
export const storeAccessToken = (token: string): void => {
  localStorage.setItem(access_token_key, token);
}

/**
 * Remove the token, ending the user session
 */
export const removeAccessToken = (): void => {
  localStorage.removeItem(access_token_key);
}

/**
 * Renew the authentication credentials
 *  This refresh is called in an interval in App.vue
 */
export const refreshAccessToken = (): void => {
  if (hasNonExpiredToken()) {
    api.auth
      .refresh()
      .then(response => storeAccessToken(response.token))
      .catch(() => {
        // TODO: Redirect to Login?
        // console.error(error)
      });
  }
}

