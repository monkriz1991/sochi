<template lang="pug">
  div.wrapper
    div.info.p-3.my-2
      h5(v-bind:class="{small:small}").text-center.text-uppercase="{{$t('warning1')}}"
</template>

<script>
  export default {
    name: "Warning",
    props: {
      small: {
        type: Boolean
      }
    }
  }
</script>

<style lang="sass" scoped>
  .info
    border: 3px solid #2AA30C
    border-radius: 20px
    background: rgba(42, 163, 12, 0.1)
</style>
