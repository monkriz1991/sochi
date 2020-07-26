<template lang="pug">
  section#personal
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{ $t('lk15') }}"
        b-row
          b-col(sm="12" md="6" lg="6")
            b-form
              b-form-group.mb-0.py-2
                b-form-input(v-model="login" :placeholder="$t('lk16')")
              b-form-group.mb-0.py-2
                b-button(type="submit").btn.main.w-100.text-uppercase
                  | {{ $t('lk17') }}
              hr
              b-row
                b-col(sm="12" md="6" lg="6").text-center
                  nuxt-link(:to="{name: $assets.prefix('personal-registation', $i18n.locale)}")="{{ $t('lk12') }}"
                b-col(sm="12" md="6" lg="6").text-center
                  nuxt-link(:to="{name: $assets.prefix('personal', $i18n.locale)}")="{{ $t('lk8') }}"
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
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('lk15'),
            active: true
          }
        ],
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
