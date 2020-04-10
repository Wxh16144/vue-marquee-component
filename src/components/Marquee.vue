/*
 * @Author: Wuxiaohong (wxh1220@gmail.com)
 * @Date: 2020-04-07 15:01:00
 * @Last Modified by: Wuxiaohong
 * @Last Modified time: 2020-04-11 00:23:22
 * @功能:
 * @简介: 跑马灯组件
*/

<template lang="pug">
.marquee-container(
  @mouseenter="enter"
  @mouseleave="leave",
  :direction="direction",
  :style="formatStyle")
  slot
  vue-slider.marquee-progress(
    v-if="isRolling && showProgress"
    v-model="progress",
    :class="{vertical: isVertical}",
    :direction="sliderDirection",
    :process-style="processStyle",
    :width="isVertical ? 4 : elWidth-100",
    :height="isVertical ? elHeight - 66 : 4",
    :dotSize="isVertical ? [ 8, 66] : [99,8] ",
    @change="sliderChangeHandler"
    tooltip="none")
</template>

<script>
import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/antd.css"
import anime from "animejs/lib/anime.es.js"
import { findComponentDownward, findBrothersComponents } from "@/utils"
import { map, max, sumBy } from "lodash"

export default {
  name: "vue-marquee",
  props: {
    /** 方向 */
    direction: {
      type: String,
      validator(val) {
        return ["left", "top", "right", "bottom"].includes(val)
      },
      default: () => "left"
    },
    /** 是否展示进度条 */
    showProgress: {
      type: Boolean,
      default: () => true
    },
    /** 执行一周需要的时间 */
    duration: {
      type: Number,
      validator(val) {
        return !Number.isNaN(val) && typeof val === "number"
      }
    }
  },
  data() {
    return {
      track: [],
      // 进度条
      progress: 0,
      // 动画实例
      instance: null,
      // 容器宽度
      elWidth: 0,
      // 容器高度
      elHeight: 0,
      // 所有子元素尺寸
      clientRect: [],
      // 进度条样式
      processStyle: {
        backgroundColor: "#f3f3f3"
      }
    }
  },
  components: { VueSlider },
  computed: {
    /** 元素最宽度 */
    maxWidth() {
      return max(map(this.clientRect, "width"))
    },
    /** 元素最大高度 */
    maxHeight() {
      return max(map(this.clientRect, "height"))
    },
    /** 总宽度 */
    totalWidth() {
      return sumBy(this.clientRect, "width")
    },
    /** 总长度 */
    totalHeight() {
      return sumBy(this.clientRect, "height")
    },
    /** 是否垂直 */
    isVertical() {
      return ["top", "bottom"].includes(this.direction)
    },
    /** 是否开启滚动 */
    isRolling() {
      const _len = this.clientRect.length > 1
      if (this.isVertical) {
        return this.totalHeight > this.elHeight && _len
      } else {
        return this.totalWidth > this.elWidth && _len
      }
    },
    /** 计算样式 */
    formatStyle() {
      const status = this.isRolling ? "hidden" : "auto"
      return this.isVertical ? { overflowY: status } : { overflowX: status }
    },
    /** 进度条方向 */
    sliderDirection() {
      const _map = {
        left: "ltr",
        right: "rtl",
        top: "ttb",
        bottom: "btt"
      }
      return _map[this.direction]
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      const { width, height } = this.$el.getBoundingClientRect()
      this.elWidth = width
      this.elHeight = height
      this.clientRect = this.childrenClientRect()
      if (this.isRolling) {
        this.init()
        this.initAnime()
      }
    })
  },
  methods: {
    /** 鼠标移入 */
    enter() {
      if (this.isRolling && this.instance) {
        this.instance.pause()
      }
    },
    /** 鼠标离开 */
    leave() {
      if (this.isRolling && this.instance) {
        this.instance.play()
      }
    },
    /** 滚动条 */
    sliderChangeHandler(val) {
      if (this.instance) {
        const { duration } = this.instance
        this.instance.seek(duration * (val / 100))
      }
    },
    /** 获取所有跑马灯子元素 */
    children() {
      return findBrothersComponents(
        findComponentDownward(this, "vue-marquee-slide"),
        "vue-marquee-slide",
        false
      )
    },
    /** 获取子元素的尺寸 */
    childrenClientRect() {
      return this.children().map(({ $el }) => {
        return $el.getBoundingClientRect()
      })
    },
    /** 初始化 */
    init() {
      this.children().forEach(({ $el }, index) => {
        const _map = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom"
        }
        $el.style[_map[this.direction]] = `-${
          this.isVertical ? this.maxHeight : this.maxWidth
        }px`
        $el.style["position"] = "absolute"
        const unit = this.isVertical ? "height" : "width"
        this.track[index] = {
          value: sumBy(this.clientRect.slice(0, index), unit)
        }
      })
    },
    /** 初始化动画 */
    initAnime() {
      const elements = this.children().map(({ $el }) => $el)
      const duration = this.isVertical ? this.totalHeight : this.totalWidth
      const option = Object.assign({
        targets: this.track,
        duration: this.duration || duration * 30,
        autoplay: true,
        loop: true,
        easing: "linear",
        value: ({ value }) => {
          switch (this.direction) {
            case "left":
              return value - this.totalWidth
            case "right":
              return value + this.totalWidth
            case "top":
              return value - this.totalHeight
            case "bottom":
              return value + this.totalHeight
            default:
              return value
          }
        },
        update: anim => {
          this.progress = anim.progress
          anime.set(elements, {
            translateX: (target, i) => {
              switch (this.direction) {
                case "left":
                  return (
                    ((this.track[i].value - this.totalWidth) %
                      this.totalWidth) +
                    this.clientRect[i].width
                  )
                case "right":
                  return (
                    ((this.track[i].value + this.maxWidth) % this.totalWidth) -
                    this.elWidth
                  )
                default:
                  return 0
              }
            },
            translateY: (target, i) => {
              switch (this.direction) {
                case "top":
                  return (
                    ((this.track[i].value - this.totalHeight) %
                      this.totalHeight) +
                    this.clientRect[i].height
                  )
                case "bottom":
                  return this.track[i].value % this.totalHeight
                default:
                  return 0
              }
            }
          })
        }
      })
      this.instance = anime(option)
    }
  },
  watch: {},
  beforeDestroy() {}
}
</script>

<style scoped lang="stylus">
.marquee
  &-container
    position relative
    height 100%

    &:hover
      .marquee-progress
        visibility visible
        opacity 1

  &-slide
    display inline-block !important

  &-progress
    z-index 99
    position relative
    top calc(100% - 22px)
    left 50px
    height 3px
    transition opacity 0.3s
    visibility hidden
    opacity 0

    >>>.vue-slider-dot
      &-handle
        border 0
        background-color #ddd
        border 0
        border-radius 6px

        &-focus
          box-shadow none !important

    &.vertical
      top 33px
      left calc(100% - 30px)

      >>>.vue-slider-dot
        &-handle
          border 0
          background-color #ddd
          border 0
          border-radius 6px

          &-focus
            box-shadow none !important
</style>
