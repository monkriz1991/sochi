<template lang="pug">
    div#header
      div.d-flex.d-sm-flex.d-md-flex.d-lg-none.phone-wrapper
        div.container
          a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`" @click="$assets.reachGoal('pressphone')").mgo-number="{{settings.main_phone}}"
      header.pt-3
        div.container
          div.d-none.d-sm-none.d-md-none.d-lg-block
            b-row
              b-col(sm="6" md="6" lg="4" order="2" order-sm="2" order-md="2" order-lg="1")
                div.infobox.py-1.infobox.py-1.d-flex.justify-content-start.flex-column.align-content-start.align-items-center.align-items-sm-center.align-items-md-start.align-items-lg-start
                  p.notes="Мы работаем {{settings.time}}"
                  p.main_phone
                    a.mgo-number(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`")="{{settings.main_phone}}"
                  nuxt-link(to="/long_term_rental/").btn.main="Долгосрочная аренда"
              b-col(sm="12" md="12" lg="4" order="1" order-sm="1" order-md="1" order-lg="2").d-flex.justify-content-center.align-content-center
                div.logo
                  nuxt-link(to="/")
                    img(:src="logo" fluid alt="Sochi rent a car")
              b-col(sm="6" md="6" lg="4" order="3" order-sm="3" order-md="3" order-lg="3")
                div.infobox.py-1.d-flex.justify-content-end.flex-column.align-content-end.align-items-center.align-items-sm-center.align-items-md-end.align-items-lg-end
                  a(role="button" v-b-modal.callback).btn.main.icon-phone="Заказать звонок"
                  nuxt-link(to="/payment/").btn.main.icon-credit-card="Онлайн оплата"
          b-navbar(toggleable="lg").p-0
            b-navbar-brand(href="#").d-flex.d-sm-flex.d-md-flex.d-lg-none
              nuxt-link(to="/")
                img(:src="logo" fluid alt="Sochi rent a car" height="55")
            b-navbar-toggle(target="nav-collapse")
            b-collapse(is-nav ref="navbarnav")#nav-collapse
              div.menu.mt-3
                div.menu-block
                  nuxt-link(to="/about/").menu-item="О компании"
                  nuxt-link(to="/news/").menu-item="Новости"
                  nuxt-link(to="/conditions/").menu-item="Условия аренды"
                  nuxt-link(to="/about/discounts/").menu-item="Акции"
                  nuxt-link(to="/prices/").menu-item="Цены"
                  nuxt-link(to="/contacts/").menu-item="Контакты"
                div.d-flex.d-sm-flex.d-md-flex.d-lg-none.flex-column
                  a(role="button" v-b-modal.callback).btn.main.icon-phone.w-100="Заказать звонок"
                  nuxt-link(to="/payment/").btn.main.icon-credit-card.w-100="Онлайн оплата"
                div.menu-block-cities
                  a(href="https://avtopilot.com/").menu-item="Владивосток"
                  a(href="https://spbrentacar.ru/").menu-item="Санкт-Петербург"
                  a(href="https://crimearentacar.su/").menu-item="Крым"
      b-modal(title="Обратный звонок" hide-footer)#callback
        b-form-group.mb-0(description="Введите Ваше имя")
          b-form-input(v-model="callback_form.name" placeholder="ФИО")#callback_name
        b-form-group.mb-0( description="Введите Ваш телефон")
          vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" id="callback_phone" :clearable="true" :translations="{countrySelectorLabel: 'Код страны',countrySelectorError: 'Неверный выбор',phoneNumberLabel: 'Номер телефона',example: 'Пример :'}")
        b-row
          b-col(sm="12" md="6" lg="6")
            a(role="button" @click="hideModal").btn.cancel.w-100="Отмена"
          b-col(sm="12" md="6" lg="6")
            a(role="button" @click="submitModal").btn.main.w-100="Заказать"
</template>

<script>
  export default {
    name: "HComponent",
    data(){
      return {
        ph: "",
        logo: require('../../assets/images/logo.png'),
        callback_form: {
          phone: '',
          name: '',
        }
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
              yaCounter33072038.reachGoal('zakaz-zvonka');
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
  .phone-wrapper
    background: $primary
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
