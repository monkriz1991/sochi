<template lang="pug">
    div.container
      b-row
        b-col(sm="6" md="4" lg="4" v-for="(f, fdx) in features" :key="fdx")
          div.feature-item.my-3
            div.image
              img(:data-src="`https://booking.autopilot.rent/storage/${f.image}`" v-lazy-load)
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
        this.$axios.post('sun/fetchFeatures', {city: this.$config.station})
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
