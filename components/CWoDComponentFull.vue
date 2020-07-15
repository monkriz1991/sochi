<template lang="pug">
  div.cwod-wrapper
    div.filter
      b-row
        b-col(sm="12" md="6" lg="4")
          b-form-select(v-model="filter" :options="filterOptions")
        b-col(sm="12" md="6" lg="4" offset-lg="4")
          b-form-select(v-model="filter_price" :options="filterPrice")
    b-row
      b-col(sm="6" md="6" lg="6" v-for="(i, idx) in withPagen" :key="idx").my-3
          div.el
            b-row
              b-col(sm="12" md="12" lg="6")
                div.el-wrapper
                  div.main-img(v-bind:style="{backgroundImage:`url(https://booking.autopilot.rent/${i.self_data.photos[0]})`}").position-relative
                    div.price-badge(v-html="`${$t('cwd27')} ${$assets.toMoney($assets.makeItemPrice(i.car_data.stoimost, i.car_data.skidka_2, i.car_data.special_price))}₽/${$t('cwod7')}`")
                    div(v-if="i.features.length > 0").item-features.px-1
                      span(v-for="(f, fdx) in i.features" :key="fdx" v-bind:class="$assets.fetchFeatureClass(f.name)")="{{$t(f.name)}}"
                  div.flox-img(v-bind:style="{backgroundImage:`url(https://booking.autopilot.rent/${i.self_data.photos[1]})`}")
                  div.flox-img(v-bind:style="{backgroundImage:`url(https://booking.autopilot.rent/${i.self_data.photos[2]})`}")
              b-col(sm="12" md="12" lg="6").pl-lg-0
                div.el-info-wrapper.pr-lg-3.px-md-2.px-sm-2.px-2.py-3
                  div.wrao
                    div
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
                    div.action.w-100
                      nuxt-link(:to="{name: $assets.prefix('rent-car_slug', $i18n.locale), params: {car_slug: i.self_data.slug}}").btn.main.w-100.slim="{{$t('af1')}}"
    hr.mt-2
    div.d-flex.justify-content-center.align-items-center
      b-pagination(v-model="currentPage" :total-rows="filtered_list.length" :per-page="perPage")

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
        currentPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        perPage: 10,
        filterOptions: [
          {value: 'all', text: this.$t('filters1')},
          {value: 'Комфорт класс', text: this.$t('filters2')},
          {value: 'Кроссоверы', text: this.$t('filters3')},
          {value: 'Минивены', text: this.$t('filters4')},
          {value: 'Кабриолет', text: this.$t('filters5')},
          {value: 'Бизнес', text: this.$t('filters6')},
          {value: 'cargo', text: this.$t('filters7')},
        ],
        filterPrice: [
          {value: 'price_desc', text: this.$t('filters8')},
          {value: 'price_asc', text: this.$t('filters9')},
          {value: 'sort', text: this.$t('filters10')},
        ],
        filter: this.$route.query.filter ? this.$route.query.filter : 'all',
        filter_price: this.$route.query.filter_price ? this.$route.query.filter_price : 'sort',
      }
    },
    watch:{
      currentPage(){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.$router.replace({ query: {filter_price: this.filter_price, filter: this.filter, currentPage: this.currentPage} });
      },
      filter(){
        this.currentPage = 1
      },
      filter_price(){
        this.currentPage = 1
      }
    },
    computed:{
      filtered_list(){
        return this.$filters.prepareRent(this.items, this.filter_price, this.filter);
      },
      withPagen() {
        return this.filtered_list.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
      }
    },
    methods:{
      makeEngine(val){
        return parseFloat(val).toFixed(1)
      }
    },
    mounted() {}
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .badge-status
    text-transform: uppercase
    font-size: 12px
    padding: 1px 5px
    color: #fff
    font-weight: bold
    position: absolute
    top: 1px
    left: 1px
    &.yes
      border: 1px solid green
      background-color: green
    &.no
      border: 1px solid red
      background-color: red
  .item-features
    width: 100%
    position: absolute
    bottom: 5px
    left: 0
    span
      display: inline-block
      padding: 2px 5px
      text-transform: uppercase
      font-size: 12px
      border-radius: 3px
      color: #ffffff
      margin: 2px
  .wrao
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    min-height: 285px
  .no_dec
    color: #222222
    text-decoration: none
  .el
    background: #ffffff
    border: 1px solid rgba(205,205,205,0.5)
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    @media screen and (max-width: 760px)
      box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4)
  .el-info-wrapper
    .item-info
      margin-bottom: 5px
      margin-top: 5px
      &:after
        content: '. . . . . . . . . . . . . . . . . . . .'
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
      @media screen and (max-width: 760px)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4)
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
      @media screen and (max-width: 760px)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4)
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
      @media screen and (max-width: 760px)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4)
</style>
