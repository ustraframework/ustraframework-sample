<template>
  <section class="container hero is-info is-halfheight" >
    <div class="hero-body main-hero-body">
      <div>
        <p ref="textWrapper" class="title">U.STRA Framework</p>
        <p class="subtitle pt-4">Inhanced Development Environment For Enterprise Applicaiton.</p>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import anime from 'animejs'

definePageMeta({
  auth: {
    required: false,
  },
})

const textWrapper = ref(null)

onMounted(() => {

  textWrapper.value.innerHTML = textWrapper.value.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

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
})


</script>
<style scoped lang="scss">
.container {
  height: 100%;
}

.hero {
  padding-top: 100px;
  padding-left: 20px;
  background-color: white;
}

.main-hero-body {
  background-image: url('@static/img/main-bg.jpg');

  & .title {
    font-weight: 900;
    font-size: 4.5em;
    color: #033FFF;

    & .letter {
      line-height: 1em;
      display: inline-block;
    }
  }

  & .subtitle {
    color: #071A52;
  }
}
</style>