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
                  div.main-img(:style="{backgroundImage:`url(${$assets.check_local_env($config.local_url, $config.environment)}${i.self_data.photos[0]})`}").position-relative
                    div.price-badge(v-html="`${$t('cwd27')} ${$assets.toMoney($assets.makeItemPrice(i.car_data.stoimost, i.car_data.skidka_2, i.car_data.special_price))}₽/${$t('cwod7')}`")
                    div(v-if="i.features.length > 0").item-features.px-1
                      span(v-for="(f, fdx) in i.features" :key="fdx" :class="$assets.fetchFeatureClass(f.name)")="{{$t(f.name)}}"
                  div.flox-img(:style="{backgroundImage:`url(${$assets.check_local_env($config.local_url, $config.environment)}${i.self_data.photos[1]})`}")
                  div.flox-img(:style="{backgroundImage:`url(${$assets.check_local_env($config.local_url, $config.environment)}${i.self_data.photos[2]})`}")
              b-col(sm="12" md="12" lg="6").pl-lg-0
                div.el-info-wrapper.pr-lg-3.px-md-2.px-sm-2.px-2.py-3
                  div.wrao
                    div
                      h5.text-center="{{i.self_data.title}}"
                      hr.my-1
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
                    div.action.w-100.d-flex.justify-center.align-center.flex-column
                      b-button(@click="oneClickRent(i.self_data.slug)").btn.main.w-100.slim="{{$t('af0')}}"
                      nuxt-link(:to="{name: $assets.prefix('rent-car_slug', $i18n.locale), params: {car_slug: i.self_data.slug}}").d-block.w-100.text-center="{{$t('af1')}}"
                      one-click-modal-snippet(:title="i.self_data.title" :slug="i.self_data.slug", :price="$assets.toMoney($assets.makeItemPrice(i.car_data.stoimost, i.car_data.skidka_2, i.car_data.special_price))"  :is_rent="true")
    hr.mt-2
    div.d-flex.justify-content-center.align-items-center
      b-pagination(v-model="currentPage" :total-rows="filtered_list.length" :per-page="perPage")

</template>

<script>
  import OneClickModalSnippet from "@/components/oneClickModalSnippet";
  export default {
    name: "CWoDComponentFull",
    components: {OneClickModalSnippet},
    props:{
      items: {
        type: Array
      },
      defaultClass: {
        type: String,
        default: 'all'
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
        if (this.currentPage === 1){
          this.$router.replace({ query: {filter_price: this.filter_price, filter: this.filter, currentPage: this.currentPage} });
        }else{
          this.currentPage = 1
        }
      },
      filter_price(){
        if (this.currentPage === 1){
          this.$router.replace({ query: {filter_price: this.filter_price, filter: this.filter, currentPage: this.currentPage} });
        }else{
          this.currentPage = 1
        }
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
      oneClickRent(slug){
        ym(33072038,'reachGoal','rent-zabronirovat 1klik')
        this.$bvModal.show(`modal-one-click${slug}`);
      },
      makeEngine(val){
        return parseFloat(val).toFixed(1)
      }
    },
    mounted() {
      this.filter = this.$route.query.filter ? this.$route.query.filter : this.defaultClass
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  h5, .h5
    font-size: 1.1rem
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
  .btn.main
    background: $primary_hover
    color: #fff
    margin: 2px 0
    border: 3px solid $primary_hover
    transition: 0.3s
    &:hover
      background: #fff
      border: 3px solid $primary
      color: #222
      transition: 0.3s
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
      background: blueviolet
      color: #ffffff
      font-family: 'Roboto Condensed', sans-serif
      border: 1px solid blueviolet
      -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      @media screen and (max-width: 760px)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4)
      &:before
        content: ''
        position: absolute
        border-top: 18px solid transparent
        border-right: 16px solid blueviolet
        border-bottom: 18px solid transparent
        left: -17px
        top: -1px
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
