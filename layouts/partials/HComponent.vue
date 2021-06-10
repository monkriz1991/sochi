<template lang="pug">
    div#header
      div.d-flex.d-sm-flex.d-md-flex.d-lg-none.phone-wrapper-beholder
      div.d-flex.d-sm-flex.d-md-flex.d-lg-none.phone-wrapper
        div.container
          div.d-flex.justify-content-between.align-center.flex-row
            nuxt-link(:to="{name: $assets.prefix('contacts', $i18n.locale)}").nodec
              i.baloon-ico
            a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`" @click="ym(33072038,'reachGoal','pressphone')").mgo-number="{{settings.main_phone}}"
            nuxt-link(:to="{name: $assets.prefix('booking-online', $i18n.locale)}").nodec
              i.calendar-ico
      header.pt-4
        div.container
          div.d-none.d-sm-none.d-md-none.d-lg-block
            b-row
              b-col(sm="6" md="6" lg="4" order="2" order-sm="2" order-md="2" order-lg="1")
                div.infobox.py-1.infobox.py-1.d-flex.justify-content-start.flex-column.align-content-start.align-items-center.align-items-sm-center.align-items-md-start.align-items-lg-start
                  p.notes="{{ $t('ww') }} {{$t(settings.time)}}"
                  p.main_phone
                    a.mgo-number(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`")="{{settings.main_phone}}"
                  nuxt-link(:to="{name: $assets.prefix('long_term_rental', $i18n.locale)}").btn.main.slim="{{ $t('long_term_rental') }}"
                  nuxt-link(v-if="0" :to="{name: $assets.prefix('personal', $i18n.locale)}").btn.main.slim="{{ $t('m18') }}"
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
                  nuxt-link(:to="{name: $assets.prefix('rent', $i18n.locale)}").btn.main.w-100="{{ $t('s7') }}"
                  nuxt-link(:to="{name: $assets.prefix('service', $i18n.locale)}").btn.main.w-100="{{ $t('s8') }}"
                  nuxt-link(:to="{name: $assets.prefix('long_term_rental', $i18n.locale)}").btn.main.w-100="{{ $t('long_term_rental') }}"
                  nuxt-link(v-if="0" :to="{name: $assets.prefix('personal', $i18n.locale)}").btn.main.w-100="{{ $t('m18') }}"
                  nuxt-link(v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')").btn.main.w-100="English Version"
                  nuxt-link(v-if="$i18n.locale !== 'ru'" :to="switchLocalePath('ru')").btn.main.w-100="Русская версия"
                div.menu-block-cities_1
                  a(href="https://vladivostokrentacar.ru/" rel="nofollow").menu-item="{{ $t('m7') }}"
                  a(href="https://spbrentacar.ru/" rel="nofollow").menu-item="{{ $t('m8') }}"
                  a(href="https://crimearentacar.su/" rel="nofollow").menu-item="{{ $t('m9') }}"
                  a(href="https://ekaterinburgrentacar.ru/" rel="nofollow").menu-item="{{ $t('m16') }}"
                div.menu-block-cities_2
                  a(href="https://chelyabinskrentacar.ru/" rel="nofollow").menu-item="{{ $t('m17') }}"
                  a(href="https://miami-rent-a-car.com/" rel="nofollow").menu-item="{{ $t('m19') }}"
                  a(href="https://krasnodarrentacar.ru/" rel="nofollow").menu-item="{{ $t('m20') }}"
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
        callback_form: {
          phone: '',
          name: '',
        },
        lv: require('../../assets/images/victory_logo.svg'),
        lvm: require('../../assets/images/victory_logo_m.svg'),
        l_jpg: require('../../assets/images/sochi_logo.png'),
        l_webp: require('../../assets/images/sochi_logo.webp'),
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
      logo(){
        if(this.$browserDetect){
          if (this.$browserDetect.isSafari || this.$browserDetect.isIOS){
            return this.l_jpg;
          }else{
            return this.l_webp;
          }
        }else{
          return ''
        }
      },
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
          this.$axios.post("sendMessageToChanel", {message: message, station:this.$config.station})
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
  .calendar-ico
    display: inline-block
    width: 20px
    height: 20px
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='67.98px' height='75.862px' viewBox='9.171 9.275 67.98 75.862' xml:space='preserve'%3E%3Cpath fill='%23FFFFFF' d='M71.424,58.287c0-9.499,0-46.424,0-46.424h-2.565H16.802l-5.638,3.333v66.94h57.695v-5.972 h8.293C77.152,76.165,71.424,71.567,71.424,58.287z M67.63,48.26h-9.877V37.69h9.877V48.26z M43.458,25.495v10.57H32.414v-10.57 H43.458z M45.083,25.495h11.045v10.57H45.083V25.495z M20.596,25.495h10.192v10.57H20.596V25.495z M20.596,37.691h10.192V48.26 H20.596V37.691z M20.596,49.886h10.192v8.403c0,0.758,0.016,1.479,0.045,2.167H20.596V49.886z M32.414,58.289v-8.403h11.044v8.403 c0,0.758,0.016,1.479,0.045,2.167H32.46C32.43,59.771,32.414,59.051,32.414,58.289z M32.414,48.26V37.69h11.044V48.26H32.414z M45.083,37.691h11.045V48.26H45.083V37.691z M67.63,36.064h-9.877V25.495h9.877V36.064z M30.931,62.082 c0.429,5.374,1.755,8.489,3.077,10.289H23.405c-0.258-0.229-0.69-0.713-1.143-1.654c-0.683-1.42-1.482-4.045-1.637-8.635H30.931z M36.175,72.371c-1.275-1.172-3.09-3.932-3.614-10.289h11.04c0.429,5.374,1.756,8.489,3.077,10.289H36.175z M48.845,72.371 c-1.275-1.172-3.09-3.932-3.613-10.289h11.039c0.429,5.374,1.756,8.489,3.077,10.289H48.845z M45.13,60.456 c-0.029-0.686-0.047-1.405-0.047-2.167v-8.403h11.045v8.403c0,0.758,0.016,1.479,0.045,2.167H45.13z M57.753,58.289v-8.403h9.877 v8.401v1.628c0,0.183,0.002,0.361,0.004,0.541H57.8C57.77,59.771,57.753,59.051,57.753,58.289z M65.065,78.343H14.958V17.361 l1.844-1.09c0,10.225,0,35.37,0,44.187c0,14.636,5.728,15.708,5.728,15.708h42.537L65.065,78.343L65.065,78.343z M68.859,72.371 h-3.794h-3.55c-1.275-1.172-3.09-3.932-3.613-10.289h9.775c0.172,3.999,0.829,7.443,1.966,10.289H68.859z'/%3E%3C/svg%3E%0A")
    background-repeat: no-repeat
    background-size: contain
    background-position: center
  .baloon-ico
    display: block
    width: 20px
    height: 20px
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3Csvg id='Layer_1' style='enable-background:new 0 0 91 91;' version='1.1' viewBox='25 20 45 60' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath fill='%23fff' d='M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z'/%3E%3C/g%3E%3C/svg%3E")
    background-repeat: no-repeat
    background-size: contain
    background-position: center
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
    height: 40px
    justify-content: center
    align-items: center
    a
      color: #ffffff
      display: block
      text-align: center
      font-weight: bold
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
    .menu-block-cities_1
      display: flex
      flex-wrap: wrap
      flex-direction: row
      justify-content: stretch
      margin-top: 10px
      a
        display: block
        width: calc(100%/4)
        text-align: center
        border-right: 2px solid #E8EEF2
        border-top: 2px solid #E8EEF2
        &:last-child
          border-right: 0
        @media screen and (max-width: 991px)
          width: 100%
          border-right: 0
    .menu-block-cities_2
      display: flex
      flex-wrap: wrap
      flex-direction: row
      justify-content: stretch
      a
        display: block
        width: calc(100%/3)
        text-align: center
        border-right: 2px solid #E8EEF2
        border-top: 2px solid #E8EEF2
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
