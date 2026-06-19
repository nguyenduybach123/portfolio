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
  ApiResponseAuthResponse,
  ApiResponseVoid,
  ChangePasswordParams,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LogoutRequest,
  RefreshTokenRequest,
  ResetPasswordRequest
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type resetPasswordResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type resetPasswordResponseSuccess = (resetPasswordResponse200) & {
  headers: Headers;
};
;

export type resetPasswordResponse = (resetPasswordResponseSuccess)

export const getResetPasswordUrl = () => {




  return `/auth/reset`
}

/**
 * Reset password using a valid reset token.
 * @summary Reset password
 */
export const resetPassword = async (resetPasswordRequest: ResetPasswordRequest, options?: RequestInit): Promise<resetPasswordResponse> => {

  return mainInstance<resetPasswordResponse>(getResetPasswordUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(resetPasswordRequest)
  }
);}




export const getResetPasswordMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof resetPassword>>, TError,{data: BodyType<ResetPasswordRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof resetPassword>>, TError,{data: BodyType<ResetPasswordRequest>}, TContext> => {

const mutationKey = ['resetPassword'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof resetPassword>>, {data: BodyType<ResetPasswordRequest>}> = (props) => {
          const {data} = props ?? {};

          return  resetPassword(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ResetPasswordMutationResult = NonNullable<Awaited<ReturnType<typeof resetPassword>>>
    export type ResetPasswordMutationBody = BodyType<ResetPasswordRequest>
    export type ResetPasswordMutationError = ErrorType<unknown>

    /**
 * @summary Reset password
 */
export const useResetPassword = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof resetPassword>>, TError,{data: BodyType<ResetPasswordRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof resetPassword>>,
        TError,
        {data: BodyType<ResetPasswordRequest>},
        TContext
      > => {
      return useMutation(getResetPasswordMutationOptions(options), queryClient);
    }
    export type refreshTokenResponse200 = {
  data: ApiResponseAuthResponse
  status: 200
}

export type refreshTokenResponse401 = {
  data: ApiResponseAuthResponse
  status: 401
}

export type refreshTokenResponseSuccess = (refreshTokenResponse200) & {
  headers: Headers;
};
export type refreshTokenResponseError = (refreshTokenResponse401) & {
  headers: Headers;
};

export type refreshTokenResponse = (refreshTokenResponseSuccess | refreshTokenResponseError)

export const getRefreshTokenUrl = () => {




  return `/auth/refresh`
}

/**
 * Generate a new access token using a valid refresh token.
 * @summary Refresh access token
 */
export const refreshToken = async (refreshTokenRequest: RefreshTokenRequest, options?: RequestInit): Promise<refreshTokenResponse> => {

  return mainInstance<refreshTokenResponse>(getRefreshTokenUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(refreshTokenRequest)
  }
);}




export const getRefreshTokenMutationOptions = <TError = ErrorType<ApiResponseAuthResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError,{data: BodyType<RefreshTokenRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError,{data: BodyType<RefreshTokenRequest>}, TContext> => {

const mutationKey = ['refreshToken'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof refreshToken>>, {data: BodyType<RefreshTokenRequest>}> = (props) => {
          const {data} = props ?? {};

          return  refreshToken(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type RefreshTokenMutationResult = NonNullable<Awaited<ReturnType<typeof refreshToken>>>
    export type RefreshTokenMutationBody = BodyType<RefreshTokenRequest>
    export type RefreshTokenMutationError = ErrorType<ApiResponseAuthResponse>

    /**
 * @summary Refresh access token
 */
export const useRefreshToken = <TError = ErrorType<ApiResponseAuthResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof refreshToken>>, TError,{data: BodyType<RefreshTokenRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof refreshToken>>,
        TError,
        {data: BodyType<RefreshTokenRequest>},
        TContext
      > => {
      return useMutation(getRefreshTokenMutationOptions(options), queryClient);
    }
    export type logoutResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type logoutResponseSuccess = (logoutResponse200) & {
  headers: Headers;
};
;

export type logoutResponse = (logoutResponseSuccess)

export const getLogoutUrl = () => {




  return `/auth/logout`
}

/**
 * Invalidate the refresh token and logout the user.
 * @summary Logout
 */
export const logout = async (logoutRequest: LogoutRequest, options?: RequestInit): Promise<logoutResponse> => {

  return mainInstance<logoutResponse>(getLogoutUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(logoutRequest)
  }
);}




export const getLogoutMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError,{data: BodyType<LogoutRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError,{data: BodyType<LogoutRequest>}, TContext> => {

const mutationKey = ['logout'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof logout>>, {data: BodyType<LogoutRequest>}> = (props) => {
          const {data} = props ?? {};

          return  logout(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type LogoutMutationResult = NonNullable<Awaited<ReturnType<typeof logout>>>
    export type LogoutMutationBody = BodyType<LogoutRequest>
    export type LogoutMutationError = ErrorType<unknown>

    /**
 * @summary Logout
 */
export const useLogout = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError,{data: BodyType<LogoutRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof logout>>,
        TError,
        {data: BodyType<LogoutRequest>},
        TContext
      > => {
      return useMutation(getLogoutMutationOptions(options), queryClient);
    }
    export type forgotPasswordResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type forgotPasswordResponseSuccess = (forgotPasswordResponse200) & {
  headers: Headers;
};
;

export type forgotPasswordResponse = (forgotPasswordResponseSuccess)

export const getForgotPasswordUrl = () => {




  return `/auth/forgot`
}

/**
 * Send a password reset request.
 * @summary Forgot password
 */
export const forgotPassword = async (forgotPasswordRequest: ForgotPasswordRequest, options?: RequestInit): Promise<forgotPasswordResponse> => {

  return mainInstance<forgotPasswordResponse>(getForgotPasswordUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(forgotPasswordRequest)
  }
);}




export const getForgotPasswordMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof forgotPassword>>, TError,{data: BodyType<ForgotPasswordRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof forgotPassword>>, TError,{data: BodyType<ForgotPasswordRequest>}, TContext> => {

const mutationKey = ['forgotPassword'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof forgotPassword>>, {data: BodyType<ForgotPasswordRequest>}> = (props) => {
          const {data} = props ?? {};

          return  forgotPassword(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ForgotPasswordMutationResult = NonNullable<Awaited<ReturnType<typeof forgotPassword>>>
    export type ForgotPasswordMutationBody = BodyType<ForgotPasswordRequest>
    export type ForgotPasswordMutationError = ErrorType<unknown>

    /**
 * @summary Forgot password
 */
export const useForgotPassword = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof forgotPassword>>, TError,{data: BodyType<ForgotPasswordRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof forgotPassword>>,
        TError,
        {data: BodyType<ForgotPasswordRequest>},
        TContext
      > => {
      return useMutation(getForgotPasswordMutationOptions(options), queryClient);
    }
    export type changePasswordResponse200 = {
  data: ApiResponseVoid
  status: 200
}

export type changePasswordResponseSuccess = (changePasswordResponse200) & {
  headers: Headers;
};
;

export type changePasswordResponse = (changePasswordResponseSuccess)

export const getChangePasswordUrl = (params: ChangePasswordParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/auth/change?${stringifiedParams}` : `/auth/change`
}

/**
 * Change the password of the authenticated user.
 * @summary Change password
 */
export const changePassword = async (changePasswordRequest: ChangePasswordRequest,
    params: ChangePasswordParams, options?: RequestInit): Promise<changePasswordResponse> => {

  return mainInstance<changePasswordResponse>(getChangePasswordUrl(params),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(changePasswordRequest)
  }
);}




export const getChangePasswordMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof changePassword>>, TError,{data: BodyType<ChangePasswordRequest>;params: ChangePasswordParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof changePassword>>, TError,{data: BodyType<ChangePasswordRequest>;params: ChangePasswordParams}, TContext> => {

const mutationKey = ['changePassword'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof changePassword>>, {data: BodyType<ChangePasswordRequest>;params: ChangePasswordParams}> = (props) => {
          const {data,params} = props ?? {};

          return  changePassword(data,params,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ChangePasswordMutationResult = NonNullable<Awaited<ReturnType<typeof changePassword>>>
    export type ChangePasswordMutationBody = BodyType<ChangePasswordRequest>
    export type ChangePasswordMutationError = ErrorType<unknown>

    /**
 * @summary Change password
 */
export const useChangePassword = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof changePassword>>, TError,{data: BodyType<ChangePasswordRequest>;params: ChangePasswordParams}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof changePassword>>,
        TError,
        {data: BodyType<ChangePasswordRequest>;params: ChangePasswordParams},
        TContext
      > => {
      return useMutation(getChangePasswordMutationOptions(options), queryClient);
    }
