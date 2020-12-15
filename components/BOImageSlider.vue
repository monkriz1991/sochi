<template lang="pug">
  div
    b-carousel(
      id="carousel"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#fff"
      img-width="100%"
      img-height="300px"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      )
      b-carousel-slide(v-for="(i, idx) in items" :key="idx" img-blank)
        template(v-slot:img)
          div(v-bind:style="{backgroundImage: `url(${$assets.prepare_url_to_local(i, $config.environment, $config.local_url)})`}").carousel-item-ins
</template>

<script>
  export default {
    name: "BOImageSlider",
    props: {
      items: {
        type: Array,
      }
    },
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style lang="sass" scoped>
  .carousel-item
    .carousel-item-ins
      height: 370px
      background-repeat: no-repeat
      background-size: cover
      background-position: center
      @media screen and (max-width: 500px)
        height: 240px
</style>
