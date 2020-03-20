<template lang="pug">
  section#service
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="Аренда авто c водителем"
        div(v-if="loaded")
          c-w-d-component-full(:items="CWD")
        div(v-else)
          loader
</template>

<script>
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import CWDComponentFull from "../../components/CWDComponentFull";
  import devider from "../../components/devider";
  export default {
    head () {
      return {
        title: 'Аренда авто c водителем в Сочи и Симферополе',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто c водителем в Сочи: ✮ новые машины✮ скидки до 25% ✮ 250 машин в автопарке ✮ бесплатная подача в аэропорт ✮ Бронируй онлайн!⭐'}
        ]
      }
    },
    components:{
      devider,
      BreadCrumbs,
      loader,
      CWDComponentFull
    },
    data(){
      return {
        CWD: [],
        loaded: false,
        bcItems: [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Аренда авто с водителем',
            active: true
          }
        ],
      }
    },
    methods:{
      fetchCWD(){
        this.$axios.post('sun/carsWithDrivers', {city: this.$config.station})
          .then(result => {
            if (result.data.status === 'success'){
              this.CWD = result.data.data;
              this.loaded = true
            }
          }).catch(err => console.error(err));
      },
    },
    mounted() {
      this.fetchCWD();
    }
  }
</script>

<style lang="sass" scoped>

</style>
