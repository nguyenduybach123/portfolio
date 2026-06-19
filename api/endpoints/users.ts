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
  ApiResponsePaginationResponseUserResponse,
  ApiResponseUserResponse,
  ApiResponseVoid,
  GetUsersParams,
  MeParams,
  UpdateProfileParams,
  UpdateProfileRequest
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type updateProfileResponse200 = {
  data: ApiResponseUserResponse
  status: 200
}

export type updateProfileResponseSuccess = (updateProfileResponse200) & {
  headers: Headers;
};
;

export type updateProfileResponse = (updateProfileResponseSuccess)

export const getUpdateProfileUrl = (params: UpdateProfileParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/user/profile?${stringifiedParams}` : `/user/profile`
}

/**
 * Update profile information of authenticated user
 * @summary Update profile
 */
export const updateProfile = async (updateProfileRequest: UpdateProfileRequest,
    params: UpdateProfileParams, options?: RequestInit): Promise<updateProfileResponse> => {

  return mainInstance<updateProfileResponse>(getUpdateProfileUrl(params),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateProfileRequest)
  }
);}




export const getUpdateProfileMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateProfile>>, TError,{data: BodyType<UpdateProfileRequest>;params: UpdateProfileParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof updateProfile>>, TError,{data: BodyType<UpdateProfileRequest>;params: UpdateProfileParams}, TContext> => {

const mutationKey = ['updateProfile'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateProfile>>, {data: BodyType<UpdateProfileRequest>;params: UpdateProfileParams}> = (props) => {
          const {data,params} = props ?? {};

          return  updateProfile(data,params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateProfileMutationResult = NonNullable<Awaited<ReturnType<typeof updateProfile>>>
    export type UpdateProfileMutationBody = BodyType<UpdateProfileRequest>
    export type UpdateProfileMutationError = ErrorType<unknown>

    /**
 * @summary Update profile
 */
export const useUpdateProfile = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateProfile>>, TError,{data: BodyType<UpdateProfileRequest>;params: UpdateProfileParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof updateProfile>>,
        TError,
        {data: BodyType<UpdateProfileRequest>;params: UpdateProfileParams},
        TContext
      > => {
      return useMutation(getUpdateProfileMutationOptions(options), queryClient);
    }
    export type getUsersResponse200 = {
  data: ApiResponsePaginationResponseUserResponse
  status: 200
}

export type getUsersResponseSuccess = (getUsersResponse200) & {
  headers: Headers;
};
;

export type getUsersResponse = (getUsersResponseSuccess)

export const getGetUsersUrl = (params?: GetUsersParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/user?${stringifiedParams}` : `/user`
}

/**
 * Retrieve a paginated list of users. Admin only.
 * @summary Get users
 */
export const getUsers = async (params?: GetUsersParams, options?: RequestInit): Promise<getUsersResponse> => {

  return mainInstance<getUsersResponse>(getGetUsersUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetUsersQueryKey = (params?: GetUsersParams,) => {
    return [
    `/user`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetUsersQueryOptions = <TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(params?: GetUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUsersQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({ signal }) => getUsers(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>
export type GetUsersQueryError = ErrorType<unknown>


export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
 params: undefined |  GetUsersParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsers>>,
          TError,
          Awaited<ReturnType<typeof getUsers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
 params?: GetUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsers>>,
          TError,
          Awaited<ReturnType<typeof getUsers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
 params?: GetUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get users
 */

export function useGetUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = ErrorType<unknown>>(
 params?: GetUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetUsersQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type getUserResponse200 = {
  data: ApiResponseUserResponse
  status: 200
}

export type getUserResponseSuccess = (getUserResponse200) & {
  headers: Headers;
};
;

export type getUserResponse = (getUserResponseSuccess)

export const getGetUserUrl = (id: string,) => {




  return `/user/${id}`
}

/**
 * Retrieve user information by ID. Admin only.
 * @summary Get user by ID
 */
export const getUser = async (id: string, options?: RequestInit): Promise<getUserResponse> => {

  return mainInstance<getUserResponse>(getGetUserUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetUserQueryKey = (id: string,) => {
    return [
    `/user/${id}`
    ] as const;
    }


export const getGetUserQueryOptions = <TData = Awaited<ReturnType<typeof getUser>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUser>>> = ({ signal }) => getUser(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetUserQueryResult = NonNullable<Awaited<ReturnType<typeof getUser>>>
export type GetUserQueryError = ErrorType<unknown>


export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUser>>,
          TError,
          Awaited<ReturnType<typeof getUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUser>>,
          TError,
          Awaited<ReturnType<typeof getUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get user by ID
 */

export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetUserQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type deleteUserResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type deleteUserResponseSuccess = (deleteUserResponse200) & {
  headers: Headers;
};
;

export type deleteUserResponse = (deleteUserResponseSuccess)

export const getDeleteUserUrl = (id: string,) => {




  return `/user/${id}`
}

/**
 * Delete a user by ID. Admin only.
 * @summary Delete user
 */
export const deleteUser = async (id: string, options?: RequestInit): Promise<deleteUserResponse> => {

  return mainInstance<deleteUserResponse>(getDeleteUserUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteUserMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteUser'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteUser>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteUser(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteUserMutationResult = NonNullable<Awaited<ReturnType<typeof deleteUser>>>

    export type DeleteUserMutationError = ErrorType<unknown>

    /**
 * @summary Delete user
 */
export const useDeleteUser = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteUser>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getDeleteUserMutationOptions(options), queryClient);
    }
    export type meResponse200 = {
  data: ApiResponseUserResponse
  status: 200
}

export type meResponseSuccess = (meResponse200) & {
  headers: Headers;
};
;

export type meResponse = (meResponseSuccess)

export const getMeUrl = (params: MeParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/user/me?${stringifiedParams}` : `/user/me`
}

/**
 * Get profile information of authenticated user
 * @summary Get current user
 */
export const me = async (params: MeParams, options?: RequestInit): Promise<meResponse> => {

  return mainInstance<meResponse>(getMeUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getMeQueryKey = (params?: MeParams,) => {
    return [
    `/user/me`, ...(params ? [params] : [])
    ] as const;
    }


export const getMeQueryOptions = <TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(params: MeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMeQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof me>>> = ({ signal }) => me(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type MeQueryResult = NonNullable<Awaited<ReturnType<typeof me>>>
export type MeQueryError = ErrorType<unknown>


export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
 params: MeParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof me>>,
          TError,
          Awaited<ReturnType<typeof me>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
 params: MeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof me>>,
          TError,
          Awaited<ReturnType<typeof me>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
 params: MeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get current user
 */

export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = ErrorType<unknown>>(
 params: MeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getMeQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






