<template lang="pug">
    section#rent
      devider
      main.py-3
        div.container
          BreadCrumbs(:items="bcItems")
          h1="Аренда авто в Адлере"
          div(v-if="loaded")
            c-wo-d-component-full(:items="CWoD")
          div(v-else)
            loader
</template>

<script>
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import CWoDComponentFull from "../../components/CWoDComponentFull";
  import devider from "../../components/devider";
  export default {
    head () {
      return {
        title: 'Аренда авто в Адлере по низким ценам',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в Адлере: *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    components:{
      devider,
      BreadCrumbs,
      loader,
      CWoDComponentFull
    },
    data(){
      return {
        CWoD: [],
        loaded: false,
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs17'),
            active: true
          }
        ],
      }
    },
    methods:{
      fetchCWoD(){
        this.$baseApi.post('sun/carsWithoutDrivers', {city: this.$config.station})
          .then(result => {
            if (result.data.status === 'success'){
              this.CWoD = result.data.data;
              this.loaded = true
            }
          }).catch(err => console.error(err));
      },
    },
    mounted() {
      this.fetchCWoD();
    }
  }
</script>

<style lang="sass" scoped>

</style>
