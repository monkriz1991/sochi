<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1(v-html="`${this.loaded ? this.item.self_data.title : this.seo['CWD'][this.$route.params.car_slug].title} ${$t('cwd1')}`")
        div(v-if="loaded")
          b-row
            b-col(sm="12" md="12" lg="6")
              div.slider-wrapper
                b-o-image-slider(:items="item.self_data.photos")
              hr
              div#tq
                div#info-contacts
                  h3="Контакты:"
                  p
                    strong="{{$t('contacts16')}}"
                    a(:href="`tel:79181044848`")="+7 (918) 104-48-48"
                  p
                    strong="E-mail: "
                    a(:href="`mailto:transfer.sochi@7774848.ru`")="transfer.sochi@7774848.ru"
                  p.socials-mess
                    span.tg.ico-mess
                    span.wa.ico-mess
                    span.vb.ico-mess
                    span=": +7 (918)-104-48-48"
            b-col(sm="12" md="12" lg="6")
              div.information
                h3="{{$t('cwd2')}}"
                div.prices.my-3
                  div
                    h6="{{$t('cwd3')}} {{item.self_data.price_hour}}₽ {{$t('cwd4')}}"
                div(v-if="points.length > 0").py-2
                  h3="{{$t('cwd5')}}"
                  div.prices.my-3
                    div.d-flex.justify-content-between.align-items-center
                      h6.m-0.text-uppercase="{{$t('cwd6')}}"
                      h6.m-0.text-uppercase="{{$t('cwd7')}}"
                    hr
                    div(v-for="(point, idx) in points" :key="idx").item-info
                      p.l(v-html="$i18n.locale === 'ru' ? point.name_rus : point.name_eng")
                      p.r(v-html="point.price > 0 ? point.price+'₽' : $t('bocid2')")
                div.py-2
                  h3.m-0="{{$t('cwd8')}}"
                  div(v-html="$assets.generate_text_drivers(item.self_data.text_drivers, $i18n.locale)")
                div.py-2
                  h3.m-0="{{$t('cwd9')}}"
                  div.py-1
                    b-row.features-list-icos
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.bag="{{item.tth.mono_bags}}"
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.pass='{{$assets.getPassa(item.tth.passa, $i18n.locale) }}'
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.dors='{{ $assets.getDoors(item.tth.dors, $i18n.locale) }}'
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.temp='{{$t(item.tth.klimat)}}'
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.benz="{{item.tth.rashod}}{{$t('p2')}}"
                      b-col(sm="12" md="6" lg="4").features-list-block
                        span.gear='{{$t(item.car_data.kpp)}}'
                  div(v-html="$assets.generate_text_tth(item.self_data.text_tth_bottom)")
          order-small-form(:places="points" :carName="item.self_data.title" typeOrder="почасовая аренда")
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
        places: [],
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
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs13'),
            to: { name: this.$assets.prefix('service', this.$i18n.locale) }
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
    mounted() {
    },
    beforeCreate() {
      let data = {
        city: this.$config.station,
        slug: this.$route.params.car_slug
      };
      this.$baseApi.post('sun/CWDgetBySlug', data)
        .then(res => {
          if (res.data.status === 'success'){
            this.item = res.data.data;
            this.$baseApi.post(`fetchPointsForTransfer`, {station: this.$config.station, car_name: this.item.car_data.naimenovanie})
              .then(result => {
                if(result.data.status === 'success'){
                  this.points = result.data.data;
                  this.loaded = true;
                }else{
                  this.loaded = true;
                }
              }).catch(err=>console.error(err));
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

  .socials-mess
    display: flex
    flex-wrap: wrap
    justify-content: flex-start
    align-items: center
  .ico-mess
    display: inline-block
    width: 25px
    height: 25px
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    margin: 0 5px 0 0
    &.wa
      background-image: url("../../assets/images/skin/whatsapp.png")
    &.tg
      background-image: url("../../assets/images/skin/telegramm.png")
    &.vb
      background-image: url("../../assets/images/skin/viber.png")
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
    @media screen and (max-width: 420px)
      margin-bottom: 20px
      margin-top: 10px
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
      @media screen and (max-width: 420px)
        max-width: 50%;
    .r
      float: right
      padding-left: 5px
      margin: 0
      font-size: 14px
</style>
