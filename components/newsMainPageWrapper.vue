<template lang="pug">
  section.my-3
    div.container
      h3="{{$t('s17')}}"
      b-row
        b-col(sm="12" md="6" lg="3" v-for="(i, idx) in items" :key="idx")
          nuxt-link(:to="{name: $assets.prefix('news-slug', $i18n.locale), params: {slug: i.slug}}").news-el.my-2
            div(:lazy-background="`${$assets.check_local_env($config.local_url, $config.environment)}storage/${i.preview_image}`").img
              span.date="{{makeDate(i.date_of_news)}}"
            div.inform
              h5="{{i.title}}"
      div.d-flex.justify-content-center.align-content-center.align-items-center.my-3
        nuxt-link(:to="{name: $assets.prefix('news', $i18n.locale)}").btn.main="{{$t('s9')}}"
      hr
</template>

<script>
  export default {
    props: {
      items: {
        type: Array
      }
    },
    methods: {
      makeDate(d){
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        return new Date(d.split(' ')[0]).toLocaleString("ru", options);
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .news-el
    display: flex
    justify-content: flex-start
    flex-direction: column
    align-items: center
    border: 1px solid rgba(205,205,205,0.5)
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    border-radius: 10px
    overflow: hidden
    color: #222222
    text-decoration: none
    div
      padding: 10px
    .img
      width: 100%
      height: 150px
      background-repeat: no-repeat
      background-size: cover
      background-position: center bottom
      position: relative
      @media screen and (max-width: 760px)
        height: 250px
      .date
        position: absolute
        border-radius: 9px 0 10px 0
        top: 0
        left: 0
        padding: 2px 5px
        background: $primary
        color: #fff
    .inform
      width: 100%
      min-height: 150px
      @media screen and (max-width: 760px)
        min-height: 80px
      *
        margin-bottom: 0
      .data
        *
          margin-bottom: 0
</style>
