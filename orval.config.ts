import axios from 'axios'
import { defineConfig } from 'orval'
import baseConfig from './configs/base'

const orvalConfig = async () => {
  const { backendSwaggerDocDomain } = baseConfig

  const mainApiSwagger = await axios.get(`${backendSwaggerDocDomain}`)

  const config: any = {
    'main-api': {
      output: {
        mode: 'tags',
        target: 'api/endpoints',
        schemas: 'api/models',
        client: 'react-query',
        clean: true,
        prettier: true,
        override: {
          query: {
            useQuery: true,
            useInfinite: true,
            useInfiniteQueryParam: 'page',
            useMutation: true,
            signal: true,
            version: 5
          },
          mutator: {
            path: 'api/mutator/custom-instance.ts',
            name: 'mainInstance'
          },
          header: () => '// @ts-nocheck\r\n'
        }
      },
      input: {
        target: mainApiSwagger.data
      }
    }
  }

  return defineConfig(config)
}

export default orvalConfig
