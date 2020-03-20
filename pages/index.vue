<template lang="pug">
  div.wrapper
    jumbotron
    auto-offer-wrapper
    div.container
      div.my-3
        h1.text-center="Прокат машин в Сочи"
        p="Прокат авто в Сочи с компанией «Sochi Rent-a-Car» сбережет Ваше время, силы и нервы и наполнит Ваше пребывание в Сочи комфортом и удобством."
        p="Нужен автомобиль в аренду в Сочи? Это перестает быть проблемой, если вы обратитесь в нашу компанию, так как у нас вы можете арендовать автомобиль, как легкового типа, так и микроавтобус. Следует сказать и про модельный ряд – у нас вы можете подобрать авто как бюджетного класса, так и премиум. Кроме этого, нужно отметить, что мы постоянно расширяем автопарк, поэтому, выбор только увеличивается. В данный момент мы оперируем автопарком в размере более чем 250 автомобилей."
        p="В чем основное преимущество аренды транспортного средства? Предположим, что автомобиль или микроавтобус вам нужен только от случая к случаю. При таком положении дел, покупать авто невыгодно, так как его использование будет просто нерентабельно. Кроме того, что стоимость топлива постоянно повышается, требуются затраты на уход за автомобилем (масло, замена резины и комплектующих), покупка или аренда гаража. Также не следует забывать и о прохождении обязательного технического осмотра."
        p="Услуги аренды авто избавляют вас от таких проблем. В нужное вам время вы получаете подготовленный автомобиль, со всеми необходимыми для использования документами. В нашем автопарке большой выбор автомобилей комфорт, бизнес и представительского класса."
        h3="Наши преимущества"
        p="Аренда автомобиля в Сочи от нашей компании - это не только выгодно, но и удобно. Подтверждается это утверждение следующими факторами:"
        ul
          li="вы можете взять авто в аренду с водителем и без водителя;"
          li="возможна круглосуточная подача авто, к примеру, если вам нужна аренда авто в аэропорту Сочи;"
          li="быстрое оформление документов. Все, что вам нужно для оформления аренды – паспорт и водительское удостоверение, если вы предполагаете брать автомобиль без водителя;"
          li="автопарк с разными моделями - есть из чего выбрать даже самому привередливому клиенту;"
          li="пробег без ограничений, детское кресло и другие дополнительные услуги уже включены в стоимость аренды."
          li="Возможно, вы хотите совершить поездку за город, на большие расстояния? В таком случае, мы готовы предоставить вам машину и для таких целей – аренда авто для поездки по побережью Черного моря."
        h3="Посуточный прокат авто в Сочи без водителя"
        p="У нас вы можете заказать прокат авто в Сочи без водителя посуточно или сразу на несколько дней, как вам будет удобно."
        h4="Как мы работаем?"
        p="Все, что вам нужно сделать, это выбрать необходимое авто из каталога и связаться с нами для его бронирования. Оформление аренды происходит максимально быстро. Однако примите во внимание то, что ваш водительский стаж должен быть не менее трех лет."
        p="В любое удобное для вас время вы можете заказать прокат автомобилей в Сочи без водителя, цены указаны на нашем сайте в соответствующем разделе. Произвести оплату за услуги вы можете посредством как наличного, так и безналичного расчета. Обратите внимание, что внесение залоговой суммы осуществляется непосредственно при передаче автомобиля в ваше временное пользование."
        p="По всем дополнительным вопросам вы всегда можете обращаться к нам за консультацией. Контакты для обратной связи указаны ниже. Также вы можете воспользоваться услугой обратного звонка. Будем рады видеть вас среди наших клиентов."
    main-page-features
    banners-section
    section
      div.container
        b-row
          b-col(sm="12" md="12" lg="6")
            nuxt-link(to="/rent/").nodec
              h3.text-center="Автомобили без водителя"
            CWoDComponent(:items="CWoD")
          b-col(sm="12" md="12" lg="6")
            nuxt-link(to="/service/").nodec
              h3.text-center="Автомобили с водителем"
            CWDComponent(:items="CWD")
    newsMainPageWrapper(:items="news")
</template>

<script>
  import jumbotron from "../components/jumbotron";
  import autoOfferWrapper from "../components/autoOfferWrapper";
  import mainPageFeatures from "../components/mainPageFeatures";
  import mainPageArticle from "../components/mainPageArticle";
  import newsMainPageWrapper from "../components/newsMainPageWrapper";
  import CWDComponent from "../components/CWDComponent";
  import CWoDComponent from "../components/CWoDComponent";
  import BannersSection from "../components/BannersSection";
  export default {
    head () {
      return {
        title: 'Прокат машин без водителя в Сочи',
        meta: [
          {hid: 'description', name: 'description', content: 'Прокат машин в Сочи: *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    components: {
      autoOfferWrapper,
      jumbotron,
      mainPageFeatures,
      BannersSection,
      newsMainPageWrapper,
      CWDComponent,
      CWoDComponent,
      mainPageArticle
    },
    data(){
      return {
        news: [],
        CWD: [],
        CWoD: [],
      }
    },
    methods: {
      fetchLatestNews(){
        this.$axios(`sun/getLatestNews?city=${this.$config.station}`)
          .then(result => {
            if (result.data.status === 'success'){
              this.news = result.data.data;
            }
          }).catch(err => console.error(err))
      },
      fetchCWoD(){
        this.$axios.post('sun/carsWithoutDriverMainPage', {city: this.$config.station})
        .then(result => {
          if (result.data.status === 'success'){
            this.CWoD = result.data.data;
          }
        }).catch(err => console.error(err));
      },
      fetchCWD(){
        this.$axios.post('sun/carsWithDriverMainPage', {city: this.$config.station})
        .then(result => {
          if (result.data.status === 'success'){
            this.CWD = result.data.data;
          }
        }).catch(err => console.error(err));
      },
    },
    mounted() {
      this.fetchLatestNews()
      this.fetchCWoD()
      this.fetchCWD()
    }
  }
</script>

<style lang="sass">
  .nodec
    text-decoration: none
    h3
      color: #222222
</style>

