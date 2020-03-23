<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems" :withBack="false")
        div(v-if="loaded")
          h1="Долгосрочная аренда {{item.cd.naimenovanie}} в Сочи"
          b-row
            b-col(sm="12" md="12" lg="6")
              div.block-container
                b-o-image-slider(:items="item.photos.length > 0 ? item.photos : [item.cd.car_image]")
            b-col(sm="12" md="12" lg="6")
              div.block-container
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
          hr
          b-row
            b-col(sm="12" md="12" lg="6")
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
              hr
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
              h3="Условия бронирования"
              b-row
                b-col(sm="12" md="12" lg="6" v-for="(ci, cidx) in conditions" :key="cidx")
                  div.condition
                    div(v-bind:class="ci.class_name").ico
                    div.text
                      h6="{{ci.title}}"
                      p="{{ci.text}}"
        div(v-else)
          loader
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import BOImageSlider from "../../components/BOImageSlider";
  export default {
    components:{
      devider,
      BreadCrumbs,
      loader,
      BOImageSlider
    },
    data(){
      return {
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
        conditions: [
          {
            title: 'Возраст водителя',
            text: 'с 26 года',
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
            text: '3000 км / от 3₽ - км',
            class_name: 'cond_4'
          },
        ],
      }
    },
    computed:{
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
            let message = `ЗАЯВКА НА ДОЛГОСРОЧНУЮ АРЕНДУ СОЧИ\nПользователь ${this.userData.surname} ${this.userData.name} ${this.userData.fathername} сделал заявку на автомобиль ${this.item.cd.naimenovanie}\nНомер телефона: ${this.userData.phone}\nE-mail: ${this.userData.phone}\nКомментарий: ${this.userData.comment}`;
            this.$axios.post("sendMessageToChanel", {message})
              .then((res)=>{
                this.hideModal(carId)
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
