<template lang="pug">
    div
      h4.text-uppercase="{{$t('ins1')}}"
      div(v-for="(item, idx) in sorted_items" :key="idx").option
        div(v-bind:class="{'pl-3': item.sub}").option-item.my-2
          b-form-checkbox(v-model="item.value" v-if="item.code === 'ins_tax_1'" @change="check($event)").lp-checkbox
            div.wtp
              a(@click.prevent="$bvModal.show(item.code)").hidden_info
              p(v-html="item[`name_${$i18n.locale}`]").m-0
          b-form-checkbox(v-model="item.value" v-else-if="item.code === 'ins_tax_5'").lp-checkbox
            div.info
              div.wtp
                a(@click.prevent="$bvModal.show(item.code)").hidden_info
                p(v-html="item[`name_${$i18n.locale}`]").m-0
          b-form-checkbox(v-model="item.value" v-else @change="check_sub($event)").lp-checkbox
            div.info
              div.wtp
                a(@click.prevent="$bvModal.show(item.code)").hidden_info
                p(v-html="item[`name_${$i18n.locale}`]").m-0
          span(v-if="item.code !== 'ins_tax_1'").text-right.position-relative
            b="{{item.price}}₽/{{$t('aoc1')}}"
        hr(v-if="(idx+1) !== sorted_items.length")
      b-modal(centered :title="$t('af5')" hide-footer)#ins_tax_1
        div.py-4
          p="{{$t('af9')}}"
          ul
            li="{{$t('af10')}}"
            li="{{$t('af11')}}"
      b-modal(centered :title="$t('af10')" hide-footer)#ins_tax_3
        div.py-4
          p="{{$t('af10_1')}}{{$parent.car_data.franchise}}{{$t('af10_1_1')}}{{$t('af10_2')}}"
      b-modal(centered :title="$t('af6')" hide-footer)#ins_tax_4
        div.py-4
          p.m-0="{{$t('af13')}}"
          ul
            li="{{$t('af14')}}"
            li="{{$t('af15')}}"
            li="{{$t('af16')}}"
            li="{{$t('af17')}}"
            li="{{$t('af18')}}"
          p="{{$t('af19')}}"
          p.m-0.text-red="{{$t('af20')}}"
          ul
            li="{{$t('af21')}}"
            li="{{$t('af22')}}"
      b-modal(centered :title="$t('af7')" hide-footer)#ins_tax_2
        div.py-4
          p="{{$t('af23')}}"
          p="{{$t('af24')}}"
      b-modal(centered :title="$t('af8')" hide-footer)#ins_tax_5
        div.py-4
          p="{{$t('af25')}}"
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
            // if (this.ins_tax_3){
            //   this.$parent.no_loan = true
            // }else{
            //   this.$parent.no_loan = false
            // }
            this.$parent.insuranse_string = this.insuranse_string
          },
        },
        data(){
          return {
            sorted_items: [],
          }
        },
        computed: {
          total(){
            let total = 0;
            this.sorted_items.map(el => {
              if(el.value) {
                if (el.code !== 'ins_tax_1') {
                  total = total + el.price * parseInt(this.$parent.period)
                }
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
                  if (el.code !== 'ins_tax_1') {
                    s = `${s}${el.name_ru} - ${el.price * this.$parent.period}руб.\n`
                  }
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
          ins_tax_4(){
            return this.sorted_items[3].value
          },
          ins_tax_5(){
            return this.sorted_items[4].value
          },
        },
        methods: {
          check(e){
            if (e && this.ins_tax_1 === false){
              this.sorted_items[1].value = true
              this.sorted_items[2].value = true
            }else{
              this.sorted_items[1].value = false
              this.sorted_items[2].value = false
            }
          },
          check_sub(e){
            if (!e) {
              this.sorted_items[0].value = false
            }else{
              let i = 1;
              if(this.sorted_items[1].value){
                i++
              }
              if(this.sorted_items[2].value){
                i++
              }
              if (i === 2){
                this.sorted_items[0].value = true
              }
            }
          },
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
