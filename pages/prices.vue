<template lang="pug">
  div.wrapper
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bc")
        h1="Цены на аренду авто в Сочи без водителя"
        div(v-if="loaded")
          div.table-responsive
            table.table.table-striped
              tbody
                tr
                  th
                    strong="№"
                  th(style="text-align: center")
                    strong="Марка, Модель"
                  th(style="text-align: center")
                    strong="Залог, рублей"
                  th(style="text-align: center")
                    strong="Аренда за 1 сутки, рублей"
                  th(style="text-align: center")
                    strong="Стоимость 1 суток при аренде от 3 дней"
                  th(style="text-align: center")
                    strong="Стоимость 1 суток при аренде от 7 дней"
                  th(style="text-align: center")
                    strong="Возраст, лет"
                  th(style="text-align: center")
                    strong="Стаж, лет"
                  th(style="text-align: center")
                    strong="Кол-во мест"
                  th(style="text-align: center")
                    strong="Год выпуска"
                tr(v-for="(i, idx) in list" v-bind:key="i.idx")
                  td.text-center="{{idx+1}}"
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
        title: 'Цены на аренду авто в Сочи без водителя',
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
            text: 'Главная страница',
            to: '/'
          },
          {
            text: 'Цены',
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
        this.$axios.get('totalTable?city=Sochi')
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
