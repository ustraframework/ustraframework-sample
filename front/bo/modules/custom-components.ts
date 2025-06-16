import { addComponent, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    addComponent({
      name: 'WjComboBox',
      export: 'WjComboBox',
      filePath: '#ustra/nuxt-wijmo/components',
    })
  },
})
