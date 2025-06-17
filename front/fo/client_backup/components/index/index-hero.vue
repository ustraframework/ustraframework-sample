<template>
  <section class="hero is-info is-halfheight">
    <div class="hero-body main-hero-body">
      <div>
        <p ref="textWrapper" class="title">U.STRA Framework</p>
        <p class="subtitle">Inhanced Development Environment For Enterprise Applicaiton.</p>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import anime from 'animejs'

@Component
export default class extends CustomFoComponent {
  // #region variables
  @Ref() textWrapper: HTMLElement
  // #endregion
  // #region hooks
  mounted() {
    this.textWrapper.innerHTML = this.textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

    anime
      .timeline({ loop: true })
      .add({
        targets: '.main-hero-body .title .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: 950,
        delay: (_el, i) => 70 * i,
      })
      .add({
        targets: '.main-hero-body .title',
        opacity: 0.1,
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 3000,
      })
  }
  // #endregion
  // #region methods
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss">
.main-hero-body {
  background-image: url('/img/main-bg.jpg');

  & .title {
    font-weight: 900;
    font-size: 3.5em;

    & .letter {
      line-height: 1em;
      display: inline-block;
    }
  }
}
</style>
