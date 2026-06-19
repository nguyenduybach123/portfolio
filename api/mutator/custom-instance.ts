// Core
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

// App
import baseConfig from '@/configs/base'

// Instance
export const AXIOS_INSTANCE = Axios.create({
  baseURL: baseConfig.backendDomain,
  params: {
    'api-version': '1.0'
  }
})

export const NOTIFICATION_AXIOS_INSTANCE = Axios.create({
  baseURL: baseConfig.backendDomain
})

// Request middleware
AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  return config
})

// Response middleware
AXIOS_INSTANCE.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error)
)

NOTIFICATION_AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  // config.headers.Authorization = `Bearer ${useAuthStore.getState().token}`
  return config
})

// Response middleware
NOTIFICATION_AXIOS_INSTANCE.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error)
)

// Main instance
export const mainInstance = <T>(url: string, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    url,
    ...options
  }).then(({ data, status }) => {
    return data instanceof Blob ? data : { ...data, statusCode: status }
  })

  // @ts-expect-error not exist cancel
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }
  return promise
}

// Notification instance
export const notificationInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = NOTIFICATION_AXIOS_INSTANCE({
    ...config,
    ...options
  }).then(({ data, status }) => {
    return data instanceof Blob ? data : { ...data, statusCode: status }
  })

  // @ts-expect-error not exist cancel
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }
  return promise
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData

// Or, in case you want to wrap the body type (optional)

// (if the custom instance is processing data before sending it, like changing the case for example)
// export type BodyType<BodyData> = CamelCase<BodyData>;
