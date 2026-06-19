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
  ApiResponseMediaResponse,
  ApiResponseVoid,
  UploadMediaBody,
  UploadMediaParams
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type uploadMediaResponse200 = {
  data: ApiResponseMediaResponse
  status: 200
}

export type uploadMediaResponseSuccess = (uploadMediaResponse200) & {
  headers: Headers;
};
;

export type uploadMediaResponse = (uploadMediaResponseSuccess)

export const getUploadMediaUrl = (params: UploadMediaParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/media?${stringifiedParams}` : `/media`
}

/**
 * Upload avatar, post image or project thumbnail
 * @summary Upload media
 */
export const uploadMedia = async (params: UploadMediaParams,
    uploadMediaBody?: UploadMediaBody, options?: RequestInit): Promise<uploadMediaResponse> => {
    const formData = new FormData();
if(uploadMediaBody?.file !== undefined) {
 formData.append(`file`, uploadMediaBody.file);
 }

  return mainInstance<uploadMediaResponse>(getUploadMediaUrl(params),
  {
    ...options,
    method: 'POST'
    ,
    body: formData
  }
);}




export const getUploadMediaMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadMedia>>, TError,{params: UploadMediaParams;data?: BodyType<UploadMediaBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof uploadMedia>>, TError,{params: UploadMediaParams;data?: BodyType<UploadMediaBody>}, TContext> => {

const mutationKey = ['uploadMedia'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadMedia>>, {params: UploadMediaParams;data?: BodyType<UploadMediaBody>}> = (props) => {
          const {params,data} = props ?? {};

          return  uploadMedia(params,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UploadMediaMutationResult = NonNullable<Awaited<ReturnType<typeof uploadMedia>>>
    export type UploadMediaMutationBody = BodyType<UploadMediaBody> | undefined
    export type UploadMediaMutationError = ErrorType<unknown>

    /**
 * @summary Upload media
 */
export const useUploadMedia = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadMedia>>, TError,{params: UploadMediaParams;data?: BodyType<UploadMediaBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof uploadMedia>>,
        TError,
        {params: UploadMediaParams;data?: BodyType<UploadMediaBody>},
        TContext
      > => {
      return useMutation(getUploadMediaMutationOptions(options), queryClient);
    }
    export type getMediaByIdResponse200 = {
  data: ApiResponseMediaResponse
  status: 200
}

export type getMediaByIdResponseSuccess = (getMediaByIdResponse200) & {
  headers: Headers;
};
;

export type getMediaByIdResponse = (getMediaByIdResponseSuccess)

export const getGetMediaByIdUrl = (mediaId: string,) => {




  return `/media/${mediaId}`
}

/**
 * @summary Get media by id
 */
export const getMediaById = async (mediaId: string, options?: RequestInit): Promise<getMediaByIdResponse> => {

  return mainInstance<getMediaByIdResponse>(getGetMediaByIdUrl(mediaId),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetMediaByIdQueryKey = (mediaId: string,) => {
    return [
    `/media/${mediaId}`
    ] as const;
    }


export const getGetMediaByIdQueryOptions = <TData = Awaited<ReturnType<typeof getMediaById>>, TError = ErrorType<unknown>>(mediaId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMediaById>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMediaByIdQueryKey(mediaId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMediaById>>> = ({ signal }) => getMediaById(mediaId, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: mediaId !== null && mediaId !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getMediaById>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetMediaByIdQueryResult = NonNullable<Awaited<ReturnType<typeof getMediaById>>>
export type GetMediaByIdQueryError = ErrorType<unknown>


export function useGetMediaById<TData = Awaited<ReturnType<typeof getMediaById>>, TError = ErrorType<unknown>>(
 mediaId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMediaById>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMediaById>>,
          TError,
          Awaited<ReturnType<typeof getMediaById>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMediaById<TData = Awaited<ReturnType<typeof getMediaById>>, TError = ErrorType<unknown>>(
 mediaId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMediaById>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMediaById>>,
          TError,
          Awaited<ReturnType<typeof getMediaById>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetMediaById<TData = Awaited<ReturnType<typeof getMediaById>>, TError = ErrorType<unknown>>(
 mediaId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMediaById>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get media by id
 */

export function useGetMediaById<TData = Awaited<ReturnType<typeof getMediaById>>, TError = ErrorType<unknown>>(
 mediaId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMediaById>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetMediaByIdQueryOptions(mediaId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type _deleteResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type _deleteResponseSuccess = (_deleteResponse200) & {
  headers: Headers;
};
;

export type _deleteResponse = (_deleteResponseSuccess)

export const getDeleteUrl = (mediaId: string,) => {




  return `/media/${mediaId}`
}

/**
 * @summary Delete media
 */
export const _delete = async (mediaId: string, options?: RequestInit): Promise<_deleteResponse> => {

  return mainInstance<_deleteResponse>(getDeleteUrl(mediaId),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof _delete>>, TError,{mediaId: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof _delete>>, TError,{mediaId: string}, TContext> => {

const mutationKey = ['_delete'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof _delete>>, {mediaId: string}> = (props) => {
          const {mediaId} = props ?? {};

          return  _delete(mediaId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type _DeleteMutationResult = NonNullable<Awaited<ReturnType<typeof _delete>>>

    export type _DeleteMutationError = ErrorType<unknown>

    /**
 * @summary Delete media
 */
export const useDelete = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof _delete>>, TError,{mediaId: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof _delete>>,
        TError,
        {mediaId: string},
        TContext
      > => {
      return useMutation(getDeleteMutationOptions(options), queryClient);
    }
