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
          let place = this.type === 'feedback' ? 'КОНТАКТЫ' : 'RENT'
          let message = `на сайте sochirentacar.ru заполнена форма обратной связи на странице ${place}:\nимя - ${this.feedback.name}\ne-mail - ${this.feedback.phone}\nтелефон - ${this.feedback.email}\nсообщение - ${this.feedback.message}\n`;
          let bodyFormData = new FormData();
          bodyFormData.set('station', this.$config.station);
          bodyFormData.set('type', 'feedback');
          bodyFormData.set('row_data', JSON.stringify({
            name: this.feedback.name,
            phone: this.feedback.email,
            email: this.feedback.phone,
            comment  : this.feedback.message,
          }));
          this.$axios.post('https://booking.autopilot.rent/mail_complite.php', bodyFormData, {headers: {}}).then(res => {
            this.$axios.post("sendMessageToChanel", {message: message, station:this.$config.station})
              .then((res)=>{
                ym(33072038,'reachGoal','zakaz-kontakt');
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
          }).catch(err => console.error(err));
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
