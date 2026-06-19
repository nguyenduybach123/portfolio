// @ts-nocheck
import type { ProjectResponseCategory } from './projectResponseCategory';
import type { ProjectResponseType } from './projectResponseType';

export interface ProjectResponse {
  id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
  type?: ProjectResponseType;
  category?: ProjectResponseCategory;
  githubUrl?: string;
  demoUrl?: string;
  thumbnailMediaId?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  technologies?: string[];
  responsibilities?: string[];
  createdAt?: string;
  updatedAt?: string;
}
