import '@tanstack/react-query'

export type MutationMetadata = {
  invalidates?: Array<import('@tanstack/react-query').QueryKey>
  // skipGlobalToast?: boolean
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationMetadata
  }
}
