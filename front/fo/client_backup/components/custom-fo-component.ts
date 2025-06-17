import { Component } from 'vue-property-decorator'
import { UstraComponent } from '@ustra/nuxt/src/vue/components/ustra-component'
import { HttpMethod } from '@ustra/core/src/server/http/const'

@Component
export default class CustomFoComponent extends UstraComponent {
  mounted() {}

  async logout() {
    await this.$ustra.api.call({
      url: '/api/auth/logout',
      method: HttpMethod.POST,
    })
    await this.$ustra.auth.logout(false, true)

    this.$router.push('/')
  }
}

export { CustomFoComponent }
