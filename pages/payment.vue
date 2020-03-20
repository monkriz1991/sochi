<template lang="pug">
  section#news
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="Онлайн оплата"
        p
          strong.red="ВНИМАНИЕ: "
          |Все поля обязательны для заполнения!
        form(name="ShopForm" method="POST" action="https://money.yandex.ru/eshop.xml" validator="full" _lpchecked="1")#pay-y
          input(type="hidden" name="scid" :value="$config.scid")
          input(type="hidden" name="ShopID" :value="$config.ShopID")
          input(name="paymentType" value="" type="hidden")
          input(name="orderNumber" v-model="orderNumber" type="hidden")
          input(name="custName" v-model="orderName" type="hidden")
          input(name="sum" v-model="payment_form.sum" type="hidden")
          input(name="CustomerNumber" value="" type="hidden")
          input(name="ym_merchant_receipt" v-model="reciept" type="hidden" required="required")
          b-row
            b-col(sm="12" md="6" lg="6")
              b-form-group.mb-0( description="Введите марку и модель выбранного авто").py-2
                b-form-input(v-model="payment_form.car" placeholder="Марка авто")
            b-col(sm="12" md="6" lg="6")
              b-form-group.mb-0( description="Введите Ваш Ф.И.О").py-2
                b-form-input(v-model="payment_form.name" placeholder="Ф.И.О")
            b-col(sm="12" md="6" lg="6")
              b-form-group.mb-0( description="Введите Ваш телефон").py-2
                vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: 'Код страны',countrySelectorError: 'Неверный выбор',phoneNumberLabel: 'Номер телефона',example: 'Пример :'}")
            b-col(sm="12" md="6" lg="6")
              b-form-group.mb-0( description="Введите Ваш e-mail").py-2
                b-form-input(v-model="payment_form.email" placeholder="e-mail")
            b-col(sm="12" md="12" lg="12")
              b-form-group.mb-0( description="Введите сумму").py-2
                b-form-input(v-model="payment_form.sum" type="number" placeholder="сумма")
            b-col(sm="12" md="12" lg="12")
              div.py-2
                button(type="submit").btn.main.w-100.icon-credit-card="ОПЛАТИТЬ"
        hr
        div.my-5.py-3
</template>

<script>
  import devider from "../components/devider";
  import BreadCrumbs from "../components/BreadCrumbs";
  export default {
    head () {
      return {
        title: 'Онлайн оплата',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": ✮ без ограничения пробега ✮ скидки до 25% ✮ 250 машин в автопарке ✮ бесплатная подача в аэропорт ✮ Бронируй онлайн!⭐'}
        ]
      }
    },
    components: {
      devider,
      BreadCrumbs
    },
    computed:{
      orderNumber(){
        return Date.now();
      },
      orderName(){
        return this.payment_form.name;
      },
      reciept(){
        let obz = {
          customerContact: '',
          items: [
            {
              quantity:1,
              price: {amount: 0},
              tax: '1',
              text: 'Аренда автомобиля',
            }
          ],
        }
        obz.items[0].price.amount = parseInt(this.payment_form.sum);
        obz.customerContact = this.payment_form.email;
        obz.items[0].text = `Аренда транспортного средства без экипажа, ${this.payment_form.car}, Арендатор ${this.payment_form.name}`;
        return JSON.stringify(obz);
      },
    },
    data(){
      return {
        ph: "",
        bcItems: [
          {
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Онлайн оплата',
            active: true
          }
        ],
        payment_form: {
          car: "",
          name: "",
          phone: "",
          email: "",
          sum: "",
        },
      }
    },
     methods:{
      onPhoneChange(){
        this.payment_form.phone = this.$refs.phoneInput.phoneFormatted;
      }
     },
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .red
    color: red
  .ps_item
    display: flex
    flex-direction: column
    justify-content: center
    align-content: center
    align-items: center
    cursor: pointer
    .devider
      width: 80%
      height: 2px
      background-color: $primary_hover
      margin: 5px auto
</style>
