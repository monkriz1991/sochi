<template lang="pug">
    div.d-flex.flex-wrap
        div(v-if="withBack").b-slash
            nuxt-link(:to="`${$i18n.locale === 'ru'? '' : '/en'}/${backStringHref}`").btn.main="{{$t('s6')}}"
        div
            b-breadcrumb(:items="items").px-1
</template>

<script>
  export default {
    name: "BreadCrumbs",
    data(){
      return {}
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      backStringHref: {
        type: String,
        required: false,
      },
      withBack: {
        type: Boolean,
        required: false,
        default: false
      },
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .b-slash
    padding-right: 1rem
    @media screen and (max-width: 414px)
      padding: 1rem
      width: 100%
      a
        width: 100%
  .breadcrumb
    display: flex
    flex-wrap: wrap
    padding: 0.75rem 1rem
    margin-bottom: 1rem
    list-style: none
    background-color: transparent
    border-radius: 0
    .breadcrumb-item
      a
        color: $primary
        font-size: 12px
        text-transform: uppercase
        font-weight: bold
      &.active
        span
          font-size: 12px
          text-transform: uppercase
          font-weight: bold
      &:before
        font-size: 10px
</style>
