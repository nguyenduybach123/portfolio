import axios from 'axios'
import { defineConfig } from 'orval'
import baseConfig from './configs/base'

const orvalConfig = async () => {
  const { backendSwaggerDocDomain } = baseConfig

  const mainApiSwagger = await axios.get(`${backendSwaggerDocDomain}`)

  return defineConfig({
    'main-api': {
      output: {
        mode: 'tags',
        target: 'api/endpoints',
        schemas: 'api/models',
        client: 'react-query',
        clean: true,
        override: {
          query: {
            signal: true,
            version: 5
          },
          operations: {
            getPosts: {
              query: {
                useInfinite: true,
                useInfiniteQueryParam: 'page'
              }
            }
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
  })
}

export default orvalConfig
