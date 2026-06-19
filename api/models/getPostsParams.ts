// @ts-nocheck
import type { GetPostsStatus } from './getPostsStatus';

export type GetPostsParams = {
keyword?: string;
status?: GetPostsStatus;
featured?: boolean;
/**
 * @minimum 0
 */
page?: number;
/**
 * @minimum 1
 * @maximum 100
 */
size?: number;
sortBy?: string;
sortDirection?: string;
};
