import path from 'path'
import { configProperties, env } from '@ustra/core'
import NuxtConfigLoader from '@ustra/nuxt/src/config/nuxt-config-loader'
import NuxtAppProperties from '@ustra/nuxt/src/config/nuxt-app-properties'

export default async () => {
  const config: NuxtAppProperties = {
    app: {
      processPath: __dirname,
      profile: process.env.CONFIG_ENV,
      configDir: 'config',
      deviceType: configProperties.DeviceType.MOBILE,
      title: 'U.STRA Node Framework Sample - FO',
      auth: {
        enabled: true,
        loginUrl: '/customer',
        jwt: {
          useCookie: false,
          accessTokenKey: 'sample-fo-token',
          refreshTokenKey: 'ref-token',
        },
      },
    },
    logger: {
      level: configProperties.LogLevel.Debug,
      file: true,
      datePattern: 'YYYY-MM-DD-HH',
    },
    server: {
      type: configProperties.ServerType.CONNECT,
      middleware: {
        compress: true,
        bodyParser: true,
        // cmm 경로 static 리소스 참조
        staticLocations: [{ serverPath: '/', path: path.resolve(__dirname, '../cmm/src/static') }],
      },
    },
    nuxt: {
      module: {
        useCookie: true,
        useUstraBuefy: {
          css: true,
          materialDesignIcons: true,
        },
        useMarkdown: true,
      },
      // cmm 프로젝트 css 공통 사용
      css: ['~/assets/global.scss', path.resolve(__dirname, '../cmm/src/assets/cmm.scss')],
      head: {
        titleTemplate: 'U.STRA Node Framework Sample - FO %s',
        title: '',
      },
      generation: {
        generateDirPath: '../../../back/root/fo/src/main/resources/static',
        generateProfiles: [env.Profile.DEV, env.Profile.STAGING, env.Profile.PRODUCTION],
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
            useTokenSecurity: false,
          },
        },
      },
    },
  }

  return await NuxtConfigLoader.nuxtConfig(config, (_prop, _config) => {
    _config.env.SERVER_PROP_ENC_KEY = 'Z3NjLWNyeXB0by1rZXkxMQ=='

    _config.build.transpile.push('@ustra-sample/cmm')
    _config.router.middleware.push('custom')
  })
}
