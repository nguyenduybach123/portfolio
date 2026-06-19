// @ts-nocheck

export interface UserSessionResponse {
  id?: string;
  deviceName?: string;
  ipAddress?: string;
  createdAt?: string;
  lastActiveAt?: string;
  current?: boolean;
  revoked?: boolean;
}
