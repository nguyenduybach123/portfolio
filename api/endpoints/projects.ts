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
  ApiResponsePaginationResponseProjectResponse,
  ApiResponseProjectResponse,
  ApiResponseUUID,
  CreateProjectRequest,
  GetAllProjectParams,
  ProjectResponse,
  UpdateProjectRequest
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type getProjectByIdResponse200 = {
  data: ApiResponseProjectResponse
  status: 200
}

export type getProjectByIdResponse404 = {
  data: ApiResponseProjectResponse
  status: 404
}

export type getProjectByIdResponseSuccess = (getProjectByIdResponse200) & {
  headers: Headers;
};
export type getProjectByIdResponseError = (getProjectByIdResponse404) & {
  headers: Headers;
};

export type getProjectByIdResponse = (getProjectByIdResponseSuccess | getProjectByIdResponseError)

export const getGetProjectByIdUrl = (id: string,) => {




  return `/project/${id}`
}

/**
 * Returns detailed information about a project.
 * @summary Get project by ID
 */
export const getProjectById = async (id: string, options?: RequestInit): Promise<getProjectByIdResponse> => {

  return mainInstance<getProjectByIdResponse>(getGetProjectByIdUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetProjectByIdQueryKey = (id: string,) => {
    return [
    `/project/${id}`
    ] as const;
    }


export const getGetProjectByIdQueryOptions = <TData = Awaited<ReturnType<typeof getProjectById>>, TError = ErrorType<ApiResponseProjectResponse>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectById>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectByIdQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectById>>> = ({ signal }) => getProjectById(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getProjectById>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetProjectByIdQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectById>>>
export type GetProjectByIdQueryError = ErrorType<ApiResponseProjectResponse>


export function useGetProjectById<TData = Awaited<ReturnType<typeof getProjectById>>, TError = ErrorType<ApiResponseProjectResponse>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectById>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectById>>,
          TError,
          Awaited<ReturnType<typeof getProjectById>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectById<TData = Awaited<ReturnType<typeof getProjectById>>, TError = ErrorType<ApiResponseProjectResponse>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectById>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getProjectById>>,
          TError,
          Awaited<ReturnType<typeof getProjectById>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetProjectById<TData = Awaited<ReturnType<typeof getProjectById>>, TError = ErrorType<ApiResponseProjectResponse>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectById>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get project by ID
 */

export function useGetProjectById<TData = Awaited<ReturnType<typeof getProjectById>>, TError = ErrorType<ApiResponseProjectResponse>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getProjectById>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetProjectByIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type updateProjectResponse200 = {
  data: ProjectResponse
  status: 200
}

export type updateProjectResponse404 = {
  data: ProjectResponse
  status: 404
}

export type updateProjectResponseSuccess = (updateProjectResponse200) & {
  headers: Headers;
};
export type updateProjectResponseError = (updateProjectResponse404) & {
  headers: Headers;
};

export type updateProjectResponse = (updateProjectResponseSuccess | updateProjectResponseError)

export const getUpdateProjectUrl = (id: string,) => {




  return `/project/${id}`
}

/**
 * Updates an existing project by its identifier.
 * @summary Update a project
 */
export const updateProject = async (id: string,
    updateProjectRequest: UpdateProjectRequest, options?: RequestInit): Promise<updateProjectResponse> => {

  return mainInstance<updateProjectResponse>(getUpdateProjectUrl(id),
  {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateProjectRequest)
  }
);}




export const getUpdateProjectMutationOptions = <TError = ErrorType<ProjectResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError,{id: string;data: BodyType<UpdateProjectRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError,{id: string;data: BodyType<UpdateProjectRequest>}, TContext> => {

const mutationKey = ['updateProject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateProject>>, {id: string;data: BodyType<UpdateProjectRequest>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateProject(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateProjectMutationResult = NonNullable<Awaited<ReturnType<typeof updateProject>>>
    export type UpdateProjectMutationBody = BodyType<UpdateProjectRequest>
    export type UpdateProjectMutationError = ErrorType<ProjectResponse>

    /**
 * @summary Update a project
 */
export const useUpdateProject = <TError = ErrorType<ProjectResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError,{id: string;data: BodyType<UpdateProjectRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof updateProject>>,
        TError,
        {id: string;data: BodyType<UpdateProjectRequest>},
        TContext
      > => {
      return useMutation(getUpdateProjectMutationOptions(options), queryClient);
    }
    export type deleteProjectResponse200 = {
  data: ApiResponseUUID
  status: 200
}

export type deleteProjectResponse404 = {
  data: ApiResponseUUID
  status: 404
}

export type deleteProjectResponseSuccess = (deleteProjectResponse200) & {
  headers: Headers;
};
export type deleteProjectResponseError = (deleteProjectResponse404) & {
  headers: Headers;
};

export type deleteProjectResponse = (deleteProjectResponseSuccess | deleteProjectResponseError)

export const getDeleteProjectUrl = (id: string,) => {




  return `/project/${id}`
}

/**
 * Deletes a project by its identifier.
 * @summary Delete a project
 */
export const deleteProject = async (id: string, options?: RequestInit): Promise<deleteProjectResponse> => {

  return mainInstance<deleteProjectResponse>(getDeleteProjectUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteProjectMutationOptions = <TError = ErrorType<ApiResponseUUID>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteProject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteProject>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteProject(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteProjectMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProject>>>

    export type DeleteProjectMutationError = ErrorType<ApiResponseUUID>

    /**
 * @summary Delete a project
 */
export const useDeleteProject = <TError = ErrorType<ApiResponseUUID>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteProject>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getDeleteProjectMutationOptions(options), queryClient);
    }
    export type getAllProjectResponse200 = {
  data: ApiResponsePaginationResponseProjectResponse
  status: 200
}

export type getAllProjectResponseSuccess = (getAllProjectResponse200) & {
  headers: Headers;
};
;

export type getAllProjectResponse = (getAllProjectResponseSuccess)

export const getGetAllProjectUrl = (params?: GetAllProjectParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/project?${stringifiedParams}` : `/project`
}

/**
 * Returns a paginated list of projects.
 * @summary Get projects
 */
export const getAllProject = async (params?: GetAllProjectParams, options?: RequestInit): Promise<getAllProjectResponse> => {

  return mainInstance<getAllProjectResponse>(getGetAllProjectUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetAllProjectQueryKey = (params?: GetAllProjectParams,) => {
    return [
    `/project`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetAllProjectQueryOptions = <TData = Awaited<ReturnType<typeof getAllProject>>, TError = ErrorType<unknown>>(params?: GetAllProjectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllProject>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAllProjectQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllProject>>> = ({ signal }) => getAllProject(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAllProject>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetAllProjectQueryResult = NonNullable<Awaited<ReturnType<typeof getAllProject>>>
export type GetAllProjectQueryError = ErrorType<unknown>


export function useGetAllProject<TData = Awaited<ReturnType<typeof getAllProject>>, TError = ErrorType<unknown>>(
 params: undefined |  GetAllProjectParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllProject>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllProject>>,
          TError,
          Awaited<ReturnType<typeof getAllProject>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetAllProject<TData = Awaited<ReturnType<typeof getAllProject>>, TError = ErrorType<unknown>>(
 params?: GetAllProjectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllProject>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllProject>>,
          TError,
          Awaited<ReturnType<typeof getAllProject>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetAllProject<TData = Awaited<ReturnType<typeof getAllProject>>, TError = ErrorType<unknown>>(
 params?: GetAllProjectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllProject>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get projects
 */

export function useGetAllProject<TData = Awaited<ReturnType<typeof getAllProject>>, TError = ErrorType<unknown>>(
 params?: GetAllProjectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllProject>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetAllProjectQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}






export type createProjectResponse200 = {
  data: ApiResponseProjectResponse
  status: 200
}

export type createProjectResponse400 = {
  data: ApiResponseProjectResponse
  status: 400
}

export type createProjectResponseSuccess = (createProjectResponse200) & {
  headers: Headers;
};
export type createProjectResponseError = (createProjectResponse400) & {
  headers: Headers;
};

export type createProjectResponse = (createProjectResponseSuccess | createProjectResponseError)

export const getCreateProjectUrl = () => {




  return `/project`
}

/**
 * Creates a new project and returns the created project details.
 * @summary Create a new project
 */
export const createProject = async (createProjectRequest: CreateProjectRequest, options?: RequestInit): Promise<createProjectResponse> => {

  return mainInstance<createProjectResponse>(getCreateProjectUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createProjectRequest)
  }
);}




export const getCreateProjectMutationOptions = <TError = ErrorType<ApiResponseProjectResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError,{data: BodyType<CreateProjectRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError,{data: BodyType<CreateProjectRequest>}, TContext> => {

const mutationKey = ['createProject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createProject>>, {data: BodyType<CreateProjectRequest>}> = (props) => {
          const {data} = props ?? {};

          return  createProject(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateProjectMutationResult = NonNullable<Awaited<ReturnType<typeof createProject>>>
    export type CreateProjectMutationBody = BodyType<CreateProjectRequest>
    export type CreateProjectMutationError = ErrorType<ApiResponseProjectResponse>

    /**
 * @summary Create a new project
 */
export const useCreateProject = <TError = ErrorType<ApiResponseProjectResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError,{data: BodyType<CreateProjectRequest>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof createProject>>,
        TError,
        {data: BodyType<CreateProjectRequest>},
        TContext
      > => {
      return useMutation(getCreateProjectMutationOptions(options), queryClient);
    }
