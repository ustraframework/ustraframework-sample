import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt/config'

const configEnv = process.env.CONFIG_ENV

export default defineNuxtConfig({
  // extends: `./app/config/${configEnv}`,
  ssr: false,
  debug: true,
  modules: ['@nuxt/devtools', '@ustra/nuxt'],
  experimental: {
    headNext: true,
  },
  features: {
    inlineStyles: id => {
      console.log('id', id)
      return true
    },
  },
  vite: {
    server: {
      hmr: {
        clientPort: 9912
      }
    },
  },
  devServer: {
    port: 9912, 
    host: '0.0.0.0' 
  },
  app: {
    head: {
      script: [],
      bodyAttrs: {
      },
    },
  },
  ustra: {
    app: {
      configDirPath: './app',
    },
    server: {
      middleware: {
        proxy: {
          proxies: {
            '/api/': { target: 'http://localhost:9902', ws: true },
          },
        },
      },
    },
    auth: {
      enabled: true,
      type: 'jwt',
      jwt: {
        accessTokenKey: 'sample-fo-token',
      },
      autoLogoutSeconds: 30000,
      duplication: {
        checkPath: 'ws://localhost:9912/api/auth-ws',
      },
    },
    nuxt: {
      api: {
        maximumConcurrentNumber: 3,
        taskDelay: 10
      },
      meta: {
        auth: {
          required: true
        },
      },
      env: {
        secret: 'Z3NjLWNyeXB0by1rZXkxMQ=='
      },
      wijmo: {
        enabled: true,
        styles: {
          theme: 'light'
        },
        culture: 'ko'
      },
      ckeditor5: {
        enabled: false
      },
      management: {
        enabled: false
      }
    }
  }
})
