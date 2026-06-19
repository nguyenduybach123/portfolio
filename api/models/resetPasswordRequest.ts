// @ts-nocheck

/**
 * Request payload for resetting password.
 */
export interface ResetPasswordRequest {
  email?: string;
  otp: string;
  /**
     * @minLength 8
     * @maxLength 100
     */
  newPassword: string;
}
