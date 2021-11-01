<template lang="pug">
  section
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bc")
        h1="{{$t('contacts1')}}"
        b-row.mb-5
          b-col(sm="12" md="6" lg="6")
            div#form-feedback
              h3="{{$t('contacts2')}}"
              feedback-form(type="feedback")
          b-col(sm="12" md="6" lg="6")
            div#info-contacts
              h3="{{$t('contacts14')}}"
              p.m-0
                strong="{{$t('contacts15')}}"
              div(v-html="$t(settings.address_in_contacts)").pt-1.pb-3
              p
                strong="{{$t('contacts16')}}"
                a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`").mgo-number="{{settings.main_phone}}"
              p
                strong="E-mail: "
                a(:href="`mailto:${settings.main_email}`")="{{settings.main_email}}"
              p.socials-mess
                span.tg.ico-mess
                span.wa.ico-mess
                span.vb.ico-mess
                span=": +7 (988) 282-97-97"
              p.m-0="{{$t('contacts17')}}"
              p.m-0="{{$t('contacts18')}}"
        div
          hr
          h2.mb-3="{{$t('contacts19')}}"
    yandex-map(
      :coords="coords"
      :zoom="18")#map
      ymap-marker(
        :coords="coords"
        marker-id="123"
        hint-content="some hint")
</template>

<script>
  import devider from "../components/devider";
  import BreadCrumbs from "../components/BreadCrumbs";
  import FeedbackForm from "~/components/feedbackForm";

  export default {
    head () {
      return {
        title: 'Контактная информация Sochi Rent-a-Car',
        meta: [
          {hid: 'description', name: 'description', content: 'ℹ Адрес и телефон компании Sochi Rent-a-Car: Краснодарский край, г. Сочи, ул. Мира, д. 42, оф. 207; ☎ +7 (861) 205-21-76'}
        ]
      }
    },
    name: "contacts",
    components:{
      FeedbackForm,
      devider,
      BreadCrumbs
    },
    data(){
      return {
        bc: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs3'),
            active: true
          }
        ],
      }
    },
    computed: {
      settings(){
        let settings = this.$parent.$parent.set_data
        if (settings){
          return settings
        }else{
          return {
            id: '',
            station: '',
            main_phone: '',
            address: '',
            address_in_contacts: '',
            map_lat: '',
            map_lng: '',
            time: '',
            main_email: '',
            soc_vk: '',
            soc_insta: '',
            soc_fb: '',
            soc_youtube: '',
          }
        }
      },
      coords() {
        let settings = this.$parent.$parent.set_data
        return [
          settings ? settings.map_lat: this.$config.map_lat,
          settings ? settings.map_lng: this.$config.map_lng,
        ]
      }
    },
  }
</script>

<style lang="sass" scoped>
  .ymap-container
    height: 500px
    width: 100%
  textarea
    resize: none
  .socials-mess
    display: flex
    flex-wrap: wrap
    justify-content: flex-start
    align-items: center
  .ico-mess
    display: inline-block
    width: 25px
    height: 25px
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    margin: 0 5px 0 0
    &.wa
      background-image: url("../assets/images/skin/whatsapp.png")
    &.tg
      background-image: url("../assets/images/skin/telegramm.png")
    &.vb
      background-image: url("../assets/images/skin/viber.png")
</style>
