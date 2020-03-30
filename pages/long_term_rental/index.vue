<template lang="pug">
  section#conditions
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{$t('faq12')}}"
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
              b-col(sm="12" md="6" lg="4" offset-lg="4")
                b-form-select(v-model="filter_price" :options="filterPrice")
          div(v-for="card in filteredList" :key="card.raw.id").row_card
            div.badge(v-html="`${$t('ltr8')} ${calcMonth(card.cd.stoimost)}₽/${$t('ltr7')}`")
            b-row
              b-col(sm="12" md="6" lg="4")
                div(v-bind:style="{backgroundImage: `url(${card.cd.car_image})`}").preview
              b-col(sm="12" md="6" lg="8")
                div.info-block.p-2
                  h3="{{card.cd.naimenovanie}} {{card.cd.godvypuska}}"
                  div.item-content
                    div.info_lap
                      p.l="{{$t('aoc2')}}"
                      p.r="{{card.cd.godvypuska}}"
                    div.info_lap
                      p.l="{{$t('aoc7')}}"
                      p.r="{{$t(card.cd.kpp)}}"
                    div.info_lap
                      p.l="{{$t('aoc8')}}"
                      p.r="{{$t(card.cd.toplivo)}}"
                    div.info_lap
                      p.l="{{$t('aoc9')}}"
                      p.r(v-html="`${card.cd.dvigatel}${$t('p1')}.`")
                    div.info_lap
                      p.l="{{$t('aoc10')}}"
                      p.r="{{$t(card.cd.cvet)}}"
                  div.devider
                  div.actions
                    b-row
                      b-col(sm="12" md="12" lg="8").limits
                        p.heading="{{$t('ltr6')}}"
                        p.prices
                          span.old_price="{{card.cd.stoimost}}₽/{{$t('cwod7')}}"
                          span.new_price="{{genNewPrice(card.cd.stoimost)}}₽/{{$t('cwod7')}}"
                      b-col(sm="12" md="12" lg="4").py-1
                        nuxt-link(:to="{name: $assets.prefix('long_term_rental-gosnomer', $i18n.locale), params: {gosnomer: card.cd['1cID']} }").btn.main.w-100="{{$t('ltr5')}}"
                        b-button(@click="showModal(card.cd['1cID'])").btn.cancel.w-100="{{$t('ltr4')}}"
                  b-modal(:id="card.cd['1cID']" hide-footer hide-header)
                    h5.text-center="$t('ltr3') - {{card.cd.naimenovanie}}"
                    b-form-group.mb-0(:description="$t('cb2')")
                      b-form-input(v-model="name" :placeholder="$t('cb3')")#callback_name
                    b-form-group.mb-0( :description="$t('cb4')")
                      vue-phone-number-input(@input="onPhoneChange(`phoneInput_${card.cd['1cID']}`)" :ref="`phoneInput_${card.cd['1cID']}`" v-model="ph" id="callback_phone" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
                    b-row
                      b-col(sm="12" md="6" lg="6")
                        a(role="button" @click="hideModal(card.cd['1cID'])").btn.cancel.w-100="{{$t('ltr2')}}"
                      b-col(sm="12" md="6" lg="6")
                        a(role="button" @click="submitModal(card.cd.naimenovanie, card.cd['1cID'])").btn.main.w-100="{{$t('ltr1')}}"
        div(v-else)
          loader
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
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
      loader
    },
    data(){
      return {
        name: '',
        ph: '',
        phone: '',
        loaded: false,
        lt_cards:[],
        filterOptions: [
          {value: 'all', text: "Все классы"},
          {value: 'Комфорт класс', text: "Комфорт Класс"},
          {value: 'Кроссоверы', text: "Кроссоверы"},
          {value: 'Минивены', text: "Минивены"},
          {value: 'Кабриолет', text: "Кабриолеты"},
          {value: 'Бизнес', text: "Бизнесс Класс"},
          {value: 'cargo', text: "Грузовые"},
        ],
        filterPrice: [
          {value: 'price_asc', text: "По убыванию цены"},
          {value: 'price_desc', text: "По возрастанию цены"},
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
              text: 'from 26 y.o',
              class_name: 'cond_1'
            },
            {
              title: 'Experience',
              text: 'more then 5 years',
              class_name: 'cond_2'
            },
            {
              title: 'Pledge for car',
              text: 'from 5000₽',
              class_name: 'cond_3'
            },
            {
              title: 'Meliage/OverMeliage',
              text: '3000km / from 3₽ - 1km',
              class_name: 'cond_4'
            },
          ],
          ru: [
            {
              title: 'Возраст водителя',
              text: 'с 26 лет',
              class_name: 'cond_1'
            },
            {
              title: 'Стаж',
              text: 'не менее 5ти лет',
              class_name: 'cond_2'
            },
            {
              title: 'Залог на автомобиль',
              text: 'от 5000₽',
              class_name: 'cond_3'
            },
            {
              title: 'Пробег/Перепробег',
              text: '3000 км / от 3₽ - 1 км',
              class_name: 'cond_4'
            },
          ]
        },
      }
    },
    computed:{
      filteredList(){
        let data = this.lt_cards;
        return this.$filters.prepareLT(data, this.filter_price, this.filter);
      }
    },
    methods:{
      calcMonth(price){
        return ((parseInt(price)/2) * 30.5).toFixed(2);
      },
      showModal(id){
        if (yaCounter33072038){
          yaCounter33072038.reachGoal('longrentalquickform');
        }
        this.$bvModal.show(id)
      },
      submitModal(carName, carId){
        console.log(carName);
        if (this.phone !== '' && this.name !== '' && this.phone !== undefined){
          let message = `БЫСТРАЯ ЗАЯВКА НА ДОЛГОСРОЧНУЮ АРЕНДУ СОЧИ\nПользователь ${this.name} сделал заявку на автомобиль ${carName} номер телефона: ${this.phone}`;
          this.$axios.post("sendMessageToChanel", {message})
            .then((res)=>{
              if (yaCounter33072038){
                yaCounter33072038.reachGoal('longrentalquickformsend');
              }
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
        this.$axios.post('/sun/longTermList', {station: this.$config.station})
          .then(result => {
            if (result.data.status === 'success'){
              this.lt_cards = result.data.data;
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
      min-height: 300px
      background-position: center
      background-size: contain
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
