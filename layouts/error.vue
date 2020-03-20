<template lang="pug">
  div.container
    div.error-wrapper.py-5
      div(v-if="error.statusCode === 404").py-4
        b-img(:src="c404" fluid).my-3
        h1.text-center="страница не найдена"
      h1(v-else)="К сожалению произршла ошибка"
      nuxt-link(to="/")="вернутся на главную"
</template>

<script>
  export default {
    props: ['error'],
    data(){
      return {
        c404: require('../assets/images/404.jpg')
      }
    }
  }
</script>

<style lang="sass" scoped>
  .error-wrapper
    min-height: 400px
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
</style>
