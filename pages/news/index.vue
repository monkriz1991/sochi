<template lang="pug">
  section#news
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="Новости"
        div(v-if="loaded")
          div.news_container
            div(v-for="(n, ndx) in newsWithPagen" :key="ndx").ely
              b-card(:img-src="`https://booking.autopilot.rent/storage/${n.preview_image}`" img-alt="title" img-left).mb-3
                b-card-text
                  nuxt-link(:to="`/news/${n.slug}`")
                    h3="{{n.title}}"
                  div(v-html="n.preview_text")
          hr.mt-2
          div.d-flex.justify-content-center.align-items-center
            b-pagination(v-model="currentPage" :total-rows="news.length" :per-page="perPage")
        div(v-else)
          loader
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  export default {
    head () {
      return {
        title: 'Новости и полезная информация о Крыме',
        meta: [
          {hid: 'description', name: 'description', content: 'Новости и полезная информация о Сочи: *✮* узнайте все о достопримечательностях Крыма *✮* самых вкусных местах *✮* и как успеть все посмотреть с помощью Crimea Rent-a-Car⭐'}
        ]
      }
    },
    components: {
      devider,
      BreadCrumbs,
      loader,
    },
    data(){
      return {
        currentPage: 1,
        perPage: 5,
        loaded: false,
        bcItems: [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Новости',
            active: true
          }
        ],
        news: []
      }
    },
    computed:{
      newsWithPagen() {
        return this.news.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      }

    },
    methods: {
      fetchNews(){
        this.$axios.post('sun/newsList', {city: this.$config.station})
          .then(result => {
            if (result.data.status === 'success'){
              this.news = result.data.data
              this.loaded = true;
            }
          })
          .catch(err => console.log(err))
      }
    },
    mounted() {
      this.fetchNews();
    }
  }
</script>

<style lang="sass" scoped>
  .card
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    display: flex
    align-items: center
    img
      width: 150px
      height: 150px
      @media screen and (max-width: 991px)
        width: 120px
        height: 120px
      @media screen and (max-width: 500px)
        width: 100px
        height: 100px
      @media screen and (max-width: 375px)
        width: 80px
        height: 80px

</style>
