<template lang="pug">
  section#conditions
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{$t('s22')}}"
        div.conditions
          div.my-5
            b-row
              b-col(sm="12" md="6" lg="3" v-for="(ci, cidx) in conditions[$i18n.locale]" :key="cidx")
                div.condition
                  div(:class="ci.class_name").ico
                  div.text
                    h6="{{ci.title}}"
                    p="{{ci.text}}"
        div.d-flex.justify-start
          span.pr-2="🔸"
          p
            |При аренде автомобиля мы заключаем Договор аренды и подписываем Акт приема-передачи.
        div.d-flex.justify-start
          span.pr-2="🔸"
          p
            |При посуточной аренде пробег по региону неограничен, выезды оплачиваются дополнительно.
        div.d-flex.justify-start
          span.pr-2="🔸"
          p
            |Автомобиль передается в чистом виде с полным баком. Вернуть его необходимо в таком же состоянии, либо оплатить эти услуги дополнительно.
            br
            |Мойка автомобиля: от 899₽,недостающее топливо: 80₽/литр
        div.d-flex.justify-start
          span.pr-2="🔸"
          p
            |На все автомобили есть депозит, сумма зависит от выбранной марки и модели.
        p
          |{{$t('bc8')}}
          nuxt-link(:to="{name: $assets.prefix('about-faq', $i18n.locale)}")=" {{$t('bc9')}} "
          |{{$t('bc10')}}
        h3="{{$t('bc7')}}"
        p.mb-1
          strong.text-uppercase="- {{$t('bc5')}} "
          |{{$t('bc6')}}
        p.mb-1
          strong.text-uppercase="- {{$t('bc3')}} "
          |{{$t('bc4')}}
        div.clearfix
        hr
        div.py-3
          div(v-if="loaded")
            div.places.py-3
              h2="{{$t('bc2')}}"
              div.points
                div(v-for="(point, idx) in places" :key="idx").item-info
                  p.l="{{$t(point.point_name)}}"
                  p.r(v-html="point.price > 0 ? point.price+'₽' : $t('bocid2')")
            div.places.py-3
              h2="{{$t('bc1')}}"
              div.points
                div(v-for="(ad, idx) in options" :key="idx").item-info
                  p.l="{{$t(ad.name.toUpperCase())}}"
                  p.r(v-html="`${ad.name === 'Мойка' || ad.name === 'Дозаправка' ? $t('s23') : ''}${ad.price > 0 ? ad.price+'₽' : $t('bocid2')} ${ ad.type === 'day' ? `/ ${$t('aoc1')}` : '' }`")
          div(v-else)
            loader
        hr
        div.my-5.py-3
</template>

<script>
  import devider from "../components/devider";
  import BreadCrumbs from "../components/BreadCrumbs";
  import loader from "../components/loader";
  export default {
    head () {
      return {
        title: 'Условия проката автомобилей в Сочи',
        meta: [
          {hid: 'description', name: 'description', content: 'ℹ Условия проката автомобилей в Сочи в компании Sochi Rent-a-Car: правила аренды автомобиля, какие документы нужны для того чтобы взять машину в аренду.  Бронируй онлайн!'}
        ]
      }
    },
    components: {
      devider,
      loader,
      BreadCrumbs
    },
    data(){
      return {
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs10'),
            active: true
          }
        ],
        conditions: {
          ru: [
            {
              title: 'Возраст водителя',
              text: 'с 22 лет',
              class_name: 'cond_1'
            },
            {
              title: 'Стаж',
              text: 'не менее 3х лет',
              class_name: 'cond_2'
            },
            {
              title: 'Депозит на автомобиль',
              text: 'от 5 000 рублей',
              class_name: 'cond_3'
            },
            {
              title: 'Пробег',
              text: 'без ограничений',
              class_name: 'cond_4'
            },
          ],
          en: [
            {
              title: 'Driver age',
              text: 'from 22 years old',
              class_name: 'cond_1'
            },
            {
              title: 'Staff',
              text: 'more then 3 years',
              class_name: 'cond_2'
            },
            {
              title: 'Loan on car',
              text: 'from 5 000 rubles',
              class_name: 'cond_3'
            },
            {
              title: 'Mileage',
              text: 'unlimited',
              class_name: 'cond_4'
            },
          ]
        },
        options:[],
        places:[],
        loaded: false
      }
    },
    methods: {
      fetchPoints(){
        this.$baseApi(`fetchPoints/${this.$config.station}`)
          .then(result => {
            if(result.data.status === 'success'){
              this.places = result.data.data;
              this.fetchOptions();
            }
          }).catch(err=>console.error(err));
      },
      fetchOptions(){
        this.$baseApi.post('fetchOptionsAll', {city: this.$config.station})
          .then((result)=>{
            if (result.data.status === 'success'){
              this.options = result.data.data;
              console.log(this.options)
              this.loaded = true
            }
          }).catch((err)=>{
          console.error(err)
        });
      }
    },
    mounted() {
      this.fetchPoints();
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .item-info
    margin-top: 5px
    margin-bottom: 5px
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
      max-width: 60%
      margin: 0
      font-size: 16px
      text-transform: uppercase
      @media screen and (max-width: 760px)
        font-size: 14px
      @media screen and (max-width: 375px)
        font-size: 12px
    .r
      float: right
      padding-left: 5px
      margin: 0
      font-size: 16px
      @media screen and (max-width: 760px)
        font-size: 14px
      @media screen and (max-width: 375px)
        font-size: 12px
  .points
    .item-info
      @media screen and (max-width: 760px)
        margin-bottom: 20px
        padding-top: 15px
        border-top: 1px solid rgba(80, 80, 80, 0.3)
        &:first-child
          border-top: 1px solid transparent
  .condition
    display: flex
    flex-direction: row
    align-items: center
    padding: 10px
    margin: 10px
    background-color: #fafafa
    background-color: rgba(255, 255, 255, 0.7)
    border: 1px solid rgba(205, 205, 205, 0.5)
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.4)
    border-radius: 5px
    @media screen and (max-width: 760px)
      box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4)
    .text
      padding: 5px 10px
      h6
        margin: 0
        display: flex
        justify-content: flex-start
        align-items: center
        min-height: 45px
        border-bottom: 1px solid $primary_hover
      p
        margin: 3px 0 0
        display: flex
        justify-content: flex-start
        align-items: center
        min-height: 50px
    .ico
      position: relative
      display: flex
      justify-content: center
      align-items: center
      &:after
        font-family: 'Icons', monospace
        width: 40px
        height: 40px
        font-size: 30px
        display: flex
        justify-content: center
        align-items: center
        color: $primary
      &.cond_1
        &:after
          content: "\E81A"
      &.cond_2
        &:after
          content: "\E81B"
      &.cond_3
        &:after
          content: "\E80F"
      &.cond_4
        &:after
          content: "\E815"
</style>
