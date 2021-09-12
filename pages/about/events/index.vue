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
              h1="{{$t('faq7')}}"
              p="{{$t('faq8')}}"
              div(v-if="loaded")
                div(v-if="eventsWithPagen.length")
                  p.my-5="{{$t('faq9')}}"
                  div.news_container
                    div(v-for="(n, ndx) in eventsWithPagen" :key="ndx").ely
                      div.card.mb-5
                        div.date-badge="{{$assets.t_date(n.event_date)}}"
                        b-row
                          b-col(sm="12" md="12" lg="4")
                            div(:style="{backgroundImage:`url(https://sochirentacar.ru/storage/${n.image})`}").img
                          b-col(sm="12" md="12" lg="8")
                            b-card-text.p-2
                              nuxt-link(:to="{name: $assets.prefix('about-events-event_id', $i18n.locale), params: {event_id: n.id}}")
                                h4="{{n.title}}"
                              div(v-html="n.text_preview")
                  hr.mt-2
                  div.d-flex.justify-content-center.align-items-center
                    b-pagination(v-model="currentPage" :total-rows="events.length" :per-page="perPage")
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
          {hid: 'description', name: 'description', content: 'Мероприятия в Сочи и Адлере при поддержке компании Sochi Rent-a-Car:  ✮ 250 машин в автопарке ✮ бесплатная подача в аэропорт ✮ Бронируй онлайн!'}
        ]
      }
    },
    components: {
      loader,
      devider,
      BreadCrumbs,
      aboutSidebarMenu
    },
    data(){
      return {
        currentPage: 1,
        perPage: 5,
        loaded: false,
        events: [],
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
            text: this.$t('breadcrumbs7'),
            active: true
          }
        ],
      }
    },
    computed: {
      eventsWithPagen() {
        return this.events.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      }

    },
    methods: {
      fetchEvents(){
        this.$axios.post('sun/events/getList', {station: this.$config.station})
          .then(result => {
            if(result.data.status === 'success'){
              this.events = result.data.data;
              this.loaded = true;
            }
          }).catch(err=>console.error(err))
      }
    },
    mounted() {
      this.fetchEvents();
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
  .card
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    position: relative
    .date-badge
      position: absolute
      color: #ffffff
      background: $primary_hover
      padding: 3px 10px
      border-radius: 50px
      top: -12px
      left: -10px
      z-index: 2
      width: 180px
      text-align: center
      -webkit-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
      box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    .img
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      min-height: 250px
</style>
