<template lang="pug">
  div.wrapper
    jumbotron
    auto-offer-wrapper
    div.container
      div.my-3
        main-page-article(v-if="$i18n.locale === 'ru'")
        main-page-article-en(v-else)
    main-page-features
    banners-section
    section
      div.container
        b-row
          b-col(sm="12" md="12" lg="6")
            nuxt-link(:to="{name: $assets.prefix('rent', $i18n.locale)}").nodec
              h3.text-center="{{$t('s7')}}"
            CWoDComponent(:items="CWoD")
          b-col(sm="12" md="12" lg="6")
            nuxt-link(:to="{name: $assets.prefix('service', $i18n.locale)}").nodec
              h3.text-center="{{$t('s8')}}"
            CWDComponent(:items="CWD")
    newsMainPageWrapper(:items="news")
</template>

<script>
  import jumbotron from "../components/jumbotron";
  import autoOfferWrapper from "../components/autoOfferWrapper";
  import mainPageFeatures from "../components/mainPageFeatures";
  import mainPageArticle from "../components/mainPageArticle";
  import mainPageArticleEn from "../components/mainPageArticleEn";
  import newsMainPageWrapper from "../components/newsMainPageWrapper";
  import CWDComponent from "../components/CWDComponent";
  import CWoDComponent from "../components/CWoDComponent";
  import BannersSection from "../components/BannersSection";
  export default {
    head () {
      return {
        title: 'Аренда авто в Сочи и Адлере',
        meta: [
          {hid: 'description', name: 'description', content: 'Прокат машин в Сочи: *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
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
      mainPageArticle,
      mainPageArticleEn
    },
    computed:{
      news(){
        let res = [];
        let data = require('../news.json');
        let keys = Object.keys(data);
        for(let i = 0; i < 4; i++){
          res.push(data[keys[i]])
        }
        return res;
      },
      CWD(){
        let data = require('../cars.json').CWD
        let first = this.randomEl(data);
        if (first === undefined){
          first = this.randomEl(data);
        }
        let second = this.randomEl(data, first.slug);
        if (second === undefined){
          this.randomEl(data, first.slug)
        }
        return [first, second]
      },
      CWoD(){
        let data = require('../cars.json').CWoD
        let first = this.randomEl(data);
        if (first === undefined){
          first = this.randomEl(data);
        }
        let second = this.randomEl(data, first.slug);
        if (second === undefined){
          this.randomEl(data, first.slug)
        }
        return [first, second]
      }
    },
    methods: {
      randomEl(obj, key=false){
        let keys = Object.keys(obj);
        let searched_key = (keys.length - 1) * Math.random() << 0;
        let searched_index = keys[searched_key];
        let item = obj[searched_index]
        if (key){
          if (item.slug === key){
            this.randomEl(obj, key)
          }else{
            return item;
          }
        }else{
          if (item){
            return item
          }else{
            this.randomEl(obj, key)
          }
        }
      },
    }
  }
</script>

<style lang="sass">
  .nodec
    text-decoration: none
    h3
      color: #222222
</style>

