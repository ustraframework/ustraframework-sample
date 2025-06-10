<!-- <template>
  <UWjComboBox v-bind="$attrs" :itemsSource="itemsSource" v-model="comboValue" displayMemberPath="display" selectedValuePath="value" />
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, watch, defineOptions } from '#ustra/nuxt'
import { UWjComboBox } from '#ustra/nuxt-wijmo/components'
import { useComboComponent, CodeComboBoxProps, CodeItem } from '#ustra/nuxt-wijmo/management/components/composables/code-combo'

defineOptions({
  name: 'ManagementCodeComboBox',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UCodeComboBoxProps>(), {
  onlyUse: true,
  modelValue: null,
  objectValue: null,
  displayCode: false,
  customizeItems: null,
  sortByName: false,
  sortByCode: false,
  displayNullText: null,
})

const { comboValue, itemsSource, vmodelValue, objectValue } = useComboComponent(props)

watch(
  itemsSource,
  v => {
    // select first value
    if (!comboValue.value && v.length > 0) {
      comboValue.value = v[0].value
    }
  },
  {
    immediate: true,
  },
)
</script>

<script lang="ts">
export interface UCodeComboBoxProps extends CodeComboBoxProps {
  /**
   * model value
   */
  modelValue?: string
}
</script> -->
