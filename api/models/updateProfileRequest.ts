// @ts-nocheck

export interface UpdateProfileRequest {
  /**
     * @minLength 0
     * @maxLength 100
     */
  name: string;
  /**
     * @minLength 0
     * @maxLength 512
     */
  avatar?: string;
  /** @pattern ^\+?[0-9]{10,15}$ */
  phoneNumber?: string;
  /**
     * @minLength 0
     * @maxLength 255
     */
  bio?: string;
}
