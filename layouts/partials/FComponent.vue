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
                  nuxt-link(to="/about/")="О компании"
                li
                  nuxt-link(to="/news/")="Новости"
                li
                  nuxt-link(to="/contacts/")="Контакты"
                li
                  nuxt-link(to="/conditions/")="Условия аренды"
                li
                  nuxt-link(to="/about/discounts/")="Акции"
      div.main_footer.py-5
        div.container
          b-row
            b-col(sm="12" md="6" lg="6")
              div.info.info-left
                p="{{settings.address}}"
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
                  a(href="/")="Прокат и аренда авто в Сочи"
            b-col(sm="12" md="6" lg="6")
              div.info.info-right
                p="{{settings.time}}"
                p="Звоните: "
                  a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`").mgo-number="{{settings.main_phone}}"
                br
                br
                p.bold="Мы в других городах:"
                ul.list-unstyled
                  li
                    a(href="https://spbrentacar.ru/")="Санкт-Петербург"
                  li
                    a(href="https://avtopilot.com/")="Владивосток"
                  li
                    a(href="https://sochirentacar.ru/")="Сочи"
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
