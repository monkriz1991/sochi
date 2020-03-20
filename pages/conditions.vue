<template lang="pug">
  section#conditions
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="Условия аренды"
        div.conditions
          div.my-5
            b-row
              b-col(sm="12" md="6" lg="3" v-for="(ci, cidx) in conditions" :key="cidx")
                div.condition
                  div(v-bind:class="ci.class_name").ico
                  div.text
                    h6="{{ci.title}}"
                    p="{{ci.text}}"
        p
          |Часто задаваемые
          nuxt-link(to="/about/faq/")=" вопросы по аренде "
          |автомобиля.
        h3="Необходимые документы"
        p.mb-1
          strong.text-uppercase="- для граждан РФ: "
          |Паспорт РФ, действующая прописка, Водительское удостоверение
        p.mb-1
          strong.text-uppercase="- для иностранных граждан: "
          |Заграничный паспорт, Водительское удостоверение международного образца
        div.clearfix
        hr
        div.py-3
          div(v-if="loaded")
            div.places.py-3
              h2
                |Подача
                span(v-html="' / '")
                |Прием автомобилей
              div.points
                div(v-for="(point, idx) in places" :key="idx").item-info
                  p.l="{{point.point_name}}"
                  p.r(v-html="point.price > 0 ? point.price+'₽' : 'Бесплатно'")
            div.places.py-3
              h2="Дополнительные услуги"
              div.points
                div(v-for="(ad, idx) in options" :key="idx").item-info
                  p.l="{{ad.name}}"
                  p.r(v-html="`${ad.name === 'Мойка' || ad.name === 'Дозаправка' ? 'от ' : ''}${ad.price > 0 ? ad.price+'₽' : 'Бесплатно'}`")
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
        title: 'Условия аренды',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
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
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Условия аренды',
            active: true
          }
        ],
        conditions: [
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
            title: 'Залог на автомобиль',
            text: 'от 5 000 рублей',
            class_name: 'cond_3'
          },
          {
            title: 'Пробег',
            text: 'без ограничений',
            class_name: 'cond_4'
          },
        ],
        options:[],
        places:[],
        loaded: false
      }
    },
    methods: {
      fetchPoints(){
        this.$axios(`fetchPoints/${this.$config.station}`)
          .then(result => {
            if(result.data.status === 'success'){
              this.places = result.data.data;
              this.fetchOptions();
            }
          }).catch(err=>console.error(err));
      },
      fetchOptions(){
        this.$axios.post('fetchOptionsAll', {city: this.$config.station})
          .then((result)=>{
            if (result.data.status === 'success'){
              this.options = result.data.data;
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
    .text
      padding: 5px 10px
      h6
        margin: 0
        display: inline
        border-bottom: 1px solid $primary_hover
      p
        margin: 0
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
