<template lang="pug">
    section#online_form_order
      h2="Онлайн заявка"
      b-row
        b-col(sm="12" md="6" lg="6")
          b-form-group
            b-input(readonly="readonly" :value="carName")
          b-form-group
            b-form-select(v-model="place" :options="placesOptions")#place.form-control
          b-form-group
            datetime(
              type="datetime"
              placeholder="Дата по"
              v-model="date"
              format="yyyy-MM-dd HH:mm"
              :week-start="1"
              :minute-step="10"
              :phrases="{ok: 'Продолжить', cancel: 'Отмена'}"
              :min-datetime="min_date"
              :zone="'Europe/Moscow'"
              :value-zone="'Europe/Moscow'"
              input-class="form-control"
              input-id="from"
            )
          b-form-group
            b-form-input(v-model="fio" placeholder="ФИО:")
        b-col(sm="12" md="6" lg="6")
          b-form-group
            vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: 'Код страны',countrySelectorError: 'Неверный выбор',phoneNumberLabel: 'Номер телефона',example: 'Пример :'}")
          b-form-group
            b-input(v-model="email" placeholder="E-Mail:")
          b-form-group
            b-textarea(v-model="comment" placeholder="Комментарий:")
          div.form-group
            a(role="button" @click="onSubmit").w-100.btn.main.my-2.cbl="Отправить"

</template>

<script>
  import { Datetime } from 'vue-datetime';
  export default {
    name: "orderSmallForm",
    components: {
      Datetime
    },
    data(){
      return {
        ph: "",
        fio: '',
        phone: '',
        place: this.$config.default_place,
        email: '',
        date: this.$assets.genNowSpec(2),
        min_date: this.$assets.genNowSpec(1),
        comment: '',
        errorstry: 0
      }
    },
    computed: {
      selectedPlace(){
        let place = this.places.filter(el => {
          return el.id === parseInt(this.place)
        });
        return place[0]
      },
      placesOptions(){
        let res = [];
        this.places.map(el => {
          res.push({
            value: el.id,
            text: `${el.point_name}${el.price > 0 ? ` - ${el.price}р` : ''}`
          })
        });
        return res;
      },
    },
    methods: {
      onPhoneChange(){
        this.phone = this.$refs.phoneInput.phoneFormatted;
      },
      onSubmit(){
        console.log(this.errorstry);
        if (this.errorstry < 3){
          let errors = this.$assets.validateSmallForm({
            fio: this.fio,
            phone: this.phone,
            email: this.email,
          });
          if (errors.length > 0){
            errors.map(err => {
              this.$bvToast.toast(`Проверьте правильность введенных данных \n ${err}`, {
                title: 'Неверные или не полные данные',
                variant: 'danger',
                solid: true
              });
            });
          }else{
            let message = `на сайте sochirentacar.ru Пользователь ${this.fio} сделал заявку из карточки автомобиля
            ДАННЫЕ ЗАЯВКИ:
            Автомобиль - ${this.carName},
            Тип заявки - ${this.typeOrder},
            Дата подачи - ${this.$assets.formatDate(new Date(this.date))},
            Место подачи - ${this.selectedPlace.point_name},
            ФИО - ${this.fio},
            Телефон - ${this.phone},
            Е-mail - ${this.email},
            Коментарий - ${this.comment}`;
            let bodyFormData = new FormData();
            bodyFormData.set('station', this.$config.station);
            bodyFormData.set('type', 'smallform');
            bodyFormData.set('row_data', JSON.stringify({
              car_name: this.carName,
              date: this.$assets.formatDate(new Date(this.date)),
              place: this.selectedPlace.point_name,
              rent_type: this.typeOrder,
              name: this.fio,
              phone: this.phone,
              email: this.email,
              comment: this.comment,
            }));
            this.$axios.post('https://booking.autopilot.rent/mail_complite.php', bodyFormData, {headers: {}}).catch(err => console.error(err));
            this.$axios.post("sendMessageToChanel", {message})
              .then((res)=>{
                yaCounter33072038.reachGoal('online-zayavka');
                this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                  title: 'Заявка отправлена',
                  variant: 'success',
                  solid: true
                });
                this.errorstry++
              }).catch((err)=>{console.error(err)})
          }
        }else{
          this.$bvToast.toast('Вы уже отправляли заявку', {
            title: 'Ошибка',
            variant: 'danger',
            solid: true
          });
        }
      }
    },
    mounted() {

    },
    props:{
      places: {
        type: Array
      },
      carName: {
        type: String
      },
      typeOrder: {
        type: String
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .cbl
    border: 1px solid $primary
    &.hover
      border: 1px solid $primary_hover
  textarea.form-control
    resize: none
    height: 95px
</style>
