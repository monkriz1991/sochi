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
              'q': 'Какие документы необходимо предоставить для аренды автомобиля?',
              "a": 'паспорт РФ (главная страница и прописка)/заграничный паспорт (только для иностранных граждан), водительское удостоверение (с двух сторон).'
            },
            {
              'q': 'Когда будет готов Договор и другие необходимые документы?',
              "a": 'Ваш Договор аренды и другие сопутствующие документы будут готовы к моменту получения автомобиля.'
            },
            {
              'q': 'Автомобили застрахованы?',
              "a": 'Все автомобили нашей компании застрахованы по КАСКО и ОСАГО. Согласно Договору аренды Ваша ответственность ограничена франшизой по полису КАСКО. Для снятия ограничений Вы можете воспользоваться услугой «Отмена франшизы» или выбрать услугу «Расширенное страховое покрытие».'
            },
            {
              'q': 'Что будет с депозитом, когда закончится срок аренды?',
              "a": 'Сумма депозита будет возвращена вам в обязательном порядке в течение 30 календарных дней после окончания срока аренды автомобиля, при соблюдении всех условий Договора.'
            },
            {
              'q': 'Обязательно ли вносить предоплату?',
              "a": 'Предоплата в размере 20% от стоимости аренды, является обязательным условием для бронирования автомобиля. После внесения предоплаты, для Вас будет забронирован конкретный автомобиль, персональные данные которого (цвет, комплектация, год выпуска, регистрационный знак) будут указаны в Договоре аренды и Ваучере на получение автомобиля.'
            },
            {
              'q': 'Как внести предоплату?',
              "a": 'Вы можете внести предоплату с помощью онлайн сервиса на сайте нашей компании.'
            },
            {
              'q': 'Можно ли оплатить аренду картой?',
              "a": 'Вы можете оплатить аренду автомобиля с помощью карты Master Card, Visa или МИР в офисе нашей компании.'
            },
            {
              'q': 'Как найти Вас в Аэропорту города Сочи?',
              "a": 'По прилету в Аэропорт города Сочи наш менеджер свяжется с Вами. Передача автомобиля осуществляется на парковке Аэропорта города Cочи.'
            },
            {
              'q': 'Может ли к управлению автомобилем быть допущен еще один водитель?',
              "a": 'К управлению автомобилем могут быть допущены другие водители при условии соответствия требованиям, предъявляемым к Арендатору, а также при наличии аналогичного набора документов.'
            },
            {
              'q': 'Обязательно ли перед возвратом автомобиля его мыть и заправлять?',
              "a": 'Автомобиль Вы получите чистым, с полным баком бензина. По окончании срока аренды необходимо вернуть его в чистом виде, либо оплатить мойку ТС в размере 1000 рублей. Топливный бак также должен быть полным, либо Вам необходимо будет оплатить недостающее количество топлива по прайсу компании.'
            },
            {
              'q': 'Какое топливо использовать для заправки автомобиля?',
              "a": 'Практически все наши автомобили заправляются бензином АИ-95, но есть исключения, их следуют заправлять дизельным топливом ДТ. Информация размещена на лючке бензобака, будьте внимательней!'
            },
            {
              'q': 'Услуга "Отмена франшизы" - что это?',
              "a": 'Услуга "Отмена франшизы" за дополнительную плату отменяет франшизу по полису КАСКО, и вместе с тем обязывает предоставить все справки о повреждении транспортного средства из ГИБДД.'
            },
            {
              'q': 'Что делать, если автомобиль выйдет из строя не по моей вине?',
              "a": 'В случае поломки мы оперативно и бесплатно заменим автомобиль на аналогичный, либо в короткие сроки устраним причину поломки.'
            },
            {
              'q': 'Что делать если я попал в ДТП?',
              "a": 'В случае ДТП Вам необходимо связаться с нашими специалистами по номеру <a href="tel:88004444848">8 (800) 444-48-48</a>, затем вызвать на место происшествия сотрудников ГАИ и получить следующие документы: копию Протокола, схему ДТП и справку о ДТП.'
            },
            {
              'q': 'Необходимо ли вносить Аэропортовый сбор?',
              "a": 'В нашей компании отсутствуют всевозможные сборы и дополнительные платежи, *Аэропортовый сбор, доплата за зимние шины и набор автомобилиста.*'
            },
            {
              'q': 'Мы планируем путешествие с маленькими детьми, у Вас можно арендовать детские кресла?',
              "a": 'Детские кресла и бустеры можно арендовать за дополнительную плату согласно прайсу компании. Необходимо заказать эту услугу заблаговременно.'
            },
            {
              'q': 'Каковы ограничения по суточному пробегу?',
              "a": 'В нашей компании отсутствует ограничение пробега.'
            }
          ],
          en: [
            {
              'q': 'What documents do you need to provide for car rental?',
              "a": 'Russian passport (home page and registration)/foreign passport (only for foreign citizens), driver`s license (on both sides).'
            },
            {
              'q': 'When will the Contract and other necessary documents be ready?',
              "a": 'Your rental Agreement and other related documents will be ready by the time you receive the car.'
            },
            {
              'q': 'Are the cars insured?',
              "a": 'All cars of our company are insured under CASCO and CTP. According to the lease Agreement, your liability is limited to the deductible under the CASCO policy. To remove the restrictions, you can use the "deductible Cancellation" service or choose the "Extended insurance coverage" service.'
            },
            {
              'q': 'What will happen to the Deposit when the lease expires?',
              "a": 'The Deposit amount will be returned to you without fail within 30 calendar days after the end of the rental period, subject to all the terms of the Contract.'
            },
            {
              'q': 'Do I have to make a prepayment?',
              "a": 'A prepayment of 20% of the rental price is a prerequisite for booking a car. After making an advance payment, a specific car will be booked for You, whose personal data (color, configuration, year of manufacture, registration plate) will be indicated in the rental Agreement and the car receipt Voucher.'
            },
            {
              'q': 'How do I make a prepayment?',
              "a": 'You can make an advance payment using the online service on our company`s website.'
            },
            {
              'q': 'Can I pay the rent by card?',
              "a": 'You can pay for your car rental with a Master Card, Visa or MIR card at our company`s office.'
            },
            {
              'q': 'How to find You at the airport of Sochi?',
              "a": 'Upon arrival at the airport of Sochi, our Manager will contact You. Transfer of the car is carried out in the Parking lot of the Sochi Airport.'
            },
            {
              'q': 'Can another driver be allowed to drive the car?',
              "a": 'Other drivers can be allowed to drive a car if they meet the requirements for the tenant, as well as if they have a similar set of documents.'
            },
            {
              'q': 'Is it necessary to wash and refuel the car before returning it?',
              "a": 'You will get a clean car with a full tank of gasoline. At the end of the rental period, it is necessary to return it in its pure form, or pay for the car wash in the amount of 1000 rubles. The fuel tank must also be full, or you will need to pay for the missing amount of fuel according to the company`s price list.'
            },
            {
              'q': 'What fuel should I use to refuel the car?',
              "a": 'Almost all our cars are refueled with AI-95 gasoline, but there are exceptions, they should be refueled with diesel fuel DT. The information is posted on the fuel tank hatch, be careful!'
            },
            {
              'q': 'The "franchise Cancellation" service - what is it?',
              "a": 'The service "cancellation of the franchise" cancels the franchise under the CASCO policy for an additional fee, and at the same time obliges to provide all certificates of damage to the vehicle from the traffic police.'
            },
            {
              'q': 'What should I do if the car crashes through no fault of mine?',
              "a": 'In the event of a breakdown, we will promptly and free of charge replace the car with a similar one, or eliminate the cause of the breakdown in a short time.'
            },
            {
              'q': 'What should I do if I have an accident?',
              "a": 'In the event of an accident, you need to contact our specialists at <a href="tel:88004444848">8 (800) 444-48-48</a>, then call traffic police officers to the scene and get the following documents: a copy of the Protocol, an accident diagram and a certificate of the accident.'
            },
            {
              'q': 'Do I need to pay an Airport fee?',
              "a": 'In our company there are no all kinds of fees and additional payments, * Airport fee, surcharge for winter tires and a set of motorists.*'
            },
            {
              'q': 'We are planning a trip with small children, Can you rent child seats?',
              "a": 'Child seats and boosters can be rented for an additional fee according to the company`s price list. You must book this service in advance.'
            },
            {
              'q': 'What are the daily mileage limits?',
              "a": 'There is no mileage limit in our company.'
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
