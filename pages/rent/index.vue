<template lang="pug">
    section#rent
      devider
      main.py-3
        div.container
          BreadCrumbs(:items="bcItems")
          h1="{{$t('s21')}}"
          div(v-if="loaded")
            c-wo-d-component-full(:items="CWoD")
          div(v-else)
            loader
          div.clearfix
</template>

<script>
  import BreadCrumbs from "../../components/BreadCrumbs";
  import loader from "../../components/loader";
  import CWoDComponentFull from "../../components/CWoDComponentFull";
  import devider from "../../components/devider";
  export default {
    head () {
      return {
        title: 'Аренда авто в Сочи | Прокат машин по низким ценам',
        meta: [
          {hid: 'description', name: 'description', content: 'Аренда авто в Сочи: *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
        ]
      }
    },
    components:{
      devider,
      BreadCrumbs,
      loader,
      CWoDComponentFull
    },
    data(){
      return {
        CWoDItems: require('../../cars.json').CWoD,
        loaded: true,
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs12'),
            active: true
          }
        ],
      }
    },
    computed: {
      CWoD(){
        let res = [];
        for (let item in this.CWoDItems){
          res.push(this.CWoDItems[item])
        }
        return res
      }
    },
    mounted() {
      ym(33072038,'reachGoal','gotorent')
    }
  }
</script>

<style lang="sass" scoped>

</style>
