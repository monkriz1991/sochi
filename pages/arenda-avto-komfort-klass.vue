<template lang="pug">
  section#rent
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        div(v-if="this.$device.isDesktop").mb-3.d-none.d-md-block
          search-form-for-rent
        div(v-if="this.$device.isMobile")
          b-button(v-b-toggle.searchform).search-mobile-show
            i.calendar
            span="Поиск на ваши даты"
          b-collapse#searchform.py-2
            search-form-for-rent
        h1="Аренда авто комфорт класса"
        div(v-if="loaded")
          c-wo-d-component-full(:items="CWoD")
        div(v-else)
          loader
        div.clearfix
        div(v-if="$i18n.locale === 'ru'")
          h2="Аренда авто комфорт класса в Сочи"
          p="Аренда авто комфорт класса в компании «Sochi Rent-a-Car» станет лучшим вариантом для туристических или бизнес поездок по Сочи. У нас вы можете взять напрокат автомобиль с водителем и без водителя. Каждая машина нашей компании поставляется с полным баком и в чистом виде."
          h2="Выгодные условия аренды машины в Сочи"
          p="Мы предоставляем клиентам услуги проката авто категорий промо, комфорт, бизнес классы, а также кабриолеты и минивены на следующих выгодных условиях:"
          ul
            li="Комфортабельные автомобили с кондиционером ( или системой климат-контроля, аудиосистемой, GPS-навигатором, креслами и рулевым колесом с регулировкой положения). Наличие конкретных опций при выборе модели уточняйте у менеджера перед тем, как брать ТС напрокат."
            li="Машины в идеальном состоянии – возраст до 3 лет, каждый год обновляем автопарк."
            li="Разные тарифы – на один день, для долгосрочной аренды от 30 дней, с выездом в другой регион, без ограничения пробега в сутки."
          p="В стоимость уже включено топливо. Мы предлагаем клиентам чистые авто, и рассчитываем, что вы вернете транспортное средство в таком же состоянии. Если у вас нет времени на посещение автомойки при возврате, то можете заказать дополнительную мойку. Цена услуги при оплате на парковке после завершения аренды - 1000 рублей."
          p="Уточнить условия аренды и взять машину на прокат в Сочи вы можете, оставив заявку на сайте или по указанному телефону +7 (862) 555-28-48. В предпраздничные дни и в «горячий» сезон рекомендуем бронировать заранее!"
        div.my-3
          h4="Для персонального предложения заполните форму"
          feedback-form(type="rent")
</template>

<script>
import SearchFormForRent from "@/components/SearchFormForRent";
import FeedbackForm from "@/components/feedbackForm";
import devider from "@/components/devider";
import BreadCrumbs from "@/components/BreadCrumbs";
import loader from "@/components/loader";
import CWoDComponentFull from "@/components/CWoDComponentFull";

export default {
  head () {
    return {
      title: 'Аренда машины комфорт-класса | Sochi Rent-a-Car',
      meta: [
        {hid: 'description', name: 'description', content: 'Арендуйте автомобиль комфорт класса в Адлере или Сочи. 350 машин в автопарке, без ограничения пробега, скидки до 25% и бесплатная подача в аэропорт ☎+7(862)555-28-48'}
      ]
    }
  },
  components:{
    SearchFormForRent,
    FeedbackForm,
    devider,
    BreadCrumbs,
    loader,
    CWoDComponentFull
  },
  data(){
    return {
      CWoDItems: require('../cars.json').CWoD,
      loaded: true,
      bcItems: [
        {
          text: this.$t('breadcrumbs1'),
          to: { name: this.$assets.prefix('index', this.$i18n.locale) }
        },
        {
          text: this.$t('breadcrumbs122'),
          active: true
        }
      ],
    }
  },
  computed: {
    CWoD(){
      let res = [];
      for (let item in this.CWoDItems){
        res.push(this.CWoDItems[item])
      }
      return res
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
