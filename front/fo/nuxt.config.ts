import { defineNuxtConfig } from 'nuxt/config'

const configEnv = process.env.CONFIG_ENV || 'local'

export default defineNuxtConfig({
  ssr: true,
  debug: true,
  modules: ['@nuxt/devtools', '@ustra/nuxt'],
  routeRules: {
    '/api/**': { proxy: configEnv === 'dev'? 
                  'http://host.docker.internal:9902/api/**' : 
                  'http://localhost:9902/api/**' 
                },
  },
  vite: {
    server: {
      hmr: {
        clientPort: 9912
      }
    },
    build : {
      rollupOptions : {
        external : ['vue-qrcode'],
      }
    }
  },
  ustra: {
    app: {
      processPath: __dirname,
      configDirPath: './config',
    },
    auth: {
      enabled: true,
      type: 'jwt',
      jwt: {
        accessTokenKey: 'sample-fo-token',
        useCookie: false,
      },
    },
    nuxt: {
      env: {
        secret: 'Z3NjLWNyeXB0by1rZXkxMQ=='
      },
      wijmo: {
        enabled: false,
        styles: {
          theme: 'light'
        },
        culture: 'ko'
      },
      ckeditor5: {
        enabled: false
      },
      vuetify: {
        enabled: true,
      },
      management: {
        enabled: false,
        ui: {
          tabMenu: {
            enabled: false,
          },
          defaultPage: {
            system: {
              copyResource: {
                enabled: false,
              },
            },
            login: {
              include: false,
            },
          },
        },
      },
    },
    // interfaces: {
    //   initialDataApiUrl: '/api/interface/all',
    // },
    // mobile: {
    //   enabled: true,
    //   hybrid: {
    //     nativeAgent: {
    //       android: 'client1',
    //       ios: 'client2',
    //     },
    //     bridge: {
    //       enabled: true,
    //       useTokenSecurity: true,
    //       staticBridgeNames: {
    //         notifyLoaded: 'GPC_MB_NOTIFY_LOADED',
    //         toast: 'GPC_MB_TOAST',
    //         currentTime: 'GPC_MB_CURRENT_TIME',
    //         storage: 'GPC_MB_STORAGE',
    //       }
    //     },
    //   },
    // },
  }
})
