// @ts-nocheck
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'

import type {
  ApiResponseListPostResponse,
  ApiResponsePaginationResponsePostResponse,
  ApiResponsePostResponse,
  ApiResponseVoid,
  CreatePostRequest,
  GetPostsParams,
  UpdatePostRequest
} from '../models'

import { mainInstance } from '../mutator/custom-instance'
import type { ErrorType, BodyType } from '../mutator/custom-instance'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

export type updatePostResponse200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type updatePostResponse404 = {
  data: ApiResponsePostResponse
  status: 404
}

export type updatePostResponseSuccess = updatePostResponse200 & {
  headers: Headers
}
export type updatePostResponseError = updatePostResponse404 & {
  headers: Headers
}

export type updatePostResponse = updatePostResponseSuccess | updatePostResponseError

export const getUpdatePostUrl = (id: string) => {
  return `/post/${id}`
}

/**
 * Update an existing blog post.
 * @summary Update post
 */
export const updatePost = async (
  id: string,
  updatePostRequest: UpdatePostRequest,
  options?: RequestInit
): Promise<updatePostResponse> => {
  return mainInstance<updatePostResponse>(getUpdatePostUrl(id), {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updatePostRequest)
  })
}

export const getUpdatePostMutationOptions = <
  TError = ErrorType<ApiResponsePostResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updatePost>>,
    TError,
    { id: string; data: BodyType<UpdatePostRequest> },
    TContext
  >
  request?: SecondParameter<typeof mainInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof updatePost>>,
  TError,
  { id: string; data: BodyType<UpdatePostRequest> },
  TContext
> => {
  const mutationKey = ['updatePost']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updatePost>>,
    { id: string; data: BodyType<UpdatePostRequest> }
  > = (props) => {
    const { id, data } = props ?? {}

    return updatePost(id, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UpdatePostMutationResult = NonNullable<Awaited<ReturnType<typeof updatePost>>>
export type UpdatePostMutationBody = BodyType<UpdatePostRequest>
export type UpdatePostMutationError = ErrorType<ApiResponsePostResponse>

/**
 * @summary Update post
 */
export const useUpdatePost = <TError = ErrorType<ApiResponsePostResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof updatePost>>,
      TError,
      { id: string; data: BodyType<UpdatePostRequest> },
      TContext
    >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof updatePost>>,
  TError,
  { id: string; data: BodyType<UpdatePostRequest> },
  TContext
> => {
  return useMutation(getUpdatePostMutationOptions(options), queryClient)
}
export type deletePostResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type deletePostResponse404 = {
  data: ApiResponseVoid
  status: 404
}

export type deletePostResponseSuccess = deletePostResponse200 & {
  headers: Headers
}
export type deletePostResponseError = deletePostResponse404 & {
  headers: Headers
}

export type deletePostResponse = deletePostResponseSuccess | deletePostResponseError

export const getDeletePostUrl = (id: string) => {
  return `/post/${id}`
}

/**
 * Delete a blog post by its identifier.
 * @summary Delete post
 */
export const deletePost = async (id: string, options?: RequestInit): Promise<deletePostResponse> => {
  return mainInstance<deletePostResponse>(getDeletePostUrl(id), {
    ...options,
    method: 'DELETE'
  })
}

export const getDeletePostMutationOptions = <TError = ErrorType<ApiResponseVoid>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePost>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof mainInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof deletePost>>, TError, { id: string }, TContext> => {
  const mutationKey = ['deletePost']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deletePost>>, { id: string }> = (props) => {
    const { id } = props ?? {}

    return deletePost(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeletePostMutationResult = NonNullable<Awaited<ReturnType<typeof deletePost>>>

export type DeletePostMutationError = ErrorType<ApiResponseVoid>

/**
 * @summary Delete post
 */
export const useDeletePost = <TError = ErrorType<ApiResponseVoid>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePost>>, TError, { id: string }, TContext>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<Awaited<ReturnType<typeof deletePost>>, TError, { id: string }, TContext> => {
  return useMutation(getDeletePostMutationOptions(options), queryClient)
}
export type getPostsResponse200 = {
  data: ApiResponsePaginationResponsePostResponse
  status: 200
}

export type getPostsResponseSuccess = getPostsResponse200 & {
  headers: Headers
}
export type getPostsResponse = getPostsResponseSuccess

export const getGetPostsUrl = (params?: GetPostsParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  })

  const stringifiedParams = normalizedParams.toString()

  return stringifiedParams.length > 0 ? `/post?${stringifiedParams}` : `/post`
}

/**
 * Retrieve paginated posts with filtering and sorting options.
 * @summary Search posts
 */
export const getPosts = async (params?: GetPostsParams, options?: RequestInit): Promise<getPostsResponse> => {
  return mainInstance<getPostsResponse>(getGetPostsUrl(params), {
    ...options,
    method: 'GET'
  })
}

export const getGetPostsInfiniteQueryKey = (params?: GetPostsParams) => {
  return ['infinite', `/post`, ...(params ? [params] : [])] as const
}

export const getGetPostsQueryKey = (params?: GetPostsParams) => {
  return [`/post`, ...(params ? [params] : [])] as const
}

export const getGetPostsInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getPosts>>, GetPostsParams['page']>,
  TError = ErrorType<unknown>
>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData, QueryKey, GetPostsParams['page']>
    >
    request?: SecondParameter<typeof mainInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetPostsInfiniteQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPosts>>, QueryKey, GetPostsParams['page']> = ({
    signal,
    pageParam
  }) => getPosts({ ...params, page: pageParam ?? params?.['page'] }, { signal, ...requestOptions })

  return { queryKey, queryFn, ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getPosts>>,
    TError,
    TData,
    QueryKey,
    GetPostsParams['page']
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetPostsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getPosts>>>
export type GetPostsInfiniteQueryError = ErrorType<unknown>

export function useGetPostsInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getPosts>>, GetPostsParams['page']>,
  TError = ErrorType<unknown>
>(
  params: undefined | GetPostsParams,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData, QueryKey, GetPostsParams['page']>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getPosts>>,
          TError,
          Awaited<ReturnType<typeof getPosts>>,
          QueryKey
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetPostsInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getPosts>>, GetPostsParams['page']>,
  TError = ErrorType<unknown>
>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData, QueryKey, GetPostsParams['page']>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getPosts>>,
          TError,
          Awaited<ReturnType<typeof getPosts>>,
          QueryKey
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetPostsInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getPosts>>, GetPostsParams['page']>,
  TError = ErrorType<unknown>
>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData, QueryKey, GetPostsParams['page']>
    >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Search posts
 */

export function useGetPostsInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getPosts>>, GetPostsParams['page']>,
  TError = ErrorType<unknown>
>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData, QueryKey, GetPostsParams['page']>
    >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetPostsInfiniteQueryOptions(params, options)

  const query = useInfiniteQuery(queryOptions, queryClient) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>
  }

  return { ...query, queryKey: queryOptions.queryKey }
}

export const getGetPostsQueryOptions = <TData = Awaited<ReturnType<typeof getPosts>>, TError = ErrorType<unknown>>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetPostsQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPosts>>> = ({ signal }) =>
    getPosts(params, { signal, ...requestOptions })

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getPosts>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetPostsQueryResult = NonNullable<Awaited<ReturnType<typeof getPosts>>>
export type GetPostsQueryError = ErrorType<unknown>

export function useGetPosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = ErrorType<unknown>>(
  params: undefined | GetPostsParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof getPosts>>, TError, Awaited<ReturnType<typeof getPosts>>>,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetPosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = ErrorType<unknown>>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof getPosts>>, TError, Awaited<ReturnType<typeof getPosts>>>,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetPosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = ErrorType<unknown>>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Search posts
 */

export function useGetPosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = ErrorType<unknown>>(
  params?: GetPostsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetPostsQueryOptions(params, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>
  }

  return { ...query, queryKey: queryOptions.queryKey }
}

export type createPostResponse200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type createPostResponse403 = {
  data: ApiResponsePostResponse
  status: 403
}

export type createPostResponseSuccess = createPostResponse200 & {
  headers: Headers
}
export type createPostResponseError = createPostResponse403 & {
  headers: Headers
}

export type createPostResponse = createPostResponseSuccess | createPostResponseError

export const getCreatePostUrl = () => {
  return `/post`
}

/**
 * Create a new blog post.
 * @summary Create post
 */
export const createPost = async (
  createPostRequest: CreatePostRequest,
  options?: RequestInit
): Promise<createPostResponse> => {
  return mainInstance<createPostResponse>(getCreatePostUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createPostRequest)
  })
}

export const getCreatePostMutationOptions = <
  TError = ErrorType<ApiResponsePostResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createPost>>,
    TError,
    { data: BodyType<CreatePostRequest> },
    TContext
  >
  request?: SecondParameter<typeof mainInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof createPost>>,
  TError,
  { data: BodyType<CreatePostRequest> },
  TContext
> => {
  const mutationKey = ['createPost']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof createPost>>, { data: BodyType<CreatePostRequest> }> = (
    props
  ) => {
    const { data } = props ?? {}

    return createPost(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreatePostMutationResult = NonNullable<Awaited<ReturnType<typeof createPost>>>
export type CreatePostMutationBody = BodyType<CreatePostRequest>
export type CreatePostMutationError = ErrorType<ApiResponsePostResponse>

/**
 * @summary Create post
 */
export const useCreatePost = <TError = ErrorType<ApiResponsePostResponse>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createPost>>,
      TError,
      { data: BodyType<CreatePostRequest> },
      TContext
    >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof createPost>>,
  TError,
  { data: BodyType<CreatePostRequest> },
  TContext
> => {
  return useMutation(getCreatePostMutationOptions(options), queryClient)
}
export type publishResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type publishResponseSuccess = publishResponse200 & {
  headers: Headers
}
export type publishResponse = publishResponseSuccess

export const getPublishUrl = (id: string) => {
  return `/post/${id}/publish`
}

/**
 * Publish a draft post.
 * @summary Publish post
 */
export const publish = async (id: string, options?: RequestInit): Promise<publishResponse> => {
  return mainInstance<publishResponse>(getPublishUrl(id), {
    ...options,
    method: 'POST'
  })
}

export const getPublishMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof publish>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof mainInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof publish>>, TError, { id: string }, TContext> => {
  const mutationKey = ['publish']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof publish>>, { id: string }> = (props) => {
    const { id } = props ?? {}

    return publish(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type PublishMutationResult = NonNullable<Awaited<ReturnType<typeof publish>>>

export type PublishMutationError = ErrorType<unknown>

/**
 * @summary Publish post
 */
export const usePublish = <TError = ErrorType<unknown>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof publish>>, TError, { id: string }, TContext>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<Awaited<ReturnType<typeof publish>>, TError, { id: string }, TContext> => {
  return useMutation(getPublishMutationOptions(options), queryClient)
}
export type archivePostResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type archivePostResponseSuccess = archivePostResponse200 & {
  headers: Headers
}
export type archivePostResponse = archivePostResponseSuccess

export const getArchivePostUrl = (id: string) => {
  return `/post/${id}/archive`
}

/**
 * Archive a published post.
 * @summary Archive post
 */
export const archivePost = async (id: string, options?: RequestInit): Promise<archivePostResponse> => {
  return mainInstance<archivePostResponse>(getArchivePostUrl(id), {
    ...options,
    method: 'POST'
  })
}

export const getArchivePostMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof archivePost>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof mainInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof archivePost>>, TError, { id: string }, TContext> => {
  const mutationKey = ['archivePost']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof archivePost>>, { id: string }> = (props) => {
    const { id } = props ?? {}

    return archivePost(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ArchivePostMutationResult = NonNullable<Awaited<ReturnType<typeof archivePost>>>

export type ArchivePostMutationError = ErrorType<unknown>

/**
 * @summary Archive post
 */
export const useArchivePost = <TError = ErrorType<unknown>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof archivePost>>, TError, { id: string }, TContext>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<Awaited<ReturnType<typeof archivePost>>, TError, { id: string }, TContext> => {
  return useMutation(getArchivePostMutationOptions(options), queryClient)
}
export type getPostBySlugResponse200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type getPostBySlugResponse404 = {
  data: ApiResponsePostResponse
  status: 404
}

export type getPostBySlugResponseSuccess = getPostBySlugResponse200 & {
  headers: Headers
}
export type getPostBySlugResponseError = getPostBySlugResponse404 & {
  headers: Headers
}

export type getPostBySlugResponse = getPostBySlugResponseSuccess | getPostBySlugResponseError

export const getGetPostBySlugUrl = (slug: string) => {
  return `/post/${slug}`
}

/**
 * Retrieve detailed information of a post by its slug.
 * @summary Get post by slug
 */
export const getPostBySlug = async (slug: string, options?: RequestInit): Promise<getPostBySlugResponse> => {
  return mainInstance<getPostBySlugResponse>(getGetPostBySlugUrl(slug), {
    ...options,
    method: 'GET'
  })
}

export const getGetPostBySlugQueryKey = (slug: string) => {
  return [`/post/${slug}`] as const
}

export const getGetPostBySlugQueryOptions = <
  TData = Awaited<ReturnType<typeof getPostBySlug>>,
  TError = ErrorType<ApiResponsePostResponse>
>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPostBySlug>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetPostBySlugQueryKey(slug)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPostBySlug>>> = ({ signal }) =>
    getPostBySlug(slug, { signal, ...requestOptions })

  return { queryKey, queryFn, enabled: slug !== null && slug !== undefined, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getPostBySlug>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetPostBySlugQueryResult = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
export type GetPostBySlugQueryError = ErrorType<ApiResponsePostResponse>

export function useGetPostBySlug<
  TData = Awaited<ReturnType<typeof getPostBySlug>>,
  TError = ErrorType<ApiResponsePostResponse>
>(
  slug: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPostBySlug>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getPostBySlug>>,
          TError,
          Awaited<ReturnType<typeof getPostBySlug>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetPostBySlug<
  TData = Awaited<ReturnType<typeof getPostBySlug>>,
  TError = ErrorType<ApiResponsePostResponse>
>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPostBySlug>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getPostBySlug>>,
          TError,
          Awaited<ReturnType<typeof getPostBySlug>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetPostBySlug<
  TData = Awaited<ReturnType<typeof getPostBySlug>>,
  TError = ErrorType<ApiResponsePostResponse>
>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPostBySlug>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get post by slug
 */

export function useGetPostBySlug<
  TData = Awaited<ReturnType<typeof getPostBySlug>>,
  TError = ErrorType<ApiResponsePostResponse>
>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getPostBySlug>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getGetPostBySlugQueryOptions(slug, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>
  }

  return { ...query, queryKey: queryOptions.queryKey }
}

export type relatedPostsResponse200 = {
  data: ApiResponseListPostResponse
  status: 200
}

export type relatedPostsResponseSuccess = relatedPostsResponse200 & {
  headers: Headers
}
export type relatedPostsResponse = relatedPostsResponseSuccess

export const getRelatedPostsUrl = (slug: string) => {
  return `/post/${slug}/related`
}

/**
 * Retrieve posts related to the specified post slug.
 * @summary Get related posts
 */
export const relatedPosts = async (slug: string, options?: RequestInit): Promise<relatedPostsResponse> => {
  return mainInstance<relatedPostsResponse>(getRelatedPostsUrl(slug), {
    ...options,
    method: 'GET'
  })
}

export const getRelatedPostsQueryKey = (slug: string) => {
  return [`/post/${slug}/related`] as const
}

export const getRelatedPostsQueryOptions = <
  TData = Awaited<ReturnType<typeof relatedPosts>>,
  TError = ErrorType<unknown>
>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof relatedPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getRelatedPostsQueryKey(slug)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof relatedPosts>>> = ({ signal }) =>
    relatedPosts(slug, { signal, ...requestOptions })

  return { queryKey, queryFn, enabled: slug !== null && slug !== undefined, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof relatedPosts>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type RelatedPostsQueryResult = NonNullable<Awaited<ReturnType<typeof relatedPosts>>>
export type RelatedPostsQueryError = ErrorType<unknown>

export function useRelatedPosts<TData = Awaited<ReturnType<typeof relatedPosts>>, TError = ErrorType<unknown>>(
  slug: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof relatedPosts>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof relatedPosts>>,
          TError,
          Awaited<ReturnType<typeof relatedPosts>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useRelatedPosts<TData = Awaited<ReturnType<typeof relatedPosts>>, TError = ErrorType<unknown>>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof relatedPosts>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof relatedPosts>>,
          TError,
          Awaited<ReturnType<typeof relatedPosts>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useRelatedPosts<TData = Awaited<ReturnType<typeof relatedPosts>>, TError = ErrorType<unknown>>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof relatedPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get related posts
 */

export function useRelatedPosts<TData = Awaited<ReturnType<typeof relatedPosts>>, TError = ErrorType<unknown>>(
  slug: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof relatedPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getRelatedPostsQueryOptions(slug, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>
  }

  return { ...query, queryKey: queryOptions.queryKey }
}

export type featuredPostsResponse200 = {
  data: ApiResponseListPostResponse
  status: 200
}

export type featuredPostsResponseSuccess = featuredPostsResponse200 & {
  headers: Headers
}
export type featuredPostsResponse = featuredPostsResponseSuccess

export const getFeaturedPostsUrl = () => {
  return `/post/featured`
}

/**
 * Retrieve all featured posts.
 * @summary Get featured posts
 */
export const featuredPosts = async (options?: RequestInit): Promise<featuredPostsResponse> => {
  return mainInstance<featuredPostsResponse>(getFeaturedPostsUrl(), {
    ...options,
    method: 'GET'
  })
}

export const getFeaturedPostsQueryKey = () => {
  return [`/post/featured`] as const
}

export const getFeaturedPostsQueryOptions = <
  TData = Awaited<ReturnType<typeof featuredPosts>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof featuredPosts>>, TError, TData>>
  request?: SecondParameter<typeof mainInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFeaturedPostsQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof featuredPosts>>> = ({ signal }) =>
    featuredPosts({ signal, ...requestOptions })

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof featuredPosts>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FeaturedPostsQueryResult = NonNullable<Awaited<ReturnType<typeof featuredPosts>>>
export type FeaturedPostsQueryError = ErrorType<unknown>

export function useFeaturedPosts<TData = Awaited<ReturnType<typeof featuredPosts>>, TError = ErrorType<unknown>>(
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof featuredPosts>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof featuredPosts>>,
          TError,
          Awaited<ReturnType<typeof featuredPosts>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFeaturedPosts<TData = Awaited<ReturnType<typeof featuredPosts>>, TError = ErrorType<unknown>>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof featuredPosts>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof featuredPosts>>,
          TError,
          Awaited<ReturnType<typeof featuredPosts>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFeaturedPosts<TData = Awaited<ReturnType<typeof featuredPosts>>, TError = ErrorType<unknown>>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof featuredPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get featured posts
 */

export function useFeaturedPosts<TData = Awaited<ReturnType<typeof featuredPosts>>, TError = ErrorType<unknown>>(
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof featuredPosts>>, TError, TData>>
    request?: SecondParameter<typeof mainInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getFeaturedPostsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>
  }

  return { ...query, queryKey: queryOptions.queryKey }
}
