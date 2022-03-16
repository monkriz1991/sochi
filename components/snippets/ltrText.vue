<template lang="pug">
  div
    div(v-if="$i18n.locale === 'ru'")
      p="Личный автомобиль - один из самых удобных способов передвижения в настоящее время, особенно на юге страны. Компания Sochi Rent-a-Car предлагает долгосрочную аренду авто 2020-2021 года в Сочи со скидкой до 50%! Выгоднее, чем покупка, дешевле, чем каршеринг."
      p="При долгосрочной аренде автомобиля от 30 календарных дней вы получаете специальные условия!"
      ul.list-unstyled
        li=" - Автомобиль не ниже 2020 года выпуска."
        li=" - Страхование ОСАГО / КАСКО (Арендатор не несет материальную ответственность, если ущерб автомобилю нанесен не по его вине, страховой случай оформлен в компетентных органах, и установлено виновное лицо)"
        li=" - Безопасность вождения. ТО каждые 10 000 км., на время ТО вы получаете подменный автомобиль аналогичного класса или выше*"
        li=" - Возможность смены класса автомобиля во время аренды на необходимый период. (При аренде автомобиля бизнес-класса / минивен)"
        li=" - Доступно 3 000 км в месяц, при перепробеге фиксированная стоимость 1 км"
        li=" - 79 регионов РФ свободного передвижения на автомобиле без дополнительной оплаты"
    div(v-if="$i18n.locale === 'en'")
      p="A personal car is one of the most convenient ways to travel at the moment, especially in the south of the country. Sochi Rent-a-Car company offers long-term car rental in 2020-2021 in Sochi with a discount of up to 50%! More profitable than buying, cheaper than carsharing."
      p="With a long-term car rental of 30 calendar days or more, you get special conditions!"
      ul.list-unstyled
        li=" - The car is not lower than 2020 year of manufacture."
        li=" - CTP / CASCO insurance (The Lessee is not liable if the damage to the car is not caused by his fault, the insured event is registered with the competent authorities, and the guilty person is identified)"
        li=" - Driving safety. THEN every 10,000 km, for a while you get a replacement car of a similar class or higher*"
        li=" - The possibility of changing the class of the car during the rental for the required period. ((When renting a business class car / minivan)"
        li=" - 3,000 km per month is available, with a fixed cost of 1 km per run"
        li=" - 79 regions of the Russian Federation of free movement by car without additional payment"
</template>

<script>
export default {
  name: "ltrText"
}
</script>

<style scoped>

</style>
