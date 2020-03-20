<template lang="pug">
  section
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        b-row
          b-col(sm="12" md="3" lg="3")
            aside
              div.side-wrapper
                about-sidebar-menu
          b-col(sm="12" md="9" lg="9")
            article
              h1="Наши партнеры"
</template>

<script>
  import devider from "../../../components/devider";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  import aboutSidebarMenu from "../../../components/aboutSidebarMenu";
  export default {
    head () {
      return {
        title: 'Наши партнеры',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": ✮ без ограничения пробега ✮ скидки до 25% ✮ 250 машин в автопарке ✮ бесплатная подача в аэропорт✮ Бронируй онлайн!⭐'}
        ]
      }
    },
    components: {
      devider,
      BreadCrumbs,
      aboutSidebarMenu
    },
    data(){
      return {
        bcItems: [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'О компании',
            to: '/about'
          },
          {
            text: 'Партнеры',
            active: true
          }
        ],
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../../assets/styles/variables"
  aside
    position: relative
    height: 100%
    .side-wrapper
      position: -webkit-sticky
      position: sticky
      top: 0
      padding: 15px 0
</style>
