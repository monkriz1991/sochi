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
    header.pt-2
      div.container
        b-navbar(toggleable="lg")
          b-navbar-brand(:to="{name: $assets.prefix('index', $i18n.locale)}")
            img(:src="logo" fluid alt="Sochi rent a car" height="45")

          b-navbar-toggle(target="nav-collapse")
          b-collapse(is-nav ref="navbarnav")#nav-collapse
            b-navbar-nav(class="ml-auto")
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('about', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('m1') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('conditions', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('m3') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('rent', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('m38') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('prices', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('m5') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('about-discounts', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('m4') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('long_term_rental', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('long_term_rental') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('service', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('s8') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('payment', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('op') }}"
              b-nav-item.d-sm-flex.d-md-none(:to="{name: $assets.prefix('contacts', $i18n.locale)}").text-uppercase.pt-1.bold-text="{{ $t('m6') }}"
              b-nav-item.d-sm-flex.d-md-none(role="button" v-b-modal.callback).text-uppercase.pt-1.bold-text="{{ $t('callback') }}"
              b-nav-item.d-sm-flex.d-md-none
                hr.my-1.
              b-nav-item.d-sm-flex.d-md-none(href="https://krasnodarrentacar.ru/" rel="nofollow").text-uppercase.pt-1.bold-text="{{ $t('m20') }}"
              b-nav-item.d-sm-flex.d-md-none(href="https://crimearentacar.su/" rel="nofollow").text-uppercase.pt-1.bold-text="{{ $t('m9') }}"
              b-nav-item.d-sm-flex.d-md-none(href="https://vladivostokrentacar.ru/" rel="nofollow").text-uppercase.pt-1.bold-text="{{ $t('m7') }}"
              b-nav-item.d-sm-flex.d-md-none(href="https://spbrentacar.ru/" rel="nofollow").text-uppercase.pt-1.bold-text="{{ $t('m8') }}"
              b-nav-item.d-sm-flex.d-md-none(href="https://ekaterinburgrentacar.ru/" rel="nofollow").text-uppercase.pt-1.bold-text="{{ $t('m16') }}"
              b-nav-item.d-sm-flex.d-md-none(href="https://chelyabinskrentacar.ru/" rel="nofollow").text-uppercase.pt-1.bold-text="{{ $t('m17') }}"
              b-nav-item.d-sm-flex.d-md-none(href="https://miami-rent-a-car.com/" rel="nofollow").text-uppercase.pt-1.bold-text="{{ $t('m19') }}"
              b-nav-item.d-sm-flex.d-md-none
                hr.my-1
              b-nav-item.cursot-default
                div.address
                  p(v-html="$t(settings.address+'_22')")
              b-nav-item
                div.phone
                  a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`" @click="ym(33072038,'reachGoal','pressphone')").mgo-number="{{settings.main_phone}}"
              b-nav-item
                div.global
                  p
                    nuxt-link(v-bind:class="{active: $i18n.locale === 'en'}" :to="switchLocalePath('en')")="ENG"
                    |/
                    nuxt-link(v-bind:class="{active: $i18n.locale === 'ru'}" :to="switchLocalePath('ru')")="РУС"
    div#menu.pt-1.d-none.d-sm-none.d-md-none.d-lg-block
      div.container
        div.menu-line
          div
            b-dropdown(offset="-20").modern_dropdown
              b-dropdown-item(:to="{name: $assets.prefix('about', $i18n.locale)}").text-uppercase.py-1="{{ $t('m1') }}"
              b-dropdown-item(:to="{name: $assets.prefix('long_term_rental', $i18n.locale)}").text-uppercase.py-1="{{ $t('long_term_rental') }}"
              b-dropdown-item(:to="{name: $assets.prefix('news', $i18n.locale)}").text-uppercase.py-1="{{ $t('m2') }}"
              b-dropdown-item(:to="{name: $assets.prefix('conditions', $i18n.locale)}").text-uppercase.py-1="{{ $t('m3') }}"
              b-dropdown-item(:to="{name: $assets.prefix('contacts', $i18n.locale)}").text-uppercase.py-1="{{ $t('m6') }}"
              b-dropdown-item(:to="{name: $assets.prefix('about-discounts', $i18n.locale)}").text-uppercase.py-1="{{ $t('m4') }}"
              b-dropdown-item(:to="{name: $assets.prefix('prices', $i18n.locale)}").text-uppercase.py-1="{{ $t('m5') }}"
              b-dropdown-item(role="button" v-b-modal.callback).text-uppercase.py-1="{{ $t('callback') }}"
              b-dropdown-item(:to="{name: $assets.prefix('payment', $i18n.locale)}").text-uppercase.py-1="{{ $t('op') }}"
          div.d-flex.justify-content-center.align-center.py-1
            nuxt-link(:to="{name: $assets.prefix('booking-online', $i18n.locale)}").text-uppercase.tmenu.py-1="{{ $t('ltr1') }}"
            nuxt-link(:to="{name: $assets.prefix('conditions', $i18n.locale)}").text-uppercase.tmenu.py-1="{{ $t('m3') }}"
            b-dropdown(:text="$t('m39')").modern_dropdown_new.d-inline.py-1
              b-dropdown-item(href="https://krasnodarrentacar.ru/" rel="nofollow").text-uppercase.py-1="{{ $t('m20') }}"
              b-dropdown-item(href="https://crimearentacar.su/" rel="nofollow").text-uppercase.py-1="{{ $t('m9') }}"
              b-dropdown-item(href="https://vladivostokrentacar.ru/" rel="nofollow").text-uppercase.py-1="{{ $t('m7') }}"
              b-dropdown-item(href="https://spbrentacar.ru/" rel="nofollow").text-uppercase.py-1="{{ $t('m8') }}"
              b-dropdown-item(href="https://ekaterinburgrentacar.ru/" rel="nofollow").text-uppercase.py-1="{{ $t('m16') }}"
              b-dropdown-item(href="https://chelyabinskrentacar.ru/" rel="nofollow").text-uppercase.py-1="{{ $t('m17') }}"
              b-dropdown-item(href="https://miami-rent-a-car.com/" rel="nofollow").text-uppercase.py-1="{{ $t('m19') }}"
            nuxt-link(:to="{name: $assets.prefix('rent', $i18n.locale)}").text-uppercase.tmenu.py-1="{{ $t('m38') }}"
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
  name: "HComponentRestyle",
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
            .then(()=>{
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
#menu
  background-color: #E8EEF2
  margin: 0
  padding: 0 0 10px 0
  @media screen and (max-width: 480px)
    display: none
  .menu-line
    display: flex
    justify-content: space-between
    padding: 2px 20px 2px 20px
    background: $primary
    width: 100%
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
header
  background-color: #E8EEF2
  width: 100%
.address
  display: flex
  justify-content: flex-start
  align-items: center
  p
    margin: 0
    color: #222222
    text-decoration: none
    transition: 0.3s
    font-size: 12px
    line-height: 24px
    &:hover
      color: #222222
      transition: 0.3s
  &::before
    content: ""
    display: block
    margin-right: 5px
    width: 20px
    height: 20px
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M256,0C149.703,0,63.224,86.479,63.224,192.776c0,103.482,177.549,307.132,185.107,315.75 c1.937,2.208,4.731,3.474,7.669,3.474s5.732-1.266,7.669-3.474c7.558-8.618,185.107-212.268,185.107-315.75 C448.776,86.479,362.297,0,256,0z M255.999,486.132c-14.85-17.528-49.056-58.896-82.955-106.913 c-58.501-82.86-89.422-147.332-89.422-186.442c0-95.049,77.328-172.378,172.378-172.378s172.378,77.328,172.377,172.378 c0,39.086-30.886,103.509-89.32,186.301C305.146,427.122,270.869,468.577,255.999,486.132z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M256,52.016c-75.36,0-136.669,61.309-136.669,136.669S180.64,325.355,256,325.355s136.669-61.309,136.669-136.669 S331.36,52.016,256,52.016z M256,304.956c-64.112,0-116.271-52.16-116.271-116.271S191.888,72.414,256,72.414 s116.271,52.16,116.271,116.271S320.112,304.956,256,304.956z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M260.088,437.45l-8.547-11.161c-3.425-4.471-9.826-5.32-14.299-1.896c-4.471,3.426-5.321,9.827-1.896,14.299l8.547,11.161 c2.008,2.622,5.039,3.999,8.105,3.999c2.163,0,4.344-0.686,6.194-2.103C262.663,448.323,263.513,441.922,260.088,437.45z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M224.821,391.399l-25.647-33.489c-3.426-4.472-9.827-5.319-14.299-1.896c-4.472,3.426-5.321,9.827-1.896,14.299 l25.647,33.489c2.008,2.622,5.039,3.999,8.105,3.999c2.163,0,4.343-0.686,6.194-2.103 C227.397,402.272,228.246,395.871,224.821,391.399z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A")
.phone
  display: flex
  justify-content: flex-start
  align-items: center
  a
    color: $primary
    font-weight: bold
    text-decoration: none
    transition: 0.3s
    &:hover
      color: #222222
      transition: 0.3s
  &::before
    content: ""
    display: block
    margin-right: 5px
    width: 20px
    height: 20px
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 191.232 191.232' style='enable-background:new 0 0 191.232 191.232;' xml:space='preserve'%3E%3Cpath d='M37.884,191.232c-2.385,0-3.82-0.153-4.188-0.198c-0.627-0.072-1.236-0.34-1.726-0.807c-0.021-0.02-0.042-0.041-0.062-0.061 L17.36,175.619c-5.505-5.504-5.505-14.461,0-19.965l27.606-27.606c2.667-2.667,6.211-4.135,9.982-4.135s7.316,1.469,9.982,4.135 l13.635,13.635c4.235-0.31,20.305-2.727,38.892-21.313c18.718-18.718,20.65-34.241,20.817-38.311L124.599,68.38 c-5.505-5.504-5.505-14.46,0-19.965l27.606-27.606c5.504-5.505,14.461-5.505,19.965,0l14.547,14.547 c0.02,0.019,0.038,0.038,0.056,0.057c0.001,0.001,0,0.001,0.004,0.004c0.459,0.481,0.727,1.077,0.805,1.692 c0.318,2.358,5.36,46.423-50.8,102.583C89.531,186.943,50.487,191.232,37.884,191.232z M78.636,147.697l-37.348,37.348 c14.354-0.984,49.642-7.987,91.251-49.596c41.626-41.627,48.304-76.612,49.137-90.792l-37.398,37.398 c-0.16,5.014-2.288,22.267-22.577,42.556C101.322,144.991,83.639,147.432,78.636,147.697z M54.949,129.916 c-2.079,0-4.158,0.791-5.74,2.374l-27.606,27.606c-1.533,1.533-2.377,3.572-2.377,5.74c0,2.168,0.844,4.207,2.377,5.741 l12.435,12.435l39.086-39.086L60.689,132.29C59.107,130.707,57.028,129.916,54.949,129.916z M162.188,22.673 c-2.168,0-4.207,0.844-5.74,2.377l-27.606,27.606c-1.533,1.534-2.377,3.572-2.377,5.74s0.844,4.207,2.377,5.74l12.435,12.435 l39.087-39.086l-12.435-12.435C166.395,23.518,164.356,22.673,162.188,22.673z M50.667,96.167c-1.657,0-3-1.343-3-3 c0-26.966,21.938-48.904,48.904-48.904c1.657,0,3,1.343,3,3s-1.343,3-3,3c-23.657,0-42.904,19.247-42.904,42.904 C53.667,94.824,52.323,96.167,50.667,96.167z M28.266,96.167c-1.657,0-3-1.343-3-3c0-39.317,31.987-71.305,71.305-71.305 c1.657,0,3,1.343,3,3s-1.343,3-3,3c-36.009,0-65.305,29.295-65.305,65.305C31.266,94.824,29.923,96.167,28.266,96.167z M6.403,96.167c-1.657,0-3-1.343-3-3C3.403,41.795,45.198,0,96.571,0c1.657,0,3,1.343,3,3s-1.343,3-3,3 C48.506,6,9.403,45.103,9.403,93.167C9.403,94.824,8.06,96.167,6.403,96.167z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A")
.bold-text
  font-weight: bold
.tmenu
  color: #ffffff
  display: inline-block
  font-weight: bold
  padding: 0 0 0 15px
.global
  display: flex
  justify-content: flex-start
  align-items: center
  p
    margin: 0
    a
      color: $primary
      font-weight: bold
      text-decoration: none
      transition: 0.3s
      &.active
        color: #222222
        transition: 0.3s
      &:hover
        color: #222222
        transition: 0.3s
  &::before
    content: ""
    display: block
    margin-right: 5px
    width: 20px
    height: 20px
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 489 489' xmlns:xlink='http://www.w3.org/1999/xlink' enable-background='new 0 0 489 489'%3E%3Cg%3E%3Cpath d='m244.5,0c-135.2,0-244.5,109.3-244.5,244.5s109.3,244.5 244.5,244.5 244.5-109.3 244.5-244.5-109.3-244.5-244.5-244.5zm-73.8,33.3c-12.9,18.1-23.9,37.2-33.1,57.2h-55.5c24.2-25.6 54.5-45.4 88.6-57.2zm-106.1,78h64.2c-15.1,38.9-23.4,80.4-24.6,122.8h-83.1c2.1-45.9 17.9-88.2 43.5-122.8zm0,266.4c-25.6-34.6-41.4-76.9-43.5-122.8h83.1c1.2,42.4 9.8,83.9 25,122.8h-64.6zm17.5,20.8h56c9.3,20 20.3,39.3 33,57.4-34.2-11.8-64.7-31.7-89-57.4zm152,69.5c-10.4-0.5-20.7-1.7-30.7-3.5-16.6-20.5-30.8-42.6-42.3-65.9h73v69.4zm-0-90.3h-82.5c-16.1-38.8-25.3-80.3-26.6-122.8h109.1v122.8zm0-143.6h-109.1c1.3-42.4 10.4-84 26.4-122.8h82.7v122.8zm.1-143.6h-0.1-73.2c11.6-23.5 25.8-45.6 42.5-65.9 10-1.9 20.3-3 30.8-3.5v69.4zm190.2,20.8c25.6,34.6 41.5,76.8 43.5,122.8h-83.1c-1.2-42.4-9.8-83.9-25-122.8h64.6zm-17.5-20.8h-56c-9.3-20-20.3-39.3-33.1-57.4 34.3,11.8 64.8,31.7 89.1,57.4zm-152-69.4c10.4,0.5 20.7,1.7 30.7,3.5 16.6,20.5 30.8,42.6 42.3,65.9h-73v-69.4zm-0,90.2h82.5c16.1,38.7 25.3,80.3 26.6,122.8h-109.1v-122.8zm0,143.6h109.1c-1.3,42.4-10.4,84-26.4,122.8h-82.7l-0-122.8zm-.1,213v-69.4h0.1 73.2c-11.6,23.5-25.8,45.6-42.5,65.9-10,1.9-20.3,3-30.8,3.5zm63-12c12.7-18.1 23.7-37.4 32.9-57.4h56.3c-24.4,25.7-54.9,45.6-89.2,57.4zm41.7-78.2c15-38.9 23.5-80.4 25.2-122.8h83.3c-2.1,45.9-17.9,88.2-43.5,122.8h-65z'/%3E%3C/g%3E%3C/svg%3E%0A")
</style>
