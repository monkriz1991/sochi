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
              h1="{{$t('faq3')}}"
              div
                div(v-for="(i, idx) in discounts[$i18n.locale]" :key="idx").discount.my-3
                  h6(v-html="i.title").mb-1
                  p(v-html="i.desc")
              h4.text-center="{{$t('faq5')}}"
</template>

<script>
  import devider from "../../../components/devider";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  import aboutSidebarMenu from "../../../components/aboutSidebarMenu";
  export default {
    head () {
      return {
        title: 'Дополнительные скидки на аренду машин в Сочи',
        meta: [
          {hid: 'description', name: 'description', content: 'Дополнительные скидки на аренду авто в Сочи до 25%: *✮* без ограничения пробега *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
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
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs4'),
            to: { name: this.$assets.prefix('about', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs5'),
            active: true
          }
        ],
        discounts: {
          ru: [
            {
              title: "Дополнительная скидка 3% на аренду любого автомобиля для участников программы Аэрофлот Бонус уровня Elit Plus.",
              desc: "Для получения скидки Вам необходимо подтвердить свою причастность к программе, предъявив нашему менеджеру отдела бронирования карту участника и сообщив о ней предварительно любым удобным для Вас способом."
            },
            {
              title: "Дополнительная скидка 3% на аренду любого автомобиля для путешественников с детьми.",
              desc: "Для получения скидки Вам необходимо предъявить копию авиабилета на ребенка (или ваучер из отеля на семейный номер) и его свидетельство о рождении. В Акции принимают участие дети до 7 лет."
            },
            {
              title: "Уникальная акция! Мгновенный Кэшбэк в размере 3% от суммы платежа.",
              desc: "Для участия в Акции необходимо сообщить менеджеру отдела бронирования о Вашем желании оплатить аренду автомобиля наличными. Кэшбэк можно получить мгновенно, сразу после подписания Договора аренды. В акции принимают участие все автомобили из нашего автопарка."
            }
          ],
          en: [
            {
              title: "Additional 3% discount on any car rental for members of the Aeroflot Bonus program at the Elit Plus level.",
              desc: "To get a discount, you need to confirm your participation in the program by presenting your membership card to our booking Department Manager and informing us about it in advance in any way convenient for You."
            },
            {
              title: "Additional 3% discount on any car rental for travelers with children.",
              desc: "to get a discount, you must present a copy of your child's air ticket (or hotel voucher for a family room) and their birth certificate. Children up to 7 years old take part in the Campaign."
            },
            {
              title: "Unique promotion! Instant Cashback of 3% of the payment amount.",
              desc: "to participate in the Promotion, you must inform the booking Manager of Your desire to pay for the car rental in cash. Cashback can be received instantly, immediately after signing the lease Agreement. All cars from our fleet take part in the campaign."
            }
          ]
        }
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
  .discount
    h6
      display: inline
      border-bottom: 1px solid $primary_hover
</style>
