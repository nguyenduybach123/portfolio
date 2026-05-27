// @ts-nocheck
import type { GetAll1Status } from './getAll1Status';
import type { Pageable } from './pageable';

export type GetAll1Params = {
keyword?: string;
status?: GetAll1Status;
featured?: boolean;
pageable: Pageable;
};
