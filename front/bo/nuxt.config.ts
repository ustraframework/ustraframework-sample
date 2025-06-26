import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt/config'

const configEnv = process.env.CONFIG_ENV

export default defineNuxtConfig({
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
  plugins: [
    {
      src: '~/plugins/test',
      order: 10,
    },
  ],
  vite: {
    server: {
      hmr: {
        clientPort: 9911
      }
    },
    build : {
      rollupOptions : {
        external : ['vue-qrcode'],
      }
    }
  },
  app: {
    head: {
      script: [],
      bodyAttrs: {
        class: 'ustra management',
      },
    },
  },
  ustra: {
    logging: {
      name: ['dev', 'local'].includes(configEnv) ? 'demo' : 'demo-prd',
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
        checkPath: 'ws://localhost:9911/api/auth-ws',
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
      meta: {
        auth: {
          required: true,
        },
      },
      env: {
        secret: 'Z3NjLWNyeXB0by1rZXkxMQ==',
      },
      wijmo: {
        enabled: true,
        styles: {
          theme: 'light',
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
