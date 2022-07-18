<template lang="pug">
  b-modal(:id="`modal-one-click${slug}`" hide-footer :title="`${$t('af0')} ${title}`")
    b-form-group.mb-0(:description="$t('cb2')")
      b-form-input(v-model="client_name" :placeholder="$t('cb3')")#callback_name
    b-form-group.mb-0( :description="$t('cb4')")
      vue-phone-number-input(@input="onPhoneChange(slug)" :ref="`phoneInput${slug}`" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
    b-row
      b-col(sm="12" md="6" lg="6")
        a(role="button" @click="hideModal()").btn.cancel.w-100="{{$t('cb5')}}"
      b-col(sm="12" md="6" lg="6")
        a(role="button" @click="submitModal()").btn.main.w-100="{{$t('bocid23')}}"
</template>

<script>
export default {
  name: "oneClickModalSnippet",
  data() {
    return {
      ph: '',
      client_phone: '',
      client_name: '',
    }
  },
  props: ['slug', 'price', 'title', 'is_rent'],
  computed: {
    link(){
      if (this.is_rent) {
        return `https://${this.$config.local_url}/rent/${this.slug}/`
      } else {
        return 'Модуль онлайн бронирования'
      }
    }
  },
  methods:{
    onPhoneChange(slug){
      this.client_phone = this.$refs[`phoneInput${slug}`]['phoneFormatted'];
    },
    hideModal(){
      this.$bvModal.hide(`modal-one-click${this.slug}`);
    },
    submitModal(){
      let data = {
        name: this.client_name,
        phone: this.client_phone,
        link: this.link,
        title: this.title,
        station: this.$config.station,
        price: this.price,
        partner: localStorage.partner ? localStorage.partner : false
      }
      if (data.name === '' || data.phone === '' || !data.phone){
        this.$bvToast.toast('Форма заполнена с ошибками', {
          title: 'Ошибка',
          variant: 'danger',
          solid: true
        });
      } else {
        this.$baseApi.post("sun/oneClickOrder", data)
          .then(res => {
            if (res.data.status === 'success'){
              if (this.is_rent){
                ym(33072038,'reachGoal','rent-zabronirovat 1klik')
              }else{
                ym(33072038,'reachGoal','zabronirovat 1klik')
              }
              this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                title: 'Заявка отправлена',
                variant: 'success',
                solid: true
              });
              this.$router.push({ name: this.$assets.prefix('status-success', this.$i18n.locale)});
            }else{
              this.$router.push({ name: this.$assets.prefix('status-error', this.$i18n.locale)});
            }
          }).catch((err)=>{
          if (err){
            console.error(err)
            this.$router.push({ name: this.$assets.prefix('status-error', this.$i18n.locale)});
          }
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
