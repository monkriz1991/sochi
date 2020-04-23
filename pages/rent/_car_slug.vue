<template lang="pug">
  section#car_details
    devider
    main.py-3
      div.container
        BreadCrumbs(:items="bcItems")
        b-row
          b-col(sm="12" mc="6" lg="3")
            div(v-if="loaded").slider-wrapper
              b-o-image-slider-small(:items="item.self_data.photos")
          b-col(sm="12" mc="6" lg="9")
            h1(v-html="this.loaded ? this.item.self_data.title : this.seo['CWoD'][this.$route.params.car_slug].title")
            b-row
              b-col(sm="12" mc="12" lg="7" order="2"	order-sm="2"	order-md="1"	order-lg="1"	order-xl="1")
                div(v-if="loaded").py-3.d-block.d-sm-none.d-md-none.d-lg-none
                  div.features-list-icos.features-small
                    div.features-list-block
                      span.bag(v-html="`${$assets.getBagsData(item.tth.bags, item.tth.bigbag, $i18n.locale)}`")
                    div.features-list-block
                      span.pass='{{$assets.getPassa(item.tth.passa, $i18n.locale) }}'
                    div.features-list-block
                      span.dors='{{ $assets.getDoors(item.tth.dors, $i18n.locale) }}'
                    div.features-list-block
                      span.temp='{{$t(item.tth.klimat)}}'
                    div.features-list-block
                      span.benz="{{item.tth.rashod}}{{$t('p2')}}"
                    div.features-list-block
                      span.gear='{{$t(item.car_data.kpp)}}'
                div(v-if="loaded").py-3.d-none.d-sm-block.d-md-block.d-lg-block
                  b-row.features-list-icos
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.bag(v-html="`${$assets.getBagsData(item.tth.bags, item.tth.bigbag, $i18n.locale)}`")
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.pass='{{$assets.getPassa(item.tth.passa, $i18n.locale) }}'
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.dors='{{ $assets.getDoors(item.tth.dors, $i18n.locale) }}'
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.temp='{{$t(item.tth.klimat)}}'
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.benz="{{item.tth.rashod}}{{$t('p2')}}"
                    b-col(sm="6" md="4" lg="4").features-list-block
                      span.gear='{{$t(item.car_data.kpp)}}'
              b-col(sm="12" mc="12" lg="5" order="1"	order-sm="1"	order-md="2"	order-lg="2"	order-xl="2")
                div(v-if="loaded").b-wrapper.slim
                  div(v-for="(p, pdx) in prices" :key="pdx").item-info
                    p.l="{{p.text}}"
                    p.r="{{p.value}}₽/{{$t('cwod7')}}"
                  div.item-info
                    p.l="{{$t('cwd20')}}"
                    p.r="{{item.car_data.zalog}}₽"
        div(v-if="loaded").b-wrapper.blockquote-info
          div.rate
            div(v-if="item.self_data.youtube_videos !== '' && item.self_data.youtube_videos !== undefined").rate-item
              span(v-b-modal.vedeo-modal).video="{{$t('af56')}}"
            div.rate-item
              span(v-b-modal.conditions-modal).about="{{$t('af57')}}"
            div.rate-item
              span(v-b-modal.fuel-modal).gas="{{$t('af58')}}"
            div.rate-item
              span(v-b-modal.arival-modal).aitport="{{$t('af59')}}"
          b-modal(centered hide-footer :title="$t('df60')")#arival-modal
            div.py-2
              p="{{$t('df62')}}"
          b-modal(centered hide-footer :title="$t('df61')")#fuel-modal
            div.py-2
              p="{{$t('df63')}}"
          b-modal(v-if="item.self_data.youtube_videos !== '' && item.self_data.youtube_videos !== undefined" size="lg" centered hide-footer hide-header)#vedeo-modal
            youtube-media(:video-id="$videoId(item.self_data.youtube_videos)" player-width="100%" player-height="500").w-100.d-flex.p-2
          b-modal(size="lg" centered hide-footer hide-header)#conditions-modal
            div.py-4
              div(role="tablist")
                b-card(no-body).mb-1
                  b-card-header(header-tag="header" role="tab").p-1
                    b-button(block href="#" v-b-toggle.accordion-1 variant="success")="{{$t('df64')}}"
                  b-collapse(visible accordion="my-accordion" role="tabpanel")#accordion-1
                    b-card-body
                      div
                        p="{{$t('df65')}} {{$t('cwd27')}} {{item.ALS.age}} {{$assets.getNameCoint(parseInt(item.ALS.age), $t('cwd23'), $t('cwd24'), $t('cwd25'))}}."
                        p="{{$t('df66')}}"
                        p="{{$t('df67')}} {{$t('cwd19')}} {{item.ALS.staff}} {{$assets.getNameCoint(parseInt(item.ALS.staff), $t('cwd23'), $t('cwd24'), $t('cwd25'))}}."
                        p="{{$t('df68')}}"
                        p="{{$t('df69')}}"
                b-card(no-body).mb-1
                  b-card-header(header-tag="header" role="tab").p-1
                    b-button(block href="#" v-b-toggle.accordion-2 variant="success")="{{$t('df70')}}"
                  b-collapse(visible accordion="my-accordion" role="tabpanel")#accordion-2
                    b-card-body
                      div
                        p="{{$t('df71')}}"
                b-card(no-body).mb-1
                  b-card-header(header-tag="header" role="tab").p-1
                    b-button(block href="#" v-b-toggle.accordion-3 variant="success")="{{$t('df72')}}"
                  b-collapse(visible accordion="my-accordion" role="tabpanel")#accordion-3
                    b-card-body
                      div
                        p="{{$t('df73')}}"
                        p
                          b="{{$t('df74')}}"
                        p
                          b="{{$t('df75')}}"
                b-card(no-body).mb-1
                  b-card-header(header-tag="header" role="tab").p-1
                    b-button(block href="#" v-b-toggle.accordion-4 variant="success")="{{$t('df76')}}"
                  b-collapse(visible accordion="my-accordion" role="tabpanel")#accordion-4
                    b-card-body
                      div
                        p="{{$t('df77')}}"
                        ul
                          li="{{$t('df78')}}"
                          li="{{$t('df79')}}"
                          li="{{$t('df80')}}"
                          li="{{$t('df81')}}"
                        p="{{$t('df82')}}"
                        p="{{$t('df83')}}"
                        ul
                          li="{{$t('df84')}}"
                          li="{{$t('df85')}}"
                          li="{{$t('df86')}}"
                        p="{{$t('df87')}}"
                        p="{{$t('df88')}}"
                b-card(no-body).mb-1
                  b-card-header(header-tag="header" role="tab").p-1
                    b-button(block href="#" v-b-toggle.accordion-5 variant="success")="{{$t('df89')}}"
                  b-collapse(visible accordion="my-accordion" role="tabpanel")#accordion-5
                    b-card-body
                      div
                        p
                          b
                            |{{$t('df90')}}
                            a(:href="`tel:${$assets.cleanPhone(settings.main_phone)}`").mgo-number="{{settings.main_phone}}"
                            |{{$t('df90_1')}}
                        p
                          b="{{$t('df91')}}"
                b-card(no-body).mb-1
                  b-card-header(header-tag="header" role="tab").p-1
                    b-button(block href="#" v-b-toggle.accordion-6 variant="success")="{{$t('df92')}}"
                  b-collapse(visible accordion="my-accordion" role="tabpanel")#accordion-6
                    b-card-body
                      div
                        p="{{$t('df93')}}"
        b-row
          b-col(sm="12" md="6" lg="6")
            div(v-if="loaded").b-wrapper.transpar
              h3="{{$t('af55')}}"
              div.mb-2
                div.item-info
                  p.l="{{$t('af48')}}"
                  p.r="{{item.car_data.probeg}}{{$t('p3')}}"
                div.item-info
                  p.l="{{$t('af49')}}"
                  p.r
                    span(v-b-modal.rate).stars
                      span(v-for="(i, key) in item.self_data.safety" :key="`f${i}`").star-f
                      span(v-for="(i, key) in (5 - item.self_data.safety)" :key="`s${i}`").star-o
                div.item-info
                  p.l="{{$t('af51')}}"
                  p.r
                    span(v-b-modal.rate).stars
                      span(v-for="(i, key) in item.self_data.comfort" :key="`f${i}`").star-f
                      span(v-for="(i, key) in (5 - item.self_data.comfort)" :key="`s${i}`").star-o
                div.item-info
                  p.l="{{$t('af50')}}"
                  p.r="{{item.tth.passa}} {{$assets.getNameCoint(item.tth.passa, $t('af52'), $t('af53'), $t('af54'))}}"
                div.item-info
                  p.l="{{$t('df94')}}"
                  p.r="{{item.car_data.dvigatel}}{{$t('p1')}}"
                div.item-info
                  p.l="{{$t('df95')}}"
                  p.r="{{item.car_data.moshhnost}}{{$t('p7')}}"
                div.item-info
                  p.l="{{$t('df96')}}"
                  p.r="{{$t(item.car_data.unit)}}"
                div.item-info
                  p.l="{{$t('df97')}}"
                  p.r="{{item.car_data.tankVolume}}{{$t('p1')}}"
                div(v-if="item.car_data.luggageCapacity > 0").item-info
                  p.l="{{$t('df98')}}"
                  p.r="{{item.car_data.luggageCapacity}}{{$t('p1')}}"
                div.item-info
                  p.l="{{$t('df99')}}"
                  p.r(v-html="item.car_data.tinting ? $t('p8'):$t('p9')")

              div(v-if="loaded")
                div.py-2
                  h3="{{$t('cwd16')}}"
                  div
                    div.item-info
                      p.l="{{$t('cwd17')}}"
                      p.r="с {{item.ALS.age}} {{$assets.getNameCoint(parseInt(item.ALS.age), $t('cwd23'), $t('cwd24'), $t('cwd25'))}}"
                    div.item-info
                      p.l="{{$t('cwd18')}}"
                      p.r="{{$t('cwd19')}} {{item.ALS.staff}} {{$assets.getNameCoint(parseInt(item.ALS.staff), $t('cwd23'), $t('cwd24'), $t('cwd25'))}}"
                    div.item-info
                      p.l="{{$t('cwd20')}}"
                      p.r="{{item.car_data.zalog}} {{$t('cwd26')}}"
                    div.item-info
                      p.l="{{$t('cwd21')}}"
                      p.r="{{$t('cwd22')}}"
                  div(v-html="$assets.generate_text_conditions(item.self_data.text_conditions_bottom)")
                div.py-2
                  h3="{{$t('bc7')}}"
                  div(v-html="$assets.generate_text_docs(item.self_data.text_docs, $i18n.locale)")
            b-modal(centered hide-header hide-footer)#rate
              p.my-4.text-center="{{$t('df107')}}"
          b-col(sm="12" md="6" lg="6")
            div.b-wrapper.shield
              p.header
                span.b-text="AUTOPILOT"
                span="."
                span.r-text="PROTECTION"
              ul.list-ok-yes.list-unstyled.mb-5
                li(v-b-modal.mi1)="{{$t('af5')}}"
                li(v-b-modal.mi2)="{{$t('af6')}}"
                li(v-b-modal.mi3)="{{$t('af7')}}"
                li(v-b-modal.mi4)="{{$t('af8')}}"
              b-modal(centered :title="$t('af5')" hide-footer)#mi1
                div.py-4
                  p="{{$t('af9')}}"
                  ul
                    li="{{$t('af10')}}"
                    li="{{$t('af11')}}"
                    li="{{$t('af12')}}"
              b-modal(centered :title="$t('af6')" hide-footer)#mi2
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
              b-modal(centered :title="$t('af7')" hide-footer)#mi3
                div.py-4
                  p="{{$t('af23')}}"
                  p="{{$t('af24')}}"
              b-modal(centered :title="$t('af8')" hide-footer)#mi4
                div.py-4
                  p="{{$t('af25')}}"
            div.py-2
              h3="{{$t('bc2')}}"
              div.points
                div(v-for="(point, idx) in points" :key="idx").item-info
                  p.l="{{$t(point.point_name)}}"
                  p.r(v-html="point.price > 0 ? point.price+'₽' : $t('bocid2')")
        div(v-if="loaded").b-wrapper.gr
          p.header="{{$t('af26')}}"
          div.rate.gr
            div(v-b-modal.ma1).rate-item
              span.okyes="{{$t('af27')}}"
            div(v-b-modal.ma2).rate-item
              span.okyes="{{$t('af28')}}"
            div(v-b-modal.ma3).rate-item
              span.okyes="{{$t('af29')}}"
            div(v-b-modal.ma4).rate-item
              span.okyes="{{$t('af30')}}"
            div(v-b-modal.ma5).rate-item
              span.okyes="{{$t('af31')}}"
            div(v-b-modal.ma6).rate-item
              span.okyes="{{$t('af32')}}"
          b-modal(centered :title="$t('af27')" hide-footer)#ma1
            p.my-4="{{$t('af33')}}"
          b-modal(centered :title="$t('af28')" hide-footer)#ma2
            div.my-4
              p="{{$t('af34')}}"
              p="{{$t('af35')}}"
          b-modal(centered :title="$t('af29')" hide-footer)#ma3
            div.my-4
              p="{{$t('af36')}}"
              p="{{$t('af37')}}"
          b-modal(centered :title="$t('af30')" hide-footer)#ma4
            p.my-4="{{$t('af47')}}"
          b-modal(centered :title="$t('af31')" hide-footer)#ma5
            div.my-4
              p="{{$t('af38')}}"
          b-modal(centered :title="$t('af32')" hide-footer)#ma6
            p.my-4="{{$t('af40')}}"
        div(v-if="loaded").b-wrapper
          order-small-form(:places="points" :carName="item.self_data.title" typeOrder="посуточная аренда")
        div(v-if="loaded").b-wrapper.gr_total
          div.icons-row
            div.featch-data
              span.ico.car
              p.m-0="{{$t('af41')}}"
            div.featch-data
              span.ico.dtp
              p.m-0="{{$t('af42')}}"
            div.featch-data
              span.ico.way
              p.m-0="{{$t('af44')}}"
            div.featch-data
              span.ico.h24
              p.m-0="{{$t('af45')}}"
            div.featch-data
              span.ico.ren
              p.m-0="{{$t('af46')}}"
        hr
        div(v-if="upperLoaded")
          div(v-if="upperClass.length")
            h3="{{$t('df106')}}"
            upper-class-c-wo-d(:items="upperClass")
        div(v-else)
          loader
        banners-section
</template>

<script>
  import loader from "../../components/loader";
  import devider from "../../components/devider";
  import BreadCrumbs from "../../components/BreadCrumbs";
  import BOImageSliderSmall from "../../components/BOImageSliderSmall";
  import orderSmallForm from "../../components/orderSmallForm";
  import BannersSection from "../../components/BannersSection";
  import upperClassCWoD from "../../components/upperClassCWoD";
  export default {
    head () {
      return {
        title: this.loaded ? this.item.self_data.SEO_title : this.seo['CWoD'][this.$route.params.car_slug].SEO_title,
        meta: [
          {hid: 'description', name: 'description', content: this.loaded ? this.item.self_data.SEO_description : this.seo['CWoD'][this.$route.params.car_slug].SEO_description}
        ]
      }
    },
    components:{
      BannersSection,
      upperClassCWoD,
      BOImageSliderSmall,
      loader,
      devider,
      BreadCrumbs,
      orderSmallForm,
    },
    data(){
      return {
        item: [],
        car_slug: this.$route.params.car_slug,
        loaded: false,
        points: [],
        seo: require('../../cars.json'),
        upperClass: [],
        upperLoaded: false
      }
    },
    computed:{
      settings(){
        let settings = this.$parent.$parent.set_data
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
      },
      prices(){
        let data = [];
        if (this.loaded){
          let s1 = this.item.car_data.stoimost - ((this.item.car_data.stoimost/ 100) * this.item.car_data.skidka_1);
          let s2 = this.item.car_data.stoimost - ((this.item.car_data.stoimost/ 100) * this.item.car_data.skidka_2);
          data = [
            {
              text: `1 ${this.$t('cwod7')}`,
              value: this.$assets.toMoney(this.item.car_data.stoimost)
            },
            {
              text: `${this.$t('cwd27')} 3 ${this.$t('cwd28')} 6 ${this.$t('cwd29')}`,
              value: this.$assets.toMoney(s1),
            },
            {
              text: `${this.$t('cwd27')} 7 ${this.$t('cwd29')}`,
              value: this.$assets.toMoney(s2),
            },
          ]
        }
        return data;
      },
      bcItems(){
        let crumbs = [
          {
            text: this.$t('breadcrumbs1'),
            to: { name: this.$assets.prefix('index', this.$i18n.locale) }
          },
          {
            text: this.$t('breadcrumbs12'),
            to: { name: this.$assets.prefix('rent', this.$i18n.locale) }
          }
        ];
        if (this.loaded) {
          crumbs.push({
            text: this.item.self_data.title,
            active: false
          });
        }
        return crumbs
      },
    },
    beforeCreate() {
      let data = {
        city: this.$config.station,
        slug: this.$route.params.car_slug
      };
      this.$axios.post('sun/CWoDgetBySlug', data)
        .then(res => {
          if (res.data.status === 'success'){
            this.item = res.data.data;
            this.$axios(`fetchPoints/${this.$config.station}`)
              .then(result => {
                if(result.data.status === 'success'){
                  this.points = result.data.data;
                  this.loaded = true;
                  this.$axios.post('sun/getUpperClassData', {
                    station: this.$config.station,
                    car_id_selected: this.item.self_data.car_id,
                    car_id_raw: this.item.self_data.id,
                    type: 'cwod'
                  }).then(res => {
                    if(res.data.status === 'success'){
                      this.upperClass = res.data.data
                      this.upperLoaded = true
                    }
                  }).catch(err => console.error(err))
                }
              }).catch(err => console.error(err))
          }else{
            this.$router.push('/rent');
          }
        }).catch(err =>{
        console.error(err);
        this.$router.push('/rent');
      })
    },
    validate ({ params }) {
      let seo = require('../../cars.json');
      if (seo['CWoD'][params.car_slug]){
        return true
      }else{
        throw({ statusCode: 404, message: 'Post not found' })
      }
    }
  }
</script>


<style lang="sass" scoped>
  @import "../../assets/styles/variables"
  .stars
    cursor: pointer
  .slider-wrapper
    overflow: hidden
  .blockquote-info
    background: rgba(255,106,40,0.2)
    border-radius: 25px
    border: 1px solid $primary
  .star-f:before
    font-family: 'icons_nova1', monospace
    content: '\E807'
    color: $primary
    margin-right: 2px
  .star-o:before
    font-family: 'icons_nova1', monospace
    content: '\E80D'
    color: $primary
    margin-right: 2px
  .icons-row
    display: flex
    justify-content: center
    flex-wrap: wrap
    align-items: center
    .featch-data
      display: flex
      justify-content: flex-start
      align-items: center
      max-width: 20%
      padding: 0 15px
      @media screen and (max-width: 990px)
        max-width: 50%
      @media screen and (max-width: 760px)
        max-width: 100%
      p
        font-weight: bold
      .ico
        &:before
          font-family: 'icons_nova1', monospace
          margin-right: 10px
          font-size: 40px
          color: #2AA30C
        &.car
          &:before
            content: '\E801'
            font-size: 30px
        &.dtp
          &:before
            content: '\E802'
        &.way
          &:before
            content: '\E803'
        &.h24
          &:before
            content: '\E804'
        &.ren
          &:before
            content: '\E805'
  .r-text
    color: #d52b1e
  .b-text
    color: #0039a6
  .text-red
    color: red
    font-weight: bold
  .list-ok-yes
    li
      width: 75%
      display: flex
      justify-content: flex-start
      align-items: center
      margin-bottom: 5px
      cursor: pointer
      &:before
        content: '✓'
        color: $primary
        font-size: 24px
        line-height: 1
        margin-right: 5px
  .rate
    width: 100%
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    flex-wrap: wrap
    &.gr
      .rate-item
        padding: 5px 10px
        background:
        border-radius: 25px
        margin: 5px 0px 0px
        background-color: #2AA30C
        width: 33%
        text-align: center
        @media screen and (max-width: 990px)
          width: auto
        @media screen and (max-width: 760px)
          width: 100%
        span
          cursor: pointer
          color: #ffffff
          font-weight: bold
          &.okyes
            &:before
              color: #ffffff
    .rate-item
      padding: 5px 10px
      @media screen and (max-width: 640px)
        padding: 5px
      span
        cursor: pointer
        &:before
          font-family: 'icons_nova1', monospace
          margin-right: 5px
        &.okyes
          &:before
            content: '\2713'
            color: #2AA30C
        &.star
          &:before
            content: '\e806'
        &.video
          &:before
            content: '\e80c'
        &.about
          &:before
            content: '\e80b'
        &.gas
          &:before
            content: '\e80a'
        &.aitport
          &:before
            content: '\e809'
  .b-wrapper
    padding: 20px
    border: 1px solid $primary
    border-radius: 15px
    margin: 1rem 0
    &.slim
      padding: 10px 20px
    @media screen and (max-width: 640px)
      padding: 10px 5px
    &.shield
      background-image: url('../../assets/images/surface.png')
      background-repeat: no-repeat
      background-size: 25%
      background-position: 85% 75%
    &.transpar
      border: 1px solid transparent
    &.gr_total
      border: 1px solid #2AA30C
      background-color: rgba(42,163,12,0.05)
      p.header
        color: #fff
    &.gr
      border: 1px solid #2AA30C
      p.header
        color: #2AA30C
  p.header
    font-style: normal
    font-weight: bold
    font-size: 20px
    line-height: 1
  .prices
    hr
      margin: 10px 0 10px 0
      border-top: 3px solid $primary
  .item-info
    margin-top: 5px
    margin-bottom: 5px
    &:after
      content: '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '
      display: block
      white-space: nowrap
      overflow: hidden
      font-size: 14px
    .l
      font-weight: bold
      float: left
      padding-right: 5px
      max-width: 60%
      margin: 0
      font-size: 12px
      text-transform: uppercase
    .r
      float: right
      padding-left: 5px
      margin: 0
      font-size: 14px
  .bblack
    background-color: #000
  .points
    .item-info
      @media screen and (max-width: 1200px)
        margin-bottom: 20px
        padding-top: 15px
        border-top: 1px solid rgba(80, 80, 80, 0.3)
        &:first-child
          border-top: 1px solid transparent
  .features-list-icos
    .features-list-block
      span
        @media screen and (max-width: 760px)
          justify-content: center
          width: 100%
</style>
