<template>
  <div>
    <WjFlexGrid :itemsSource="data" style="height: 800px" :isReadOnly="true">
      <WjFlexGridColumn :width="400" align="center">
        <WjFlexGridCellTemplate cellType="Cell" binding="path" v-slot="cell">
          <div style="width: 300px; height: 300px">
            <img :src="cell.item.path" style="max-width: 100%; max-height: 100%" v-image />
          </div>
        </WjFlexGridCellTemplate>
      </WjFlexGridColumn>
    </WjFlexGrid>
  </div>
</template>
<script lang="ts" setup>
import { WjFlexGrid, WjFlexGridCellTemplate, WjFlexGridColumn } from '#ustra/nuxt-wijmo/components'

const data = [
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
  { path: 'http://localhost:30001/1.jpg' },
]

definePageMeta({
  auth: {
    required: false,
  },
  layout: false,
})
</script>
