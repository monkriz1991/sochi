<template lang="pug">
    section.my-3
      div.container
        h3="{{$t('s17')}}"
        b-row
          b-col(sm="12" md="12" lg="6" v-for="(i, idx) in items" :key="idx")
            nuxt-link(:to="{name: $assets.prefix('news-slug', $i18n.locale), params: {slug: i.slug}}").news-el.my-2
              div(:lazy-background="`https://booking.autopilot.rent/storage/${i.preview_image}`").img
              div.inform
                h5="{{i.title}}"
                div(v-html="i.preview_text").p-0.data
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
    }
  }
</script>

<style lang="sass" scoped>
  .news-el
    display: flex
    justify-content: flex-start
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
      width: 20%
      height: 100px
      background-repeat: no-repeat
      background-size: cover
      background-position: center
    .inform
      width: 80%
      *
        margin-bottom: 0
      .data
        *
          margin-bottom: 0
</style>
