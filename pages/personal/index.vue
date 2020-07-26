<template lang="pug">
  section#personal
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{ $t('lk11') }}"
        b-row
          b-col(sm="12" md="6" lg="6")
            b-form
              b-form-group.mb-0.py-2
                b-form-input(v-model="login" :placeholder="$t('lk10')")
              b-form-group.mb-0.py-2
                b-form-input(v-model="password" type="password" :placeholder="$t('lk9')")
              b-form-group.mb-0.py-2
                b-button(type="submit").btn.main.w-100.text-uppercase
                  | {{ $t('lk8') }}
              hr
              b-row
                b-col(sm="12" md="6" lg="6").text-center
                  nuxt-link(:to="{name: $assets.prefix('personal-registation', $i18n.locale)}")="{{ $t('lk12') }}"
                b-col(sm="12" md="6" lg="6").text-center
                  nuxt-link(:to="{name: $assets.prefix('personal-renew_password', $i18n.locale)}")="{{ $t('lk13') }}"
          b-col(sm="12" md="6" lg="6")
</template>

<script>
  import BreadCrumbs from "../../components/BreadCrumbs";
  import devider from "../../components/devider";
  export default {
    components: {
      devider,
      BreadCrumbs
    },
    data(){
      return {
        login: '',
        password: '',
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('lk8'),
            active: true
          }
        ],
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
