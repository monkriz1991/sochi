<template lang="pug">
  div.cwod-wrapper
    b-row
      b-col(sm="6" md="6" lg="6" v-for="(i, idx) in withPagen" :key="idx").my-3
        nuxt-link(:to="{name: $assets.prefix('rent-car_slug', $i18n.locale), params: {car_slug: i.self_data.slug}}").no_dec
          div.el
            b-row
              b-col(sm="12" md="12" lg="6")
                div.el-wrapper
                  div.price-badge="{{i.car_data.stoimost}}₽/{{$t('cwod7')}}"
                  div.main-img(:lazy-background="`https://booking.autopilot.rent/${i.self_data.photos[0]}`")
                  div.flox-img(:lazy-background="`https://booking.autopilot.rent/${i.self_data.photos[1]}`")
                  div.flox-img(:lazy-background="`https://booking.autopilot.rent/${i.self_data.photos[2]}`")
              b-col(sm="12" md="12" lg="6")
                div.el-info-wrapper.pr-lg-3.px-md-2.px-sm-2.px-2.py-3
                  h5="{{i.self_data.title}}"
                    div.item-info.my-2
                      p.l="{{$t('cwod1')}}"
                      p.r="{{$t(i.car_data.klassavtomobilya)}}"
                    div.item-info.my-2
                      p.l="{{$t('cwod2')}}"
                      p.r="{{i.tth.passa}}"
                    div.item-info.my-2
                      p.l="{{$t('cwod3')}}"
                      p.r="{{$t(i.car_data.toplivo)}}"
                    div.item-info.my-2
                      p.l="{{$t('cwod4')}}"
                      p.r="{{i.tth.rashod}}"
                    div.item-info.my-2
                      p.l="{{$t('cwod5')}}"
                      p.r="{{makeEngine(i.car_data.dvigatel)}}"
                    div.item-info.my-2
                      p.l="{{$t('cwod6')}}"
                      p.r="{{i.car_data.godvypuska}}"
    hr.mt-2
    div.d-flex.justify-content-center.align-items-center
      b-pagination(v-model="currentPage" :total-rows="items.length" :per-page="perPage")
</template>

<script>
  export default {
    name: "CWoDComponentFull",
    props:{
      items: {
        type: Array
      }
    },
    data(){
      return {
        currentPage: 1,
        perPage: 10,
      }
    },
    watch:{
      currentPage(){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    computed:{
      withPagen() {
        return this.items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      }
    },
    methods:{
      makeEngine(val){
        return parseFloat(val).toFixed(1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .no_dec
    color: #222222
    text-decoration: none
  .el
    background: #ffffff
    border: 1px solid rgba(205,205,205,0.5)
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  .el-info-wrapper
    .item-info
      margin-bottom: 5px
      margin-top: 5px
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
      .r
        float: right
        padding-left: 5px
        margin: 0
        font-size: 14px
  .el-wrapper
    width: 100%
    position: relative
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
    .price-badge
      position: absolute
      top: 0
      right: 0
      padding: 5px 10px
      background: $primary
      color: #ffffff
      font-family: 'Roboto Condensed', sans-serif
      border: 1px solid rgba(205,205,205,0.5)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      &:before
        content: ''
        position: absolute
        border-top: 18px solid transparent
        border-right: 16px solid $primary
        border-bottom: 18px solid transparent
        left: -16px
        top: 0
    .main-img
      width: 100%
      height: 200px
      background-size: cover
      background-position: center
      background-repeat: no-repeat
      border: 1px solid rgba(255,255,255,1)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    .flox-img
      width: 50%
      height: 120px
      background-size: cover
      background-position: center
      background-repeat: no-repeat
      border: 1px solid rgba(255,255,255,1)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
</style>
