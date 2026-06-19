// @ts-nocheck
import type { CreateProjectRequestCategory } from './createProjectRequestCategory';
import type { CreateProjectRequestType } from './createProjectRequestType';

export interface CreateProjectRequest {
  /**
     * @minLength 0
     * @maxLength 150
     */
  title: string;
  /**
     * @minLength 0
     * @maxLength 500
     */
  summary: string;
  description?: string;
  type: CreateProjectRequestType;
  category: CreateProjectRequestCategory;
  githubUrl?: string;
  demoUrl?: string;
  thumbnailMediaId?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  technologies?: string[];
  responsibilities?: string[];
}
