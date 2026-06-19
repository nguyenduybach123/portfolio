// @ts-nocheck
import type { UpdateProjectRequestCategory } from './updateProjectRequestCategory';
import type { UpdateProjectRequestType } from './updateProjectRequestType';

export interface UpdateProjectRequest {
  /**
     * @minLength 0
     * @maxLength 255
     */
  title: string;
  /**
     * @minLength 0
     * @maxLength 500
     */
  summary: string;
  description: string;
  type: UpdateProjectRequestType;
  category: UpdateProjectRequestCategory;
  /**
     * @minLength 0
     * @maxLength 500
     */
  githubUrl?: string;
  /**
     * @minLength 0
     * @maxLength 500
     */
  demoUrl?: string;
  thumbnailMediaId?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  technologies?: string[];
  responsibilities?: string[];
}
