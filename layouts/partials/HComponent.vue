<template lang="pug">
    div#header
      div.d-flex.d-sm-flex.d-md-flex.d-lg-none.phone-wrapper-beholder
      div.d-flex.d-sm-flex.d-md-flex.d-lg-none.phone-wrapper
        div.container
          a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`" @click="$assets.reachGoal('pressphone')").mgo-number="{{settings.main_phone}}"
      header.pt-3
        div.container
          div.d-none.d-sm-none.d-md-none.d-lg-block
            b-row
              b-col(sm="6" md="6" lg="4" order="2" order-sm="2" order-md="2" order-lg="1")
                div.infobox.py-1.infobox.py-1.d-flex.justify-content-start.flex-column.align-content-start.align-items-center.align-items-sm-center.align-items-md-start.align-items-lg-start
                  p.notes="{{ $t('ww') }} {{$t(settings.time)}}"
                  p.main_phone
                    a.mgo-number(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`")="{{settings.main_phone}}"
                  nuxt-link(:to="{name: $assets.prefix('long_term_rental', $i18n.locale)}").btn.main.slim="{{ $t('long_term_rental') }}"
              b-col(sm="12" md="12" lg="4" order="1" order-sm="1" order-md="1" order-lg="2").d-flex.justify-content-center.align-content-center
                div.logo
                  nuxt-link(:to="{name: $assets.prefix('index', $i18n.locale)}")
                    img(:src="logo" fluid alt="Sochi rent a car").logo-main
              b-col(sm="6" md="6" lg="4" order="3" order-sm="3" order-md="3" order-lg="3")
                div.infobox.py-1.d-flex.justify-content-end.flex-column.align-content-end.align-items-center.align-items-sm-center.align-items-md-end.align-items-lg-end
                  a(role="button" v-b-modal.callback).btn.main.slim.icon-phone="{{ $t('callback') }}"
                  nuxt-link(:to="{name: $assets.prefix('payment', $i18n.locale)}").btn.main.slim.icon-credit-card="{{ $t('op') }}"
                  nuxt-link(v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')").btn.main.slim="English Version"
                  nuxt-link(v-if="$i18n.locale !== 'ru'" :to="switchLocalePath('ru')").btn.main.slim="Русская версия"
          b-navbar(toggleable="lg").p-0
            b-navbar-brand(href="#").d-flex.d-sm-flex.d-md-flex.d-lg-none
              nuxt-link(:to="{name: $assets.prefix('index', $i18n.locale)}")
                img(:src="logo" fluid alt="Sochi rent a car" height="55")
            b-navbar-toggle(target="nav-collapse")
            b-collapse(is-nav ref="navbarnav")#nav-collapse
              div.menu.mt-3
                div.menu-block
                  nuxt-link(:to="{name: $assets.prefix('about', $i18n.locale)}").menu-item="{{ $t('m1') }}"
                  nuxt-link(:to="{name: $assets.prefix('news', $i18n.locale)}").menu-item="{{ $t('m2') }}"
                  nuxt-link(:to="{name: $assets.prefix('conditions', $i18n.locale)}").menu-item="{{ $t('m3') }}"
                  nuxt-link(:to="{name: $assets.prefix('about-discounts', $i18n.locale)}").menu-item="{{ $t('m4') }}"
                  nuxt-link(:to="{name: $assets.prefix('prices', $i18n.locale)}").menu-item="{{ $t('m5') }}"
                  nuxt-link(:to="{name: $assets.prefix('contacts', $i18n.locale)}").menu-item="{{ $t('m6') }}"
                div.d-flex.d-sm-flex.d-md-flex.d-lg-none.flex-column
                  a(role="button" v-b-modal.callback).btn.main.icon-phone.w-100="{{ $t('callback') }}"
                  nuxt-link(:to="{name: $assets.prefix('payment', $i18n.locale)}").btn.main.icon-credit-card.w-100="{{ $t('op') }}"
                  nuxt-link(:to="{name: $assets.prefix('long_term_rental', $i18n.locale)}").btn.main.w-100="{{ $t('long_term_rental') }}"
                  nuxt-link(v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')").btn.main.w-100="English Version"
                  nuxt-link(v-if="$i18n.locale !== 'ru'" :to="switchLocalePath('ru')").btn.main.w-100="Русская версия"
                div.menu-block-cities
                  a(href="https://avtopilot.com/").menu-item="{{ $t('m7') }}"
                  a(href="https://spbrentacar.ru/").menu-item="{{ $t('m8') }}"
                  a(href="https://crimearentacar.su/").menu-item="{{ $t('m9') }}"
      b-modal(:title="$t('cb1')" hide-footer)#callback
        b-form-group.mb-0(:description="$t('cb2')")
          b-form-input(v-model="callback_form.name" :placeholder="$t('cb3')")#callback_name
        b-form-group.mb-0( :description="$t('cb4')")
          vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" id="callback_phone" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
        b-row
          b-col(sm="12" md="6" lg="6")
            a(role="button" @click="hideModal").btn.cancel.w-100="{{$t('cb5')}}"
          b-col(sm="12" md="6" lg="6")
            a(role="button" @click="submitModal").btn.main.w-100="{{$t('cb6')}}"
</template>

<script>
  export default {
    name: "HComponent",
    data(){
      return {
        ph: "",
        logo: require('../../assets/images/sochi_logo.png'),
        callback_form: {
          phone: '',
          name: '',
        },
        lv: require('../../assets/images/victory_logo.svg'),
        lvm: require('../../assets/images/victory_logo_m.svg'),
      }
    },
    watch: {
      '$route' () {
        if (this.$refs.navbarnav.show){
          this.$root.$emit('bv::toggle::collapse', 'nav-collapse')
        }
      }
    },
    computed: {
      settings(){
        let settings = this.$parent.set_data
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
      }
    },
    methods: {
      onPhoneChange(){
        this.callback_form.phone = this.$refs.phoneInput.phoneFormatted;
      },
      hideModal(){
        this.$bvModal.hide('callback')
      },
      submitModal(){
        if (this.callback_form.phone !== '' && this.callback_form.name !== '' && this.callback_form.phone !== undefined){
          let message = `на сайте sochirentacar.ru Пользователь ${this.callback_form.name} заказал обратный звонок на номер телефона: ${this.callback_form.phone}`;
          let bodyFormData = new FormData();
          bodyFormData.set('station', this.$config.station);
          bodyFormData.set('type', 'callback');
          bodyFormData.set('row_data', JSON.stringify({name: this.callback_form.name, phone: this.callback_form.phone}));
          this.$axios.post('https://booking.autopilot.rent/mail_complite.php', bodyFormData, {headers: {}}).catch(err => console.error(err));
          this.$axios.post("sendMessageToChanel", {message})
            .then((res)=>{
              ym(33072038,'reachGoal','zakaz-zvonka')
              this.hideModal();
              this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                title: 'Заявка отправлена',
                variant: 'success',
                solid: true
              });
            }).catch((err)=>{console.error(err)})
        }else{
          this.$bvToast.toast('Форма заполнена с ошибками', {
            title: 'Ошибка',
            variant: 'danger',
            solid: true
          });
        }
      }
    },
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables"
  .logo-main
    width: 375px
    height: auto
  .phone-wrapper-beholder
    height: 25px
  .phone-wrapper
    background: $primary
    position: fixed
    top: 0
    width: 100%
    left: 0
    z-index: 999
    a
      color: #ffffff
      display: block
      text-align: center
  header
    background-color: #E8EEF2
    min-height: 100px
    .notes
      color: #7f7f7f
      font-size: 12px
      line-height: 16px
      margin: 0
    .main_phone
      font-size: 26px
      line-height: 1.2
      color: #000000
      margin: 0
    .btn.main
      width: 200px
  .menu
    width: 100%
    display: block
    .menu-block
      display: flex
      flex-wrap: wrap
      flex-direction: row
      justify-content: stretch
      a
        display: block
        width: calc(100%/6)
        text-align: center
        @media screen and (max-width: 991px)
          width: 100%
    .menu-block-cities
      display: flex
      flex-wrap: wrap
      flex-direction: row
      justify-content: stretch
      margin-top: 10px
      a
        display: block
        width: calc(100%/3)
        text-align: center
        border-right: 2px solid #E8EEF2
        &:last-child
          border-right: 0
        @media screen and (max-width: 991px)
          width: 100%
          border-right: 0
  .navbar-collapse.collapse.show
    .menu
      .menu-block
        a
          width: 100%
      .menu-block-cities
        a
          width: 100%

</style>
