<template lang="pug">
  div#aowrapper
    div.container
      client-only
        div(v-if="loading").p-5
          loader(:text="true")
        div(v-else)
          div(v-if="coronaFalse")
            div.offer.m-5.p-5
              h4.text-center.text-uppercase
                |{{$t('s0')}}
                br
                a.mgo-number(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`")="{{settings.main_phone}}"
          div(v-else)
            div(v-if="timeFalse")
              div.offer.m-5.p-5
                h4.text-center.text-uppercase
                  |{{$t('s1')}}
                  br
                  a.mgo-number(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`")="{{settings.main_phone}}"
            div(v-else)
              div(v-if="searchForm.isDriver")
                div.offer.m-5.p-5
                  h4.text-center.text-uppercase
                    |{{$t('s2')}}
                    br
                    a.mgo-number(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`")="{{settings.main_phone}}"
              div(v-else)
                div(v-if="filtered.length > 0")
                  b-row.d-flex.align-items-center.justify-content-center
                    b-col(sm="12" md="6" lg="4" v-for="(loaded_item, idx) in filtered" :key="idx")
                      div(v-if="idx <= 8")
                        div.p-1.my-3
                          new-offer-card-restyle(:loaded_item="loaded_item")
                      div(v-else-if="show_all")
                        div.p-1.my-3
                          new-offer-card-restyle(:loaded_item="loaded_item")
                    b-col(sm="12" v-if="filtered.length > 8 && !show_all").d-flex.justify-content-center.align-center
                      b-button(@click="show_all = true").btn.main="{{$t('sa')}}"
                div(v-else)
                  div.offer.m-5.p-5
                    h4.text-center.text-uppercase
                      |{{$t('s3')}}
                      br
                      |{{$t('s3_1')}}
                      a.mgo-number(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`")="{{settings.main_phone}}"
                      |{{$t('s3_2')}}
    hr(v-if="!loading").dashed
</template>

<script>
  import loader from "./loader";
  import { mapActions, mapGetters } from 'vuex';
  import newOfferCard from "./newOfferCard";
  import NewOfferCardRestyle from "@/components/newOfferCardRestyle";
  export default {
    name: "autoOfferWrapper",
    components: {
      NewOfferCardRestyle,
      newOfferCard,
      loader
    },
    data(){
      return {
        stored_vehicles: require('../static_booking.json'),
        show_all: false,
        cars: [],
        loading: true,
        timeFalse: false,
        coronaFalse: false,
      }
    },
    computed:{
      ...mapGetters(['searchForm']),
      filtered(){
        return this.loading ? [] : this.$filters.offersFilter(this.cars);
      },
      settings(){
        let settings = this.$parent.$parent.$parent.set_data
        if (settings){
          return settings
        }else{
          return {
            id: '',
            station: '',
            main_phone: '',
            address: '',
            address_in_contacts: '',
            map_lat: '',
            map_lng: '',
            time: '',
            main_email: '',
            soc_vk: '',
            soc_insta: '',
            soc_fb: '',
            soc_youtube: '',
          }
        }
      }
    },
    methods:{
      lookUp(){
        let df_sec = (new Date(this.searchForm.start_date)).getTime();
        let now_sec = (new Date()).getTime();
        let od = 3600000;
        if (Date.parse(this.searchForm.start_date) > Date.parse('2019-04-05')){
          if((df_sec - now_sec) > od){
            this.loading = true;
            this.$baseApi.post('cars', this.$assets.prepareForm(this.searchForm))
              .then(result => {
                ym(33072038,'reachGoal','najti avto')
                if (result.data.status === 'success'){
                  this.cars = result.data.data;
                  this.loading = false;
                  this.timeFalse = false;
                  this.coronaFalse = false;
                  this.show_all = false;
                }
              })
              .catch(err => console.error(err))
          }else{
            this.timeFalse = true;
            this.loading = false;
          }
        }else{
          this.coronaFalse = true;
          this.loading = false;
        }
      }
    },
    mounted() {
      this.$root.$on('onSearch', this.lookUp)
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .btn.primo
    background-color: $primary
    font-family: 'Roboto Condensed', sans-serif
    color: #ffffff
    font-size: 16px
    text-align: center
    padding: 5px 25px
    transition: 0.3s
    border-radius: 0.25rem
    &:hover
      background-color: $primary_hover
  #aowrapper
    min-height: 400px
  .offer
    border: 5px solid $primary
    border-radius: 25px
</style>
