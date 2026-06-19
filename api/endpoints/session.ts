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
  ApiResponseListUserSessionResponse,
  ApiResponseVoid,
  GetSessionsParams,
  LogoutAllParams
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type logoutAllResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type logoutAllResponseSuccess = (logoutAllResponse200) & {
  headers: Headers;
};
;

export type logoutAllResponse = (logoutAllResponseSuccess)

export const getLogoutAllUrl = (params: LogoutAllParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/session/logout-all?${stringifiedParams}` : `/session/logout-all`
}

/**
 * Revoke all active sessions of current user
 * @summary Logout all devices
 */
export const logoutAll = async (params: LogoutAllParams, options?: RequestInit): Promise<logoutAllResponse> => {

  return mainInstance<logoutAllResponse>(getLogoutAllUrl(params),
  {
    ...options,
    method: 'POST'


  }
);}




export const getLogoutAllMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logoutAll>>, TError,{params: LogoutAllParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof logoutAll>>, TError,{params: LogoutAllParams}, TContext> => {

const mutationKey = ['logoutAll'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof logoutAll>>, {params: LogoutAllParams}> = (props) => {
          const {params} = props ?? {};

          return  logoutAll(params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type LogoutAllMutationResult = NonNullable<Awaited<ReturnType<typeof logoutAll>>>

    export type LogoutAllMutationError = ErrorType<unknown>

    /**
 * @summary Logout all devices
 */
export const useLogoutAll = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logoutAll>>, TError,{params: LogoutAllParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof logoutAll>>,
        TError,
        {params: LogoutAllParams},
        TContext
      > => {
      return useMutation(getLogoutAllMutationOptions(options), queryClient);
    }
    export type getSessionsResponse200 = {
  data: ApiResponseListUserSessionResponse
  status: 200
}

export type getSessionsResponseSuccess = (getSessionsResponse200) & {
  headers: Headers;
};
;

export type getSessionsResponse = (getSessionsResponseSuccess)

export const getGetSessionsUrl = (params: GetSessionsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/session/sessions?${stringifiedParams}` : `/session/sessions`
}

/**
 * Get all active sessions of current user
 * @summary Get active sessions
 */
export const getSessions = async (params: GetSessionsParams, options?: RequestInit): Promise<getSessionsResponse> => {

  return mainInstance<getSessionsResponse>(getGetSessionsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetSessionsQueryKey = (params?: GetSessionsParams,) => {
    return [
    `/session/sessions`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetSessionsQueryOptions = <TData = Awaited<ReturnType<typeof getSessions>>, TError = ErrorType<unknown>>(params: GetSessionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getSessions>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSessionsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSessions>>> = ({ signal }) => getSessions(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSessions>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetSessionsQueryResult = NonNullable<Awaited<ReturnType<typeof getSessions>>>
export type GetSessionsQueryError = ErrorType<unknown>


export function useGetSessions<TData = Awaited<ReturnType<typeof getSessions>>, TError = ErrorType<unknown>>(
 params: GetSessionsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getSessions>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getSessions>>,
          TError,
          Awaited<ReturnType<typeof getSessions>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetSessions<TData = Awaited<ReturnType<typeof getSessions>>, TError = ErrorType<unknown>>(
 params: GetSessionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getSessions>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getSessions>>,
          TError,
          Awaited<ReturnType<typeof getSessions>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetSessions<TData = Awaited<ReturnType<typeof getSessions>>, TError = ErrorType<unknown>>(
 params: GetSessionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getSessions>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get active sessions
 */

export function useGetSessions<TData = Awaited<ReturnType<typeof getSessions>>, TError = ErrorType<unknown>>(
 params: GetSessionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getSessions>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetSessionsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type revokeSessionResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type revokeSessionResponseSuccess = (revokeSessionResponse200) & {
  headers: Headers;
};
;

export type revokeSessionResponse = (revokeSessionResponseSuccess)

export const getRevokeSessionUrl = (sessionId: string,) => {




  return `/session/sessions/${sessionId}`
}

/**
 * Revoke a specific user session
 * @summary Revoke session
 */
export const revokeSession = async (sessionId: string, options?: RequestInit): Promise<revokeSessionResponse> => {

  return mainInstance<revokeSessionResponse>(getRevokeSessionUrl(sessionId),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getRevokeSessionMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof revokeSession>>, TError,{sessionId: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof revokeSession>>, TError,{sessionId: string}, TContext> => {

const mutationKey = ['revokeSession'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof revokeSession>>, {sessionId: string}> = (props) => {
          const {sessionId} = props ?? {};

          return  revokeSession(sessionId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type RevokeSessionMutationResult = NonNullable<Awaited<ReturnType<typeof revokeSession>>>

    export type RevokeSessionMutationError = ErrorType<unknown>

    /**
 * @summary Revoke session
 */
export const useRevokeSession = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof revokeSession>>, TError,{sessionId: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof revokeSession>>,
        TError,
        {sessionId: string},
        TContext
      > => {
      return useMutation(getRevokeSessionMutationOptions(options), queryClient);
    }
