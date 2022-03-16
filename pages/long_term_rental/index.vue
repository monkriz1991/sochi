<template lang="pug">
  section#conditions
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{$t('faq12')}}"
        div
          ltr-text
        div.conditions
          div.my-5
            b-row
              b-col(sm="12" md="6" lg="3" v-for="(ci, cidx) in conditions[$i18n.locale]" :key="cidx")
                div.condition
                  div(v-bind:class="ci.class_name").ico
                  div.text
                    h6="{{ci.title}}"
                    p.ci-text="{{ci.text}}"
        p
          |{{$t('bc8')}}
          nuxt-link(:to="{name: $assets.prefix('about-faq', $i18n.locale)}")=" {{$t('bc9')}} "
          |{{$t('bc10')}}
        h3="{{$t('bc7')}}"
        p.mb-1
          strong.text-uppercase="- {{$t('bc5')}} "
          |{{$t('bc6')}}
        p.mb-1
          strong.text-uppercase="- {{$t('bc3')}} "
          |{{$t('bc4')}}
        div.clearfix
        div(v-if="loaded").py-3
          h2.py-2="{{$t('faq13')}}"
          div.filter
            b-row
              b-col(sm="12" md="6" lg="4")
                b-form-select(v-model="filter" :options="filterOptions")
              b-col(sm="12" md="6" lg="4")
                b-form-select(v-model="filter_price" :options="filterPrice")
              b-col(sm="12" md="12" lg="4")
                b-input(v-model="filter_name" :placeholder="$t('aoc13')")
          div(v-for="card in filteredList" :key="card.guid").row_card
            div.badge(v-html="`${$t('ltr8')} ${card.period_price}₽/${$t('ltr7')}`")
            b-row
              b-col(sm="12" md="6" lg="4")
                div(v-bind:style="{backgroundImage: `url(${$assets.prepare_url_to_local(card.image, $config.environment, $config.local_url)})`}").preview
              b-col(sm="12" md="6" lg="8")
                div.info-block.p-2
                  h3="{{card.name}} {{card.year}}"
                  div.item-content
                    div.info_lap
                      p.l="{{$t('aoc2')}}"
                      p.r="{{card.year}}"
                    div.info_lap
                      p.l="{{$t('aoc7')}}"
                      p.r="{{$t(card.gear)}}"
                    div.info_lap
                      p.l="{{$t('aoc8')}}"
                      p.r="{{$t(card.fuel)}}"
                    div.info_lap
                      p.l="{{$t('aoc9')}}"
                      p.r(v-html="`${card.engine}${$t('p1')}.`")
                    div.info_lap
                      p.l="{{$t('aoc10')}}"
                      p.r="{{$t(card.color)}}"
                    div.info_lap
                      p.l="{{$t('aoc12')}}"
                      p.r="{{$t(card.meliage)}}{{$t('p3')}}"
                  div.devider
                  div.actions
                    b-row
                      b-col(sm="12" md="12" lg="8").limits
                        p.heading="{{$t('ltr6')}}"
                        p.prices
                          span.old_price="{{card.max_price/card.period}}₽/{{$t('cwod7')}}"
                          span.new_price="{{card.daily_price}}₽/{{$t('cwod7')}}"
                      b-col(sm="12" md="12" lg="4").py-1
                        nuxt-link(:to="{name: $assets.prefix('long_term_rental-gosnomer', $i18n.locale), params: {gosnomer: card.guid, title: card.name} }").btn.main.w-100="{{$t('ltr5')}}"
                        b-button(@click="showModal(card.guid)").btn.cancel.w-100="{{$t('ltr4')}}"
                  b-modal(:id="card.guid" hide-footer hide-header)
                    h5.text-center="{{$t('ltr3')}} - {{card.name}}"
                    b-form-group.mb-0(:description="$t('cb2')")
                      b-form-input(v-model="name" :placeholder="$t('cb3')")#callback_name
                    b-form-group.mb-0( :description="$t('cb4')")
                      vue-phone-number-input(@input="onPhoneChange(`phoneInput_${card.guid}`)" :ref="`phoneInput_${card.guid}`" v-model="ph" id="callback_phone" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
                    b-row
                      b-col(sm="12" md="6" lg="6")
                        a(role="button" @click="hideModal(card.guid)").btn.cancel.w-100="{{$t('ltr2')}}"
                      b-col(sm="12" md="6" lg="6")
                        a(role="button" @click="submitModal(card.name, card.guid)").btn.main.w-100="{{$t('ltr1')}}"
        div(v-else)
          loader
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import ltrText from "../../components/snippets/ltrText";

  export default {
    head () {
      return {
        title: 'Долгосрочная аренда авто в Сочи',
        meta: [
          {hid: 'description', name: 'description', content: 'Долгосрочная аренда авто в Сочи: *✮* без ограничения пробега *✮* скидки до 30% *✮* 350 машин в автопарке *✮* Без залога*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    components: {
      devider,
      BreadCrumbs,
      loader,
      ltrText
    },
    data(){
      return {
        name: '',
        ph: '',
        phone: '',
        filter_name: '',
        loaded: false,
        lt_cards:[],
        filterOptions: [
          {value: 'all', text: this.$t('filters1')},
          {value: 'Комфорт класс', text: this.$t('filters2')},
          {value: 'Кроссоверы', text: this.$t('filters3')},
          {value: 'Минивены', text: this.$t('filters4')},
          {value: 'Кабриолет', text: this.$t('filters5')},
          {value: 'Бизнес', text: this.$t('filters6')},
          {value: 'cargo', text: this.$t('filters7')},
        ],
        filterPrice: [
          {value: 'price_asc', text: this.$t('filters8')},
          {value: 'price_desc', text: this.$t('filters9')},
        ],
        filter: 'all',
        filter_price: 'price_asc',
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs15'),
            active: true
          }
        ],
        conditions: {
          en: [
            {
              title: 'Driver age',
              text: 'from 21 y.o',
              class_name: 'cond_1'
            },
            {
              title: 'Experience',
              text: 'more then 3 years',
              class_name: 'cond_2'
            },
            {
              title: 'Pledge for car',
              text: 'from 5000₽',
              class_name: 'cond_3'
            },
            {
              title: 'Meliage/OverMeliage',
              text: '3000km / from 10₽ - 1km',
              class_name: 'cond_4'
            },
          ],
          ru: [
            {
              title: 'Возраст водителя',
              text: 'с 21 лет',
              class_name: 'cond_1'
            },
            {
              title: 'Стаж',
              text: 'не менее 3х лет',
              class_name: 'cond_2'
            },
            {
              title: 'Депозит',
              text: 'от 5000₽',
              class_name: 'cond_3'
            },
            {
              title: 'Пробег/Перепробег',
              text: '3000 км / от 10₽ - 1 км',
              class_name: 'cond_4'
            },
          ]
        },
      }
    },
    computed:{
      filteredList(){
        if (this.filter_name.trim() === ''){
          return this.$filters.prepareLT(this.lt_cards, this.filter_price, this.filter);
        } else {
          return this.$filters.prepareLT(this.lt_cards, this.filter_price, this.filter).filter((vehicle) => {
            return (vehicle.name + ' ' + vehicle.year).toLowerCase().includes(this.filter_name.toLowerCase().trim())
          });
        }
      },
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
    },
    methods:{
      showModal(id){
        this.$bvModal.show(id)
      },
      submitModal(carName, carId){
        if (this.phone !== '' && this.name !== '' && this.phone !== undefined){
          let message = `БЫСТРАЯ ЗАЯВКА НА ДОЛГОСРОЧНУЮ АРЕНДУ СОЧИ\nПользователь ${this.name} сделал заявку на автомобиль ${carName} номер телефона: ${this.phone}`;
          this.$axios.post("sendMessageToChanel", {message: message, station:this.$config.station})
            .then((res)=>{
              this.hideModal(carId)
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
      },
      onPhoneChange(id){
        this.phone = this.$refs[id][0]['phoneFormatted']
      },
      hideModal(id){
        this.$bvModal.hide(id)
      },
      fetchLTRPropose(){
        let data = {
          "date_from": this.$assets.genNowSpec(1),
          "date_to": this.$assets.genNowSpec(31),
          "station": this.$config.station,
          "class": 5
        }
        this.$axios.post('/sun/ltr/list', data)
          .then(result => {
            if (result.data.status === 'success'){
              this.lt_cards = result.data.data
              this.loaded = true;
            }
          })
      },
      genNewPrice(raw){
        return parseInt(raw/2)
      }
    },
    created() {
      this.fetchLTRPropose()
    }

  }
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables"
  .row_card
    border: 1px solid #f8f8f8
    border-radius: 25px
    overflow: hidden
    margin: 10px 0
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.4)
    position: relative
    .badge
      position: absolute
      background: #ff6a28
      color: #ffffff
      width: 140px
      height: 50px
      z-index: 2
      border-radius: 50px
      display: flex
      justify-content: center
      align-items: center
      box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.4)
    .preview
      min-height: 325px
      background-position: center
      background-size: cover
      background-repeat: no-repeat
    .info-block
      display: flex
      flex-direction: column
      justify-content: space-between
      min-height: 300px
      .devider
        margin-top: 0.5rem
        margin-bottom: 0.5rem
        height: 1px
        border-top: 1px solid $primary
      .actions
        .limits
          p
            margin: 0
            &.heading
              text-align: center
              font-family: 'Roboto Condensed', sans-serif
              font-size: 20px
            &.prices
              display: block
              position: relative
              margin: 5px auto
              span
                display: block
                margin: 0 auto
                text-align: center
                font-size: 18px
                font-weight: bold
                line-height: 1
                &.new_price
                &.old_price
                  font-size: 14px
                  color: #929292
                  text-decoration: line-through
                  text-decoration-color: red
      .item-content
        .info_lap
          margin-bottom: 2px
          &:after
            content: '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'
            display: block
            white-space: nowrap
            overflow: hidden
          .l
            font-weight: bold
            float: left
            padding-right: 5px
            margin: 0
          .r
            float: right
            padding-left: 5px
            margin: 0
  .propose
    .propose-item
      display: flex
      flex-direction: column
      align-items: center
      margin: 10px
      border: 1px solid $primary
      -webkit-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      border-radius: 5px
      h3
        display: inline-block
        padding-bottom: 5px
        border-bottom: 5px solid $primary
      p.desc
        min-height: 70px
      ul
        list-style: none
        padding: 0px
        width: 100%
        li
          display: flex
          flex-direction: row
          justify-content: flex-start
          align-items: center
          font-family: 'Roboto Condensed', sans-serif
          border-top: 1px solid rgba(128,128,128, 0.1)
          padding: 7px 10px
          -webkit-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          -moz-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          min-height: 70px
          &:before
            content: '\2713'
            color: $primary
            margin-right: 10px
            font-size: 24px
  .condition
    display: flex
    flex-direction: row
    align-items: center
    padding: 10px
    margin: 10px
    background-color: #fafafa
    background-color: rgba(255, 255, 255, 0.7)
    border: 1px solid rgba(205, 205, 205, 0.5)
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.4)
    border-radius: 5px
    .text
      padding: 5px 10px
      h6
        margin: 0
        display: inline
        border-bottom: 1px solid $primary_hover
      p
        margin: 0
    .ico
      position: relative
      display: flex
      justify-content: center
      align-items: center
      &:after
        font-family: 'Icons', monospace
        width: 40px
        height: 40px
        font-size: 30px
        display: flex
        justify-content: center
        align-items: center
        color: $primary
      &.cond_1
        &:after
          content: "\E81A"
      &.cond_2
        &:after
          content: "\E81B"
      &.cond_3
        &:after
          content: "\E80F"
      &.cond_4
        &:after
          content: "\E815"
</style>
