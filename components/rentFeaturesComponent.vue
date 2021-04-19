<template lang="pug">
  div#rent_features.p-2.p-md-5
    div.py-3
      div(v-for="(f, fdx) in features" :key="fdx")
        div(v-if="fdx % 2 == 0")
          div.d-flex.justify-content-between.align-items-center.flex-column-reverse.flex-sm-row
            div
              div
                h3(v-html="$i18n.locale === 'ru' ? f.title_ru : f.title_en")
                p(v-html="$i18n.locale === 'ru' ? f.text_ru : f.text_en")
            div
              div(v-bind:class="f.image").media.image_feature.m-3.ml-sm-3
        div(v-else)
          div.d-flex.justify-content-between.align-items-center.flex-column.flex-sm-row
            div
              div(v-bind:class="f.image").media.image_feature.m-3.mr-sm-3
            div
              div
                h3(v-html="$i18n.locale === 'ru' ? f.title_ru : f.title_en")
                p(v-html="$i18n.locale === 'ru' ? f.text_ru : f.text_en")
</template>

<script>
export default {
  name: "rentFeaturesComponent",
  data(){
    return {
      features: [
        {
          title_ru: 'Круглосуточная подача автомобилей',
          title_en: 'Round-the-clock car service',
          text_ru: 'Подадим забронированный автомобиль в любое время и место. Круглосуточная подача в аэропорт в Адлере бесплатно.',
          text_en: 'We will deliver the reserved car at any time and place. Round-the-clock delivery to the airport in Adler is free of charge.',
          image: 'feature1',
        },
        {
          title_ru: 'Большой набор дополнительных услуг',
          title_en: 'A large set of additional services',
          text_ru: 'Для вашего удобства вы можете дополнительно выбрать необходимые опции. Например, добавить к заказу детское кресло, автохолодильник, радар-детектор, выезд в Крым или Абхазию.',
          text_en: 'For your convenience, you can additionally select the necessary options. For example, add a child safety seat, a car cooler, a radar detector, a trip to Crimea or Abkhazia to the order.',
          image: 'feature2',
        },
        {
          title_ru: 'Скидки на аренду при бронировании  автомобиля сроком от 3х дней',
          title_en: 'Discounts for rent when booking a car for a period of 3 days or more',
          text_ru: "При аренде автомобиля от 3 дней, скидка составит до 15%; При аренде автомобиля от 7 дней, скидка составит до 20%; При долгосрочной аренде автомобиля от 1 месяца, скидка на аренду составит до 50%.",
          text_en: 'If you rent a car for 3 days or more, the discount will be up to 15%; If you rent a car for 7 days or more, the discount will be up to 20%; If you rent a car for 1 month or more, the discount will be up to 50%.',
          image: 'feature3',
        },
        {
          title_ru: 'Пробег без ограничений',
          title_en: 'Unlimited mileage',
          text_ru: 'Пробег по территории Большого Сочи не ограничен. Условия выезда в другие регионы или в Абхазию вы можете уточнить у наших менеджеров. Если вы не планируете дальние поездки, вы можете получить дополнительную скидку в 5%, включив ограничение пробега до 100 км/сутки. Пробег суммируется за весь период аренды.',
          text_en: 'The mileage on the territory of Greater Sochi is not limited. You can check the conditions of travel to other regions or to Abkhazia with our managers. If you do not plan long-distance trips, you can get an additional 5% discount by including a mileage limit of up to 100 km / day. The mileage is summed up for the entire rental period.',
          image: 'feature4',
        },
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/styles/variables"
#rent_features
  width: 100%
  background: #f8f8f8
  border-radius: 20px
  .image_feature
    border: 5px solid $primary
    background-size: cover
    background-position: center
    background-repeat: no-repeat
    border-radius: 100%
    height: 150px
    width: 150px
    &.feature1
      background-image: url("/images/1_1.jpg")
    &.feature2
      background-image: url("/images/2_2.jpg")
    &.feature3
      background-image: url("/images/3_3.jpg")
    &.feature4
      background-image: url("/images/4_4.jpg")
</style>
