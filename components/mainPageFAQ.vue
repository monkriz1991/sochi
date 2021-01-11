<template lang="pug">
  b-container
    h2="{{$t('faq1')}}"
    div#faq_wrapper
      div(v-for="(i, idx) in faq[$i18n.locale]" :key="idx" v-bind:class="{active: idx === index}").colapsed_pan
        div(@click="index = idx").question
          h6(v-html="i.q").mb-1
          img(:src="angle")
        div.answer
          p
            strong="{{$t(faq2)}}"
            span(v-html="i.a")
</template>

<script>
export default {
  name: "mainPageFAQ",
  data(){
    return {
      index: 0,
      angle: require('../assets/images/angle-arrow-down.svg'),
      faq: {
        en: [
          {
            q: "We arrive at night. Can we get a car immediately at the airport?",
            a: "Yes, of course. We have a round-the-clock free delivery to the Sochi airport (in Adler)."
          },
          {
            q: "Are there any mileage restrictions?",
            a: "The rental price includes unlimited mileage on the territory of Greater Sochi. If you do not plan long-distance trips, you can get an additional 10% discount by including a mileage limit of up to 100 km / day. Mileage is added up for the entire rental period."
          },
          {
            q: "Can I see up-to-date photos of the car in advance?",
            a: "Yes, of course. Our <a href='/booking-online/'>online booking system</a> provides complete and up-to-date information on each car, including year of manufacture, photos and prices."
          },
          {
            q: "Can I rent a car for a long time and how much will it cost?",
            a: "When renting a car for a period of 1 month or more, we have special prices with a discount of up to 50%. You can find current offers and prices <a href='/long_term_rental/'>here</a>."
          },
          {
            q: "You need a rental car in perfect condition. Do you need to order an additional car wash?",
            a: "No, we serve all cars completely clean and with a full tank of gasoline. We ask you to return cars in the same condition, so you can order an additional car wash, so as not to stop at the car wash yourself before returning."
          },
          {
            q: "Is it possible to travel to Abkhazia in a rented car?",
            a: "Yes, of course. The option is paid, you can check the current price with our managers or in the <a href='/booking-online/'>online booking</a> section."
          }
        ],
        ru: [
          {
            q: "Мы прилетаем ночью. Можем ли мы получить автомобиль сразу в аэропорту?",
            a: "Да, конечно. У нас круглосуточная бесплатная подача в аэропорт Сочи (в Адлере)."
          },
          {
            q: "Если ли ограничения по пробегу?",
            a: "В стоимость аренды включен пробег без ограничения по территории Большого Сочи. Если вы не планируете дальние поездки, вы можете получить дополнительную скидку в 10%, включив ограничение пробега до 100 км/сутки. Пробег суммируется за весь период аренды."
          },
          {
            q: "Можно ли заранее посмотреть актуальные фото автомобиля?",
            a: "Да, конечно. В нашей <a href='/booking-online/'>системе онлайн бронирования</a> доступна полная и актуальная информация по каждому автомобилю, включая год выпуска, фотографии и цены."
          },
          {
            q: "Можно ли арендовать автомобиль на длительный срок и сколько это будет стоить?",
            a: "При аренде автомобиля сроком от 1 месяца, у нас действует специальные цены со скидкой до 50%. С актуальными предложениями и ценами вы можете ознакомится <a href='/long_term_rental/'>здесь</a>."
          },
          {
            q: "Арендованный автомобиль нужен в идеальном состоянии. Нужно заказывать дополнительно мойку?",
            a: "Нет, все автомобили мы подаем полностью чистыми и с полным баком бензина. Мы просим возвращать автомобили в таком же состоянии, поэтому вы можете заказать дополнительно мойку, чтобы не заезжать на автомойку самостоятельно перед возвратом."
          },
          {
            q: "Возможен ли выезд в Абхазию на арендованном автомобиле?",
            a: "Да, конечно. Опция платная, актуальную стоимость вы можете уточнить у наших менеджеров или в разделе <a href='/booking-online/'>онлайн бронирования</a>."
          }
        ],
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/styles/variables"
.colapsed_pan
  margin-bottom: 10px
  border-bottom: 1px solid $primary_hover
  cursor: pointer
  .question
    padding: 5px 10px
    display: flex
    justify-content: space-between
    align-items: center
    h6
      display: inline
      border-bottom: 1px solid transparent
    img
      width: 20px
      height: 10px
      transform: rotate(180deg)
      transition: 0.6s
  .answer
    padding: 5px 10px
    display: none
  &.active
    .answer
      padding: 5px 10px
      display: flex
    .question
      padding: 5px 10px
      h6
        display: inline
        border-bottom: 1px solid $primary_hover
      img
        width: 20px
        height: 10px
        transform: rotate(0deg)
        transition: 0.6s
</style>
