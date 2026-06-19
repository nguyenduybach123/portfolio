// @ts-nocheck
import type { AddressStandardClaim } from './addressStandardClaim';
import type { OidcIdTokenClaims } from './oidcIdTokenClaims';

export interface OidcIdToken {
  tokenValue?: string;
  issuedAt?: string;
  expiresAt?: string;
  claims?: OidcIdTokenClaims;
  authenticatedAt?: string;
  authorizedParty?: string;
  accessTokenHash?: string;
  audience?: string[];
  subject?: string;
  issuer?: string;
  nonce?: string;
  authenticationMethods?: string[];
  authorizationCodeHash?: string;
  authenticationContextClass?: string;
  address?: AddressStandardClaim;
  locale?: string;
  zoneInfo?: string;
  fullName?: string;
  profile?: string;
  updatedAt?: string;
  email?: string;
  givenName?: string;
  birthdate?: string;
  phoneNumber?: string;
  middleName?: string;
  nickName?: string;
  emailVerified?: boolean;
  familyName?: string;
  picture?: string;
  gender?: string;
  website?: string;
  phoneNumberVerified?: boolean;
  preferredUsername?: string;
}
