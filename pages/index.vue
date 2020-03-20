<template lang="pug">
  div.wrapper
    jumbotron
    auto-offer-wrapper
    div.container
      div.my-3
        h1.text-center="Аренда авто без водителя"
    main-page-features
    banners-section
    section
      div.container
        b-row
          b-col(sm="12" md="12" lg="6")
            nuxt-link(to="/rent/").nodec
              h3.text-center="Автомобили без водителя"
            CWoDComponent(:items="CWoD")
          b-col(sm="12" md="12" lg="6")
            nuxt-link(to="/service/").nodec
              h3.text-center="Автомобили с водителем"
            CWDComponent(:items="CWD")
    newsMainPageWrapper(:items="news")
</template>

<script>
  import jumbotron from "../components/jumbotron";
  import autoOfferWrapper from "../components/autoOfferWrapper";
  import mainPageFeatures from "../components/mainPageFeatures";
  import mainPageArticle from "../components/mainPageArticle";
  import newsMainPageWrapper from "../components/newsMainPageWrapper";
  import CWDComponent from "../components/CWDComponent";
  import CWoDComponent from "../components/CWoDComponent";
  import BannersSection from "../components/BannersSection";
  export default {
    head () {
      return {
        title: 'Аренда авто без водителя в Сочи и Симферополе',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто без водителя в Сочи: ✮ без ограничения пробега ✮ скидки до 25% ✮ 250 машин в автопарке ✮ бесплатная подача в аэропорт ✮ Бронируй онлайн!⭐'}
        ]
      }
    },
    components: {
      autoOfferWrapper,
      jumbotron,
      mainPageFeatures,
      BannersSection,
      newsMainPageWrapper,
      CWDComponent,
      CWoDComponent,
      mainPageArticle
    },
    data(){
      return {
        news: [],
        CWD: [],
        CWoD: [],
      }
    },
    methods: {
      fetchLatestNews(){
        this.$axios(`sun/getLatestNews?city=${this.$config.station}`)
          .then(result => {
            if (result.data.status === 'success'){
              this.news = result.data.data;
            }
          }).catch(err => console.error(err))
      },
      fetchCWoD(){
        this.$axios.post('sun/carsWithoutDriverMainPage', {city: this.$config.station})
        .then(result => {
          if (result.data.status === 'success'){
            this.CWoD = result.data.data;
          }
        }).catch(err => console.error(err));
      },
      fetchCWD(){
        this.$axios.post('sun/carsWithDriverMainPage', {city: this.$config.station})
        .then(result => {
          if (result.data.status === 'success'){
            this.CWD = result.data.data;
          }
        }).catch(err => console.error(err));
      },
    },
    mounted() {
      this.fetchLatestNews()
      this.fetchCWoD()
      this.fetchCWD()
    }
  }
</script>

<style lang="sass">
  .nodec
    text-decoration: none
    h3
      color: #222222
</style>

