<template lang="pug">
  section#online-booking
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1.text-uppercase="{{$t('breadcrumbs14')}}"
        warning
      search-form
      auto-offer-wrapper
</template>

<script>
  import Warning from "../../components/Warning";
  import searchForm from "../../components/searchForm";
  import autoOfferWrapper from "../../components/autoOfferWrapper";
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
    export default {
        name: "index",
        components: {
          Warning,
          searchForm,
          autoOfferWrapper,
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
                text: this.$t('breadcrumbs14'),
              }
            ]
          }
        }
    }
</script>

<style scoped>

</style>
