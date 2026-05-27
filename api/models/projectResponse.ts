// @ts-nocheck
import type { ProjectResponseCategory } from './projectResponseCategory';
import type { ProjectResponseType } from './projectResponseType';

export interface ProjectResponse {
  id?: string;
  title?: string;
  description?: string;
  type?: ProjectResponseType;
  category?: ProjectResponseCategory;
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  technologies?: string[];
  responsibilities?: string[];
}
