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
        h1="Аренда авто для юр.лиц"
        div(v-if="loaded")
          c-wo-d-component-full(:items="CWoD")
        div(v-else)
          loader
        div.clearfix
        div(v-if="$i18n.locale === 'ru'")
          h2="Аренда авто для юридических лиц"
          p="Обеспечить сотрудников автотранспортом в Сочи без лишних расходов. Позаботиться о встрече деловых партнеров в аэропорту Адлера. Получить личного водителя без внесения его в штат. Компания «Sochi Rent-a-Car» знает, как решить все эти вопросы. Аренда авто для юр.лиц из нашего автопарка станет выгодным и практичным предложением для бизнесменов, которые умеют правильно расставлять акценты при ведении дел."
          h3="Прокат автомобилей – выгодные предложения для юридических лиц"
          p="Аренда машины в Сочи поможет вам самостоятельно планировать маршруты поездок. При этом вам не придется приобретать авто, что является существенной экономией бюджета. Наше предложение направлено на сотрудничество с владельцами коммерческих организаций, которые:"
          ul
            li="Хотят обеспечить автотранспортом сотрудников, которые находятся в командировке в Краснодарском крае."
            li="Не имеют собственного автопарка, но нуждаются в престижных авто для поддержания имиджа компании."
            li="Планируют проведение конференции, выставки, иного корпоративного мероприятия, что требует встречу участников и гостей в аэропорту на автомобиле бизнес-класса."
            li="Не имеют в штате водителей. У нас прокат можно оформить с водителем и без."
          h3="Преимущества аренды автомобиля в «Sochi Rent-a-Car»"
          p="Мы предлагаем выгодные условия сотрудничества для юридических лиц:"
          ul
            li="Большой автопарк. Можно взять напрокат автомобиль представительского или бизнес класса."
            li="Предоставление в аренду в безупречном техническом состоянии. Все иномарки проходят ТО в нашем сервисе перед предоставлением их в аренду."
            li="Юридическое оформление сделки. Юр лицо заключает с нами договор аренды, который служит отчетным документом. Мы учитываем каждый юридический момент, связанный с оформлением арендного договора."
            li="Страхование. В базовый тариф включен полис ОСАГО, что минимизирует риски наших клиентов."
            li="Аренда с водителем. Юридический договор может быть заключен с предоставлением водителя от нашей компании."
            li="Трансфер. Мы готовы предоставить автомобиль для встречи делегации в аэропорту."
          p="Взять машину в аренду по документам юрлица вы можете на нужное количество дней по тарифам, указанным в прайсе. На длительный прокат действует гибкая система скидок. Оформить прокат авто в Сочи можно онлайн. Или свяжитесь с нами удобным для вас способом: телефон +7 (862) 555 28 48, e-mail rent@sochirentacar.ru."
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
      title: 'Аренда авто для юридических лиц | Sochi Rent-a-Car',
      meta: [
        {hid: 'description', name: 'description', content: 'Аренда автомобилей в Адлере или Сочи для юридических лиц. 350 машин в автопарке, без ограничения пробега, скидки до 25% и бесплатная подача в аэропорт ☎+7(862)555-28-48'}
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
