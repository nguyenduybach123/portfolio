// @ts-nocheck
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import type {
  ApiResponseUserResponse
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type getUserResponse200 = {
  data: ApiResponseUserResponse
  status: 200
}

export type getUserResponseSuccess = (getUserResponse200) & {
  headers: Headers;
};
;

export type getUserResponse = (getUserResponseSuccess)

export const getGetUserUrl = () => {




  return `/auth/user`
}

export const getUser = async ( options?: RequestInit): Promise<getUserResponse> => {

  return mainInstance<getUserResponse>(getGetUserUrl(),
  {
    ...options,
    method: 'GET'


  }
);}




export const getGetUserMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getUser>>, TError,void, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof getUser>>, TError,void, TContext> => {

const mutationKey = ['getUser'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getUser>>, void> = () => {


          return  getUser(requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GetUserMutationResult = NonNullable<Awaited<ReturnType<typeof getUser>>>

    export type GetUserMutationError = ErrorType<unknown>

    export const useGetUser = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getUser>>, TError,void, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof getUser>>,
        TError,
        void,
        TContext
      > => {
      return useMutation(getGetUserMutationOptions(options), queryClient);
    }
