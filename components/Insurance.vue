<template lang="pug">
    div
      h4.text-uppercase="{{$t('ins1')}}"
      div(v-for="(item, idx) in sorted_items" :key="idx").option
        div(:class="{'pl-3': item.sub}").option-item.my-2
          b-form-checkbox(v-model="item.value" :disabled="item.disabled").lp-checkbox
            div.info
              div.wtp
                a(@click.prevent="$bvModal.show(item.code)").hidden_info
                p(v-html="item[`name_${$i18n.locale}`]").m-0
          span.text-right.position-relative
            b="{{item.price}}₽/{{$t('aoc1')}}"
        hr(v-if="(idx+1) !== sorted_items.length")
      b-modal(centered :title="$t('i1')" hide-footer)#ins_tax_1
        div.py-4
          ul.d-flex.align-items-center.justify-content-around.list-unstyled.w-100.menu-modal
            li(v-html="$t('af10_is')" :class="{active: active_tab === 1}" @click="active_tab = 1").w-50.px-2.text-center
            li(v-html="$t('af10_is2')" :class="{active: active_tab === 2}" @click="active_tab = 2").w-50.px-2.text-center
          hr
          div(v-if="active_tab === 1")
            p(v-html="$t('i2').replace('$$', $parent.car_data.franchise)")
            p="{{$t('i3')}}"
            ul
              li="{{$t('i4')}}"
              li="{{$t('i5')}}"
          div(v-if="active_tab === 2")
            p(v-html="$t('i6').replace('$$', $parent.car_data.franchise)")
            ul
              li(v-html="$t('i7').replace('$$', $parent.car_data.franchise)")
              li(v-html="$t('i8').replace('$$', $parent.car_data.franchise)")
      b-modal(centered :title="$t('i9')" hide-footer)#ins_tax_3
        div.py-4
          ul.d-flex.align-items-center.justify-content-around.list-unstyled.w-100.menu-modal
            li(v-html="$t('af10_is')" :class="{active: active_tab === 1}" @click="active_tab = 1").w-50.px-2.text-center
            li(v-html="$t('af10_is2')" :class="{active: active_tab === 2}" @click="active_tab = 2").w-50.px-2.text-center
          hr
          div(v-if="active_tab === 1")
            p(v-html="$t('i10').replace('$$', $parent.car_data.franchise)")
            p="{{$t('i11')}}"
          div(v-if="active_tab === 2")
            p(v-html="$t('i12').replace('$$', $parent.car_data.franchise)")
            ul
              li(v-html="$t('i13').replace('$$', $parent.car_data.franchise)")
              li(v-html="$t('i14').replace('$$', $parent.car_data.franchise)")
      b-modal(centered :title="$t('i15')" hide-footer)#ins_tax_2
        div.py-4
          p="{{$t('i16')}}"
          ul
            li="{{$t('i17')}}"
            li="{{$t('i18')}}"
            li="{{$t('i19')}}"
          p="{{$t('i20')}}"
</template>

<script>
    export default {
        name: "Insurance",
        props: {
          items: {
            type: Array
          }
        },
        watch: {
          total(val) {
            this.$emit('input', val);
            this.$parent.insuranse_string = this.insuranse_string
          },
        },
        data(){
          return {
            sorted_items: [],
            active_tab: 1,
          }
        },
        computed: {
          total(){
            let total = 0;
            this.sorted_items.map(el => {
              if(el.value) {
                total = total + el.price * parseInt(this.$parent.period)
              }
            })
            return total
          },
          insuranse_string(){
            let s = "";
            if (this.ins_tax_1 || this.ins_tax_2 || this.ins_tax_3 || this.ins_tax_4 || this.ins_tax_5){
              s = `\n\nВключенные опции страхования\n`
              this.sorted_items.map(el => {
                if(el.value) {
                  s = `${s}${el.name_ru} - ${el.price * this.$parent.period}руб.\n`
                }
              })
              s = `\n${s}ИТОГО ПО СТРАХОВКЕ - ${this.total}руб.\n\n`
            }
            if (s !== ""){
              return s
            }else{
              return false
            }
          },
          ins_tax_1(){
            return this.sorted_items[0].value
          },
          ins_tax_2(){
            return this.sorted_items[1].value
          },
          ins_tax_3(){
            return this.sorted_items[2].value
          },
        },
        methods: {
          pre_load(){
            this.items.map(el => {
              this.sorted_items.push(el)
            })
          },
        },
        mounted() {
          this.pre_load()
        }
    }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  html .lp-checkbox
    display: inline-flex
    width: 80%
    @media screen and (max-width: 530px)
      width: 70%
    @media screen and (max-width: 375px)
      width: 65%
  .info
    display: flex
    justify-content: space-between
    align-items: flex-start
    width: 100%
  .wtp
    display: flex
    justify-content: flex-start
  .option-item
    display: flex
    justify-content: space-between
  hr
    border-top: 1px solid rgba(128, 128, 128, 0.1)
    box-shadow: 3px 3px 10px 0 rgba(128, 128, 128, 0.4)
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
</style>
