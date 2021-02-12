<template lang="pug">
  section#service
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{$t('s20')}}"
        div(v-if="loaded")
          c-w-d-component-full(:items="CWD")
        div(v-else)
          loader
        div.clearfix
        div(v-if="$i18n.locale === 'ru'")
          p="Ищете, где можно взять в аренду авто с водителем дешево? В таком случае, наша компания готова предоставить вам такие услуги, ведь в нашем автопарке более 250 автомобилей, как легкового типа, так и микроавтобусы. Особенно актуальной будет услуга аренды транспортного средства с нашим водителем в том случае, если вы предполагаете взять машину на какое-либо торжество или просто не знаете города."
          h2="Услуги по аренде авто с водителем"
          p="Кроме этого, прокат авто в Сочи с водителем от нашей компании предоставляет вам, как нашему клиенту, такие преимущества:"
          ul
            li="вы вносите депозит непосредственно при получении автомобиля в пользование, а не заранее;"
            li="для оформления аренды авто с водителем в Сочи, вам нужен только паспорт, именная банковская карта и водительское удостоверение;"
            li="в дополнение и бесплатно мы готовы предоставить вам детское кресло, навигатор и набор автомобилиста;"
            li="возможна подача авто прямо в аэропорт или в гостиницу."
            li="Прокат авто в Сочи с водителем"
            li="Отдельно следует сказать о стоимости авто представительского класса в Сочи в прокат. Мы готовы предоставить вам не одну скидку, а целых пять. Имеется в виду следующее – если по условиям аренды вам подходит несколько скидок, то их можно просто суммировать, что, в конечном итоге, существенно сэкономит ваши средства. Касается это правило любого автомобиля или микроавтобуса из нашего автопарка. Более подробно с программой лояльности и размером скидок вы можете ознакомиться в соответствующем разделе нашего сайта."
          h2="Как оставить заявку?"
          p="Заказать автомобиль в аренду с водителем очень просто. Для этого вам нужно только выбрать авто из каталога, который максимально полно соответствует вашим требованиям. После этого вы просто отправляете нам заявку, форма которой находится на странице с выбранным авто. Если в процессе заказа у вас возникнут какие-либо вопросы, можете смело обращаться к нашим менеджерам, контакты которых указаны ниже. При необходимости вы можете заказать звонок и мы позвоним вам сами."
        div(v-else)
          p="Looking for a cheap car rental with a driver? In this case, our company is ready to provide you with such services, because in our fleet there are more than 250 cars, both passenger cars and minibuses. Especially relevant will be the service of renting a vehicle with our driver in the event that you are planning to take a car to any celebration or just do not know the city."
          h2="Car rental services with a driver"
          p="In addition, car rental in Sochi with a driver from our company provides you, as our client, with the following advantages:"
          ul
            li="you pay the Deposit amount directly when you receive the car for use, and not in advance;"
            li="to rent a car with a driver in Sochi, you only need a passport, a Deposit amount and a driver's license;"
            li="in addition and free of charge, we are ready to provide you with a child seat, Navigator and a set of motorists;"
            li="it is possible to deliver a car directly to the airport or hotel."
            li="Car rental in Sochi with a driver"
            li="We should also mention the cost of Executive class cars in Sochi for rent. We are ready to give you not one discount, but five. This means that if several discounts are suitable for you under the terms of the lease, then you can simply add them up, which, in the end, will significantly save your money. This rule applies to any car or minibus from our fleet. You can find more information about the loyalty program and the amount of discounts in the corresponding section of our website."
          h2="How do I submit a request?"
          p="It is very easy to order a car for rent with a driver. To do this, you only need to select a car from the catalog that best meets your requirements. After that, you just send us a request, the form of which is located on the page with the selected car. If you have any questions during the order process, feel free to contact our managers, whose contacts are listed below. If necessary, you can order a call and we will call you ourselves."
</template>

<script>
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import CWDComponentFull from "../../components/CWDComponentFull";
  import devider from "../../components/devider";
  export default {
    head () {
      return {
        title: 'Аренда авто c водителем в Сочи и Адлере',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто c водителем в Сочи и Адлере: *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    components:{
      devider,
      BreadCrumbs,
      loader,
      CWDComponentFull
    },
    data(){
      return {
        CWDItems: require('../../cars.json').CWD,
        loaded: true,
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs13'),
            active: true
          }
        ],
      }
    },
    computed: {
      CWD(){
        let res = [];
        for (let item in this.CWDItems){
          res.push(this.CWDItems[item])
        }
        return res
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
