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
                  format="dd-MM-yyyy  HH:mm"
                  :week-start="1"
                  :minute-step="10"
                  :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                  :min-datetime="min_date"
                  input-class="form-control"
                  input-id="from"
                )
            b-col(sm="6" md="6" lg="6")
              b-form-group
                datetime(
                  type="datetime"
                  :placeholder="$t('s13')"
                  v-model="date_to"
                  format="dd-MM-yyyy  HH:mm"
                  :week-start="1"
                  :minute-step="10"
                  :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                  :min-datetime="date_from"
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
        b-col(sm="12" md="12" lg="12" v-if="typeOrder !== 'почасовая аренда'").text-center
          b
            sup.text-red="*"
            |{{$t('pp1')}}
            nuxt-link(:to="{name: $assets.prefix('booking-online', $i18n.locale)}")="{{$t('pp2')}}"
            |{{$t('pp3')+' '}}
            a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`").mgo-number="{{settings.main_phone}}"
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
        place: this.typeOrder === "почасовая аренда" ? this.places.length > 0 ? 0 : this.$config.default_place : this.$config.default_place,
        fetchedPlaces: [],
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
        let places = [];
        if (this.places.length){
          places = this.places
        }else{
          places = this.fetchedPlaces
        }
        let place = [{point_name: 'Ошибка при выборе места'}]
        if(this.typeOrder === "почасовая аренда"){
          place = [
            {
              point_name: this.places[this.place].name_rus
            }
          ]
        }else{
          place = places.filter(el => {
            return el.id === parseInt(this.place)
          });
        }
        return place[0]
      },
      settings(){
        let settings = this.$parent.$parent.$parent.set_data
        if (settings){
          return settings
        }else{
          return {
            main_phone: '',
          }
        }
      },
      placesOptions(){
        let res = [];
        let places = [];
        if (this.places.length){
          places = this.places
        }else{
          places = this.fetchedPlaces
        }
        places.map((el, key) => {
          let  text = '';
          if (this.places.length){
            if (this.typeOrder === "почасовая аренда"){
              text = `${this.$i18n.locale === 'ru' ? el.name_rus : el.name_eng}${el.price > 0 ? ` - ${el.price}₽` : ''}`
            }else{
              text = `${this.$t(el.point_name)}${el.price > 0 ? ` - ${el.price}₽` : ''}`
            }
          }else{
            text = `${this.$t(el.point_name)}`
          };
          res.push({
            value: this.typeOrder === "почасовая аренда" ? this.fetchedPlaces.length > 0 ? el.id : key : el.id,
            text: text
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
            let subtype = ""
            if (this.typeOrder === "почасовая аренда"){
              subtype = "АРЕНДА АВТО С ВОДИТЕЛЕМ"
            }
            let message = `на сайте sochirentacar.ru Пользователь ${this.fio} сделал заявку из карточки автомобиля ${subtype}
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
            this.$axios.post("sendMessageToChanel", {message: message, station:this.$config.station})
              .then((res)=>{
                this.$axios.post('https://booking.autopilot.rent/mail_complite.php', bodyFormData, {headers: {}}).then(res =>{
                  ym(33072038,'reachGoal','online-zayavka')
                  this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
                    title: 'Заявка отправлена',
                    variant: 'success',
                    solid: true
                  });
                  this.$router.push({ name: this.$assets.prefix('status-success', this.$i18n.locale)});
                }).catch(err => console.error(err));
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
      if(!this.places.length && !this.fetchedPlaces.length){
        this.$axios(`fetchPoints/${this.$config.station}`)
          .then(result => {
            if(result.data.status === 'success'){
              this.fetchedPlaces = result.data.data;
            }
          }).catch(err => console.error(err))
      }
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
  .text-red
    color: red
    font-weight: bold
</style>
