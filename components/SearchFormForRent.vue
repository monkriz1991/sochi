<template lang="pug">
div.container
  div#form-wrapper.p-1
    div.fields_form.p-2
      b-row
        b-col(sm="12" md="12" lg="9")
          b-row
            b-col(sm="12" md="12" lg="4").mb-2.mb-md-1
              div.form-group
                label="{{$t('s11')}}"
                b-form-select(v-model="place" :options="placeOptions")#place.form-controler
            b-col(sm="12" md="12" lg="5")
              b-row
                b-col(sm="12" md="6" lg="6").mb-2.mb-md-1
                  div.form-group
                    label()="{{$t('s12')}}"
                    datetime(
                      type="datetime"
                      :placeholder="$t('s13')"
                      v-model="start_date"
                      format="dd-MM-yyyy HH:mm"
                      :week-start="1"
                      :minute-step="10"
                      zone="Europe/Moscow"
                      value-zone="Europe/Moscow"
                      :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                      :min-datetime="$assets.genMinDate()"
                      input-class="form-controler"
                      input-id="from"
                    )
                b-col(sm="12" md="6" lg="6").mb-2.mb-md-1
                  div.form-group
                    label="{{$t('s13')}}"
                    datetime(
                      type="datetime"
                      :placeholder="$t('s13')"
                      v-model="end_date"
                      format="dd-MM-yyyy HH:mm"
                      :week-start="1"
                      :minute-step="10"
                      zone="Europe/Moscow"
                      value-zone="Europe/Moscow"
                      :phrases="{ok: $t('s15'), cancel: $t('s16')}"
                      :min-datetime="start_date"
                      input-class="form-controler"
                      input-id="to"
                    )
            b-col(sm="12" md="12" lg="3").mb-2.mb-md-1
              div.form-group
                label="{{$t('s14')}}"
                b-form-select(v-model="carClass" :options="carClassOption")#class.form-controler
        b-col(sm="12" md="12" lg="3").mb-2.mb-md-1
          b-row
            b-col(sm="12" md="12" lg="12")
              div.form-group.pt-4
                button(role="button" @click="onSearch").go-search.btn.mt-2.text-uppercase="{{$t('s10')}}"
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { Datetime } from 'vue-datetime';
export default {
  name: "SearchFormForRent",
  props: {
    defaultClass: {
      type: Number,
      default: 5
    }
  },
  components: {
    datetime: Datetime,
  },
  data(){
    return {
      place: this.$config.default_place,
      placeOptions: [],
      places: [],
      start_date: this.$assets.genNowSpec(2),
      end_date: this.$assets.genNowSpec(9),
      carClass: 5,
      carClassOption: [
        { value: 5, text: this.$t('class_all') },
        { value: 3, text: this.$t('class2') },
        { value: 1, text: this.$t('class4') },
        { value: 4, text: this.$t('class0') },
        { value: 2, text: this.$t('class1') },
        { value: 6, text: this.$t('class8') },
        { value: 0, text: this.$t('class6') },
        { value: 7, text: this.$t('classPromo') },
      ],
      isDriver: false
    }
  },
  updated: function () {
    this.$nextTick(function () {
      this.checkItem();
    })
  },
  computed:{
    ...mapGetters(['searchForm']),
  },
  methods:{
    ...mapActions(['setSearchForm']),
    onSearch(useScroll = true){
      let form = {
        start_date: this.start_date,
        end_date: this.end_date,
        carClass: this.carClass,
        place: this.currentPlace(),
      };
      this.setSearchForm(form).then(() => {
        form.place = form.place.id
        this.$router.push({name: this.$assets.prefix('booking-online', this.$i18n.locale), query:form})
      })
    },
    currentPlace(){
      let place = this.places.filter(el => {
        return el.id === parseInt(this.place)
      });
      return place[0]
    },
    checkItem(){
      if (new Date(this.start_date) > new Date(this.end_date)){
        this.end_date = this.$assets.genNowSpecFromDate(new Date(this.start_date), 7)
      }
    },
    fetchPoints(){
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
          }
        })
    }
  },
  mounted() {
    this.fetchPoints()
    if (this.searchForm){
      this.place = this.searchForm.place ? this.searchForm.place.id : this.$config.default_place;
      this.start_date = this.searchForm.start_date ? this.searchForm.start_date : this.$assets.genNowSpec(2);
      this.end_date = this.searchForm.end_date ? this.searchForm.end_date : this.$assets.genNowSpec(9);
      this.carClass = this.searchForm.carClass ? this.searchForm.carClass : this.defaultClass;
    }else{
      this.place = this.$route.query.place ? this.$route.query.place : this.$config.default_place;
      this.start_date = this.$route.query.df ? this.$route.query.df.replace(' 03:00', '+03:00') : this.$assets.genNowSpec(2);
      this.end_date = this.$route.query.dt ? this.$route.query.dt.replace(' 03:00', '+03:00') : this.$assets.genNowSpec(9);
      this.carClass = this.$route.query.ac ? this.$route.query.ac : this.defaultClass;
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/styles/variables"
#form-wrapper
  background-color: rgba(0,0,0,0.7)
  border: 1px solid rgba(0,0,0,0.5)
  -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  label
    color: #ffffff
    font-weight: bold
.switcher
  width: 100%
  display: flex
  flex-direction: row
  .driver_switch
    width: 50%
    text-align: center
    padding: 10px
    font-size: 24px
    font-family: 'Roboto Condensed', sans-serif
    background-color: rgba(255,255,255,0.9)
    cursor: pointer
    border-right: 1px solid #000
    border-left: 1px solid #000
    @media screen and (max-width: 991px)
      font-size: 18px
    &.active
      background-color: $primary
      color: #fff
.go-search
  background-color: $primary
  color: #fff
  width: 100%
  text-align: center
  transition: 0.3s
  &:hover
    background-color: $primary_hover
</style>
