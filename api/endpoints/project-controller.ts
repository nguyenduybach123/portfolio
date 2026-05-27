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
  ApiResponseListProjectResponse,
  ApiResponseProjectResponse,
  ApiResponseString,
  ProjectRequest
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type getByIdResponse200 = {
  data: ApiResponseProjectResponse
  status: 200
}

export type getByIdResponseSuccess = (getByIdResponse200) & {
  headers: Headers;
};
;

export type getByIdResponse = (getByIdResponseSuccess)

export const getGetByIdUrl = (id: string,) => {




  return `/api/projects/${id}`
}

export const getById = async (id: string, options?: RequestInit): Promise<getByIdResponse> => {

  return mainInstance<getByIdResponse>(getGetByIdUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}




export const getGetByIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getById>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof getById>>, TError,{id: string}, TContext> => {

const mutationKey = ['getById'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getById>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  getById(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GetByIdMutationResult = NonNullable<Awaited<ReturnType<typeof getById>>>

    export type GetByIdMutationError = ErrorType<unknown>

    export const useGetById = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getById>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof getById>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getGetByIdMutationOptions(options), queryClient);
    }
    export type updateResponse200 = {
  data: ApiResponseProjectResponse
  status: 200
}

export type updateResponseSuccess = (updateResponse200) & {
  headers: Headers;
};
;

export type updateResponse = (updateResponseSuccess)

export const getUpdateUrl = (id: string,) => {




  return `/api/projects/${id}`
}

export const update = async (id: string,
    projectRequest: ProjectRequest, options?: RequestInit): Promise<updateResponse> => {

  return mainInstance<updateResponse>(getUpdateUrl(id),
  {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(projectRequest)
  }
);}





export const getUpdateQueryKey = (id: string,
    projectRequest?: BodyType<ProjectRequest>,) => {
    return [
    'PUT', `/api/projects/${id}`, projectRequest
    ] as const;
    }


export const getUpdateQueryOptions = <TData = Awaited<ReturnType<typeof update>>, TError = ErrorType<unknown>>(id: string,
    projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUpdateQueryKey(id,projectRequest);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof update>>> = ({ signal }) => update(id,projectRequest, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof update>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UpdateQueryResult = NonNullable<Awaited<ReturnType<typeof update>>>
export type UpdateQueryError = ErrorType<unknown>


export function useUpdate<TData = Awaited<ReturnType<typeof update>>, TError = ErrorType<unknown>>(
 id: string,
    projectRequest: BodyType<ProjectRequest>, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof update>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof update>>,
          TError,
          Awaited<ReturnType<typeof update>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUpdate<TData = Awaited<ReturnType<typeof update>>, TError = ErrorType<unknown>>(
 id: string,
    projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof update>>,
          TError,
          Awaited<ReturnType<typeof update>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUpdate<TData = Awaited<ReturnType<typeof update>>, TError = ErrorType<unknown>>(
 id: string,
    projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useUpdate<TData = Awaited<ReturnType<typeof update>>, TError = ErrorType<unknown>>(
 id: string,
    projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof update>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUpdateQueryOptions(id,projectRequest,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type _deleteResponse200 = {
  data: ApiResponseString
  status: 200
}

export type _deleteResponseSuccess = (_deleteResponse200) & {
  headers: Headers;
};
;

export type _deleteResponse = (_deleteResponseSuccess)

export const getDeleteUrl = (id: string,) => {




  return `/api/projects/${id}`
}

export const _delete = async (id: string, options?: RequestInit): Promise<_deleteResponse> => {

  return mainInstance<_deleteResponse>(getDeleteUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteQueryKey = (id: string,) => {
    return [
    'DELETE', `/api/projects/${id}`
    ] as const;
    }


export const getDeleteQueryOptions = <TData = Awaited<ReturnType<typeof _delete>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof _delete>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getDeleteQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof _delete>>> = ({ signal }) => _delete(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof _delete>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type _DeleteQueryResult = NonNullable<Awaited<ReturnType<typeof _delete>>>
export type _DeleteQueryError = ErrorType<unknown>


export function useDelete<TData = Awaited<ReturnType<typeof _delete>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof _delete>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof _delete>>,
          TError,
          Awaited<ReturnType<typeof _delete>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDelete<TData = Awaited<ReturnType<typeof _delete>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof _delete>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof _delete>>,
          TError,
          Awaited<ReturnType<typeof _delete>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDelete<TData = Awaited<ReturnType<typeof _delete>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof _delete>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useDelete<TData = Awaited<ReturnType<typeof _delete>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof _delete>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getDeleteQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type getAllResponse200 = {
  data: ApiResponseListProjectResponse
  status: 200
}

export type getAllResponseSuccess = (getAllResponse200) & {
  headers: Headers;
};
;

export type getAllResponse = (getAllResponseSuccess)

export const getGetAllUrl = () => {




  return `/api/projects`
}

export const getAll = async ( options?: RequestInit): Promise<getAllResponse> => {

  return mainInstance<getAllResponse>(getGetAllUrl(),
  {
    ...options,
    method: 'GET'


  }
);}




export const getGetAllMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getAll>>, TError,void, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof getAll>>, TError,void, TContext> => {

const mutationKey = ['getAll'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getAll>>, void> = () => {


          return  getAll(requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GetAllMutationResult = NonNullable<Awaited<ReturnType<typeof getAll>>>

    export type GetAllMutationError = ErrorType<unknown>

    export const useGetAll = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getAll>>, TError,void, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof getAll>>,
        TError,
        void,
        TContext
      > => {
      return useMutation(getGetAllMutationOptions(options), queryClient);
    }
    export type create1Response200 = {
  data: ApiResponseProjectResponse
  status: 200
}

export type create1ResponseSuccess = (create1Response200) & {
  headers: Headers;
};
;

export type create1Response = (create1ResponseSuccess)

export const getCreate1Url = () => {




  return `/api/projects`
}

export const create1 = async (projectRequest: ProjectRequest, options?: RequestInit): Promise<create1Response> => {

  return mainInstance<create1Response>(getCreate1Url(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(projectRequest)
  }
);}





export const getCreate1QueryKey = (projectRequest?: BodyType<ProjectRequest>,) => {
    return [
    'POST', `/api/projects`, projectRequest
    ] as const;
    }


export const getCreate1QueryOptions = <TData = Awaited<ReturnType<typeof create1>>, TError = ErrorType<unknown>>(projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getCreate1QueryKey(projectRequest);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof create1>>> = ({ signal }) => create1(projectRequest, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof create1>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type Create1QueryResult = NonNullable<Awaited<ReturnType<typeof create1>>>
export type Create1QueryError = ErrorType<unknown>


export function useCreate1<TData = Awaited<ReturnType<typeof create1>>, TError = ErrorType<unknown>>(
 projectRequest: BodyType<ProjectRequest>, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof create1>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof create1>>,
          TError,
          Awaited<ReturnType<typeof create1>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useCreate1<TData = Awaited<ReturnType<typeof create1>>, TError = ErrorType<unknown>>(
 projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create1>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof create1>>,
          TError,
          Awaited<ReturnType<typeof create1>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useCreate1<TData = Awaited<ReturnType<typeof create1>>, TError = ErrorType<unknown>>(
 projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useCreate1<TData = Awaited<ReturnType<typeof create1>>, TError = ErrorType<unknown>>(
 projectRequest: BodyType<ProjectRequest>, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof create1>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getCreate1QueryOptions(projectRequest,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






