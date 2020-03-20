<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1(v-html="`${this.loaded ? this.item.self_data.title : this.seo['CWD'][this.$route.params.car_slug].title} с водителем`")
        div(v-if="loaded")
          b-row
            b-col(sm="12" md="12" lg="6")
              div.slider-wrapper
                b-o-image-slider(:items="item.self_data.photos")
            b-col(sm="12" md="12" lg="6")
              div.information
                h3="Стоимость"
                div.prices.my-3
                  div
                    h6="Аренда автомобиля с водителем: от {{item.self_data.price_hour}}₽ в час без ограничения по пробегу."
                div.py-2
                  h3="Трансфер"
                  div.prices.my-3
                    div.d-flex.justify-content-between.align-items-center
                      h6.m-0.text-uppercase="Населенный пункт"
                      h6.m-0.text-uppercase="Стоимость"
                    hr
                    div.item-info
                      p.l="МЕЖДУНАРОДНЫЙ АЭРОПОРТ СОЧИ"
                      p.r="Бесплатно"
                    div.item-info
                      p.l="СОЧИ ЖД ВОКЗАЛ"
                      p.r="2500₽"
                    div.item-info
                      p.l="СОЧИ, ЦЕНТР"
                      p.r="2500₽"
                    div.item-info
                      p.l="АДЛЕР ЖД ВОКЗАЛ"
                      p.r="1000₽"
                    div.item-info
                      p.l="СОЧИ, КРАСНАЯ ПОЛЯНА"
                      p.r="2000₽"
                div.mt-2
                  div(v-html="$assets.generate_text_transfer(item.self_data.text_transfer, item.self_data.title)")
                div.py-2
                  h3.m-0="Водители"
                  div(v-html="$assets.generate_text_drivers(item.self_data.text_drivers)")
                div.py-2
                  h3.m-0="Характеристики"
                  div.py-1
                    b-row.features-list-icos
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.bag(v-html="`${$assets.getBagsData(item.tth.bags, item.tth.bigbag)}`")
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.pass='{{item.tth.passa}} пассажиров'
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.dors='{{ $assets.getDoors(item.tth.dors) }}'
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.temp='{{item.tth.klimat}}'
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.benz='{{item.tth.rashod}}л/100км'
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.gear='{{item.car_data.kpp}}'
                  div(v-html="$assets.generate_text_tth(item.self_data.text_tth_bottom)")
          order-small-form(:places="points" :carName="item.car_data.naimenovanie" typeOrder="почасовая аренда")
          hr
          banners-section
        div(v-else)
          loader
</template>

<script>
  import BannersSection from "../../components/BannersSection";
  import loader from "../../components/loader";
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import BOImageSlider from "../../components/BOImageSlider";
  import orderSmallForm from "../../components/orderSmallForm";
  export default {
    head () {
      return {
        title: this.loaded ? this.item.self_data.SEO_title : this.seo['CWD'][this.$route.params.car_slug].SEO_title,
        meta: [
          {hid: 'description', name: 'description', content: this.loaded ? this.item.self_data.SEO_description : this.seo['CWD'][this.$route.params.car_slug].SEO_description}
        ]
      }
    },
    components:{
      loader,
      devider,
      BannersSection,
      BreadCrumbs,
      BOImageSlider,
      orderSmallForm,
    },
    data(){
      return {
        item: [],
        car_slug: this.$route.params.car_slug,
        loaded: false,
        points: [],
        seo: require('../../cars.json'),
      }
    },
    computed: {
      bcItems() {
        let crumbs = [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Аренда авто с водителем',
            to: '/rent'
          }
        ];
        if (this.loaded) {
          crumbs.push({
            text: this.item.self_data.title,
            active: false
          });
        }
        return crumbs
      },
    },
    beforeCreate() {
      let data = {
        city: this.$config.station,
        slug: this.$route.params.car_slug
      };
      this.$axios.post('sun/CWDgetBySlug', data)
        .then(res => {
          if (res.data.status === 'success'){
            this.item = res.data.data;
            this.$axios(`fetchPoints/${this.$config.station}`)
              .then(result => {
                if(result.data.status === 'success'){
                  this.points = result.data.data;
                  this.loaded = true;
                }
              })
          }else{
            this.$router.push('/service');
          }
        }).catch(err =>{
        console.error(err);
        this.$router.push('/service');
      })
    },
    validate ({ params }) {
      let seo = require('../../cars.json')
      if (seo['CWD'][params.car_slug]){
        return true
      }else{
        throw({ statusCode: 404, message: 'Post not found' })
      }
    }
  }
</script>

<style lang="sass" scoped>

  @import "../../assets/styles/variables"
  .slider-wrapper
    border: 1px solid $primary
    -webkit-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    border-radius: 25px
    overflow: hidden
  .blockquote-info
    background: rgba(255,106,40,0.2)
    border-radius: 25px
    border: 1px solid $primary
  .prices
    hr
      margin: 10px 0 10px 0
      border-top: 3px solid $primary
  .item-info
    margin-bottom: 5px
    margin-top: 5px
    &:after
      content: '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'
      display: block
      white-space: nowrap
      overflow: hidden
      font-size: 14px
    .l
      font-weight: bold
      float: left
      padding-right: 5px
      margin: 0
      font-size: 12px
      text-transform: uppercase
    .r
      float: right
      padding-left: 5px
      margin: 0
      font-size: 14px
</style>
