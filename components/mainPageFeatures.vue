<template lang="pug">
    div#mpfeatures
      div.container
        b-row
          b-col(sm="6" md="4" lg="4" v-for="(f, fdx) in features" :key="fdx")
            div.feature-item.my-3
              div.image
                img(:data-src="`${$assets.check_local_env($config.local_url, $config.environment)}storage/${f.image}`" v-lazy-load :alt="f.text")
              div.text
                p="{{$t(f.text)}}"
            hr
</template>

<script>
  export default {
    name: "mainPageFeatures",
    data(){
      return {
        features :[]
      }
    },
    methods:{
      fetchFeatures(){
        this.$baseApi.post('sun/fetchFeatures', {city: this.$config.station})
        .then(res => {
          if (res.data.status === 'success'){
            this.features = res.data.data;
          }
        }).catch(err=>console.error(err))
      }
    },
    mounted() {
      this.fetchFeatures();
    }
  }
</script>

<style lang="sass" scoped>
  #mpfeatures
    min-height: 330px
  .feature-item
    display: flex
    justify-content: flex-start
    align-items: center
    flex-direction: row
    .image
      width: 20%
      height: 60px
      display: flex
      justify-content: flex-start
      align-items: center
      flex-direction: row
      img
        margin: 0 auto
    .text
      width: 80%
      height: 60px
      display: flex
      justify-content: flex-start
      align-items: center
      flex-direction: row
      p
        margin: 0
        line-height: 1
        font-weight: bold
</style>
