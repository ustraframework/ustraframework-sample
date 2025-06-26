export default defineNuxtPlugin(nuxtApp => {
  console.log('test plugin loaded...')

  nuxtApp.hook('ustra:plugin:api', (api, $ustra) => {
    api.getAxiosInstance().then(axios => {
      axios.interceptors.request.use(config => {
        console.log('config', config)
        return config
      })
    })
  })

  nuxtApp.hook('ustra:plugin:auth', (auth, $ustra) => {
    $ustra.hooks.hook('auth:activated', info => {
      console.log('auth:activated', info)
    })
  })

  // useWijmoFlexGridDefaultOption({
  //   emptyText: 'No Data',
  // })
})
