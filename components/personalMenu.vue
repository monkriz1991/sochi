<template lang="pug">
  div
    ul.list-unstyled.side-menu
      li
        nuxt-link(:to="{name: $assets.prefix('personal-user', $i18n.locale)}")="{{$t('lk1')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('personal-user-settings', $i18n.locale)}")="{{$t('lk2')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('personal-user-history', $i18n.locale)}")="{{$t('lk3')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('personal-user-miles', $i18n.locale)}")="{{$t('lk4')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('personal-user-spend', $i18n.locale)}")="{{$t('lk5')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('personal-user-drivers', $i18n.locale)}")="{{$t('lk6')}}"
      li
        nuxt-link(:to="{name: $assets.prefix('personal-user-offers', $i18n.locale)}")="{{$t('lk7')}}"
</template>

<script>
  export default {
    name: "personalMenu"
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
          color: #222
          text-decoration: none
          &:hover
            color: #222
        &:hover
          color: $primary_hover
          text-decoration: none
</style>
