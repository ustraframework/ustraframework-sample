import { resolve } from 'pathe'
import { LogLevel } from '#ustra/core/config'

const configEnv = process.env.CONFIG_ENV

export default defineNuxtConfig({
  // extends: `./app/config/${configEnv}`,
  ssr: false,
  debug: true,
  modules: ['@nuxt/devtools', '@ustra/nuxt'],
  // alias: frameworkSupport.getModuleAlias(__dirname),
  experimental: {
    headNext: true,
  },
  features: {
    inlineStyles: id => {
      console.log('id', id)
      return true
    },
  },
  // app: {
  //   // pageTransition: false,
  //   // layoutTransition: false,
  // },
  plugins: [
    {
      src: '~/plugins/test',
      order: 10,
    },
  ],
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       output: {
  //         manualChunks(id) {
  //           if (id.includes('node_modules')) {
  //             const filePath = id.toString().split('node_modules/')[1]
  //             const moduleNames = filePath.split('/')

  //             if (filePath[0].startsWith('@')) {
  //               return moduleNames[0] + '-' + moduleNames[1]
  //             }

  //             return moduleNames[0].toString()
  //           }
  //         },
  //       },
  //     },
  //   },
  //   // build: {
  //   //   chunkSizeWarningLimit: 1600,
  //   // },
  // },
  // vite: {
  //   resolve: {
  //     alias: [
  //       {
  //         find: 'eventsource',
  //         replacement: resolve(__dirname, '../../node_modules/sockjs-client/lib/transport/browser/eventsource.js'),
  //       },
  //       {
  //         find: 'events',
  //         replacement: resolve(__dirname, '../../node_modules/sockjs-client/lib/event/emitter.js'),
  //       },
  //       {
  //         find: 'crypto',
  //         replacement: resolve(__dirname, '../../node_modules/sockjs-client/lib/utils/browser-crypto.js'),
  //       },
  //     ],
  //   },
  // },
  // hooks: {
  //   'vite:extendConfig': config => {
  //     // console.warn('vite:extendConfig')
  //     // config.plugins.push(progress())
  //   },
  // },
  // css: ['#ustra/nuxt-wijmo/assets/styles/index.scss', '#ustra/nuxt-wijmo/management/assets/styles/index.scss'],
  app: {
    head: {
      script: [],
      bodyAttrs: {
        class: 'ustra management',
      },
      // script: [{ src: 'http://dapi.kakao.com/v2/maps/sdk.js?appkey=41f772e7439076965bd5bb6e6639e245&libraries=services' }],
    },
  },
  ustra: {
    app: {
      configDirPath: './app',
    },
    logging: {
      name: ['dev', 'local'].includes(configEnv) ? 'demo' : 'demo-prd',
      // level: LogLevel.Info,
    },
    server: {
      middleware: {
        proxy: {
          proxies: {
            '/api/': { target: 'http://localhost:9901', ws: true },
          },
        },
      },
    },
    auth: {
      enabled: true,
      type: 'jwt',
      jwt: {
        accessTokenKey: 'mng-bo-token',
        refreshTokenKey: 'mng-bo-rtoken',
      },
      autoLogoutSeconds: 30000,
      duplication: {
        // type: 'websocket',
        checkPath: 'ws://localhost:3000/api/auth-ws',
      },
    },
    nuxt: {
      api: {
        maximumConcurrentNumber: 3,
        taskDelay: 10,
      },
      router: {
        extendPagesDirs: [resolve(__dirname, './pages copy')],
      },
      //error: {
      // handlerType: 'redirect',
      //},
      meta: {
        auth: {
          required: true,
          // validateAuthentication: async () => {
          //   const route = useRoute()
          //   console.log('route', route)
          //   const core = await (await import('#ustra/core/utils')).core
          //   console.log('core', core)
          //   return core.isEmpty({})
          //   // return null
          // },
          // async validateAuthentication() {
          //   const route = useRoute()
          //   console.log('route', route)
          //   const core = await (await import('#ustra/core/utils')).core
          //   console.log('core', core)
          //   return core.isEmpty({})
          //   // return null
          // },
        },
      },
      env: {
        secret: 'Z3NjLWNyeXB0by1rZXkxMQ==',
      },
      wijmo: {
        enabled: true,
        styles: {
          theme: 'light',
          // addFrameworkCustomStyle: false,
        },
        culture: 'ko',
        samples: {
          additionalMenus: [
            {
              title: '프로젝트 샘플',
              icon: 'mdi-group',
              items: [{ title: '샘플1', componentPath: '~/components/sample/router1.vue' }],
            },
          ],
          copyResource: {
            enabled: false,
          },
        },
      },
      ckeditor5: {
        enabled: true,
      },
      management: {
        enabled: true,
        ui: {
          tabMenu: {
            enabled: true,
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
  },
})
