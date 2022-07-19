<template lang="pug">
  div#optionsWrapper
    div(v-if="loaded")
      h3="{{$t('dops')}}"
      ul.list-unstyled.lister
        li(v-for="(option, obx) in options" v-if="checkOption(option)" :key="option.id").item
          options-item(:item="option")
          hr(v-if="(obx+1) !== options.length").cbt
</template>

<script>
  import OptionsItem from "./OptionsItem";
  export default {
    name: "OptionsWrapper",
    components: {
      OptionsItem
    },
    props: {
      car_id: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        options: [],
        loaded: false
      }
    },
    methods: {
      checkOption(option){
        if (option.has_childs){
          return true
        }else{
          if (option.photos){
            return true
          }else{
            return false
          }
        }
      }
    },
    mounted() {
      this.$baseApi.post('sun/options', {car_id: this.car_id, station: this.$config.station})
        .then(res => {
          if(res.data.status === 'success'){
            this.options = res.data.data;
            this.loaded = true;
          }
        }).catch((err)=>{console.error(err)});
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .lister
    column-count: 2
    -moz-column-count: 2
    -webkit-column-count: 2
    @media screen and (max-width: 500px)
      column-count: 1
      -moz-column-count: 1
      -webkit-column-count: 1
  hr
    border-top: 1px solid $primary
    &.cbt
      border-top: 1px solid rgba(128,128,128, 0.1)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
      box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
</style>
