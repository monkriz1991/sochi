<template lang="pug">
  section#personal
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        h1="{{ $t('lk20') }}"
        b-row
          b-col(sm="12" md="6" lg="6")
              b-form
                b-form-group.mb-0.py-2
                  b-form-input(v-model="login" :placeholder="$t('lk16')")
                b-form-group.mb-0.py-2
                  vue-phone-number-input(@input="onPhoneChange" ref="phoneInput" v-model="ph" :clearable="true" :translations="{countrySelectorLabel: $t('contacts6'),countrySelectorError: $t('contacts7'),phoneNumberLabel: $t('contacts8'),example: $t('contacts9')}")
                b-form-group.mb-0.py-2
                  b-form-input(v-model="password" type="password" :placeholder="$t('lk9')")
                b-form-group.mb-0.py-2
                  b-form-input(v-model="re_password" type="password" :placeholder="$t('lk18')")
                b-form-group.mb-0.py-2
                  b-button(type="submit").btn.main.w-100.text-uppercase
                    | {{ $t('lk19') }}
              hr
              b-row
                b-col(sm="12" md="6" lg="6").text-center
                  nuxt-link(:to="{name: $assets.prefix('personal', $i18n.locale)}")="{{ $t('lk14') }}"
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
        ph: '',
        login: '',
        re_password: '',
        password: '',
        phone: '',
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('lk20'),
            active: true
          }
        ],
      }
    },
    methods:{
      onPhoneChange(){
        this.phone = this.$refs.phoneInput.phoneFormatted;
      }
    },
  }
</script>

<style scoped>

</style>
