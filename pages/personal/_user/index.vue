<template lang="pug">
  section#personal
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        div(v-if="loaded")
          b-row
            b-col(sm="12" md="3" lg="3")
              aside
                div.side-wrapper
                  personal-menu
            b-col(sm="12" md="9" lg="9")
              div.personal-wrapper
                b-row
                  b-col(sm="12" md="12" lg="12")
                    h3="{{user.name}}"
                    b-row
                      b-col(sm="12" md="4" lg="4")
                        p="Телефон: {{user.phone}}"
                      b-col(sm="12" md="4" lg="4")
                        p="E-Mail: {{user.email}}"
                      b-col(sm="12" md="4" lg="4")
                        p
                          b="Статус: "
                          |{{user.current_status}}
                  b-col(sm="12" md="6" lg="6")
                  b-col(sm="12" md="6" lg="6")
                    p="До получения серебряного уровня выполните одно из условий:"
                    p.mt-2.mb-1.inform-progress
                      span.dot
                      |Расстояние
                    div.progress-wrapper
                      div.progress-bar-container
                        div.progress-bar-progress(v-bind:style="{width:'25%'}")
                      div.progress-bar-info.px-3
                        p.m-0.curtent="1250км"
                        p.m-0.percentage="25%"
                        p.m-0.next="5000км"
                    p.mt-2.mb-1.inform-progress
                      span.dot
                      |Дни аренды
                    div.progress-wrapper
                      div.progress-bar-container
                        div.progress-bar-progress(v-bind:style="{width:'75%'}")
                      div.progress-bar-info.px-3
                        p.m-0.curtent="27 дней"
                        p.m-0.percentage="25%"
                        p.m-0.next="30 дней"
        div(v-else)
          loader

</template>

<script>
  import devider from "../../../components/devider";
  import personalMenu from "../../../components/personalMenu";
  import BreadCrumbs from "../../../components/BreadCrumbs";
  import loader from "../../../components/loader";
  export default {
    components: {
      personalMenu,
      devider,
      loader,
      BreadCrumbs
    },
    data(){
      return {
        loaded: false,
        user: {
          id: 4,
          main_id: 255,
          name: "Александр Вайнштейн",
          email: 'cat@9h0st.ru',
          phone: '+7 (928) 774-92-02',
          gender: 'male',
          birth_date: '1983-10-25',
          cc: [],
          current_status: 'bronze',
          is_org: false,
          is_activated: true,
        },
        bcItems: [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('lk1'),
            active: true
          }
        ],
      }
    },
    mounted() {
      if (parseInt(this.$route.params.user) !== this.user.id){
        this.$router.push('/personal/');
      }else{
        this.loaded = true
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../../assets/styles/variables"
  .inform-progress
    font-size: 14px
    line-height: 1
    color: #3E424C
    .dot
      &:before
        content: '\2022'
        color: $primary
        margin: 0px 5px
  .progress-wrapper
    position: relative
    width: 100%
    height: 35px
    border: 1px solid $primary
    border-radius: 5px
    overflow: hidden
    .progress-bar-container
      left: 0
      top: 0
      position: absolute
      z-index: 1
      width: 100%
      height: 35px
      .progress-bar-progress
        height: 35px
        background: #FFEADA
    .progress-bar-info
      left: 0
      top: 0
      position: absolute
      z-index: 2
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      height: 33px
      .curtent
        font-weight: normal
        font-size: 14px
        color: #3E424C
      .percentage
        font-weight: bold
      .next
        font-weight: normal
        font-size: 14px
        color: #3E424C
</style>
