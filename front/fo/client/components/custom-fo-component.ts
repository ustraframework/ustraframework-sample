import { Component } from 'vue-property-decorator'
import { UstraComponent } from '@ustra/nuxt/src/vue/components/ustra-component'

@Component
export default class CustomFoComponent extends UstraComponent {
  mounted() {}
}

export { CustomFoComponent }
