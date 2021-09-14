<template>
  <div>
    <div class="sample-container">안녕하세요.</div>
    <div ref="valueEl">{{ value1 }}</div>
    <div>{{ comValue2 }}</div>
    <button @click="changeValue">value1 값 변경</button>
    <button @click="comValue2 = 'a,b'">comValue2 값 변경</button>

    <sub-component ref="subComponent" :text.sync="subText" :text-sub="subText2" @text2_required_change="text2RequiredChange" />
    <button @click="subText = '변경'">subText 변경</button>
    <button @click="notify">notify</button>
  </div>
</template>
<script lang="ts">
import { Component, Ref, Watch } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import SubComponent from '@/components/sample/sub-component.vue'
import { HttpMethod } from '@ustra/core/src/server/http/const'

@Component({
  name: 'sample2-index-page',
  components: {
    SubComponent,
  },
  asyncData: async ctx => {
    const result = (
      await ctx.$ustra.api.call({
        url: 'http://localhost:9902/api/npass/test',
        method: HttpMethod.POST,
        data: {},
      })
    ).data

    return { subText: result.body }
  },
})
export default class extends CustomFoComponent {
  // #region variables
  value1: string = null
  value2: string = 'a'

  subText: string = '상위 컴포넌트 Prop 값'
  subText2: string = 'text2 기본 값'

  @Ref() readonly valueEl: HTMLDivElement
  @Ref() readonly subComponent: SubComponent

  get comValue2() {
    return this.value1 + this.value2
  }

  set comValue2(value: string) {
    this.value1 = value.split(',')[0]
    this.value2 = value.split(',')[1]
  }

  // set comValue2() {}

  // #endregion
  // #region hooks

  created() {
    this.value1 = 'value1'
  }

  mounted() {
    // console.log('refs', this.valueEl)
    this.valueEl.innerHTML = 'test변수'
  }

  // #endregion
  // #region methods

  changeValue() {
    this.value1 = 'value1 변경'
  }

  text2RequiredChange(e) {
    this.subText2 = e
  }

  notify() {
    this.subComponent.notify()
  }

  // #endregion
  // #region watches
  @Watch('comValue2')
  comValue2Changed(v, o) {
    console.log(v, o)
  }

  // #endregion
}
</script>
<style lang="scss">
.sample-container {
  margin-top: 200px;
}
</style>
