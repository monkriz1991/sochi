<template lang="pug">
  div
    ul.list-unstyled.side-menu
      li
        nuxt-link(:to="{name: $assets.prefix('about-events', $i18n.locale)}")="{{$t('m11')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('about-drivers', $i18n.locale)}")="{{$t('m12')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('about-partners', $i18n.locale)}")="{{$t('m13')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('about-faq', $i18n.locale)}")="{{$t('m14')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('about-discounts', $i18n.locale)}")="{{$t('m15')}}"
</template>

<script>
  export default {
    name: "aboutSidebarMenu"
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .side-menu
    position: -webkit-sticky
    position: sticky
    top: 0
    padding: 0 15px
    li
      padding: 3px 0
      a
        color: $primary
        text-decoration: underline
        transition: 0.3s
        &.nuxt-link-exact-active
          color: $primary_hover
          text-decoration: none
        &:hover
          color: $primary_hover
          text-decoration: none
</style>
