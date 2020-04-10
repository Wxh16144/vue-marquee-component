/*
 * @Author: Wuxiaohong (wxh1220@gmail.com)
 * @Date: 2020-04-07 15:00:16
 * @Last Modified by: Wuxiaohong
 * @Last Modified time: 2020-04-10 14:58:40
 * @功能:
 * @简介: 跑马灯组件slide组件
*/

<script>
export default {
  name: "vue-marquee-slide",
  render(createElement) {
    return createElement(
      "div",
      {
        class: "marquee-slide"
      },
      this.$slots.default
    )
  }
}
</script>

