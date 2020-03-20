<template lang="pug">
  div
    ul.list-unstyled.side-menu
      li
        nuxt-link(to="/about/events/")="Мероприятия"
      li
        nuxt-link(to="/about/drivers/")="Водители"
      li
        nuxt-link(to="/about/partners/")="Партнеры"
      li
        nuxt-link(to="/about/faq/")="FAQ"
      li
        nuxt-link(to="/about/discounts/")="Условия получения дополнительных скидок"
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
