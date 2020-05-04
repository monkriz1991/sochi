<template lang="pug">
    div.optionItem
      div(v-if="item.has_childs && item.sub_items !== undefined")
        div(:class="item.value ? null : 'collapsed'" :aria-expanded="item.value ? 'true' : 'false'" :aria-controls="`ido-${item.id}`" @click="item.value = !item.value").parrent_option
          div.info
            img(:src="angle" v-bind:class="{in: item.value}")
            p
              |{{$i18n.locale === 'ru' ? item.option_name : item.option_name_eng}}
        b-collapse(:id="`ido-${item.id}`" v-model="item.value" class="mt-4")
          div(v-for="(so, sodx) in item.sub_items" :key="sodx")
            div.option-item.my-2.px-2
              div.info
                a(v-if="so.photos" @click.prevent="$bvModal.show(`bv-modal-${so.id}`)").hidden_info
                b-modal(v-if="so.photos"  :id="`bv-modal-${so.id}`" hide-footer hide-header)
                  p(v-html="$i18n.locale === 'ru' ? so.option_description : so.option_description_eng")
                  hr
                  b-o-image-slider(:items="so.photos")
                |{{$i18n.locale === 'ru' ? so.option_name : so.option_name_eng}}
            hr(v-if="(sodx+1) !== item.sub_items.length").cbt
      div(v-else v-if="item.photos").option-item.my-2
        div.info
          a(v-if="item.photos" @click.prevent="$bvModal.show(`bv-modal-${item.id}`)").hidden_info
          div.d-flex.flex-column
            div
              b-modal(v-if="item.photos"  :id="`bv-modal-${item.id}`" hide-footer hide-header)
                p(v-html="$i18n.locale === 'ru' ? item.option_description : item.option_description_eng")
                hr
                b-o-image-slider(:items="item.photos")
              |{{$i18n.locale === 'ru' ? item.option_name : item.option_name_eng}}
</template>

<script>
    import BOImageSlider from "./BOImageSlider";
    export default {
        name: "OptionsItem",
        components: {
          BOImageSlider
        },
        props: {
          item: {
            type: Object
          }
        },
        data() {
          return {
            angle: require('../assets/images/angle-arrow-down.svg'),
          }
        },
        mounted() {
          console.log(this.item.sub_items)
        }
    }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .hidden_info
    &::after
      content: '\003F'
      width: 18px
      height: 18px
      background-color: transparent
      border-radius: 50px
      display: inline-flex
      justify-content: center
      align-items: center
      cursor: pointer
      color: $primary
      border: 1px solid $primary
      font-size: 15px
      margin: 0 5px 0 0
      transition: 0.3s
    &:hover
      &::after
        background-color: $primary
        color: #fff
        transition: 0.3s
  .parrent_option, .option-item
    cursor: pointer
    display: flex
    justify-content: space-between
    align-items: center
    .info
      display: flex
      justify-content: flex-start
      align-items: center
      &:hover
        p
          transition: 0.3s
          color: $primary
      img
        width: 20px
        height: 10px
        transform: rotate(180deg)
        transition: 0.6s
        &.in
          transform: rotate(0deg)
          transition: 0.6s
    p
      margin: 0
      padding-left: 10px
  hr
    border-top: 1px solid $primary
    &.cbt
      border-top: 1px solid rgba(128,128,128, 0.1)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
      box-shadow: 3px 3px 10px 0 rgba(128,128,128,0.4)
  .inform-now-dozo
    font-size: 12px
    line-height: 1.2
    margin-top: 5px
    width: 75%
    display: block
    opacity: 0.5
</style>
