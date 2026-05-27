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
  ApiResponsePagePostResponse,
  ApiResponsePostResponse,
  ApiResponseString,
  GetAll1Params,
  PostRequest
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type getById1Response200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type getById1ResponseSuccess = (getById1Response200) & {
  headers: Headers;
};
;

export type getById1Response = (getById1ResponseSuccess)

export const getGetById1Url = (id: string,) => {




  return `/api/posts/${id}`
}

export const getById1 = async (id: string, options?: RequestInit): Promise<getById1Response> => {

  return mainInstance<getById1Response>(getGetById1Url(id),
  {
    ...options,
    method: 'GET'


  }
);}




export const getGetById1MutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getById1>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof getById1>>, TError,{id: string}, TContext> => {

const mutationKey = ['getById1'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getById1>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  getById1(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GetById1MutationResult = NonNullable<Awaited<ReturnType<typeof getById1>>>

    export type GetById1MutationError = ErrorType<unknown>

    export const useGetById1 = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getById1>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof getById1>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getGetById1MutationOptions(options), queryClient);
    }
    export type update1Response200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type update1ResponseSuccess = (update1Response200) & {
  headers: Headers;
};
;

export type update1Response = (update1ResponseSuccess)

export const getUpdate1Url = (id: string,) => {




  return `/api/posts/${id}`
}

export const update1 = async (id: string,
    postRequest: PostRequest, options?: RequestInit): Promise<update1Response> => {

  return mainInstance<update1Response>(getUpdate1Url(id),
  {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(postRequest)
  }
);}





export const getUpdate1QueryKey = (id: string,
    postRequest?: BodyType<PostRequest>,) => {
    return [
    'PUT', `/api/posts/${id}`, postRequest
    ] as const;
    }


export const getUpdate1QueryOptions = <TData = Awaited<ReturnType<typeof update1>>, TError = ErrorType<unknown>>(id: string,
    postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUpdate1QueryKey(id,postRequest);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof update1>>> = ({ signal }) => update1(id,postRequest, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof update1>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type Update1QueryResult = NonNullable<Awaited<ReturnType<typeof update1>>>
export type Update1QueryError = ErrorType<unknown>


export function useUpdate1<TData = Awaited<ReturnType<typeof update1>>, TError = ErrorType<unknown>>(
 id: string,
    postRequest: BodyType<PostRequest>, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof update1>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof update1>>,
          TError,
          Awaited<ReturnType<typeof update1>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUpdate1<TData = Awaited<ReturnType<typeof update1>>, TError = ErrorType<unknown>>(
 id: string,
    postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update1>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof update1>>,
          TError,
          Awaited<ReturnType<typeof update1>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUpdate1<TData = Awaited<ReturnType<typeof update1>>, TError = ErrorType<unknown>>(
 id: string,
    postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useUpdate1<TData = Awaited<ReturnType<typeof update1>>, TError = ErrorType<unknown>>(
 id: string,
    postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUpdate1QueryOptions(id,postRequest,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type delete1Response200 = {
  data: ApiResponseString
  status: 200
}

export type delete1ResponseSuccess = (delete1Response200) & {
  headers: Headers;
};
;

export type delete1Response = (delete1ResponseSuccess)

export const getDelete1Url = (id: string,) => {




  return `/api/posts/${id}`
}

export const delete1 = async (id: string, options?: RequestInit): Promise<delete1Response> => {

  return mainInstance<delete1Response>(getDelete1Url(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDelete1QueryKey = (id: string,) => {
    return [
    'DELETE', `/api/posts/${id}`
    ] as const;
    }


export const getDelete1QueryOptions = <TData = Awaited<ReturnType<typeof delete1>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getDelete1QueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof delete1>>> = ({ signal }) => delete1(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof delete1>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type Delete1QueryResult = NonNullable<Awaited<ReturnType<typeof delete1>>>
export type Delete1QueryError = ErrorType<unknown>


export function useDelete1<TData = Awaited<ReturnType<typeof delete1>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete1>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof delete1>>,
          TError,
          Awaited<ReturnType<typeof delete1>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDelete1<TData = Awaited<ReturnType<typeof delete1>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete1>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof delete1>>,
          TError,
          Awaited<ReturnType<typeof delete1>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDelete1<TData = Awaited<ReturnType<typeof delete1>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useDelete1<TData = Awaited<ReturnType<typeof delete1>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof delete1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getDelete1QueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type getAll1Response200 = {
  data: ApiResponsePagePostResponse
  status: 200
}

export type getAll1ResponseSuccess = (getAll1Response200) & {
  headers: Headers;
};
;

export type getAll1Response = (getAll1ResponseSuccess)

export const getGetAll1Url = (params: GetAll1Params,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/posts?${stringifiedParams}` : `/api/posts`
}

export const getAll1 = async (params: GetAll1Params, options?: RequestInit): Promise<getAll1Response> => {

  return mainInstance<getAll1Response>(getGetAll1Url(params),
  {
    ...options,
    method: 'GET'


  }
);}




export const getGetAll1MutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getAll1>>, TError,{params: GetAll1Params}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof getAll1>>, TError,{params: GetAll1Params}, TContext> => {

const mutationKey = ['getAll1'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getAll1>>, {params: GetAll1Params}> = (props) => {
          const {params} = props ?? {};

          return  getAll1(params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GetAll1MutationResult = NonNullable<Awaited<ReturnType<typeof getAll1>>>

    export type GetAll1MutationError = ErrorType<unknown>

    export const useGetAll1 = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getAll1>>, TError,{params: GetAll1Params}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof getAll1>>,
        TError,
        {params: GetAll1Params},
        TContext
      > => {
      return useMutation(getGetAll1MutationOptions(options), queryClient);
    }
    export type create2Response200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type create2ResponseSuccess = (create2Response200) & {
  headers: Headers;
};
;

export type create2Response = (create2ResponseSuccess)

export const getCreate2Url = () => {




  return `/api/posts`
}

export const create2 = async (postRequest: PostRequest, options?: RequestInit): Promise<create2Response> => {

  return mainInstance<create2Response>(getCreate2Url(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(postRequest)
  }
);}





export const getCreate2QueryKey = (postRequest?: BodyType<PostRequest>,) => {
    return [
    'POST', `/api/posts`, postRequest
    ] as const;
    }


export const getCreate2QueryOptions = <TData = Awaited<ReturnType<typeof create2>>, TError = ErrorType<unknown>>(postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create2>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getCreate2QueryKey(postRequest);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof create2>>> = ({ signal }) => create2(postRequest, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof create2>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type Create2QueryResult = NonNullable<Awaited<ReturnType<typeof create2>>>
export type Create2QueryError = ErrorType<unknown>


export function useCreate2<TData = Awaited<ReturnType<typeof create2>>, TError = ErrorType<unknown>>(
 postRequest: BodyType<PostRequest>, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof create2>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof create2>>,
          TError,
          Awaited<ReturnType<typeof create2>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useCreate2<TData = Awaited<ReturnType<typeof create2>>, TError = ErrorType<unknown>>(
 postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create2>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof create2>>,
          TError,
          Awaited<ReturnType<typeof create2>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useCreate2<TData = Awaited<ReturnType<typeof create2>>, TError = ErrorType<unknown>>(
 postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create2>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useCreate2<TData = Awaited<ReturnType<typeof create2>>, TError = ErrorType<unknown>>(
 postRequest: BodyType<PostRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create2>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getCreate2QueryOptions(postRequest,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type increaseViewCountResponse200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type increaseViewCountResponseSuccess = (increaseViewCountResponse200) & {
  headers: Headers;
};
;

export type increaseViewCountResponse = (increaseViewCountResponseSuccess)

export const getIncreaseViewCountUrl = (id: string,) => {




  return `/api/posts/${id}/view`
}

export const increaseViewCount = async (id: string, options?: RequestInit): Promise<increaseViewCountResponse> => {

  return mainInstance<increaseViewCountResponse>(getIncreaseViewCountUrl(id),
  {
    ...options,
    method: 'POST'


  }
);}





export const getIncreaseViewCountQueryKey = (id: string,) => {
    return [
    'POST', `/api/posts/${id}/view`
    ] as const;
    }


export const getIncreaseViewCountQueryOptions = <TData = Awaited<ReturnType<typeof increaseViewCount>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof increaseViewCount>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getIncreaseViewCountQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof increaseViewCount>>> = ({ signal }) => increaseViewCount(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof increaseViewCount>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type IncreaseViewCountQueryResult = NonNullable<Awaited<ReturnType<typeof increaseViewCount>>>
export type IncreaseViewCountQueryError = ErrorType<unknown>


export function useIncreaseViewCount<TData = Awaited<ReturnType<typeof increaseViewCount>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof increaseViewCount>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof increaseViewCount>>,
          TError,
          Awaited<ReturnType<typeof increaseViewCount>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useIncreaseViewCount<TData = Awaited<ReturnType<typeof increaseViewCount>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof increaseViewCount>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof increaseViewCount>>,
          TError,
          Awaited<ReturnType<typeof increaseViewCount>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useIncreaseViewCount<TData = Awaited<ReturnType<typeof increaseViewCount>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof increaseViewCount>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useIncreaseViewCount<TData = Awaited<ReturnType<typeof increaseViewCount>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof increaseViewCount>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getIncreaseViewCountQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type getBySlugResponse200 = {
  data: ApiResponsePostResponse
  status: 200
}

export type getBySlugResponseSuccess = (getBySlugResponse200) & {
  headers: Headers;
};
;

export type getBySlugResponse = (getBySlugResponseSuccess)

export const getGetBySlugUrl = (slug: string,) => {




  return `/api/posts/slug/${slug}`
}

export const getBySlug = async (slug: string, options?: RequestInit): Promise<getBySlugResponse> => {

  return mainInstance<getBySlugResponse>(getGetBySlugUrl(slug),
  {
    ...options,
    method: 'GET'


  }
);}




export const getGetBySlugMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getBySlug>>, TError,{slug: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof getBySlug>>, TError,{slug: string}, TContext> => {

const mutationKey = ['getBySlug'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getBySlug>>, {slug: string}> = (props) => {
          const {slug} = props ?? {};

          return  getBySlug(slug,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GetBySlugMutationResult = NonNullable<Awaited<ReturnType<typeof getBySlug>>>

    export type GetBySlugMutationError = ErrorType<unknown>

    export const useGetBySlug = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getBySlug>>, TError,{slug: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof getBySlug>>,
        TError,
        {slug: string},
        TContext
      > => {
      return useMutation(getGetBySlugMutationOptions(options), queryClient);
    }
