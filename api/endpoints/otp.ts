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
  ApiResponseVoid,
  SendOtpParams,
  VerifyOtpParams,
  VerifyOtpRequest
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type verifyOtpResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type verifyOtpResponseSuccess = (verifyOtpResponse200) & {
  headers: Headers;
};
;

export type verifyOtpResponse = (verifyOtpResponseSuccess)

export const getVerifyOtpUrl = (params: VerifyOtpParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/otp/verify?${stringifiedParams}` : `/otp/verify`
}

/**
 * Verify OTP sent to authenticated user's email
 * @summary Verify email OTP
 */
export const verifyOtp = async (verifyOtpRequest: VerifyOtpRequest,
    params: VerifyOtpParams, options?: RequestInit): Promise<verifyOtpResponse> => {

  return mainInstance<verifyOtpResponse>(getVerifyOtpUrl(params),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(verifyOtpRequest)
  }
);}




export const getVerifyOtpMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof verifyOtp>>, TError,{data: BodyType<VerifyOtpRequest>;params: VerifyOtpParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof verifyOtp>>, TError,{data: BodyType<VerifyOtpRequest>;params: VerifyOtpParams}, TContext> => {

const mutationKey = ['verifyOtp'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof verifyOtp>>, {data: BodyType<VerifyOtpRequest>;params: VerifyOtpParams}> = (props) => {
          const {data,params} = props ?? {};

          return  verifyOtp(data,params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type VerifyOtpMutationResult = NonNullable<Awaited<ReturnType<typeof verifyOtp>>>
    export type VerifyOtpMutationBody = BodyType<VerifyOtpRequest>
    export type VerifyOtpMutationError = ErrorType<unknown>

    /**
 * @summary Verify email OTP
 */
export const useVerifyOtp = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof verifyOtp>>, TError,{data: BodyType<VerifyOtpRequest>;params: VerifyOtpParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof verifyOtp>>,
        TError,
        {data: BodyType<VerifyOtpRequest>;params: VerifyOtpParams},
        TContext
      > => {
      return useMutation(getVerifyOtpMutationOptions(options), queryClient);
    }
    export type sendOtpResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type sendOtpResponseSuccess = (sendOtpResponse200) & {
  headers: Headers;
};
;

export type sendOtpResponse = (sendOtpResponseSuccess)

export const getSendOtpUrl = (params: SendOtpParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/otp/send?${stringifiedParams}` : `/otp/send`
}

/**
 * Send OTP to authenticated user's email
 * @summary Send email verification OTP
 */
export const sendOtp = async (params: SendOtpParams, options?: RequestInit): Promise<sendOtpResponse> => {

  return mainInstance<sendOtpResponse>(getSendOtpUrl(params),
  {
    ...options,
    method: 'POST'


  }
);}




export const getSendOtpMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof sendOtp>>, TError,{params: SendOtpParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof sendOtp>>, TError,{params: SendOtpParams}, TContext> => {

const mutationKey = ['sendOtp'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof sendOtp>>, {params: SendOtpParams}> = (props) => {
          const {params} = props ?? {};

          return  sendOtp(params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type SendOtpMutationResult = NonNullable<Awaited<ReturnType<typeof sendOtp>>>

    export type SendOtpMutationError = ErrorType<unknown>

    /**
 * @summary Send email verification OTP
 */
export const useSendOtp = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof sendOtp>>, TError,{params: SendOtpParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof sendOtp>>,
        TError,
        {params: SendOtpParams},
        TContext
      > => {
      return useMutation(getSendOtpMutationOptions(options), queryClient);
    }
