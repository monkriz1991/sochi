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
              h1="{{$t('faq1')}}"
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
  import devider from "../../../components/devider";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  import aboutSidebarMenu from "../../../components/aboutSidebarMenu";
  export default {
    head () {
      return {
        title: 'Часто задаваемые вопросы и ответы об аренде автомобиля',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
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
        angle: require('../../../assets/images/angle-arrow-down.svg'),
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
            text: this.$t('breadcrumbs9'),
            active: true
          }
        ],
        index: 0,
        faq: {
          ru: [
            {
              q: "Что будет с залогом когда закончится срок аренды?",
              a: "Сумма залога в обязательном порядке будет возвращена Вам по окончании срока аренды автомобиля, сразу после подписания Акта приема-передачи."
            },
            {
              q: "Услуга \"Отмена залога и франшизы\" - что это?",
              a: "Услуга \"Отмена залога и франшизы\" за дополнительную плату освобождает Вас от внесения залога и отменяет франшизу по полису КАСКО, что позволит Вам не беспокоиться о происшествиях на дорогах Краснодарского края.",
            },
            {
              q: "Обязательно ли оплачивать аренду заранее?",
              a: "Оплатить аренду и внести залог Вы можете непосредственно при получении автомобиля. В случае поступления оплаты для Вас будет забронирован конкретный автомобиль, персональные данные которого (цвет, комплектация, год выпуска, регистрационный знак) будут указаны в Договоре аренды и Ваучере на получение автомобиля, которые мы до начала срока аренды направим Вам на электронную почту.",
            },
            {

              q: "Как внести предоплату?",
              a: "Вы можете внести предоплату как с помощью онлайн сервиса на сайте нашей компании, так и наличными или с помощью банковской карты любого банка в нашем офисе.",
            },
            {
              q: "Может ли к управлению автомобилем быть допущен еще один водитель?",
              a: "К управлению автомобилем могут быть допущены другие водители при условии соответствия требованиям, предъявляемым к Арендатору, а также при наличии аналогичного набора документов.",
            },
            {
              q: "Что делать, если автомобиль выйдет из строя не по моей вине?",
              a: "В случае поломки мы оперативно и бесплатно заменим автомобиль на аналогичный.",
            },
            {
              q: "Какой порядок получения автомобиля в Аэропорту Сочи?",
              a: "По прилету в Аэропорт города Сочи Вам необходимо подойти к стойке нашей компании, которая находится в терминале прилета.",
            },
            {
              q: "Обязательно ли в течение дня оставлять автомобиль на охраняемых парковках или стоянках?",
              a: "В течение дня мы рекомендуем Вам без крайней необходимости не оставлять автомобиль без присмотра. А в темное время суток желательно хранить автомобиль на охраняемых стоянках (парковках).",
            },
            {
              q: "Что делать если я попал в ДТП?",
              a: " В случае ДТП Вам необходимо связаться с нашими специалистами по номеру +7 (988) 282-97-97, затем вызвать на место происшествия сотрудников ГАИ и получить следующие документы: копию Протокола, схему ДТП и справку о ДТП.",
            },
            {
              q: "Автомобили застрахованы?",
              a: "Все автомобили нашей компании застрахованы по КАСКО и ОСАГО. Согласно Договору аренды Ваша ответственность ограничена франшизой по полису КАСКО. Для снятия ограничений Вы можете воспользоваться услугой «Отмена залога и франшизы»."
            },
            {
              q: "Когда будет готов Договор и другие необходимые документы?",
              a: "Ваш Договор аренды и другие сопутствующие документы будут готовы к моменту получения автомобиля."
            },
            {
              q: "Обязательно ли перед возвратом мыть и заправлять автомобиль?",
              a: "Автомобиль Вы получите чистым, с полным баком бензина. По окончании срока аренды необходимо вернуть его в чистом виде, либо оплатить мойку ТС в размере 1000 рублей. Топливный бак также должен быть полным, либо Вам необходимо будет оплатить недостающее количество топлива из расчета 60 рублей за литр."
            },
            {
              q: "Какое топливо использовать для заправки автомобиля?",
              a: "Для заправки автомобиля необходимо использовать бензин АИ-95."
            },
            {
              q: "Мы планируем путешествие с маленькими детьми, у Вас можно арендовать детские кресла?",
              a: "Да, конечно,необходимо лишь заказать эту услугу заблаговременно."
            }
          ],
          en: [
            {
              q:" what will happen to the Deposit when the lease term ends?",
              a: "the amount of the Deposit will be returned to You at the end of the rental period, immediately after signing the acceptance Certificate."
            },
            {
              q: "Service \"Cancellation of Deposit and deductible\" - what is it?",
              a: "the service \"Cancellation of Deposit and deductible\" for an additional fee frees You from making a Deposit and cancels the deductible under the CASCO policy, which will allow You not to worry about accidents on the roads of the Krasnodar territory.",
            },
            {
              q: "Do I have to pay rent in advance?",
              a: "you can Pay the rent and make a Deposit directly upon receipt of the car. If payment is received, a specific car will be reserved for You.its personal data (color, configuration, year of manufacture, registration plate) will be indicated in the rental Agreement and The voucher for receiving the car, which we will send to Your email before the start of the rental period.",
            },
            {
              q: "How do I make a prepayment?",
              a: "you can make a prepayment using the online service on our company's website, or in cash or using a Bank card from any Bank in our office.",
            },
            {
              q:"Can another driver be allowed to drive the car?",
              a: "other drivers may be allowed to drive if they meet the requirements of the Renter, as well as if they have a similar set of documents.",
            },
            {
              q:"What should I do if the car crashes through no fault of mine?",
              a:"In the event of a breakdown, we will promptly and free of charge replace the car with a similar one.",
            },
            {
              q:" what is the procedure for getting a car at Sochi Airport?",
              a: "Upon arrival at the Sochi Airport, you need to go to the reception of our company, which is located in the arrival terminal.",
            },
            {
              q: "is it Necessary to leave the car in secured Parking lots during the day?",
              a:"during the day, we recommend that you do not leave your car unattended unless absolutely necessary. And in the dark, it is desirable to store the car in secure Parking lots.",
            },
            {
              q:"What should I do if I have an accident?",
              a:" In case of an accident, you need to contact our specialists at +7 (988) 282-97-97, then call the traffic police to the scene and get the following documents: a copy of the Protocol, the scheme of the accident and a certificate of the accident.",
            },
            {
              q: "are the Cars insured?",
              a: "All cars of our company are insured under CASCO and CTP. According to the lease Agreement, Your liability is limited to the deductible under the CASCO policy rubles. To remove restrictions, you can use the service \"Cancellation of Deposit and deductible\"."
            },
            {
              q: "When will the Contract and other necessary documents be ready?",
              a: "Your rental Agreement and other related documents will be ready when you receive the car."
            },
            {
              q: "is it Necessary to wash and refuel the car before returning?",
              a: "you will get a clean Car with a full tank of gasoline. At the end of the rental period, you must return it in its pure form, or pay for the car wash in the amount of 1000 rubles. The fuel tank must also be full, or you will need to pay for the missing amount of fuel at the rate of 60 rubles per liter."
            },
            {
              q: "What fuel should I use for refueling the car?",
              a: "to refuel the car, you must use AI-95 gasoline."
            },
            {
              q: "We are planning a trip with young children, can you rent child seats?",
              a: "Yes, of course, you only need to order this service in advance."
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
