<template>
  <div>
    <ul>
      <li v-for="item in boardList" :key="item.id">
        {{ item.title }}
        <button @click="() => remove(item.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Ref, Watch, Inject, InjectReactive, Provide, ProvideReactive, PropSync, Emit } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'

@Component({
  layout: 'fredit',
})
export default class extends CustomFoComponent {
  // #region variables
  get boardList() {
    return this.$ustra.store.fredit().boardList
  }
  // #endregion
  // #region hooks
  created() {}
  // #endregion
  // #region methods
  remove(id) {
    this.$ustra.store.fredit().setBoardList(this.boardList.filter(board => board.id !== id))
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
