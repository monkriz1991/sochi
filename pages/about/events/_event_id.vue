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
                h1="{{event.title}}"
                div.news
                  img(:src="`https://booking.autopilot.rent/storage/${event.image}`" alt="event.title").news-image
                  div(v-html="event.text_details")
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
        title: 'Мероприятия',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": ✮ без ограничения пробега ✮ скидки до 25% ✮ 250 машин в автопарке ✮ бесплатная подача в аэропорт ✮ Бронируй онлайн!⭐'}
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
        loaded: false,
        event: {},
      }
    },
    computed:{
      bcItems(){
        let items = [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'О компании',
            to: '/about'
          },
          {
            text: 'Мероприятия',
            to: '/about/events'
          }
        ];
        if (this.loaded){
            items.push({
              text: this.event.title,
            })
          return items
        }else{
          return items
        }
      },
    },
    methods: {
      fetchSingleEvent(){
        this.$axios(`sun/events/getEvent/${this.$route.params.event_id}`)
          .then(res => {
            if(res.data.status === 'success'){
              this.event = res.data.data
              this.loaded = true
            }
          }).catch(err => console.error(err))
      }
    },
    mounted() {
      this.fetchSingleEvent()
    }
  }
</script>
<style lang="sass">
  @import "../../../assets/styles/variables"
  h1
    @media screen and (max-width: 760px)
      font-size: 1.8rem
      text-align: center
      display: block
      margin: 0 auto 10px
      border-bottom: 3px solid $primary
      padding-bottom: 5px
  .news
    img.news-image
      float: left
      margin: 0 15px 15px 0
      max-width: 350px
      @media screen and (max-width: 760px)
        float: none
        display: block
        margin: 0 auto 20px
        width: 100%
        height: auto
  aside
    position: relative
    height: 100%
    .side-wrapper
      position: -webkit-sticky
      position: sticky
      top: 0
      padding: 15px 0
</style>
