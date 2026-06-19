// @ts-nocheck
import type { AddressStandardClaim } from './addressStandardClaim';
import type { OidcUserInfoClaims } from './oidcUserInfoClaims';

export interface OidcUserInfo {
  claims?: OidcUserInfoClaims;
  address?: AddressStandardClaim;
  locale?: string;
  zoneInfo?: string;
  fullName?: string;
  profile?: string;
  updatedAt?: string;
  email?: string;
  subject?: string;
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
