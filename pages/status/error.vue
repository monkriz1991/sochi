<template lang="pug">
  section#status
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        div.status.success.my-5
          div.status-box
            div.status-element
          p="{{$t('breadcrumbs20')}}"
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  export default {
    components: {
      devider,
      BreadCrumbs,
    },
    data(){
      return {
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs18'),
            active: true
          }
        ],
      }
    },
    methods:{
      goMain(){
        this.$router.push({ name: this.$assets.prefix('index', this.$i18n.locale)});
      }
    },
    mounted() {
      setTimeout(this.goMain, 15000)
    }
  }
</script>

<style lang="sass" scoped>
  .status
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center
    p
      font-size: 24px
      margin: 10px 0
      text-align: center
      font-family: 'Roboto Condensed', sans-serif
      text-transform: uppercase
    .status-box
      border: 3px solid red
      border-radius: 100px
      padding: 10px
      .status-element
        background: red
        border-radius: 100px
        display: flex
        justify-content: center
        align-items: center
        width: 150px
        height: 150px
        &:after
          content: '\2717'
          color: #fff
          font-size: 82px
          font-weight: bold
</style>
