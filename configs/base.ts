const baseConfig = {
  backendDomain: 'http://localhost:8080/api/v1',
  backendSwaggerDocDomain: 'http://localhost:8080/api/v1/v3/api-docs',
  backendOauth2Endpoint: 'http://localhost:8080/api/v1/oauth2/authorization/google',
  MaptilerKey: process.env.NEXT_PUBLIC_MAPTILER_KEY
}

export default baseConfig
