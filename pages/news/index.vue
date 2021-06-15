<template lang="pug">
  section#news
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{$t('faq11')}}"
        div(v-if="loaded")
          div.news_container
            div(v-for="(n, ndx) in newsWithPagen" :key="ndx").ely
              div.card.mb-5
                b-row
                  b-col(sm="12" md="12" lg="4")
                    div(v-bind:style="{backgroundImage:`url(${$assets.check_local_env($config.local_url, $config.environment)}storage/${n.preview_image})`}").img
                  b-col(sm="12" md="12" lg="8")
                    b-card-text.p-2
                      nuxt-link(:to="{name: $assets.prefix('news-slug', $i18n.locale), params: {slug: n.slug}}")
                        h4="{{n.title}}"
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
        title: 'Новости и полезная информация о Сочи',
        meta: [
          {hid: 'description', name: 'description', content: 'Новости и полезная информация о Сочи: *✮* узнайте все о достопримечательностях Крыма *✮* самых вкусных местах *✮* и как успеть все посмотреть с помощью Crimea Rent-a-Car⭐'}
        ],
        link: [
          {
            rel: 'canonical',
            href: 'https://sochirentacar.ru/news/'
          }
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
        loaded: true,
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs11'),
            active: true
          }
        ],
        newsItems: require('../../news.json'),
      }
    },
    computed:{
      news(){
        let news = [];
        let keys = Object.keys(this.newsItems);
        for(let i = 0; i < keys.length; i++){
          news.push(this.newsItems[keys[i]])
        }
        return news;
      },
      newsWithPagen() {
        return this.news.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      }

    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables"
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
      width: 160px
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
