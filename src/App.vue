<template lang="pug">
.bg-light.py-5
  header.container
    ul.nav.float-right
      li
        a.btn.btn-primary.btn-sm(href="https://github.com/Wxh16144/vue-marquee-component") Github
    h1 vue-marquee-component
    .d-flex.flex-wrap
      a(href="https://www.npmjs.com/package/vue-marquee-component")
        img.m-1(src="https://img.shields.io/npm/v/vue-marquee-component.svg?style=for-the-badge", alt="vue-marquee-component npm")
      a(href="https://www.npmjs.com/package/vue-marquee-component")
        img.m-1(src="https://img.shields.io/npm/dt/vue-marquee-component.svg?        style=for-the-badge", alt="vue-marquee-component npm")

  hr

  .container
    .m-3
      h5.mb-3.text-body review
        var.ml-1.font-weight-lighter showProgress=false
      vue-marquee.h-33.shadow-sm.mb-5.bg-white.rounded(key="text", :showProgress="false")
        vue-marquee-slide.p-1(v-for="(item, index) in lists", :key="index")
          span.p-2.text-uppercase 🔥🔥vue-marquee-component

  .container
    .m-3
      h5.mb-3.text-body review
        var.ml-1.font-weight-lighter direction=right
        var.ml-1.font-weight-lighter showProgress=false
      vue-marquee.h-33.shadow-sm.mb-5.bg-white.rounded(key="emoji", direction="right", :showProgress="false")
        vue-marquee-slide.p-1(v-for="(item, index) in emojiList", :key="index")
          span.pl-3.pr-3 {{ item }}

  main.container
    .m-3
      h5.mb-3.text-body Right to Left
        var.ml-1.font-weight-lighter direction=left
        span.ml-1.badge.badge-primary default
      vue-marquee.h-300.shadow-sm.mb-5.bg-white.rounded(key="default")
        vue-marquee-slide(v-for="(item, index) in lists", :key="index")
          .mask(:text="index")
            img.size-268(:src="readmeImageByMyWeb()")
    
    .m-3
      h5.mb-3.text-body Left to Right 
        var.font-weight-lighter direction=right
      vue-marquee.h-300.shadow-sm.mb-5.bg-white.rounded(key="right", direction="right")
        vue-marquee-slide(v-for="(item, index) in lists", :key="index")
          .mask(:text="index")
            img.size-268(:src="readmeImageByMyWeb()")

    .m-3
      .d-flex.justify-content-around
        div
          h5.mb-3.text-body Top to Bottom 
            var.font-weight-lighter direction=bottom
          vue-marquee.w-330.h-600.shadow-sm.mb-5.bg-white.rounded(key="bottom", direction="bottom")
            vue-marquee-slide(v-for="(item, index) in lists", :key="index")
              .mask(:text="index")
                img.size-290(:src="readmeImageByMyWeb()")
        div
          h5.mb-3.text-body Bottom to Top  
            var.font-weight-lighter direction=top
          vue-marquee.w-330.h-600.shadow-sm.mb-5.bg-white.rounded(key="top", direction="top",)
            vue-marquee-slide(v-for="(item, index) in lists", :key="index")
              .mask(:text="index")
                img.size-290(:src="readmeImageByMyWeb()")

        div
          h5.mb-3.text-secondary Random child height
            var.ml-1.font-weight-lighter direction=bottom
          vue-marquee.w-360.h-600.shadow-sm.mb-5.bg-white.rounded(key="randomHeight", direction="bottom")
            vue-marquee-slide.slide(v-for="(item, index) in lists", :key="index")
              div.mask.w-360(:style="{height:`${randomNumber(80,280)}px`}", :text="index") {{ item }}
    
    hr
  
    .m-3
      h5.mb-3.text-secondary Random child width
        var.ml-1.font-weight-lighter duration=10000
      vue-marquee.h-300.shadow-sm.mb-5.bg-white.rounded(key="randomWidth", :duration="10000")
        vue-marquee-slide.slide(v-for="(item, index) in lists", :key="index")
          div.mask.h-268(:style="{width:`${randomNumber(100,350)}px`}", :text="index") {{ item }}

  .text-center 
    span.mr-1 ❤ 
    span.text-secondary
      span.mr-1 By:
      a.text-secondary.font-italic(href="https://github.com/wxh16144", target="_blank")  Wuxh
</template>

<script>
import Marquee from "@/components/Marquee"
import Slide from "@/components/Slide"
import { randomNumber, randomColor } from "@/utils"
export default {
  name: "App",
  components: {
    [Marquee.name]: Marquee,
    [Slide.name]: Slide
  },
  data() {
    return {
      IMGURL: `https://via.placeholder.com/`,
      MYWEBIMG: `https://raw.githubusercontent.com/Wxh16144/img/master/`,
      lists: Array(randomNumber(10, 25)),
      emojiList: [
        "🥺",
        "💗",
        "❤️",
        "😤",
        "😽",
        "🥴",
        "🦷",
        "👩",
        "🦸‍♀️",
        "🙇",
        "🏃‍♀️",
        "👩‍👩‍👧",
        "🙉",
        "🐌",
        "🐇",
        "🐫",
        "🍂",
        "🌿",
        "💨",
        "💥",
        "🌮",
        "🍅",
        "🍼",
        "🍣",
        "🍷",
        "⛳️",
        "🚜",
        "🚆",
        "🏯",
        "🌇",
        "🎑",
        "📞",
        "💳",
        "🪑",
        "🕳",
        "📐",
        "📊"
      ]
    }
  },
  methods: {
    randomNumber,
    randomColor,
    readmeImageByMyWeb() {
      return `${this.MYWEBIMG}${String.fromCharCode(randomNumber(98, 117))}.jpg`
    }
  }
}
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
<style lang="stylus" scoped>
.slide
  div
    background-color #007dff

  &:nth-of-type(odd) div
    background-color #17a2b8

for s in 1...800
  .h-{s}
    height s * 1px

  .w-{s}
    width s * 1px

  .size-{s}
    @extend .w-{s}
    @extend .h-{s}

.mask
  position relative

  &:after
    content attr(text)
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    display flex
    align-items center
    justify-content center
    font-size 36px
    font-weight bold
    color #fff
    background-color rgba(0, 0, 0, 0.1)
    transition all 0.3s

  &:hover:after
    background-color transparent
    color #333
</style>

