<template lang="pug">
  section#news_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1(v-html="this.loaded ? this.news.title : this.seo[this.$route.params.slug].SEO_title")
        div(v-if="loaded")
          div.news
            img(:src="`https://booking.autopilot.rent/storage/${news.detail_image}`" alt="news.title").news-image
            div(v-html="news.detail_text")
        div(v-else)
          loader
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  export default {
    components: {
      devider,
      BreadCrumbs,
      loader
    },
    data(){
      return {
        loaded: false,
        news: [],
        seo: require('../../news.json'),
      }
    },
    head () {
      return {
        title: this.loaded ? this.news.SEO_title : this.seo[this.$route.params.slug].SEO_title,
        meta: [
          {hid: 'description', name: 'description', content: this.loaded ? this.news.SEO_description : this.seo[this.$route.params.slug].SEO_description}
        ]
      }
    },
    computed:{
      bcItems(){
        let crumbs = [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs11'),
            to: { name: this.$assets.prefix('news', this.$i18n.locale) }
          }
        ];
        if (this.loaded) {
          crumbs.push({
            text: this.news.title,
            active: false
          });
        }
        return crumbs
      }
    },
    beforeCreate() {
      this.$axios.get(`sun/newsList/${this.$route.params.slug}`)
      .then(result => {
        if(result.data.status === 'success'){
          this.news = result.data.data;
          this.loaded = true;
        }else{
          this.$router.push('/news');
        }
      })
      .catch(err => {
        if (err){
          console.error(err);
          this.$router.push('/news');
        }
      })
    },
    validate ({ params }) {
      let seo = require('../../news.json');
      if (seo[params.slug]){
        return true
      }else{
        throw({ statusCode: 404, message: 'Post not found' })
      }
    },
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables"
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
      margin: 15px
      max-width: 350px
      @media screen and (max-width: 760px)
        float: none
        display: block
        margin: 0 auto 20px
        width: 100%
        height: auto
</style>
