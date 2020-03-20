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
                h1="Наши Водители"
                b-row
                  b-col(sm="12" md="6" lg="6" v-for="(d, ddx) in drivers" :key="ddx")
                    div.card-driver.my-3
                      div.card-driver-header.d-flex.justify-content-center.align-content-center
                        b-img(:src="`https://booking.autopilot.rent/storage/${d.photo}`" rounded="circle" :alt="d.name")
                      div.card-driver-body
                        h4.text-center="{{d.name}}"
                        p="Категории:"
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
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'О компании',
            to: '/about'
          },
          {
            text: 'Водители',
            active: true
          }
        ],
      }
    },
    mounted() {
      this.$axios.post('sun/drivers', {city: this.$config.station})
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
