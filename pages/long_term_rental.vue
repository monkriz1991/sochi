<template lang="pug">
  section#conditions
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="Условия долгосрочной аренды"
        div.conditions
          div.my-5
            b-row
              b-col(sm="12" md="6" lg="3" v-for="(ci, cidx) in conditions" :key="cidx")
                div.condition
                  div(v-bind:class="ci.class_name").ico
                  div.text
                    h6="{{ci.title}}"
                    p="{{ci.text}}"
        div.propose
          div.mb-5
            b-row
              b-col(sm="12" md="12" lg="6" v-for="(p, pdx) in propose" :key="pdx")
                div.propose-item.p-3
                  h3="{{p.title}}"
                  p.desc="{{p.desc}}"
                  ul
                    li(v-for="(pf, pfdx) in p.features" :key="pfdx" v-html="pf")
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
        div.my-5.py-3
</template>

<script>
  import devider from "../components/devider";
  import BreadCrumbs from "../components/BreadCrumbs";
  export default {
    head () {
      return {
        title: 'Долгосрочная аренда авто в Сочи',
        meta: [
          {hid: 'description', name: 'description', content: 'Долгосрочная аренда авто в Сочи: ✮ без ограничения пробега ✮ скидки до 30% ✮ 250 машин в автопарке ✮ Без залога ✮ Бронируй онлайн!⭐'}
        ]
      }
    },
    components: {
      devider,
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
            text: 'Долгосрочная аренда',
            active: true
          }
        ],
        conditions: [
          {
            title: 'Возраст водителя',
            text: 'с 21 года',
            class_name: 'cond_1'
          },
          {
            title: 'Стаж',
            text: 'не менее 3х лет',
            class_name: 'cond_2'
          },
          {
            title: 'Залог на автомобиль',
            text: 'отсутствует',
            class_name: 'cond_3'
          },
          {
            title: 'Пробег',
            text: '3000км в месяц',
            class_name: 'cond_4'
          },
        ],
        propose:[
          {
            title: 'Долгосрочный лимит',
            desc: 'Скидка до 50% при единоразовой оплате',
            features: [
              'СКИДКА ДО 50%',
              'ОПЛАТА 1 РАЗ В МЕСЯЦ',
              'РАСШИРЕННАЯ СТРАХОВКА'
            ],
          },
          {
            title: 'Лимит',
            desc: 'Возможность еженедельной оплаты',
            features: [
              "СКИДКИ ДО 40%",
              'ВОЗМОЖНОСТЬ ОПЛАТЫ ПО ПЕРИОДАМ',
              'РАСШИРЕННАЯ СТРАХОВКА'
            ],
          },
        ]
      }
    }

  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .propose
    .propose-item
      display: flex
      flex-direction: column
      align-items: center
      margin: 10px
      border: 1px solid $primary
      -webkit-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      border-radius: 5px
      h3
        display: inline-block
        padding-bottom: 5px
        border-bottom: 5px solid $primary
      p.desc
        min-height: 70px
      ul
        list-style: none
        padding: 0px
        width: 100%
        li
          display: flex
          flex-direction: row
          justify-content: flex-start
          align-items: center
          font-family: 'Roboto Condensed', sans-serif
          border-top: 1px solid rgba(128,128,128, 0.1)
          padding: 7px 10px
          -webkit-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          -moz-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          min-height: 70px
          &:before
            content: '\2713'
            color: $primary
            margin-right: 10px
            font-size: 24px
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
