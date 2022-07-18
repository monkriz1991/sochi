<template lang="pug">
  section
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        b-row
          b-col(sm="12" md="3" lg="3")
            aside
              div.side-wrapper
                about-sidebar-menu
          b-col(sm="12" md="9" lg="9")
            article
              div(v-if="loaded")
                h1="{{$t('faq4')}}"
                b-row
                  b-col(sm="12" md="6" lg="6" v-for="(d, ddx) in drivers" :key="ddx")
                    div.card-driver.my-3
                      div.card-driver-header.d-flex.justify-content-center.align-content-center
                        div(v-bind:style="{backgroundImage: `url(https://sochirentacar.ru/storage/${d.photo})`}").imger
                      div.card-driver-body
                        h4.text-center.text-capitalize="{{$assets.rus_to_latin(d.name, $i18n.locale)}}"
                        p="{{$t('faq6')}}"
                          span(v-for="(c, cdx) in d.category" :key="cdx").category-span="{{c}}"
              div(v-else)
                loader
</template>

<script>
  import devider from "../../../components/devider";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  import aboutSidebarMenu from "../../../components/aboutSidebarMenu";
  import loader from "../../../components/loader";
  export default {
    head () {
      return {
        title: 'Наши водители',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    components: {
      devider,
      BreadCrumbs,
      aboutSidebarMenu,
      loader
    },
    data(){
      return {
        drivers: [],
        loaded: false,
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs4'),
            to: { name: this.$assets.prefix('about', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs6'),
            active: true
          }
        ],
      }
    },
    mounted() {
      this.$baseApi.post('sun/drivers', {city: this.$config.station})
        .then(result => {
          if (result.data.status === 'success'){
            this.drivers = result.data.data;
            this.loaded = true;
          }
        })
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../../assets/styles/variables"
  aside
    position: relative
    height: 100%
    .side-wrapper
      position: -webkit-sticky
      position: sticky
      top: 0
      padding: 15px 0
  .imger
    width: 150px
    height: 150px
    border-radius: 150px
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  .card-driver
    background: #ffffff
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    padding: 25px
    .card-driver-body
      p
        font-weight: bold
        .category-span
          margin: 0 5px
          font-weight: normal
          background: $primary
          color: #ffffff
          border: 1px solid #cdcdcd
          display: inline-flex
          width: 22px
          height: 22px
          line-height: 1
          font-size: 14px
          justify-content: center
          align-items: center
</style>
