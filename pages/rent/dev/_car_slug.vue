<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        b-row
          b-col(sm="12" mc="6" lg="3")
            div(v-if="loaded").slider-wrapper
              b-o-image-slider-small(:items="item.self_data.photos")
          b-col(sm="12" mc="6" lg="9")
            h1(v-html="this.loaded ? this.item.self_data.title : this.seo['CWoD'][this.$route.params.car_slug].title")
            b-row
              b-col(sm="12" mc="12" lg="7")
                div(v-if="loaded").py-1
                  b-row.features-list-icos
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.bag(v-html="`${$assets.getBagsData(item.tth.bags, item.tth.bigbag, $i18n.locale)}`")
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.pass='{{$assets.getPassa(item.tth.passa, $i18n.locale) }}'
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.dors='{{ $assets.getDoors(item.tth.dors, $i18n.locale) }}'
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.temp='{{$t(item.tth.klimat)}}'
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.benz="{{item.tth.rashod}}{{$t('p2')}}"
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.gear='{{$t(item.car_data.kpp)}}'
              b-col(sm="12" mc="12" lg="5")
                div.b-wrapper
                  div(v-for="(p, pdx) in prices" :key="pdx").item-info
                    p.l="{{p.text}}"
                    p.r="{{p.value}}₽/{{$t('cwod7')}}"
        div(v-if="loaded").b-wrapper.blockquote-info
          div.rate
            div.rate-item
              span.star="9.1/10"
            div.rate-item
              span.video="Видео"
            div.rate-item
              span.about="Условия аренды"
            div.rate-item
              span.gas="Полный/Полный"
            div.rate-item
              span.aitport="Встреча в аэропорту"
        div(v-if="loaded").b-wrapper.gr
          p.header="В аренду включено"
          div.rate
            div.rate-item
              span.okyes="Пробег: 200 км в день"
            div.rate-item
              span.okyes="Страхование от ДТП"
            div.rate-item
              span.okyes="Страхование от угона"
            div.rate-item
              span.okyes="Помощь на дороге"
            div.rate-item
              span.okyes="Полная защита"
        b-row
          b-col(sm="12" md="6" lg="6")
            div.b-wrapper.transpar
              p.header="Об автомобиле"
              div.mb-5
                div.item-info
                  p.l="Пробег"
                  p.r="114 000 км"
                div.item-info
                  p.l="Безопасность"
                  p.r
                    span.stars
                      span.star-f
                      span.star-f
                      span.star-f
                      span.star-f
                      span.star-o
                div.item-info
                  p.l="Вместительность"
                  p.r="6 человек"
                div.item-info
                  p.l="Комфорт"
                  p.r
                    span.stars
                      span.star-f
                      span.star-f
                      span.star-f
                      span.star-o
                      span.star-o
              p="Разнообразный и богатый опыт постоянное обеспечение нашей деятельности требуют определения и уточнения существенных финансовых и административных условий. Равным образом консультация с широким активом требуют от нас анализа модели развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности требуют определения"
          b-col(sm="12" md="6" lg="6")
            div.b-wrapper.shield
              p.header="Защита автомобиля"
              ul.list-ok-yes.list-unstyled.mb-5
                li="✓ Повреждение арендованного автомобиля"
                li="✓ Угон автомобиля"
                li="✓ Утеря или кража ключей"
                li="✓ Стёкла, зеркала, колёса"
                li="✓ Буксировка автомобиля"
                li="✓ Административные сборы"
              div
                p.text-right.header.m-0="+ 990₽"
        div(v-if="loaded").b-wrapper.gr_total
          div.icons-row
            div.featch-data
              span.ico.car
              p.m-0="Новые автомобили"
            div.featch-data
              span.ico.dtp
              p.m-0="Страховка на случай ДТП"
            div.featch-data
              span.ico.way
              p.m-0="Удобное расположение"
            div.featch-data
              span.ico.h24
              p.m-0="24-часа поддержка"
            div.featch-data
              span.ico.ren
              p.m-0="Аренда за рубежом"
        div(v-if="loaded").b-wrapper
          order-small-form(:places="points" :carName="item.self_data.title" typeOrder="посуточная аренда")
        hr
        banners-section
</template>

<script>
  import loader from "../../../components/loader";
  import devider from "../../../components/devider";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  import BOImageSliderSmall from "../../../components/BOImageSliderSmall";
  import orderSmallForm from "../../../components/orderSmallForm";
  import BannersSection from "../../../components/BannersSection";
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
      BOImageSliderSmall,
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
        seo: require('../../../cars.json'),
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
              text: `1 ${this.$t('cwod7')}`,
              value: this.$assets.toMoney(this.item.car_data.stoimost)
            },
            {
              text: `${this.$t('cwd27')} 3 ${this.$t('cwd28')} 6 ${this.$t('cwd29')}`,
              value: this.$assets.toMoney(s1),
            },
            {
              text: `${this.$t('cwd27')} 7 ${this.$t('cwd29')}`,
              value: this.$assets.toMoney(s2),
            },
          ]
        }
        return data;
      },
      bcItems(){
        let crumbs = [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs12'),
            to: { name: this.$assets.prefix('rent', this.$i18n.locale) }
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
      let seo = require('../../../cars.json');
      if (seo['CWoD'][params.car_slug]){
        return true
      }else{
        throw({ statusCode: 404, message: 'Post not found' })
      }
    }
  }
</script>


<style lang="sass" scoped>
  @import "../../../assets/styles/variables"
  .slider-wrapper
    overflow: hidden
  .blockquote-info
    background: rgba(255,106,40,0.2)
    border-radius: 25px
    border: 1px solid $primary
  .star-f:before
    font-family: 'icons_nova1', monospace
    content: '\E807'
    color: $primary
    margin-right: 2px
  .star-o:before
    font-family: 'icons_nova1', monospace
    content: '\E80D'
    color: $primary
    margin-right: 2px
  .icons-row
    display: flex
    justify-content: center
    flex-wrap: wrap
    align-items: center
    .featch-data
      display: flex
      justify-content: flex-start
      align-items: center
      max-width: 20%
      padding: 0 15px
      p
        font-weight: bold
      .ico
        &:before
          font-family: 'icons_nova1', monospace
          margin-right: 10px
          font-size: 40px
          color: #2AA30C
        &.car
          &:before
            content: '\E801'
            font-size: 30px
        &.dtp
          &:before
            content: '\E802'
        &.way
          &:before
            content: '\E803'
        &.h24
          &:before
            content: '\E804'
        &.ren
          &:before
            content: '\E805'
  .rate
    width: 100%
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    flex-wrap: wrap
    .rate-item
      padding: 5px 10px
      span
        cursor: pointer
        &:before
          font-family: 'icons_nova1', monospace
          margin-right: 5px
        &.okyes
          &:before
            content: '\2713'
            color: #2AA30C
        &.star
          &:before
            content: '\e806'
        &.video
          &:before
            content: '\e80c'
        &.about
          &:before
            content: '\e80b'
        &.gas
          &:before
            content: '\e80a'
        &.aitport
          &:before
            content: '\e809'
  .b-wrapper
    padding: 20px
    border: 1px solid $primary
    border-radius: 15px
    margin: 1rem 0
    &.shield
      background-image: url('../../../assets/images/surface.svg')
      background-repeat: no-repeat
      background-size: 25%
      background-position: 85% 75%
    &.transpar
      border: 1px solid transparent
    &.gr_total
      border: 1px solid #2AA30C
      background-color: rgba(42,163,12,0.05)
      p.header
        color: #fff
    &.gr
      border: 1px solid #2AA30C
      p.header
        color: #2AA30C
  p.header
    font-style: normal
    font-weight: bold
    font-size: 20px
    line-height: 1
  .prices
    hr
      margin: 10px 0 10px 0
      border-top: 3px solid $primary
  .item-info
    margin-top: 5px
    margin-bottom: 5px
    &:after
      content: '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '
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
  .bblack
    background-color: #000
  .points
    .item-info
      @media screen and (max-width: 1200px)
        margin-bottom: 20px
        padding-top: 15px
        border-top: 1px solid rgba(80, 80, 80, 0.3)
        &:first-child
          border-top: 1px solid transparent
  .features-list-icos
    .features-list-block
      span
        @media screen and (max-width: 760px)
          justify-content: center
          width: 100%
</style>
