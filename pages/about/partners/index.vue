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
              h1="{{$t('faq10')}}"
              div#partners-wrapper
                b-row
                  b-col(sm="6" md="4" lg="4" v-for="(p, pdx) in partners" :key="pdx")
                    div.item
                      a(:href="p.link" rel="nofollow")
                        div(:style="{backgroundImage: `url(${p.logo})`}").media
                        h5.text-center.text-uppercase="{{p.name}}"
</template>

<script>
  import devider from "../../../components/devider";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  import aboutSidebarMenu from "../../../components/aboutSidebarMenu";
  export default {
    head () {
      return {
        title: 'Партнеры компании Sochi Rent-a-Car',
        meta: [
          {hid: 'description', name: 'description', content: 'Партнеры компании Sochi Rent-a-Car: ✮ без ограничения пробега ✮ скидки до 25% ✮ 250 машин в автопарке ✮ бесплатная подача в аэропорт✮ Бронируй онлайн!'}
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
        partners: [
          {
            name: 'autopilotrent.ru',
            link: 'https://autopilotrent.ru',
            logo: require('../../../assets/images/program/icbtext.png')
          },
          {
            name: 'Рольф тоуота Ясенево',
            link: 'https://toyota-yasenevo.ru',
            logo: require('../../../assets/images/program/toyota.png')
          },
          {
            name: 'Hyundai АКРОС',
            link: 'https://www.hyundai-akros.ru',
            logo: require('../../../assets/images/program/h.png')
          },
          {
            name: 'Nissan РОЛЬФ',
            link: 'https://rolf-nissan.ru',
            logo: require('../../../assets/images/program/nissan.png')
          },
          {
            name: 'Renault КлючАвто',
            link: 'https://renault.keyauto.ru',
            logo: require('../../../assets/images/program/renault.png')
          },
          {
            name: 'Kia КлючАвто',
            link: 'https://kia-krasnodar.ru',
            logo: require('../../../assets/images/program/kia.png')
          },
          {
            name: 'BMW Автодом',
            link: 'https://www.bmw-avtodom.ru',
            logo: require('../../../assets/images/program/bmw.png')
          },
          {
            name: 'MINI Автодом',
            link: 'https://www.mini-avtodom.ru',
            logo: require('../../../assets/images/program/mini.png')
          },
          {
            name: 'Mercedes-Benz Звезда Столицы',
            link: 'https://sales.mercedes-zs.ru',
            logo: require('../../../assets/images/program/mercedes.png')
          },
        ],
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs4'),
            to: { name: this.$assets.prefix('about', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs8'),
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
  #partners-wrapper
    .item
      padding: 10px
      .media
        min-height: 180px
        background-size: contain
        background-position: center
        background-repeat: no-repeat
      h5
        min-height: 35px
        display: flex
        justify-content: center
        align-items: center
        padding: 5px 0
        color: #222
</style>
