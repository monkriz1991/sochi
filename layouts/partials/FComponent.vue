<template lang="pug">
    footer
      div.devider
        div.container
          div.devider-content-wrapper
            div.copy
              p="© «Sochi Rent-a-Car» - 2014 - {{year_to_copy}}"
            div.bottom_menu
              ul.list-unstyled
                li
                  nuxt-link(:to="{name: $assets.prefix('about', $i18n.locale)}")="{{ $t('m1')}}"
                li
                  nuxt-link(:to="{name: $assets.prefix('news', $i18n.locale)}")="{{ $t('m2')}}"
                li
                  nuxt-link(:to="{name: $assets.prefix('contacts', $i18n.locale)}")="{{ $t('m6')}}"
                li
                  nuxt-link(:to="{name: $assets.prefix('conditions', $i18n.locale)}")="{{ $t('m3')}}"
                li
                  nuxt-link(:to="{name: $assets.prefix('about-discounts', $i18n.locale)}")="{{ $t('m4')}}"
      div.main_footer.py-5
        div.container
          b-row
            b-col(sm="12" md="6" lg="6")
              div.info.info-left
                p="{{$t(settings.address)}}"
                br
                br
                span
                  |E-mail:
                  |&nbsp;
                  a(:href="`mailto:${settings.main_email}`")="{{settings.main_email}}"
                br
                span
                  |Sochi Rent-a-Car -
                  |&nbsp;
                  nuxt-link(:to="{name: $assets.prefix('index', $i18n.locale)}")="{{$t('pis')}}"
              nuxt-link(:to="{name: $assets.prefix('privacy_policy', $i18n.locale)}")="{{$t('pp')}}"
            b-col(sm="12" md="6" lg="6")
              div.info.info-right
                p="{{$t(settings.time)}}"
                p="{{$t('call')}} "
                  a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`").mgo-number="{{settings.main_phone}}"
                br
                br
                p.bold="{{$t('ac')}}"
                ul.list-unstyled
                  li
                    a(href="https://spbrentacar.ru/" rel="nofollow")="{{$t('m8')}}"
                  li
                    a(href="https://vladivostokrentacar.ru/" rel="nofollow")="{{$t('m7')}}"
                  li
                    a(href="https://crimearentacar.su/" rel="nofollow")="{{$t('m9')}}"
                  li
                    a(href="https://ekaterinburgrentacar.ru/" rel="nofollow")="{{ $t('m16') }}"
                  li
                    a(href="https://chelyabinskrentacar.ru/" rel="nofollow")="{{ $t('m17') }}"
                  li
                    a(href="https://miami-rent-a-car.com/" rel="nofollow")="{{ $t('m19') }}"
                  li
                    a(href="https://krasnodarrentacar.ru/" rel="nofollow")="{{ $t('m20') }}"
</template>

<script>
  export default {
    name: "FComponent",
    data(){
      return {

      }
    },
    computed: {
      year_to_copy: () => {
        let date = new Date();
        return date.getFullYear()
      },
      settings(){
        let settings = this.$parent.set_data
        if (settings){
          return settings
        }else{
          return {
            id: '',
            station: '',
            main_phone: '',
            address: '',
            address_in_contacts: '',
            map_lat: '',
            map_lng: '',
            time: '',
            main_email: '',
            soc_vk: '',
            soc_insta: '',
            soc_fb: '',
            soc_youtube: '',
          }
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/styles/variables"
  footer
    .devider
      background-color: $footer_accent
      .devider-content-wrapper
        display: flex
        justify-content: space-between
        align-items: center
        flex-direction: row
        padding: 15px 0
        @media screen and (max-width: 991px)
          flex-direction: column
        .bottom_menu
          width: auto
          ul
            margin: 0px
            li
              display: inline
              @media screen and (max-width: 510px)
                display: block
                width: 100%
                text-align: center
              a
                color: #ffffff
                margin: 0 0 0 15px
                cursor: pointer
                &:hover
                  text-decoration: underline
                @media screen and (max-width: 510px)
                  margin: 0
        .copy
          width: auto
          p
            margin: 0
            color: #ffffff
    .main_footer
      min-height: 100px
      background-color: $footer
      span
        color: #BCBCBC
      p
        color: #BCBCBC
      a
        color: #BCBCBC
        text-decoration: underline
        &:hover
          text-decoration: none
      .info
        p
          margin: 0
          &.bold
            font-weight: 700
            color: #fff
        ul
          li
            display: block
            width: 100%
            text-align: right
            @media screen and (max-width: 760px)
              text-align: left
        &.info-right
          p
            text-align: right
            @media screen and (max-width: 760px)
              text-align: left
</style>
