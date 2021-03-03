<template lang="pug">
    div.devider.d-none.d-lg-flex
      div.container
        hr.m-0
        b-row
          b-col(sm="12" md="6" lg="6").d-flex.justify-content-center.align-items-center.align-content-center
            nuxt-link(:to="{name: $assets.prefix('rent', $i18n.locale)}").link.text-center="{{$t('s7')}}"
          b-col(sm="12" md="6" lg="6").d-flex.justify-content-center.align-items-center.align-content-center
            nuxt-link(:to="{name: $assets.prefix('service', $i18n.locale)}").link.text-center="{{$t('s8')}}"
</template>

<script>
  export default {
    name: "devider"
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .devider
    background-color: #E8EEF2
    .link
      text-transform: uppercase
      font-family: 'Roboto Condensed', sans-serif
      font-size: 1.3rem
      padding: 15px 0
      color: #222222
      &.nuxt-link-active
        color: $primary
</style>
