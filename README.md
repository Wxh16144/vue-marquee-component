# vue-marquee-component

[![npm](https://img.shields.io/npm/v/vue-marquee-component.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-marquee-component)
[![npm](https://img.shields.io/npm/dt/vue-marquee-component.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-marquee-component)

## Demo

[Demo here](https://wxh16144.github.io/vue-marquee-component/)

## Install

```bash
  npm install vue-marquee-component --save
```

## Usage

The most common use case is to register the component globally.

```js
// in your main.js or similar file
import Vue from 'vue';
import VueMarquee from 'vue-marquee-component';

Vue.use(VueMarquee);
```

Alternatively you can do this to register the components:

```js
// HelloWorld.vue
import { Marquee, Slide } from 'vue-marquee-component';

export default {
  components: {
    [Marquee.name]: Marquee,
    [Slide.name]: Slide
  }
};
```

On your page you can now use html like this:

```html
<!-- simple marquee text -->
<vue-marquee style="height:50px">
  <vue-marquee-slide v-for="i in 30" :key="i">
    <span> VUE-MARQUEE-COMPONENT </span>
  </vue-marquee-slide>
</vue-marquee>

<!-- Set different directions -->
<!-- left 、 right 、 top 、bottom  -->
<vue-marquee style="height:150px" direction="right">
  <vue-marquee-slide v-for="i in 30" :key="i">
    <div style="width:200px;height:150px">{{ i }}</div>
  </vue-marquee-slide>
</vue-marquee>

<!-- Hide scrollbar -->
<vue-marquee style="height:28px" :showProgress="false">
  <vue-marquee-slide v-for="i in 30" :key="i">
    <span> VUE-MARQUEE-COMPONENT </span>
  </vue-marquee-slide>
</vue-marquee>

<!-- fast duration -->
<vue-marquee style="height:28px" :showProgress="false" :duration="52011">
  <vue-marquee-slide v-for="i in 99" :key="i">
    <span style="padding:0 15px"> 👧 ❤️ 👦 </span>
  </vue-marquee-slide>
</vue-marquee>

<!-- Insert any node -->
<vue-marquee>
  <vue-marquee-slide v-for="item in list" :key="item.id">
    <!-- The component you want to display -->
  </vue-marquee-slide>
</vue-marquee>
```

## Props

| Prop         | Type    | Default            | Description                                        |
| ------------ | ------- | ------------------ | -------------------------------------------------- |
| direction    | string  | left               | Move a few degrees (`left` `right` `top` `bottom`) |
| duration     | Number  | Total length \* 30 | Marquee rolling direction                          |
| showProgress | Boolean | true               | Whether to show the progress bar                   |

## Important information for dynamic content

If you change the content you need reload the component. For this use property `:key` [see more](https://vuejs.org/v2/api/#key)

```html
<!-- parse a unique key for reload the component  -->
<vue-marquee :key="currentTrack.id">
  <vue-marquee-slide>
    {{ currentTrack.title }}
  </vue-marquee-slide>
</vue-marquee>
```
