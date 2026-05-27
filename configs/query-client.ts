import { MutationCache, QueryClient, defaultShouldDehydrateQuery, environmentManager } from '@tanstack/react-query'

const handleRetry = (failureCount: number, error: unknown) => {
  if (error instanceof Error) {
    if (error.message === 'Unauthorized') return false
  }
  if (failureCount > 3) return false
  return true
}

const handleDelayRetry = (failureCount: number) => {
  return Math.min(1000 * 2 ** failureCount, 30000)
}

export function makeQueryClient() {
  const mutationCache = new MutationCache()

  const queryClient = new QueryClient({
    mutationCache,

    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,

        gcTime: environmentManager.isServer() ? Infinity : 1000 * 60 * 10,

        refetchOnWindowFocus: false,

        retry: handleRetry,
        retryDelay: handleDelayRetry
      },

      mutations: {
        retry: false
      },

      dehydrate: {
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',

        shouldRedactErrors: () => false
      }
    }
  })

  mutationCache.config.onSuccess = (_data, _variables, _context, mutation) => {
    const invalidates = mutation.options.meta?.invalidates

    invalidates?.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey })
    })
  }

  return queryClient
}
let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
