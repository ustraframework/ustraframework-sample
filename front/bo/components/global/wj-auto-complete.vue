<template>
  <WjAutoComplete>
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </WjAutoComplete>
</template>
<script lang="ts" setup>
import { WjAutoComplete } from '@grapecity/wijmo.vue2.input'
</script>
