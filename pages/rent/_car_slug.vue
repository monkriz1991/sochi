<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1(v-html="this.loaded ? this.item.self_data.title : this.seo['CWoD'][this.$route.params.car_slug].title")
        div(v-if="loaded")
          b-row
            b-col(sm="12" md="12" lg="6")
              div.slider-wrapper
                b-o-image-slider(:items="item.self_data.photos")
            b-col(sm="12" md="12" lg="6")
              div.information
                h3="Тарифы"
                div.blockquote-info.p-3
                  p.m-0
                    |Внимание! Указаны справочные цены! Стоимость аренды данного автомобиля на интересующие Вас даты уточняйте
                    nuxt-link(to="/")=" в системе бронирования"
                    |.
                div.prices.my-3
                  div.d-flex.justify-content-between.align-items-center
                    h6.m-0.text-uppercase="Продолжительность"
                    h6.m-0.text-uppercase="Стоимость"
                  hr
                  div(v-for="(p, pdx) in prices" :key="pdx").item-info
                    p.l="{{p.text}}"
                    p.r="{{p.value}}₽/сутки"
                div.py-2
                  h3="Условия аренды"
                  div
                    div.item-info
                      p.l="Возраст"
                      p.r="с {{item.ALS.age}} {{$assets.getNameCoint(parseInt(item.ALS.age), 'год', 'года', 'лет')}}"
                    div.item-info
                      p.l="Стаж"
                      p.r="не менее {{item.ALS.staff}} {{$assets.getNameCoint(parseInt(item.ALS.staff), 'год', 'года', 'лет')}}"
                    div.item-info
                      p.l="Залог"
                      p.r="{{item.car_data.zalog}} рублей"
                    div.item-info
                      p.l="Пробег"
                      p.r="без ограничений"
                  div(v-html="$assets.generate_text_conditions(item.self_data.text_conditions_bottom)")
                div.py-2
                  h3="Необходимые документы"
                  div(v-html="$assets.generate_text_docs(item.self_data.text_docs)")
                div.py-2
                  h3="Подача/Прием автомобиля"
                  div.points
                    div(v-for="(point, idx) in points" :key="idx").item-info
                      p.l="{{point.point_name}}"
                      p.r(v-html="point.price > 0 ? point.price+'₽' : 'Бесплатно'")
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
          order-small-form(:places="points" :carName="item.car_data.naimenovanie" typeOrder="посуточная аренда")
          hr
          banners-section
        div(v-else)
          loader
</template>

<script>
  import loader from "../../components/loader";
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import BOImageSlider from "../../components/BOImageSlider";
  import orderSmallForm from "../../components/orderSmallForm";
  import BannersSection from "../../components/BannersSection";
  export default {
    head () {
      return {
        title: this.loaded ? this.item.self_data.SEO_title : this.seo['CWoD'][this.$route.params.car_slug].SEO_title,
        meta: [
          {hid: 'description', name: 'description', content: this.loaded ? this.item.self_data.SEO_description : this.seo['CWoD'][this.$route.params.car_slug].SEO_description}
        ]
      }
    },
    components:{
      BannersSection,
      BOImageSlider,
      loader,
      devider,
      BreadCrumbs,
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
    computed:{
      prices(){
        let data = [];
        if (this.loaded){
          let s1 = this.item.car_data.stoimost - ((this.item.car_data.stoimost/ 100) * this.item.car_data.skidka_1);
          let s2 = this.item.car_data.stoimost - ((this.item.car_data.stoimost/ 100) * this.item.car_data.skidka_2);
          data = [
            {
              text: '1 сутки',
              value: this.$assets.toMoney(this.item.car_data.stoimost)
            },
            {
              text: 'от 3 до 6 суток',
              value: this.$assets.toMoney(s1),
            },
            {
              text: 'от 7 суток',
              value: this.$assets.toMoney(s2),
            },
          ]
        }
        return data;
      },
      bcItems(){
        let crumbs = [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Аренда авто без водителя',
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
      this.$axios.post('sun/CWoDgetBySlug', data)
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
            this.$router.push('/rent');
          }
        }).catch(err =>{
        console.error(err);
        this.$router.push('/rent');
      })
    },
    validate ({ params }) {
      let seo = require('../../cars.json')
      if (seo['CWoD'][params.car_slug]){
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
    margin-top: 5px
    margin-bottom: 5px
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
      max-width: 60%
      margin: 0
      font-size: 12px
      text-transform: uppercase
    .r
      float: right
      padding-left: 5px
      margin: 0
      font-size: 14px

  .points
    .item-info
      @media screen and (max-width: 1200px)
        margin-bottom: 20px
        padding-top: 15px
        border-top: 1px solid rgba(80, 80, 80, 0.3)
        &:first-child
          border-top: 1px solid transparent
</style>
