<template lang="pug">
  section#news
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{$t('payment1')}}"
        p
          strong.red="{{$t('payment2')}}"
          |{{$t('payment3')}}
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
              b-form-group.mb-0( :description="$t('payment4')").py-2
                b-form-input(v-model="payment_form.car" :placeholder="$t('payment10')")
            b-col(sm="12" md="6" lg="6")
              b-form-group.mb-0( :description="$t('payment5')").py-2
                b-form-input(v-model="payment_form.name" :placeholder="$t('payment11')")
            b-col(sm="12" md="6" lg="6")
              b-form-group.mb-0( :description="$t('payment6')").py-2
                vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
            b-col(sm="12" md="6" lg="6")
              b-form-group.mb-0( :description="$t('payment7')").py-2
                b-form-input(v-model="payment_form.email" placeholder="e-mail")
            b-col(sm="12" md="12" lg="12")
              b-form-group.mb-0( :description="$t('payment8')").py-2
                b-form-input(v-model="payment_form.sum" type="number" :placeholder="$t('payment12')")
            b-col(sm="12" md="12" lg="12")
              div.py-2
                button(type="submit").btn.main.w-100.icon-credit-card="{{$t('payment9')}}"
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
          {hid: 'description', name: 'description', content: 'Аренда авто в компании "Sochi Rent-a-Car": *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
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
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs16'),
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
