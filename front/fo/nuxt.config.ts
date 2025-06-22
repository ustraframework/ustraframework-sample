import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  debug: true,
  ssr: true,
  modules: ['@nuxt/devtools', '@ustra/nuxt'],
  // experimental: {
  //   headNext: true,
  // },
  // features: {
  //   inlineStyles: id => {
  //     console.log('id', id)
  //     return true
  //   },
  // },
  // runtimeConfig: {
  //   public: {
  //     apiBase: '/api'
  //   },
  // },
  routeRules: {
    '/api/**': { proxy: 'http://localhost:9902/api/**' },
  },
  vite: {
    server: {
      hmr: {
        clientPort: 3000
      }
    },
    build : {
      rollupOptions : {
        external : ['vue-qrcode'],
      }
    }
  },
  // devServer: {
  //   port: 9912,
  //   host: '0.0.0.0'
  // },
  // app: {
  //   head: {
  //     script: [],
  //     bodyAttrs: {
  //     },
  //   },
  // },
  ustra: {
    app: {
      // configDirPath: './app',
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
    interfaces: {
      initialDataApiUrl: '/api/interface/all',
    },
    mobile: {
      enabled: true,
      hybrid: {
        nativeAgent: {
          android: 'client1',
          ios: 'client2',
        },
        bridge: {
          enabled: true,
          useTokenSecurity: true,
          staticBridgeNames: {
            notifyLoaded: 'GPC_MB_NOTIFY_LOADED',
            toast: 'GPC_MB_TOAST',
            currentTime: 'GPC_MB_CURRENT_TIME',
            storage: 'GPC_MB_STORAGE',
          }
        },
      },
    },
  }
})
