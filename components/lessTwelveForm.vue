<template lang="pug">
  div.item-action
    div.p-1.px-2.w-100
      a(href="javascript:void(0)" @click="less12Form").one_click="{{$t('af0')}}"
    div.p-1.px-2.w-100
      a(href="javascript:void(0)" @click="less12Form")="{{$t('aoc11')}}"
    b-modal(:title="$t('cb111')" hide-footer :id="guid")
      b-form-group.mb-0(:description="$t('cb2')")
        b-form-input(v-model="clientName" :placeholder="$t('cb3')")#callback_name
      b-form-group.mb-0( :description="$t('cb4')")
        vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :id="`callback_phone_${guid}`" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
      b-row
        b-col(sm="12" md="6" lg="6")
          a(role="button" @click="hideModal").btn.cancel.w-100="{{$t('cb5')}}"
        b-col(sm="12" md="6" lg="6")
          a(role="button" @click="submitModal").btn.main.w-100="{{$t('cb6')}}"
</template>

<script>
export default {
  name: "lessTwelveForm",
  props: ["dateFrom", "dateTo", "price", "vehicle", "guid"],
  data(){
    return {
      ph: "",
      clientName: "",
      clientPhone: "",
    }
  },
  computed: {
    formData(){
      return {
        clientName: this.clientName,
        clientPhone: this.clientPhone,
        vehicle: this.vehicle,
        dateTo: this.$assets.formatDate(new Date(this.dateTo)),
        dateFrom: this.$assets.formatDate(new Date(this.dateFrom)),
        price: this.price,
        partner: localStorage.partner ? localStorage.partner : false,
        station: this.$config.station
      }
    }
  },
  methods: {
    onPhoneChange(){
      this.clientPhone = this.$refs.phoneInput.phoneFormatted;
    },
    hideModal(){
      this.$bvModal.hide(this.guid)
    },
    submitModal(){
      if (this.clientPhone !== '' && this.clientName !== '' && this.clientPhone !== undefined){
        this.$baseApi.post("sun/v2/LessTwelve", this.formData)
          .then(()=>{
            this.hideModal();
            ym(33072038,'reachGoal','less twelve')
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
    less12Form(){
      this.$bvModal.show(this.guid)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/styles/variables"
.item-action
  display: flex
  justify-content: center
  align-items: center
  padding: 15px 0
  flex-direction: column
  a
    background-color: $primary
    font-family: 'Roboto Condensed', sans-serif
    color: #ffffff
    font-size: 16px
    text-align: center
    padding: 5px 25px
    transition: 0.3s
    border-radius: 0.25rem
    width: 100%
    display: block
    text-transform: uppercase
    &:hover
      background-color: $primary_hover
    &.one_click
      background-color: $primary_hover
      &:hover
        background-color: $primary
</style>
