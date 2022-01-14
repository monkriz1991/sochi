<template lang="pug">
  section#rent
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        div(v-if="this.$device.isDesktop").mb-3.d-none.d-md-block
          search-form-for-rent(:default-class="1")
        div(v-if="this.$device.isMobile")
          b-button(v-b-toggle.searchform).search-mobile-show
            i.calendar
            span="Поиск на ваши даты"
          b-collapse#searchform.py-2
            search-form-for-rent(:default-class="1")
        h1="Аренда авто бизнес-класса"
        div(v-if="loaded")
          c-wo-d-component-full(:items="CWoD" default-class="Бизнесс")
        div(v-else)
          loader
        div.clearfix
        div(v-if="$i18n.locale === 'ru'")
          h3="Аренда авто бизнес класса"
          p="Хотите комфортных поездок в Сочи? Прилетаете для решения бизнес вопросов и хотите, создать о себе благоприятное впечатление у партнеров? Или планируете провести незабываемые дни на берегах черноморского побережья? Все это вы сможете осуществить вместе с компанией Sochi Rent-a-Car, если решите взять напрокат автомобиль. Большой автопарк, выгодные условия аренды, быстрая подача машины – все это делает наше предложение привлекательным для туристов и предпринимателей."
          h2="Прокат авто бизнес класса – выгодные решения"
          p="Вам не придется тратить время на ожидание такси или общественного транспорта, подстраиваться под программу экскурсий. Аренда автомобилей бизнес класса позволит при оптимальных расходах самостоятельно планировать время пребывания в Сочи. При этом:"
          ul
            li="Машина подается с полным баком, что позволяет сразу начать путешествие."
            li="Можно выбрать автомобиль из каталога, ориентируясь на вместимость салона и технические характеристики."
            li="Взять машину можно с водителем и без."
            li="Есть бесплатная услуга подачи авто в аэропорт Адлера."
            li="Брать иномарку можно на любое количество дней."
          p="Аренда авто бизнес класса позволит не только самостоятельно совершать поездки, но и организовать встречу делового партнера, доставку участников конференции, иного корпоративного мероприятия."
          h2="Как оформить аренду авто бизнес класса"
          p="Чтобы оформить прокат авто бизнес класса, необходимо:"
          ul
            li="Выбрать марку и модель авто из каталога."
            li="Предоставить документы, удостоверяющие личность для заключения арендного договора."
            li="Оплатить прокат."
            li="Получить автомобиль в нужный день. Брать машину для посуточной аренды вы можете на срок от 1 дня."
          p="Остались вопросы? Нужна помощь с оформлением аренды авто в Сочи? Свяжитесь с нами по телефону +7(862)555-28-48. Или оставьте заявку на сайте."
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
      title: 'Аренда авто бизнес-класса в Сочи | Sochi Rent-a-Car',
      meta: [
        {hid: 'description', name: 'description', content: 'Арендуйте автомобиль бизнес-класса в Сочи. 350 машин в автопарке, без ограничения пробега, скидки до 25% и бесплатная подача в аэропорт ☎+7(862)555-28-48'}
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
