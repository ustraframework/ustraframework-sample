<template>
  <UBox direction="col">
    <UItem :ratio="1">
      <WjTabPanel>
        <WjTab>
          <a>배치 작업</a>
          <BatchTask />
        </WjTab>
        <WjTab>
          <a>배치 작업 내역</a>
          <BatchHist />
        </WjTab>
        <WjTab>
          <a>배치 매니저</a>
          <BatchManager />
        </WjTab>
        <WjTab>
          <a>배치 워커</a>
          <BatchWorker />
        </WjTab>
      </WjTabPanel>
    </UItem>
  </UBox>
</template>
<script lang="ts" setup>
import { ref } from '#ustra/nuxt'
import { UBox, UItem, UFieldSet, UFieldRow, UField, WjTabPanel, WjTab } from '#ustra/nuxt-wijmo/components'
import BatchTask from './task/index.vue'
import BatchHist from './hist/index.vue'
import BatchManager from './manager/index.vue'
import BatchWorker from './worker/index.vue'
</script>
<script lang="ts">
export default {
  name: 'UstraManagementSystemBatch',
}
</script>
