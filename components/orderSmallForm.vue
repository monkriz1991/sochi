<template lang="pug">
    section#online_form_order
      h2="{{$t('s19')}}"
      b-row
        b-col(sm="12" md="6" lg="6")
          b-form-group
            b-input(readonly="readonly" :value="carName")
          b-form-group
            b-form-select(v-model="place" :options="placesOptions")#place.form-control
          b-row
            b-col(sm="6" md="6" lg="6")
              b-form-group
                datetime(
                  type="datetime"
                  :placeholder="$t('s12')"
                  v-model="date_from"
                  format="yyyy-MM-dd HH:mm"
                  :week-start="1"
                  :minute-step="10"
                  :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                  :min-datetime="min_date"
                  :zone="'Europe/Moscow'"
                  :value-zone="'Europe/Moscow'"
                  input-class="form-control"
                  input-id="from"
                )
            b-col(sm="6" md="6" lg="6")
              b-form-group
                datetime(
                  type="datetime"
                  :placeholder="$t('s13')"
                  v-model="date_to"
                  format="yyyy-MM-dd HH:mm"
                  :week-start="1"
                  :minute-step="10"
                  :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                  :min-datetime="date_from"
                  :zone="'Europe/Moscow'"
                  :value-zone="'Europe/Moscow'"
                  input-class="form-control"
                  input-id="to"
                )
          b-form-group
            b-form-input(v-model="fio" :placeholder="$t('osm1')")
        b-col(sm="12" md="6" lg="6")
          b-form-group
            vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
          b-form-group
            b-input(v-model="email" placeholder="E-Mail:")
          b-form-group
            b-textarea(v-model="comment" :placeholder="$t('osm2')")
          div.form-group
            a(role="button" @click="onSubmit").w-100.btn.main.my-2.cbl="{{$t('osm3')}}"

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
        date_from: this.$assets.genNowSpec(2),
        date_to: this.$assets.genNowSpec(9),
        min_date: this.$assets.genNowSpec(1),
        comment: '',
        errorstry: 0
      }
    },
    watch:{
      date_from(){
        if (new Date(this.date_from) > new Date(this.date_to)){
          this.date_to = this.$assets.genNowSpecFromDate(new Date(this.date_from), 7)
        }
        if(new Date(this.$assets.genNowSpec(1)) > new Date(this.date_from)){
          this.date_to = this.$assets.genNowSpec(1);
        }else{
        }
      },
      date_to(){
        if (new Date(this.date_from) > new Date(this.date_to)){
          this.date_to = this.$assets.genNowSpecFromDate(new Date(this.date_from), 7)
        }
        if(new Date(this.$assets.genNowSpec(1)) > new Date(this.date_from)){
          this.date_to = this.$assets.genNowSpec(1);
        }else{
        }
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
            text: `${this.$t(el.point_name)}${el.price > 0 ? ` - ${el.price}₽` : ''}`
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
            Дата подачи - ${this.$assets.formatDate(new Date(this.date_from))},
            Дата возврата - ${this.$assets.formatDate(new Date(this.date_to))},
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
              date_from: this.$assets.formatDate(new Date(this.date_from)),
              date_to: this.$assets.formatDate(new Date(this.date_to)),
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
                if (yaCounter33072038){
                  yaCounter33072038.reachGoal('online-zayavka');
                }
                this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                  title: 'Заявка отправлена',
                  variant: 'success',
                  solid: true
                });
                this.$router.push({ name: this.$assets.prefix('status-success', this.$i18n.locale)});
              }).catch((err)=>{
              this.$router.push({ name: this.$assets.prefix('status-error', this.$i18n.locale)});
            })
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
