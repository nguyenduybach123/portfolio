// @ts-nocheck
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  ApiResponseCommentResponse,
  ApiResponseListCommentResponse,
  ApiResponseVoid,
  CreateCommentParams,
  CreateCommentRequest,
  Delete1Params
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type replyCommentResponse200 = {
  data: ApiResponseCommentResponse
  status: 200
}

export type replyCommentResponse401 = {
  data: ApiResponseCommentResponse
  status: 401
}

export type replyCommentResponse404 = {
  data: ApiResponseCommentResponse
  status: 404
}

export type replyCommentResponseSuccess = (replyCommentResponse200) & {
  headers: Headers;
};
export type replyCommentResponseError = (replyCommentResponse401 | replyCommentResponse404) & {
  headers: Headers;
};

export type replyCommentResponse = (replyCommentResponseSuccess | replyCommentResponseError)

export const getReplyCommentUrl = () => {




  return `/comment/reply`
}

/**
 * Creates a reply for an existing comment.
 * @summary Reply to a comment
 */
export const replyComment = async (createCommentRequest: CreateCommentRequest, options?: RequestInit): Promise<replyCommentResponse> => {

  return mainInstance<replyCommentResponse>(getReplyCommentUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createCommentRequest)
  }
);}




export const getReplyCommentMutationOptions = <TError = ErrorType<ApiResponseCommentResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof replyComment>>, TError,{data: BodyType<CreateCommentRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof replyComment>>, TError,{data: BodyType<CreateCommentRequest>}, TContext> => {

const mutationKey = ['replyComment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof replyComment>>, {data: BodyType<CreateCommentRequest>}> = (props) => {
          const {data} = props ?? {};

          return  replyComment(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ReplyCommentMutationResult = NonNullable<Awaited<ReturnType<typeof replyComment>>>
    export type ReplyCommentMutationBody = BodyType<CreateCommentRequest>
    export type ReplyCommentMutationError = ErrorType<ApiResponseCommentResponse>

    /**
 * @summary Reply to a comment
 */
export const useReplyComment = <TError = ErrorType<ApiResponseCommentResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof replyComment>>, TError,{data: BodyType<CreateCommentRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof replyComment>>,
        TError,
        {data: BodyType<CreateCommentRequest>},
        TContext
      > => {
      return useMutation(getReplyCommentMutationOptions(options), queryClient);
    }
    export type createCommentResponse200 = {
  data: ApiResponseCommentResponse
  status: 200
}

export type createCommentResponse401 = {
  data: ApiResponseCommentResponse
  status: 401
}

export type createCommentResponse404 = {
  data: ApiResponseCommentResponse
  status: 404
}

export type createCommentResponseSuccess = (createCommentResponse200) & {
  headers: Headers;
};
export type createCommentResponseError = (createCommentResponse401 | createCommentResponse404) & {
  headers: Headers;
};

export type createCommentResponse = (createCommentResponseSuccess | createCommentResponseError)

export const getCreateCommentUrl = (params: CreateCommentParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/comment/create?${stringifiedParams}` : `/comment/create`
}

/**
 * Creates a new comment for the specified post.
 * @summary Create a comment
 */
export const createComment = async (createCommentRequest: CreateCommentRequest,
    params: CreateCommentParams, options?: RequestInit): Promise<createCommentResponse> => {

  return mainInstance<createCommentResponse>(getCreateCommentUrl(params),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createCommentRequest)
  }
);}




export const getCreateCommentMutationOptions = <TError = ErrorType<ApiResponseCommentResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createComment>>, TError,{data: BodyType<CreateCommentRequest>;params: CreateCommentParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof createComment>>, TError,{data: BodyType<CreateCommentRequest>;params: CreateCommentParams}, TContext> => {

const mutationKey = ['createComment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createComment>>, {data: BodyType<CreateCommentRequest>;params: CreateCommentParams}> = (props) => {
          const {data,params} = props ?? {};

          return  createComment(data,params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateCommentMutationResult = NonNullable<Awaited<ReturnType<typeof createComment>>>
    export type CreateCommentMutationBody = BodyType<CreateCommentRequest>
    export type CreateCommentMutationError = ErrorType<ApiResponseCommentResponse>

    /**
 * @summary Create a comment
 */
export const useCreateComment = <TError = ErrorType<ApiResponseCommentResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createComment>>, TError,{data: BodyType<CreateCommentRequest>;params: CreateCommentParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof createComment>>,
        TError,
        {data: BodyType<CreateCommentRequest>;params: CreateCommentParams},
        TContext
      > => {
      return useMutation(getCreateCommentMutationOptions(options), queryClient);
    }
    export type getCommentsResponse200 = {
  data: ApiResponseListCommentResponse
  status: 200
}

export type getCommentsResponse404 = {
  data: ApiResponseListCommentResponse
  status: 404
}

export type getCommentsResponseSuccess = (getCommentsResponse200) & {
  headers: Headers;
};
export type getCommentsResponseError = (getCommentsResponse404) & {
  headers: Headers;
};

export type getCommentsResponse = (getCommentsResponseSuccess | getCommentsResponseError)

export const getGetCommentsUrl = () => {




  return `/comment`
}

/**
 * Returns all comments associated with the specified post.
 * @summary Get comments by post ID
 */
export const getComments = async ( options?: RequestInit): Promise<getCommentsResponse> => {

  return mainInstance<getCommentsResponse>(getGetCommentsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetCommentsQueryKey = () => {
    return [
    `/comment`
    ] as const;
    }


export const getGetCommentsQueryOptions = <TData = Awaited<ReturnType<typeof getComments>>, TError = ErrorType<ApiResponseListCommentResponse>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getComments>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCommentsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getComments>>> = ({ signal }) => getComments({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getComments>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetCommentsQueryResult = NonNullable<Awaited<ReturnType<typeof getComments>>>
export type GetCommentsQueryError = ErrorType<ApiResponseListCommentResponse>


export function useGetComments<TData = Awaited<ReturnType<typeof getComments>>, TError = ErrorType<ApiResponseListCommentResponse>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getComments>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getComments>>,
          TError,
          Awaited<ReturnType<typeof getComments>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetComments<TData = Awaited<ReturnType<typeof getComments>>, TError = ErrorType<ApiResponseListCommentResponse>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getComments>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getComments>>,
          TError,
          Awaited<ReturnType<typeof getComments>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetComments<TData = Awaited<ReturnType<typeof getComments>>, TError = ErrorType<ApiResponseListCommentResponse>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getComments>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get comments by post ID
 */

export function useGetComments<TData = Awaited<ReturnType<typeof getComments>>, TError = ErrorType<ApiResponseListCommentResponse>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getComments>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetCommentsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type delete1Response200 = {
  data: ApiResponseVoid
  status: 200
}

export type delete1Response401 = {
  data: ApiResponseVoid
  status: 401
}

export type delete1Response403 = {
  data: ApiResponseVoid
  status: 403
}

export type delete1Response404 = {
  data: ApiResponseVoid
  status: 404
}

export type delete1ResponseSuccess = (delete1Response200) & {
  headers: Headers;
};
export type delete1ResponseError = (delete1Response401 | delete1Response403 | delete1Response404) & {
  headers: Headers;
};

export type delete1Response = (delete1ResponseSuccess | delete1ResponseError)

export const getDelete1Url = (commentId: string,
    params: Delete1Params,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/comment/${commentId}?${stringifiedParams}` : `/comment/${commentId}`
}

/**
 * Deletes a comment owned by the authenticated user.
 * @summary Delete a comment
 */
export const delete1 = async (commentId: string,
    params: Delete1Params, options?: RequestInit): Promise<delete1Response> => {

  return mainInstance<delete1Response>(getDelete1Url(commentId,params),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDelete1MutationOptions = <TError = ErrorType<ApiResponseVoid>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof delete1>>, TError,{commentId: string;params: Delete1Params}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof delete1>>, TError,{commentId: string;params: Delete1Params}, TContext> => {

const mutationKey = ['delete1'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof delete1>>, {commentId: string;params: Delete1Params}> = (props) => {
          const {commentId,params} = props ?? {};

          return  delete1(commentId,params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type Delete1MutationResult = NonNullable<Awaited<ReturnType<typeof delete1>>>

    export type Delete1MutationError = ErrorType<ApiResponseVoid>

    /**
 * @summary Delete a comment
 */
export const useDelete1 = <TError = ErrorType<ApiResponseVoid>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof delete1>>, TError,{commentId: string;params: Delete1Params}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof delete1>>,
        TError,
        {commentId: string;params: Delete1Params},
        TContext
      > => {
      return useMutation(getDelete1MutationOptions(options), queryClient);
    }
