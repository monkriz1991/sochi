<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems" :withBack="false")
        div(v-if="loaded")
          h1="Долгосрочная аренда {{item.cd.naimenovanie}} в Крыму"
          b-row
            b-col(sm="12" md="12" lg="6")
              div.block-container
                b-o-image-slider(:items="item.photos.length > 0 ? item.photos : [item.cd.car_image]")
              hr
              div.garant
                div.grant-item
                  div
                    p.m-0='Мы гарантируем именно выбранный вами автомобиль и его стоимость'
                div.grant-item
                  div
                    p.m-0='Все виды страхования и большой выбор дополнительных опций'
              hr
              h3="Характеристики автомобиля"
              div.item-content
                div.info_lap
                  p.l="Год выпуска:"
                  p.r="{{item.cd.godvypuska}}"
                div.info_lap
                  p.l="КПП:"
                  p.r="{{item.cd.kpp}}"
                div.info_lap
                  p.l="Топливо:"
                  p.r="{{item.cd.toplivo}}"
                div.info_lap
                  p.l="Двигатель:"
                  p.r(v-html="`${item.cd.dvigatel}л.`")
                div.info_lap
                  p.l="Цвет:"
                  p.r="{{item.cd.cvet}}"
              div.py-1
                b-row.features-list-icos
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.bag(v-html="`${$assets.getBagsData(item.cd.bags, item.cd.bigbag)}`")
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.pass='{{item.cd.passa}} пассажиров'
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.dors='{{ $assets.getDoors(item.cd.dors) }}'
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.temp='{{item.cd.klimat}}'
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.benz='{{item.cd.rashod}}л/100км'
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.gear='{{item.cd.kpp}}'
            b-col(sm="12" md="12" lg="6")
              div.block-container
                h3="Данные аренды:"
                b-row
                  b-col(sm="12" md="12" lg="6")
                    b-form-group(description="Дата подачи")
                      datetime(
                        type="datetime"
                        placeholder="Дата по"
                        v-model="df"
                        format="yyyy-MM-dd HH:mm"
                        :week-start="1"
                        :minute-step="10"
                        :phrases="{ok: 'Продолжить', cancel: 'Отмена'}"
                        :min-datetime="df"
                        :zone="'Europe/Moscow'"
                        :value-zone="'Europe/Moscow'"
                        input-class="form-control"
                        input-id="from"
                        :readonly="true"
                      )
                  b-col(sm="12" md="12" lg="6")
                    b-form-group(description="Дата возврата")
                      datetime(
                        type="datetime"
                        placeholder="Дата по"
                        v-model="dt"
                        format="yyyy-MM-dd HH:mm"
                        :week-start="1"
                        :minute-step="10"
                        :phrases="{ok: 'Продолжить', cancel: 'Отмена'}"
                        :min-datetime="minDate"
                        :zone="'Europe/Moscow'"
                        :value-zone="'Europe/Moscow'"
                        input-class="form-control"
                        input-id="to"
                        :readonly="true"
                      )
                  b-col(sm="12" md="12" lg="12")
                    div.price_string
                      h5="СТОИМОСТЬ ПЕРИОДА:"
                      h5="{{lastPrice}}₽"
                hr
                h3="Ваши данные:"
                h5="ФИО"
                b-row
                  b-col(sm="12" md="12" lg="4")
                    b-form-group
                      b-form-input(placeholder="Фамилия" v-model="userData.surname" @input="clearErrors")
                  b-col(sm="12" md="12" lg="4")
                    b-form-group
                      b-form-input(placeholder="Имя" v-model="userData.name" @input="clearErrors")
                  b-col(sm="12" md="12" lg="4")
                    b-form-group
                      b-form-input(placeholder="Отчество" v-model="userData.fathername" @input="clearErrors")
                h5="Контактные данные"
                b-row
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: 'Код страны',countrySelectorError: 'Неверный выбор',phoneNumberLabel: 'Номер телефона',example: 'Пример :'}")
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      b-form-input(placeholder="E-mail" v-model="userData.email" @input="clearErrors")
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      b-form-textarea(placeholder="Комментарий" v-model="userData.comment" @input="clearErrors" rows="3")
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      b-button(@click="onSubmit").btn.main.w-100.text-uppercase="Забронировать"
              h3="Условия бронирования"
              b-row
                b-col(sm="12" md="12" lg="6" v-for="(ci, cidx) in conditions" :key="cidx")
                  div.condition
                    div(v-bind:class="ci.class_name").ico
                    div.text
                      h6="{{ci.title}}"
                      p="{{ci.text}}"
          hr
        div(v-else)
          loader
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import BOImageSlider from "../../components/BOImageSlider";
  import { Datetime } from 'vue-datetime';
  export default {
    components:{
      devider,
      BreadCrumbs,
      Datetime,
      loader,
      BOImageSlider
    },
    data(){
      return {
        df: this.$assets.genNowSpec(1),
        dt: this.$assets.genNowSpec(31),
        userData: {
          phone: '',
          email: '',
          surname: '',
          name: '',
          fathername: '',
          comment: '',
        },
        ph: '',
        loaded: false,
        item: [],
        errors: [],
        allready: false,
        minDate: this.$assets.genNowSpec(31)
      }
    },
    computed:{
      lastPrice(){
        let date1 = new Date(this.df);
        let date2 = new Date(this.dt);
        let daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
        return parseInt(this.item.cd.stoimost / 2) * daysLag;
      },
      bcItems(){
        let crumbs = [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Долгосрочная аренда',
            to: '/long_term_rental'
          }
        ];
        if (this.loaded) {
          crumbs.push({
            text: this.item.cd.naimenovanie,
            active: false
          });
        }
        return crumbs
      },
      conditions(){
        return [
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
            text: `от ${this.item.cd.zalog}₽`,
            class_name: 'cond_3'
          },
          {
            title: 'Пробег/Перепробег',
            text: `3000 км / ${this.item.limits.over_limit_price}₽ - км`,
            class_name: 'cond_4'
          },
        ]
      }
    },
    watch:{
      df(){
        this.minDate = this.$assets.genNowSpecFromDate(new Date(this.df), 30)
        this.dt = this.$assets.genNowSpecFromDate(new Date(this.df), 30)
      }
    },
    methods: {
      onSubmit(){
        if (!this.allready){
          let errors = this.$assets.validateOrderFormLT(this.userData);
          if(errors.length){
            this.errors = errors
            this.$bvToast.toast('Найдены ошибки в заполнении', {
              title: 'Ошибка',
              variant: 'danger',
              solid: true
            });
            return false
          }else{
            this.allready = true;
            let message = `ЗАЯВКА НА ДОЛГОСРОЧНУЮ АРЕНДУ СОЧИ\nПользователь ${this.userData.surname} ${this.userData.name} ${this.userData.fathername} сделал заявку на автомобиль ${this.item.cd.naimenovanie}\nДаты:\nc - ${this.$assets.formatDate(new Date(this.df))}\nпо - ${this.$assets.formatDate(new Date(this.dt))}\nСтоимость периода - ${this.lastPrice}₽\n\nНомер телефона: ${this.userData.phone}\nE-mail: ${this.userData.email}\nКомментарий: ${this.userData.comment}`;
            this.$axios.post("sendMessageToChanel", {message})
              .then((res)=>{
                if (yaCounter33072038){
                  yaCounter33072038.reachGoal('sendcardlongrental');
                }
                this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                  title: 'Заявка отправлена',
                  variant: 'success',
                  solid: true
                });
              }).catch((err)=>{console.error(err)})
          }
        }else{
          this.$bvToast.toast('Вы уже отправили заявку', {
            title: 'Ошибка',
            variant: 'danger',
            solid: true
          });
        }
      },
      clearErrors(){
        if(this.errors.length){
          this.errors = [];
        }
      },
      onPhoneChange(){
        this.userData.phone = this.$refs.phoneInput.phoneFormatted;
        this.clearErrors()
      },
      fetchSingleItem(){
        this.$axios.get(`https://booking.autopilot.rent/api/sun/longTermSingle/${this.$route.params.gosnomer}`)
          .then(result => {
            if (result.data.status === 'success'){
              if (yaCounter33072038){
                yaCounter33072038.reachGoal('opencardlongrental');
              }
              this.item = result.data.data;
              this.loaded = true;
            }
          }).catch(err => console.error(err))
      }
    },
    created() {
      this.fetchSingleItem();
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables.sass"
  .grant-item
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
    &:before
      font-weight: bold
      display: block
      font-size: 32px
      content: '\E805'
      margin-right: 10px
      font-family: 'Icons', monospace
      color: $primary
  .price_string
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
  textarea
    resize: none
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
  .limit
    background-color: rgba(255, 255, 255, 0.7)
    border: 1px solid rgba(205, 205, 205, 0.5)
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.4)
    cursor: pointer
    background: #f8f8f8
    transition: 0.3s
    &.active
      background: $primary
      *
        color: #fff
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
