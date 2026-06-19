// @ts-nocheck

/**
 * Request payload for changing account password.
 */
export interface ChangePasswordRequest {
  /** Current account password. */
  currentPassword: string;
  /**
     * New account password.
     * @minLength 8
     * @maxLength 100
     */
  newPassword: string;
}
