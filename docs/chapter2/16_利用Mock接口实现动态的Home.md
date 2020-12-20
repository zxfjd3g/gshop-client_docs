# 16. 利用Mock接口实现动态的Home

## 16.1. 重难点说明
1. 使用swiper实现静态页面轮播
2. 解决多个swiper冲突的问题
3. 解决swiper动态页面轮播的bug
4. 定义可复用的轮播组件
5. 解决Floor组件中轮播有问题的bug

## 16.2. 下载依赖包
```shell
npm install swiper@5
```

## 16.3. 首页的ListContainer组件

```vue
<swiper class="swiper" :options="{
    autoplay: {
      disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。默认为true：停止
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true // 默认是false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }">
  <swiper-slide v-for="item in banners" :key="item.id">
    <img :src="item.imageUrl"/>
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
  <div class="swiper-button-prev" slot="button-prev"></div>
  <div class="swiper-button-next" slot="button-next"></div>
</swiper>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'ListContainer',
    computed: {
      ...mapState({
        banners: state => state.home.banners,
      })
    },
  }
</script>
```



## 16.4. 首页的Floor组件

```vue
<swiper class="swiper" :options="{
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true // 默认是false
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
}">
    <swiper-slide v-for="item in floor.carouselList" :key="item.id">
    <img :src="item.imageUrl"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
</swiper>

<script>
export default {
  name: 'Floor',
  props: {
    floor: Object
  }
}
</script>
```



## 16.5. 在Home组件中使用

```js
<!--列表-->
<ListContainer />

<!--楼层-->
<Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>

mounted () {
  // 触发vuex的异步action调用, 从mock接口请求数据到state中
  this.$store.dispatch('getBanners')
  this.$store.dispatch('getFloors')
},

computed: {
  ...mapState({
    floors: state => state.home.floors
  })
},
```


