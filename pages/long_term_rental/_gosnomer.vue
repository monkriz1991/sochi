<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems" :withBack="false")
        h1="{{$t('ltrd1')}} {{seo[$route.params.gosnomer].h1}} {{$t('ltrd2')}}"
        div(v-if="loaded")
          b-row
            b-col(sm="12" md="12" lg="6")
              div.block-container
                b-o-image-slider(:items="item.photos.length > 0 ? item.photos : [item.cd.car_image]")
              hr
              div.garant
                div.grant-item
                  div
                    p.m-0="{{$t('ltrd3')}}"
                div.grant-item
                  div
                    p.m-0="{{$t('ltrd4')}}"
              hr
              h3="{{$t('ltrd5')}}"
              div.item-content
                div.info_lap
                  p.l="{{$t('aoc2')}}"
                  p.r="{{item.cd.godvypuska}}"
                div.info_lap
                  p.l="{{$t('aoc7')}}"
                  p.r="{{$t(item.cd.kpp)}}"
                div.info_lap
                  p.l="{{$t('aoc8')}}"
                  p.r="{{$t(item.cd.toplivo)}}"
                div.info_lap
                  p.l="{{$t('aoc9')}}"
                  p.r(v-html="`${item.cd.dvigatel}${$t('p1')}.`")
                div.info_lap
                  p.l="{{$t('aoc10')}}"
                  p.r="{{$t(item.cd.cvet)}}"
              div.py-1
                b-row.features-list-icos
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.bag(v-html="`${$assets.getBagsData(item.cd.bags, item.cd.bigbag, $i18n.locale)}`")
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.pass='{{$assets.getPassa(item.cd.passa, $i18n.locale) }}'
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.dors='{{ $assets.getDoors(item.cd.dors, $i18n.locale) }}'
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.temp='{{$t(item.cd.klimat)}}'
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.benz="{{item.cd.rashod}}{{$t('p2')}}"
                  b-col(sm="12" md="6" lg="4").features-list-block
                    span.gear='{{$t(item.cd.kpp)}}'
            b-col(sm="12" md="12" lg="6")
              div.block-container
                h3="{{$t('ltrd6')}}"
                b-row
                  b-col(sm="12" md="12" lg="6")
                    b-form-group(:description="$t('s12')")
                      datetime(
                        type="datetime"
                        :placeholder="$t('s12')"
                        v-model="df"
                        format="dd-MM-yyyy  HH:mm"
                        :week-start="1"
                        :minute-step="10"
                        zone="Europe/Moscow"
                        value-zone="Europe/Moscow"
                        :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                        :min-datetime="this.$assets.genNowSpec(1)"
                        input-class="form-control"
                        input-id="from"
                        :readonly="true"
                      )
                  b-col(sm="12" md="12" lg="6")
                    b-form-group(:description="$t('s13')")
                      datetime(
                        type="datetime"
                        :placeholder="$t('s13')"
                        v-model="dt"
                        format="dd-MM-yyyy  HH:mm"
                        :week-start="1"
                        :minute-step="10"
                        zone="Europe/Moscow"
                        value-zone="Europe/Moscow"
                        :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                        :min-datetime="minDate"
                        input-class="form-control"
                        input-id="to"
                        :readonly="true"
                      )
                  b-col(sm="12" md="12" lg="12")
                    div(v-if="!priceLoading").price_string
                      h5="{{$t('ltrd7')}}"
                      h5="{{lastPrice}}₽"
                    div(v-else).price_string
                      h5.text-center.text-uppercase="{{$t('df100')}}"
                hr
                h3="{{$t('bocid34')}}"
                h5="{{$t('bocid33')}}"
                b-row
                  b-col(sm="12" md="12" lg="4")
                    b-form-group
                      b-form-input(:placeholder="$t('bocid32')" v-model="userData.surname" @input="clearErrors")
                  b-col(sm="12" md="12" lg="4")
                    b-form-group
                      b-form-input(:placeholder="$t('bocid31')" v-model="userData.name" @input="clearErrors")
                  b-col(sm="12" md="12" lg="4")
                    b-form-group
                      b-form-input(:placeholder="$t('bocid30')" v-model="userData.fathername" @input="clearErrors")
                h5="{{$t('bocid29')}}"
                b-row
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      b-form-input(placeholder="E-mail" v-model="userData.email" @input="clearErrors")
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      b-form-textarea(:placeholder="$t('bocid28')" v-model="userData.comment" @input="clearErrors" rows="3")
                  b-col(sm="12" md="12" lg="12")
                    b-form-group
                      b-button(@click="onSubmit").btn.main.w-100.text-uppercase="{{$t('ltr1')}}"
              h3="{{$t('m3')}}"
              b-row
                b-col(sm="12" md="12" lg="6" v-for="(ci, cidx) in conditions[$i18n.locale]" :key="cidx")
                  div.condition
                    div(v-bind:class="ci.class_name").ico
                    div.text
                      h6="{{ci.title}}"
                      p.ci-text="{{ci.text}}"
          hr
        div(v-else)
          loader
</template>

<script>
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import BOImageSlider from "../../components/BOImageSlider";
  import { Datetime } from 'vue-datetime';
  export default {
    head () {
      return {
        title: this.seo[this.$route.params.gosnomer].title,
        meta: [
          {hid: 'description', name: 'description', content: this.seo[this.$route.params.gosnomer].description}
        ]
      }
    },
    components:{
      devider,
      BreadCrumbs,
      Datetime,
      loader,
      BOImageSlider
    },
    data(){
      return {
        seo: require('../../long'),
        df: this.$assets.genNowSpec(1),
        dt: this.$assets.genNowSpec(31),
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
        minDate: this.$assets.genNowSpec(31),
        priceLoaded: false,
        priceLoading: false,
        priceOnDate: 0
      }
    },
    computed:{
      lastPrice(){
        let date1 = new Date(this.df);
        let date2 = new Date(this.dt);
        let daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
        return parseInt(this.price) * daysLag;
      },
      price(){
        if (this.priceLoaded){
          return this.item.raw.price.price > this.priceOnDate/2 ? this.item.raw.price.price : this.priceOnDate/2;
        }else{
          return this.item.raw.price.price;
        }
      },
      bcItems(){
        let crumbs = [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs15'),
            to: { name: this.$assets.prefix('long_term_rental', this.$i18n.locale) }
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
      conditions(){
        return {
          en: [
            {
              title: 'Driver age',
              text: 'from 26 y.o',
              class_name: 'cond_1'
            },
            {
              title: 'Experience',
              text: 'more then 5 years',
              class_name: 'cond_2'
            },
            {
              title: 'Pledge for car',
              text: `from ${this.item.cd.zalog}₽`,
              class_name: 'cond_3'
            },
            {
              title: 'Meliage/OverMeliage',
              text: `3000km / ${this.item.limits.over_limit_price}₽ - 1km`,
              class_name: 'cond_4'
            },
          ],
          ru: [
            {
              title: 'Возраст водителя',
              text: 'с 26 лет',
              class_name: 'cond_1'
            },
            {
              title: 'Стаж',
              text: 'не менее 5ти лет',
              class_name: 'cond_2'
            },
            {
              title: 'Депозит на автомобиль',
              text: `от ${this.item.cd.zalog}₽`,
              class_name: 'cond_3'
            },
            {
              title: 'Пробег/Перепробег',
              text: `3000 км / ${this.item.limits.over_limit_price}₽ - 1 км`,
              class_name: 'cond_4'
            },
          ]
        }
      }
    },
    watch:{
      df(){
        this.minDate = this.$assets.genNowSpecFromDate(new Date(this.df), 30)
        this.dt = this.$assets.genNowSpecFromDate(new Date(this.df), 30)
        this.makeRequestToBaseForPrice()
      }
    },
    methods: {
      makeRequestToBaseForPrice(){
        this.priceLoading = true;
        this.$axios.post('/sun/longTermActualPrice' , {
          car_id: this.$route.params.gosnomer,
          station: this.$config.station,
          date: this.$assets.makeDateForRequest(this.df)
        }).then(response => {
          if(response.data.status === 'success'){
            if (this.item.cd.naimenovanie === 'Hyundai H-1' && response.data.data.CarPrice < 7050){
              this.priceOnDate = 7050;
            }else{
              this.priceOnDate = response.data.data.CarPrice;
            }
            this.priceLoaded = true;
            this.priceLoading = false;
          }
        })
      },
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
            // this.allready = true;
            this.$bvToast.toast('На данный момент услуга не доступна', {
              title: 'Ошибка',
              variant: 'danger',
              solid: true
            });
            // let message = `ЗАЯВКА НА ДОЛГОСРОЧНУЮ АРЕНДУ СОЧИ\nПользователь ${this.userData.surname} ${this.userData.name} ${this.userData.fathername} сделал заявку на автомобиль ${this.item.cd.naimenovanie}\nДаты:\nc - ${this.$assets.formatDate(new Date(this.df))}\nпо - ${this.$assets.formatDate(new Date(this.dt))}\nСтоимость периода - ${this.lastPrice}₽\n\nНомер телефона: ${this.userData.phone}\nE-mail: ${this.userData.email}\nКомментарий: ${this.userData.comment}`;
            // this.$axios.post("sendMessageToChanel", {message: message, station:this.$config.station})
            //   .then((res)=>{
            //     ym(33072038,'reachGoal','sendcardlongrental')
            //     this.$bvToast.toast('Ваша заявка получена, менеджер свяжется с Вами в бижайшее время', {
            //       title: 'Заявка отправлена',
            //       variant: 'success',
            //       solid: true
            //     });
            //   }).catch((err)=>{console.error(err)})
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
        this.$axios.get(`/sun/longTermSingle/${this.$route.params.gosnomer}`)
          .then(result => {
            if (result.data.status === 'success'){
              this.item = result.data.data;
              if (this.item.cd.naimenovanie === 'Hyundai H-1' && this.item.cd.stoimost < 7070){
                this.item.cd.stoimost = 7070
              }
              this.loaded = true;
            }
          }).catch(err => {
            console.error(err)
            this.$nuxt.error({statusCode: 404, message: 'Page not found'})
          })
      }
    },
    mounted() {
      ym(33072038,'reachGoal','opencardlongrental')
    },
    created() {
      this.fetchSingleItem();
    },
    validate ({ params }) {
      let seo = require('../../long');
      if (seo[params.gosnomer]){
        return true
      }else{
        throw({ statusCode: 404, message: 'Post not found' })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables.sass"
  .grant-item
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
    &:before
      font-weight: bold
      display: block
      font-size: 32px
      content: '\E805'
      margin-right: 10px
      font-family: 'Icons', monospace
      color: $primary
  .price_string
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
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
