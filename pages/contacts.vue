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
              b-form-group.mb-0(:description="$t('contacts3')")
                b-form-input(v-model="feedback.name" :placeholder="$t('contacts4')")
              b-form-group.mb-0( :description="$t('contacts5')")
                vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
              b-form-group.mb-0( :description="$t('contacts10')")
                b-form-input(v-model="feedback.email" placeholder="e-mail")
              b-form-group.mb-0( :description="$t('contacts11')")
                b-form-textarea(v-model="feedback.message" :placeholder="$t('contacts12')")
              a(role="button" @click="submitFeedback").btn.main.w-100="{{$t('contacts13')}}"

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
  export default {
    head () {
      return {
        title: 'Контактная информация',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    name: "contacts",
    components:{
      devider,
      BreadCrumbs
    },
    data(){
      return {
        ph: "",
        already: false,
        feedback: {
          name: '',
          phone: '',
          email: '',
          message: ''
        },
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
    methods: {
      onPhoneChange(){
        this.feedback.phone = this.$refs.phoneInput.phoneFormatted;
      },
      submitFeedback(){
        if (this.already){
          this.$bvToast.toast('Вы уже отправляли заявку', {
            title: 'Ошибка',
            variant: 'danger',
            solid: true
          });
        }else{
          let errors = this.$assets.validationFeedback(this.feedback);
          if (errors.length === 0){
            this.already = true;
            let message = `на сайте sochirentacar.ru заполнена форма обратной связи:\nимя - ${this.feedback.name}\ne-mail - ${this.feedback.phone}\nтелефон - ${this.feedback.email}\nсообщение - ${this.feedback.message}\n`;
            let bodyFormData = new FormData();
            bodyFormData.set('station', this.$config.station);
            bodyFormData.set('type', 'feedback');
            bodyFormData.set('row_data', JSON.stringify({
              name: this.feedback.name,
              phone: this.feedback.email,
              email: this.feedback.phone,
              comment  : this.feedback.message,
            }));
            this.$axios.post('https://booking.autopilot.rent/mail_complite.php', bodyFormData, {headers: {}}).then(res => {
              this.$axios.post("sendMessageToChanel", {message})
                .then((res)=>{
                  ym(33072038,'reachGoal','zakaz-kontakt');
                  this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                    title: 'Заявка отправлена',
                    variant: 'success',
                    solid: true
                  });
                }).catch((err)=>{console.error(err)})
            }).catch(err => console.error(err));
          }else{
            errors.map(el => {
              this.$bvToast.toast(el, {
                title: 'Ошибка',
                variant: 'danger',
                solid: true
              });
            })
          }
        }
      }
    }
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
