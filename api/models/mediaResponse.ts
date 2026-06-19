// @ts-nocheck
import type { MediaResponseMediaType } from './mediaResponseMediaType';

export interface MediaResponse {
  id?: string;
  originalFilename?: string;
  contentType?: string;
  size?: number;
  mediaType?: MediaResponseMediaType;
}
