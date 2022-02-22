<template lang="pug">
  div
    ul.list-unstyled.side-menu
      li
        nuxt-link(:to="{name: $assets.prefix('support-doc', $i18n.locale)}")="Ответственность сторон при аренде автомобиля"
      li
        nuxt-link(:to="{name: $assets.prefix('support-incident', $i18n.locale)}")="Инструкция действий клиента при ДТП"
</template>

<script>
  export default {
    name: "supportSidebarMenu"
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
