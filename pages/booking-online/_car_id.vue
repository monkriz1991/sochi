<template lang="pug">
    section#car_details
      devider
      main.py-3
        div.container
          BreadCrumbs(:items="bcItems" :withBack="true" :backStringHref="backStringHref")
          div(v-if="loaded")
            b-row
              b-col(sm="12" md="12" lg="6")
                div.info_part.mt-2
                  b-o-image-slider(:items="images")
                  div.p-3.info-inside.wbb
                    p.auto-class.m-0="{{$t(car_data.klassavtomobilya)}}"
                    h1="{{car_data.naimenovanie}}"
                    div(v-if="car_data.naimenovanie !== 'Xiaomi MiJia Electric Scooter M365'").py-2
                      b-row.features-list-icos
                        b-col(sm="12" md="6" lg="4").features-list-block
                          span.bag(v-html="`${$assets.getBagsData(car_data.bags, car_data.bigbag, $i18n.locale)}`")
                        b-col(sm="12" md="6" lg="4").features-list-block
                          span.pass='{{$assets.getPassa(car_data.passa, $i18n.locale) }}'
                        b-col(sm="12" md="6" lg="4").features-list-block
                          span.dors='{{ $assets.getDoors(car_data.dors, $i18n.locale) }}'
                        b-col(sm="12" md="6" lg="4").features-list-block
                          span.temp='{{$t(car_data.klimat)}}'
                        b-col(sm="12" md="6" lg="4").features-list-block
                          span.benz="{{car_data.rashod}}{{$t('p2')}}"
                        b-col(sm="12" md="6" lg="4").features-list-block
                          span.gear='{{$t(car_data.kpp)}}'
                    div.py-1
                      span(v-for="(f, fdx) in car_data.features_options" v-bind:key="fdx" v-html="$t(f.name)").badge_feature
                  div.p-3.info-inside.wbb
                    div.garant
                      div.grant-item
                        div
                          p.m-0="{{$t('bocid6')}}"
                  div(v-if="car_data.naimenovanie === 'Xiaomi MiJia Electric Scooter M365'").p-3.info-inside.wbb
                    div.option
                      div.option-item.mt-2.mb-0
                        h4="{{$t('bocid3')}}"
                        h4="{{$t('bocid4')}}"
                      hr.mt-0.mb-3
                    div(v-for="(o, odx) in options" :key="odx" v-if="o.option_name === 'Защита Бронирования'").option
                      div.option-item.my-2
                        b-form-checkbox(v-model="o.value" v-bind="{disabled: $assets.checkAbhazAvailable(o.option_name, userData.df)}").lp-checkbox
                          div
                            a(v-if="o.photos" @click.prevent="$bvModal.show(`bv-modal-${o.id}`)").hidden_info
                            b-modal(v-if="o.photos"  :id="`bv-modal-${o.id}`" hide-footer hide-header)
                              p(v-html="$i18n.locale === 'ru' ? o.option_description : o.option_description_eng")
                              hr
                              b-o-image-slider(:items="o.photos")
                            |{{$i18n.locale === 'ru' ? o.option_name : o.option_name_eng}}
                          span(v-if="o.option_name === 'Дозаправка' || o.option_name === 'Мойка' || o.option_name === 'Крымский мост'").inform-now-dozo="{{$i18n.locale === 'ru' ? o.option_description : o.option_description_eng}}"
                          span(v-if="$assets.checkAbhazAvailable(o.option_name, userData.df)").inform-now-dozo="{{$t('covid')}}"
                        span.text-right.position-relative
                          b-form-select(v-model="o.quantity" v-if="o.value && o.count > 1").w-10
                            option(v-for="i in o.count" :key="i")="{{i}}"
                          span(v-if="o.old_price" v-html="`${gen_sum(o.old_price, o.quantity)}₽`").old_price
                            span(v-html="o.type === 'day' ? '/'+$t('aoc1'):''")
                          b(v-html="gen_sum_price(o.price, o.old_price, o.quantity)")
                          span(v-if="o.price > 0"  v-html="o.price_type === 'day' ? '/'+$t('aoc1'):''")
                      hr(v-if="(odx+1) !== options.length").cbt
                  div(v-else).p-3.info-inside.wbb
                    div.option
                      div.option-item.mt-2.mb-0
                        h4="{{$t('bocid3')}}"
                        h4="{{$t('bocid4')}}"
                      hr.mt-0.mb-3
                    div(v-for="(o, odx) in options" :key="odx").option
                      div(v-if="o.has_childs")
                        div(:class="o.value ? null : 'collapsed'" :aria-expanded="o.value ? 'true' : 'false'" :aria-controls="`ido-${o.id}`" @click="o.value = !o.value").parrent_option
                          div.info
                            img(:src="angle" v-bind:class="{in: o.value}")
                            p
                              |{{$i18n.locale === 'ru' ? o.option_name : o.option_name_eng}}
                          div.price
                            span="{{$t('bocid1')}} "
                            b(v-html="o.price ? o.price+\"₽\" : $t('bocid2')")
                            span(v-if="o.price > 0"  v-html="o.price_type === 'day' ? '/'+$t('aoc1'):''")
                        b-collapse(:id="`ido-${o.id}`" v-model="o.value" class="mt-4")
                          div(v-for="(so, sodx) in o.sub_items" :key="sodx")
                            div.option-item.my-2.px-2
                              b-form-checkbox(v-model="so.value").lp-checkbox
                                div
                                  a(v-if="so.photos" @click.prevent="$bvModal.show(`bv-modal-${so.id}`)").hidden_info
                                  b-modal(v-if="so.photos"  :id="`bv-modal-${so.id}`" hide-footer hide-header)
                                    p(v-html="$i18n.locale === 'ru' ? so.option_description : so.option_description_eng")
                                    hr
                                    b-o-image-slider(:items="so.photos")
                                  |{{$i18n.locale === 'ru' ? so.option_name : so.option_name_eng}}
                              span.text-right.position-relative
                                b-form-select(v-model="so.quantity" v-if="so.value && so.count > 1").w-10
                                  option(v-for="i in so.count" :key="i")="{{i}}"
                                span(v-if="so.old_price" v-html="`${gen_sum(so.old_price, so.quantity)}₽`").old_price
                                  span(v-html="so.type === 'day' ? '/'+$t('aoc1'):''")
                                b(v-html="gen_sum_price(so.price, so.old_price, so.quantity)")
                                span(v-if="so.price > 0"  v-html="so.price_type === 'day' ? '/'+$t('aoc1'):''")
                            hr(v-if="(sodx+1) !== o.sub_items.length").cbt
                      div(v-else).option-item.my-2
                        b-form-checkbox(v-model="o.value" v-bind="{disabled: $assets.checkAbhazAvailable(o.option_name, userData.df)}").lp-checkbox
                          div
                            a(v-if="o.photos" @click.prevent="$bvModal.show(`bv-modal-${o.id}`)").hidden_info
                            b-modal(v-if="o.photos"  :id="`bv-modal-${o.id}`" hide-footer hide-header)
                              p(v-html="$i18n.locale === 'ru' ? o.option_description : o.option_description_eng")
                              hr
                              b-o-image-slider(:items="o.photos")
                            |{{$i18n.locale === 'ru' ? o.option_name : o.option_name_eng}}
                          span(v-if="o.option_name === 'Дозаправка' || o.option_name === 'Мойка' || o.option_name === 'Крымский мост'").inform-now-dozo="{{$i18n.locale === 'ru' ? o.option_description : o.option_description_eng}}"
                          span(v-if="$assets.checkAbhazAvailable(o.option_name, userData.df)").inform-now-dozo="{{$t('covid')}}"
                        span.text-right.position-relative
                          b-form-select(v-model="o.quantity" v-if="o.value && o.count > 1").w-10
                            option(v-for="i in o.count" :key="i")="{{i}}"
                          span(v-if="o.old_price" v-html="`${gen_sum(o.old_price, o.quantity)}₽`").old_price
                            span(v-html="o.type === 'day' ? '/'+$t('aoc1'):''")
                          b(v-html="gen_sum_price(o.price, o.old_price, o.quantity)")
                          span(v-if="o.price > 0"  v-html="o.price_type === 'day' ? '/'+$t('aoc1'):''")
                      hr(v-if="(odx+1) !== options.length").cbt
                  div(v-if="car_data.naimenovanie !== 'Xiaomi MiJia Electric Scooter M365'").p-3.info-inside.wbb
                    h4="{{$t('bocid12')}}"
                    b-form-group
                      b-row
                        b-col(sm="12" md="6" lg="6")
                          b-form-radio(v-model="is_limit" name="some-radios" :value="true")="{{$t('bocid20')}}"
                        b-col(sm="12" md="6" lg="6")
                          b-form-radio(v-model="is_limit" name="some-radios" :value="false")="{{$t('bocid21')}}"
                    div
                      p
                        |{{$t('bocid15')}}
                        b="{{$t('bocid16')}}"
                        |{{$t('bocid17')}}
                        b="{{$t('bocid18')}}"
                        |{{$t('bocid19')}}
                  div.p-3.info-inside
                    h4="{{$t('bocid7')}}"
                    div.price_string
                      h5.text-black-50="{{$t('bocid8')}}"
                      h5.text-black-50
                        span(v-if="is_limit").old_price="{{period_sum_before_sale}}₽"
                        |{{period_sum}}₽
                    div.price_string
                      h5.text-black-50="{{$t('bocid9')}}"
                      h5.text-black-50="{{options_price}}₽"
                    div.price_string(v-if="priceOfPlace > 0")
                      h5.text-black-50="{{$t('bocid10')}}"
                      h5.text-black-50="{{priceOfPlace}}₽"
                    div.price_string(v-if="priceOfPlaceCompack > 0")
                      h5.text-black-50="{{$t('bocid11')}}"
                      h5.text-black-50="{{priceOfPlaceCompack}}₽"
                    div.price_string(v-if="is_limit")
                      h5.text-black-50="{{$t('bocid12')}}"
                      h5.text-black-50="{{limit_distance}}{{$t('p3')}}"
                    div.price_string
                      h5="{{$t('bocid13')}}"
                      h5="{{online_sum}}₽"
                    hr
                    div.price_string
                      h5="{{$t('bocid14')}}"
                      h5="{{total_sum}}₽"
              b-col(sm="12" md="12" lg="6")
                form(ref="form" id="pay-y" name=ShopForm method="POST" action="https://money.yandex.ru/eshop.xml").form_part
                  div.p-4.form-inside.my-2
                    input(type="hidden" name="scid" :value="$config.scid")
                    input(type="hidden" name="ShopID" :value="$config.ShopID")
                    input(name="paymentType" value="" type="hidden")
                    input(name="orderNumber" v-model="orderNumber" type="hidden")
                    input(name="custName" v-model="orderName" type="hidden")
                    input(name="sum" v-model="online_sum" type="hidden")
                    input(name="CustomerNumber" value="" type="hidden")
                    input(name="ym_merchant_receipt" v-model="reciept" type="hidden" required="required")
                    h3="{{$t('bocid36')}}"
                    b-row
                      b-col(sm="12" md="12" lg="6")
                        b-form-group(:description="$t('s12')")
                          datetime(
                            type="datetime"
                            :placeholder="$t('s12')"
                            v-model="userData.df"
                            format="yyyy-MM-dd HH:mm"
                            :week-start="1"
                            :minute-step="10"
                            :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                            :min-datetime="userData.df"
                            :max-datetime="userData.df"
                            :zone="'Europe/Moscow'"
                            :value-zone="'Europe/Moscow'"
                            input-class="form-control"
                            input-id="from"
                            :readonly="true"
                          )
                      b-col(sm="12" md="12" lg="6")
                        b-form-group(:description="$t('s13')")
                          datetime(
                            type="datetime"
                            :placeholder="$t('s13')"
                            v-model="userData.dt"
                            format="yyyy-MM-dd HH:mm"
                            :week-start="1"
                            :minute-step="10"
                            :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                            :min-datetime="userData.dt"
                            :max-datetime="userData.dt"
                            :zone="'Europe/Moscow'"
                            :value-zone="'Europe/Moscow'"
                            input-class="form-control"
                            input-id="to"
                            :readonly="true"
                          )
                      b-col(sm="12" md="12" lg="12")
                        b-form-group
                          b-form-select(v-model="userData.place" :options="placeOptions" @change="checkPlaseOnChange")
                      b-col(sm="12" md="12" lg="12")
                        div.option
                          div.option-item.mb-2
                            b-form-checkbox(v-model="is_same_comeback").lp-checkbox="{{$t('bocid35')}}"
                      b-col(sm="12" md="12" lg="12")
                        b-form-group(v-if="!is_same_comeback")
                          b-form-select(v-model="userData.place_comeback" :options="placeOptions")
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
                          b-form-textarea(:placeholder="$t('bocid28')" v-model="userData.comment" @input="clearErrors")
                      b-col(v-if="car_data.zalog > 0" sm="12" md="12" lg="12")
                        div.option
                          div.option-item.my-2
                            b="{{$t('bocid27')}} {{car_data.zalog}}₽"
                      b-col(sm="12" md="12" lg="12")
                        div.option
                          div.option-item.my-2
                            b-form-checkbox(v-model="is_promocode").lp-checkbox="{{$t('bocid26')}}"
                      b-col(sm="12" md="12" lg="12")
                        b-form-group(v-if="is_promocode")
                          b-form-input(:placeholder="$t('bocid25')" v-model="userData.promocode")
                      b-col(sm="12" md="12" lg="12" v-if="errors.length")
                        div.errors-block
                          h6="{{$t('bocid24')}}"
                          p(v-for="(e, edx) in errors" :key="edx" v-html="e").error.m-0
                      b-col(sm="12" md="12" lg="6")
                        a(role="button" @click="onSubmitOrder").btn.cancel.main.w-100="{{$t('bocid23')}}"
                      b-col(sm="12" md="12" lg="6")
                        a(role="button" @click="onSubmitOrder").btn.main.w-100="{{$t('bocid22')}}"
          div(v-else).my-5.py-5
            loader
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import BOImageSlider from "../../components/BOImageSlider";
  import { Datetime } from 'vue-datetime';
  export default {
    name: "carDetails",
    components: {
      devider,
      BreadCrumbs,
      loader,
      BOImageSlider,
      Datetime
    },
    data(){
      return {
        angle: require('../../assets/images/angle-arrow-down.svg'),
        ph: "",
        car_id: this.$route.params.car_id,
        car_data: {},
        car_photos: [],
        options: [],
        placeOptions: [],
        places: [],
        loaded: false,
        loader_step: 0,
        is_promocode: false,
        is_same_comeback: true,
        period: 0,
        allready: false,
        images: [],
        is_limit: false,
        userData: {
          df: '',
          dt: '',
          place: this.$config.default_place,
          place_comeback: this.$config.default_place,
          phone: '',
          email: '',
          surname: '',
          name: '',
          fathername: '',
          comment: '',
          promocode: '',
        },
        errors: [],
      }
    },
    watch:{
      loader_step(){
        if (this.loader_step === 3){
          this.loaded = true
        }
      },
      is_same_comeback(){
        this.checkPlaseOnChange()
      }
    },
    computed:{
      ...mapGetters(['searchForm']),
      generated_options(){
        let res = [];
        this.options.map(el => {
          if (el.has_childs){
            el.sub_items.map(eli => {
              res.push({
                name: `${eli.quantity} x ${eli.option_name}`,
                type: eli.price_type,
                value: eli.value,
                price: this.gen_sum_price_to_opt(eli.price, eli.old_price, eli.quantity)
              })
            })
          }else{
            res.push({
              name: `${el.quantity} x ${el.option_name}`,
              type: el.price_type,
              value: el.value,
              price: this.gen_sum_price_to_opt(el.price, el.old_price, el.quantity)
            })
          }
        });
        return res
      },
      limit_distance_message(){
        if(this.is_limit){
          return `Выбрано ограничение пробега применена скидка 15%\nпробег - ${this.limit_distance}км\nЦена без скидки - ${this.period_sum_before_sale}₽\nЦена со скидкой - ${this.period_sum}₽\n\n`
        }else{
          return 'Без ограничения пробега\n\n';
        }
      },
      limit_distance(){
        return 100*this.period
      },
      backStringHref(){
        return `?dt=${this.userData.dt}&df=${this.userData.df}&ac=${this.fetchClassForBack()[this.car_data.klassavtomobilya]}&place=${this.userData.place}`
      },
      addPlaces_str(){
        return `\nподача ${this.specify_place(this.userData.place).point_name}${this.specify_place(this.userData.place).price > 0 ? ` - ${this.specify_place(this.userData.place).price}р` : ''}\nвозврат ${this.specify_place(this.userData.place_comeback).point_name}${this.specify_place(this.userData.place_comeback).price > 0 ? ` - ${this.specify_place(this.userData.place_comeback).price}р` : ''}\n`
      },
      priceOfPlace(){
        let price = 0
        this.places.filter(el => {
          if(el.id === parseInt(this.userData.place)) {
            price = el.price
          }
        });
        return price;
      },
      orderNumber(){
        return Date.now();
      },
      orderName(){
        return `${this.userData.surname} ${this.userData.name} ${this.userData.fathername}`;
      },
      reciept(){
        var obz = {
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
        obz.items[0].price.amount = parseInt(this.online_sum);
        obz.customerContact = this.userData.email;
        obz.items[0].text = `Аренда транспортного средства без экипажа, ${this.car_data.naimenovanie}, Арендатор ${this.orderName}`;
        return JSON.stringify(obz);
      },
      priceOfPlaceCompack(){
        let price = 0
        this.places.filter(el => {
          if(el.id === parseInt(this.userData.place_comeback)) {
            price = el.price
          }
        });
        return price;
      },
      options_price(){
        let sum = 0;
        this.options.map(el => {
          if (el.has_childs){
            el.sub_items.map(eli => {
              if(eli.value){
                if (eli.price_type === 'full'){
                  sum = sum + this.gen_sum_price_to_opt(eli.price, eli.old_price, eli.quantity)
                }else{
                  sum = sum + (this.gen_sum_price_to_opt(eli.price, eli.old_price, eli.quantity) * parseInt(this.period))
                }
              }
            })
          }else{
            if(el.value){
              if (el.price_type === 'full'){
                sum = sum + this.gen_sum_price_to_opt(el.price, el.old_price, el.quantity)
              }else{
                sum = sum + (this.gen_sum_price_to_opt(el.price, el.old_price, el.quantity) * parseInt(this.period))
              }
            }
          }
        })
        return sum;
      },
      period_sum(){
        let ps = parseInt(this.car_data.stoimost) * parseInt(this.period)
        if (this.is_limit){
          return this.$assets.toMoney(ps - ((ps/100)*15));
        }else{
          return this.$assets.toMoney(ps);
        }
      },
      period_sum_before_sale(){
        return parseInt(this.car_data.stoimost) * parseInt(this.period);
      },
      online_sum(){
        return Math.round((this.period_sum) * 0.2);
      },
      total_sum(){
        return this.period_sum + this.options_price + this.priceOfPlace + this.priceOfPlaceCompack;
      },
      bcItems(){
        let crumbs = [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs14'),
          }
        ];
        if (this.loaded) {
          crumbs.push({
            text: this.car_data.naimenovanie,
            active: false
          });
        }
        return crumbs
      },
      features(){
        let d = [];
        this.car_data.features_options.map((el)=>{
          if (el.sort === 1){
            d.push(el.name)
          }
        });
        if (d.length){
          return `Особенности авто - ${d.join(', ')}`
        }else{
          return ''
        }
      },
    },
    methods:{
      ...mapActions(['setSearchForm']),
      gen_sum(price, quantity){
        return price*quantity;
      },
      gen_sum_price(p, op, q){
        if(parseInt(q) > 1){
          if(op > 0){
            return `${op*(parseInt(q)-1)}₽`
          }else{
            return `${p*q}₽`
          }
        }else{
          if(p > 0){
            return `${p}₽`
          }else{
            return this.$t('bocid2');
          }
        }
      },
      gen_sum_price_to_opt(p, op, q){
        if(parseInt(q) > 1){
          if(op && op > 0){
            return op*(parseInt(q)-1)
          }else{
            return p*q
          }
        }else{
          return p
        }
      },
      fetchClassForBack(){
        return {
          'Все классы': 5,
          'Комфорт класс': 3,
          'Бизнес': 1,
          'Кроссоверы': 4,
          'Минивены': 2,
          'Кабриолеты': 6,
          'Электросамокаты': 0,
        }
      },
      onPhoneChange(){
        this.userData.phone = this.$refs.phoneInput.phoneFormatted;
        this.clearErrors()
      },
      specify_place($id){
        let place = this.places.filter(el => {
          return el.id === parseInt($id)
        });
        return place[0]
      },
      checkCarAvailability(){
        let df_sec = (new Date(this.userData.df)).getTime();
        let now_sec = (new Date()).getTime();
        let od = 86400000;
        if((df_sec - now_sec) > od){
          this.$axios.post('checkCarAvailability', {
            df: this.$assets.makeDateForRequest(this.userData.df),
            dt: this.$assets.makeDateForRequest(this.userData.dt),
            car_id: this.car_id,
            city: this.$config.station
          }).then(result => {
            if (result.data.status !== 'success'){
              this.$router.push('/')
            }
          }).catch(err => console.error(err))
        }else{
          this.$router.push('/')
        }
      },
      clearErrors(){
        if(this.errors.length){
          this.errors = [];
        }
      },
      checkPlaseOnChange(){
        if (this.is_same_comeback){
          this.userData.place_comeback = this.userData.place
        }
      },
      makeMessageToBroadCasting(callback_func){
        let bodyFormData = new FormData();
        bodyFormData.set('car', this.car_data.naimenovanie);
        bodyFormData.set('name', this.orderName);
        bodyFormData.set('phone', this.userData.phone);
        bodyFormData.set('sum', parseInt(this.online_sum));
        bodyFormData.set('day_sum', parseInt(this.car_data.stoimost));
        bodyFormData.set('total_sum', parseInt(this.total_sum));
        bodyFormData.set('option_sum', parseInt(this.options_price));
        bodyFormData.set('period_sum', parseInt(this.period_sum));
        bodyFormData.set('email', this.userData.email);
        bodyFormData.set('comment', this.userData.comment);
        bodyFormData.set('df', this.$assets.formatDate(new Date(this.userData.df)));
        bodyFormData.set('dt', this.$assets.formatDate(new Date(this.userData.dt)));
        bodyFormData.set('place', this.specify_place(this.userData.place).point_name);
        bodyFormData.set('color', this.car_data.cvet);
        bodyFormData.set('options', JSON.stringify(this.generated_options));
        bodyFormData.set('period', `${parseInt(this.period)} ${this.$assets.getName(parseInt(this.period))}`);
        bodyFormData.set('features', this.features);
        this.$axios.post('https://booking.autopilot.rent/mail_sochi.php', bodyFormData, {headers: {}}).then(res => {
          let broadcaster = {
            sitename: `https://sochirentacar.ru/ \n`,
            fio: this.orderName,
            naimenovanie: this.car_data.naimenovanie,
            period: `${parseInt(this.period)} ${this.$assets.getName(parseInt(this.period))}`,
            dateFrom: this.$assets.formatDate(new Date(this.userData.df)),
            dateTo: this.$assets.formatDate(new Date(this.userData.dt)),
            sum: `\nполная сумма - ${this.total_sum} \n предоплата 20% - ${parseInt(this.online_sum)}\n`,
            email: this.userData.email,
            phone: this.userData.phone,
            options: JSON.stringify(this.generated_options),
            options_summ: this.options_price,
            features: this.features,
            comment: this.userData.comment
          };
          this.$axios.post('sendTgBroadcast', broadcaster)
            .then((result)=>{
              if (result){
                callback_func()
              }
            })
            .catch(err => console.error(err))
        }).catch(err => console.error(err));
      },
      onSubmitOrder(){
        if (!this.allready){
          let errors = this.$assets.validateOrderFormOnlineBooking(this.userData)
          if(errors.length){
            this.errors = errors
            this.$bvToast.toast('Найдены ошибки в заполнении', {
              title: 'Ошибка',
              variant: 'danger',
              solid: true
            });
            return false
          }else{
            this.allready = true;
            if (this.userData.promocode !== ''){
              this.userData.comment = `${this.userData.comment}, был введен промокод "${this.userData.promocode}"`
            }
            this.userData.comment = `${this.userData.comment}, \nПодача и возврат ${this.addPlaces_str}\n${this.limit_distance_message}`
            this.makeMessageToBroadCasting(()=>{
              this.$refs.form.submit();
              if (yaCounter33072038){
                yaCounter33072038.reachGoal('Payforcar');
              }
              this.$bvToast.toast('Заявка отправлена', {
                title: 'Успех',
                variant: 'success',
                solid: true
              });
            })
          }
        }else{
          this.$bvToast.toast('Вы уже отправили заявку', {
            title: 'Ошибка',
            variant: 'danger',
            solid: true
          });
        }
      },
      async fetchPoints(){
        this.$axios(`fetchPoints/${this.$config.station}`)
          .then(result => {
            if(result.data.status === 'success'){
              let res = [];
              result.data.data.map(el => {
                res.push({
                  value: el.id,
                  text: `${this.$t(el.point_name)}${el.price > 0 ? ` - ${el.price}₽` : ''}`
                })
              });
              this.placeOptions = res;
              this.places = result.data.data;
              this.syncBaseDataWithStore();
            }
          })
      },
      fetchData(){
        this.$axios.post(`/sun/single/${this.car_id}`, {
          df: this.$assets.makeDateForRequest(this.userData.df),
          dt: this.$assets.makeDateForRequest(this.userData.dt),
          car_id: this.car_id,
          city: this.$config.station
        }).then((result)=>{
          if (result.data.data != null){
            this.car_data  = result.data.data;
            this.car_data.stoimost = this.car_data.car_actual.PriceDiscount;
            this.period = this.car_data.car_actual.Period;
            this.$axios.post('getSunPhotos',{gosnomer: result.data.data.gosnomer, sun:1, city: this.$config.station})
              .then((result)=>{
                this.car_photos = result.data.data;
                this.images = this.car_photos.length > 0 ? this.car_photos : [this.car_data.car_image];
                this.loader_step = this.loader_step + 1;
              })
          }else{
            this.$router.push('/')
          }
        }).catch((err)=>{
          if (err){
            this.$router.push('/')
          }
        });
      },
      syncBaseDataWithStore(){
        this.userData.place = this.searchForm.place.id ? this.searchForm.place.id : this.$config.default_place;
        this.userData.place_comeback = this.searchForm.place.id;
        this.userData.df = this.searchForm.df;
        this.userData.dt = this.searchForm.dt;
        let diffDates = this.$assets.diffDates(this.searchForm.df, this.searchForm.dt);
        this.period = parseInt(Math.round(diffDates.inDays));
        this.checkCarAvailability();
        this.fetchData();
      },
    },
    mounted() {
      this.$axios.post('sun/options', {car_id: this.car_id, station: this.$config.station})
        .then(res => {
          if(res.data.status === 'success'){
            this.loader_step = this.loader_step + 1;
            this.options = res.data.data;
          }
        }).catch((err)=>{console.error(err)});
      this.fetchPoints().then(()=>{
        if (yaCounter33072038){
          yaCounter33072038.reachGoal('Bookacar');
        }
        this.loader_step = this.loader_step + 1;
      });
    }
  }
</script>


<style lang="sass" scoped>
  @import "../../assets/styles/variables"
  .hidden_info
    &::after
      content: '\003F'
      width: 18px
      height: 18px
      background-color: transparent
      border-radius: 50px
      display: inline-flex
      justify-content: center
      align-items: center
      cursor: pointer
      color: $primary
      border: 1px solid $primary
      font-size: 15px
      margin: 0 5px
      transition: 0.3s
    &:hover
      &::after
        background-color: $primary
        color: #fff
        transition: 0.3s
  .parrent_option
    cursor: pointer
    display: flex
    justify-content: space-between
    align-items: center
    .info
      display: flex
      justify-content: flex-start
      align-items: center
      &:hover
        p
          transition: 0.3s
          color: $primary
      img
        width: 20px
        height: 10px
        transform: rotate(180deg)
        transition: 0.6s
        &.in
          transform: rotate(0deg)
          transition: 0.6s
    p
      margin: 0
      padding-left: 10px
  .info_part
    border: 1px solid $primary
    border-radius: 25px
    overflow: hidden
    -webkit-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    .info-inside
      hr
        border-top: 1px solid $primary
        &.cbt
          border-top: 1px solid rgba(128,128,128, 0.1)
          -webkit-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          -moz-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
          box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
      .auto-class
        color: #808080
      &.wbb
        border-bottom: 1px solid $primary
      .inform-now-dozo
        font-size: 12px
        line-height: 1.2
        margin-top: 5px
        width: 75%
        display: block
        opacity: 0.5
    .price_string
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      h5
        position: relative
        span.old_price
          position: absolute
          font-size: 14px
          text-decoration: line-through
          text-decoration-color: red
          ::before
            content: '-'
    .old_price
      font-weight: bold
      display: block
      font-size: 14px
      text-decoration: line-through
      text-decoration-color: red
      color: #808080
      position: absolute
      top: -14px
      right: -10px
      opacity: 0.7
    .badge_feature
      padding: 2px 10px
      background: $primary_hover
      color: #ffffff
      margin: 2px 2px 2px 0
      white-space: nowrap
      display: inline-block
      border-radius: 4px
      @media screen and (max-width: 500px)
        font-size: 14px
        margin: 1px 1px 1px 0
        padding: 1px 5px
      @media screen and (max-width: 375px)
        font-size: 13px
        margin: 1px 1px 1px 0
        padding: 1px 5px
      @media screen and (max-width: 350px)
        white-space: normal
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
    .option-item
      display: flex
      justify-content: space-between
  .form_part
    position: relative
    height: 100%
    .form-inside
      border: 1px solid $primary
      border-radius: 25px
      overflow: hidden
      -webkit-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
      position: -webkit-sticky
      position: sticky
      top: 10px
      bottom: 10px
      textarea
        resize: none
        height: 100px
      .errors-block
        border: 2px solid red
        border-radius: 10px
        background: rgba(255, 0, 0, 0.05)
        padding: 10px
        margin: 10px 0
        h6
          color: #d50000
        p
          color: #d50000

</style>
