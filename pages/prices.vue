<template lang="pug">
  div.wrapper
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bc")
        h1="{{$t('price10')}}"
        div(v-if="loaded")
          div.table-responsive
            table.table.table-striped
              tbody
                tr
                  th
                    strong="№"
                  th(style="text-align: center")
                    strong="{{$t('price1')}}"
                  th(style="text-align: center")
                    strong="{{$t('price2')}}"
                  th(style="text-align: center")
                    strong="{{$t('price3')}}"
                  th(style="text-align: center")
                    strong="{{$t('price4')}}"
                  th(style="text-align: center")
                    strong="{{$t('price5')}}"
                  th(style="text-align: center")
                    strong="{{$t('price6')}}"
                  th(style="text-align: center")
                    strong="{{$t('price7')}}"
                  th(style="text-align: center")
                    strong="{{$t('price8')}}"
                  th(style="text-align: center")
                    strong="{{$t('price9')}}"
                tr(v-for="(i, idx) in list" :key="i.idx")
                  td(v-html="idx+1").text-center
                  td.text-center="{{i['brand-model']}}"
                  td.text-center(style="text-align: center")="{{i['loan']}}"
                  td.text-center(style="text-align: center")="{{$assets.toMoney(i['1day'])}}"
                  td.text-center(style="text-align: center")="{{$assets.toMoney(i['3day'])}}"
                  td.text-center(style="text-align: center")="{{$assets.toMoney(i['7day'])}}"
                  td.text-center="{{i.age}}"
                  td.text-center="{{i.stuff_age}}"
                  td.text-center="{{i.places}}"
                  td.text-center="{{i.year}}"
        div(v-else)
          loader
        div.clearfix
        hr
        div.my-5.py-3
</template>

<script>
  import devider from "../components/devider";
  import BreadCrumbs from "../components/BreadCrumbs";
  import loader from "../components/loader";
  export default {
    head () {
      return {
        title: 'Цены на аренду авто в Сочи',
        meta: [
          {hid: 'description', name: 'description', content: 'Цены на аренду авто в Сочи: *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    name: "prices",
    components: {
      devider,
      loader,
      BreadCrumbs
    },
    data(){
      return {
        loaded: false,
        bc: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs2'),
            active: true
          }
        ],
        arri: []
      }
    },
    computed: {
      list(){
        return this.prepare(this.arri).sort(this.$filters.comparePrice)
      }
    },
    methods:{
      prepare(data) {
        let elements = [];
        let prices = [];
        let res = [];
        data.map((el)=>{
          if (elements.indexOf(el['brand-model'])+1){
            if(prices[el['brand-model']].indexOf(el['1day']) + 1){
            }else{
              prices[el['brand-model']] = [el['1day']];
              res.push(el)
            }
          }else{
            elements.push(el['brand-model']);
            if(Array.isArray(prices[el['brand-model']])){
              prices[el['brand-model']].push(el)
            }else{
              prices[el['brand-model']] = [el['1day']]
            }
            res.push(el)
          }
        });
        return res
      },
      async makeReq(){
        this.$baseApi.get('totalTable?city=sochi')
          .then((result)=>{
            if (result.data.status === 'success'){
              this.arri = result.data.data;
              this.loaded = true;
            }
          })
      }
    },
    mounted(){
      this.makeReq()
    }
  }
</script>

<style lang="sass" scoped>
  .table
    td
      vertical-align: middle
      font-size: 14px
    th
      vertical-align: middle
      font-size: 14px
</style>
