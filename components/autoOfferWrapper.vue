<template lang="pug">
  div
    div.container
      div(v-if="loading").p-5
        loader
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
                  b-col(sm="12" md="6" lg="4" v-for="(item, idx) in filtered" :key="idx")
                    auto-offer-card(:item="item").my-3
              div(v-else)
                div.offer.m-5.p-5
                  h4.text-center.text-uppercase
                    |{{$t('s3')}}
                    br
                    a(href="tel:+74951084848")="+7 (495) 108-48-48"
    hr(v-if="!loading").dashed
</template>

<script>
  import loader from "./loader";
  import { mapActions, mapGetters } from 'vuex';
  import autoOfferCard from "./autoOfferCard";
  export default {
    name: "autoOfferWrapper",
    components: {
      autoOfferCard,
      loader
    },
    data(){
      return {
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
        let df_sec = (new Date(this.searchForm.df)).getTime();
        let now_sec = (new Date()).getTime();
        let od = 86400000;
        if (Date.parse(this.searchForm.df) > Date.parse('2020-03-05')){
          if((df_sec - now_sec) > od){
            this.loading = true;
            this.$axios.post('cars', this.$assets.prepareForm(this.searchForm))
              .then(result => {
                if (yaCounter33072038){
                  yaCounter33072038.reachGoal('Findаcar');
                }
                if (result.data.status === 'success'){
                  this.cars = result.data.data;
                  this.loading = false;
                  this.timeFalse = false;
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
  .offer
    border: 5px solid $primary
    border-radius: 25px
</style>
