<template lang="pug">
  section#personal
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        b-row
          b-col(sm="12" md="3" lg="3")
            aside
              div.side-wrapper
                personal-menu
          b-col(sm="12" md="9" lg="9")
</template>

<script>
  import devider from "../../../components/devider";
  import personalMenu from "../../../components/personalMenu";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  export default {
    components: {
      personalMenu,
      devider,
      BreadCrumbs
    },
    data(){
      return {
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('lk3'),
            active: true
          }
        ],
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
