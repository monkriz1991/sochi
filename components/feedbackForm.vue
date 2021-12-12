<template lang="pug">
  div
    b-form-group.mb-0(:description="$t('contacts3')")
      b-form-input(v-model="feedback.name" :placeholder="$t('contacts4')")
    b-form-group.mb-0( :description="$t('contacts5')")
      vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
    b-form-group.mb-0( :description="$t('contacts10')")
      b-form-input(v-model="feedback.email" placeholder="e-mail")
    b-form-group.mb-0( :description="$t('contacts11')")
      b-form-textarea(v-model="feedback.message" :placeholder="$t('contacts12')")
    a(role="button" @click="submitFeedback").btn.main.w-100="{{$t('contacts13')}}"
</template>

<script>
export default {
  name: "feedbackForm",
  props: ['type'],
  data() {
    return {
      ph: "",
      already: false,
      feedback: {
        name: '',
        phone: '',
        email: '',
        message: ''
      },
    }
  },
  methods: {
    onPhoneChange(){
      this.feedback.phone = this.$refs.phoneInput.phoneFormatted;
    },
    submitFeedback(){
      if (this.already){
        this.$bvToast.toast('Вы уже отправляли заявку', {
          title: 'Ошибка',
          variant: 'danger',
          solid: true
        });
      }else{
        let errors = this.$assets.validationFeedback(this.feedback);
        if (errors.length === 0){
          this.already = true;
          let data = {
            partner: localStorage.partner ? `\n\n реферал - ${localStorage.partner}` : false,
            station: this.$config.station,
            place: this.type === 'feedback' ? 'КОНТАКТЫ' : 'RENT',
            clientName: this.feedback.name,
            clientPhone: this.feedback.email,
            clientEmail: this.feedback.phone,
            comment: this.feedback.message,
          }
          this.$axios.post("sun/v2/feedback", data)
            .then(()=>{
              ym(33072038,'reachGoal','contacts-klik otpravit')
              this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                title: 'Заявка отправлена',
                variant: 'success',
                solid: true
              });
              this.feedback = {
                name: '',
                phone: '',
                email: '',
                message: ''
              }
            }).catch((err)=>{console.error(err)})
        }else{
          errors.map(el => {
            this.$bvToast.toast(el, {
              title: 'Ошибка',
              variant: 'danger',
              solid: true
            });
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
