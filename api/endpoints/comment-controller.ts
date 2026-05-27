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
  ApiResponseString,
  CommentRequest
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type createResponse200 = {
  data: ApiResponseCommentResponse
  status: 200
}

export type createResponseSuccess = (createResponse200) & {
  headers: Headers;
};
;

export type createResponse = (createResponseSuccess)

export const getCreateUrl = () => {




  return `/comments`
}

export const create = async (commentRequest: CommentRequest, options?: RequestInit): Promise<createResponse> => {

  return mainInstance<createResponse>(getCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(commentRequest)
  }
);}





export const getCreateQueryKey = (commentRequest?: BodyType<CommentRequest>,) => {
    return [
    'POST', `/comments`, commentRequest
    ] as const;
    }


export const getCreateQueryOptions = <TData = Awaited<ReturnType<typeof create>>, TError = ErrorType<unknown>>(commentRequest: BodyType<CommentRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getCreateQueryKey(commentRequest);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof create>>> = ({ signal }) => create(commentRequest, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof create>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type CreateQueryResult = NonNullable<Awaited<ReturnType<typeof create>>>
export type CreateQueryError = ErrorType<unknown>


export function useCreate<TData = Awaited<ReturnType<typeof create>>, TError = ErrorType<unknown>>(
 commentRequest: BodyType<CommentRequest>, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof create>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof create>>,
          TError,
          Awaited<ReturnType<typeof create>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useCreate<TData = Awaited<ReturnType<typeof create>>, TError = ErrorType<unknown>>(
 commentRequest: BodyType<CommentRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof create>>,
          TError,
          Awaited<ReturnType<typeof create>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useCreate<TData = Awaited<ReturnType<typeof create>>, TError = ErrorType<unknown>>(
 commentRequest: BodyType<CommentRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useCreate<TData = Awaited<ReturnType<typeof create>>, TError = ErrorType<unknown>>(
 commentRequest: BodyType<CommentRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getCreateQueryOptions(commentRequest,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type getByPostResponse200 = {
  data: ApiResponseListCommentResponse
  status: 200
}

export type getByPostResponseSuccess = (getByPostResponse200) & {
  headers: Headers;
};
;

export type getByPostResponse = (getByPostResponseSuccess)

export const getGetByPostUrl = (postId: string,) => {




  return `/comments/post/${postId}`
}

export const getByPost = async (postId: string, options?: RequestInit): Promise<getByPostResponse> => {

  return mainInstance<getByPostResponse>(getGetByPostUrl(postId),
  {
    ...options,
    method: 'GET'


  }
);}




export const getGetByPostMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getByPost>>, TError,{postId: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof getByPost>>, TError,{postId: string}, TContext> => {

const mutationKey = ['getByPost'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getByPost>>, {postId: string}> = (props) => {
          const {postId} = props ?? {};

          return  getByPost(postId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GetByPostMutationResult = NonNullable<Awaited<ReturnType<typeof getByPost>>>

    export type GetByPostMutationError = ErrorType<unknown>

    export const useGetByPost = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getByPost>>, TError,{postId: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof getByPost>>,
        TError,
        {postId: string},
        TContext
      > => {
      return useMutation(getGetByPostMutationOptions(options), queryClient);
    }
    export type delete2Response200 = {
  data: ApiResponseString
  status: 200
}

export type delete2ResponseSuccess = (delete2Response200) & {
  headers: Headers;
};
;

export type delete2Response = (delete2ResponseSuccess)

export const getDelete2Url = (commentId: string,) => {




  return `/comments/${commentId}`
}

export const delete2 = async (commentId: string, options?: RequestInit): Promise<delete2Response> => {

  return mainInstance<delete2Response>(getDelete2Url(commentId),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDelete2QueryKey = (commentId: string,) => {
    return [
    'DELETE', `/comments/${commentId}`
    ] as const;
    }


export const getDelete2QueryOptions = <TData = Awaited<ReturnType<typeof delete2>>, TError = ErrorType<unknown>>(commentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete2>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getDelete2QueryKey(commentId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof delete2>>> = ({ signal }) => delete2(commentId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: commentId !== null && commentId !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof delete2>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type Delete2QueryResult = NonNullable<Awaited<ReturnType<typeof delete2>>>
export type Delete2QueryError = ErrorType<unknown>


export function useDelete2<TData = Awaited<ReturnType<typeof delete2>>, TError = ErrorType<unknown>>(
 commentId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete2>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof delete2>>,
          TError,
          Awaited<ReturnType<typeof delete2>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDelete2<TData = Awaited<ReturnType<typeof delete2>>, TError = ErrorType<unknown>>(
 commentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete2>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof delete2>>,
          TError,
          Awaited<ReturnType<typeof delete2>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDelete2<TData = Awaited<ReturnType<typeof delete2>>, TError = ErrorType<unknown>>(
 commentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete2>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useDelete2<TData = Awaited<ReturnType<typeof delete2>>, TError = ErrorType<unknown>>(
 commentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete2>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getDelete2QueryOptions(commentId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






