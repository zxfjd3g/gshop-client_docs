# 15. Mock/模拟数据接口

## 15.1. 下载依赖包
```shell
npm install mockjs
```

## 15.2. Web应用前后端(台)分离

1. 后台向前台提供API接口, 只负责数据的提供和计算，而完全不处理展现
2. 前台通过Http(Ajax)请求获取数据,　在浏览器端动态构建界面显示数据

## 15.3. 设计JSON数据结构
### 1) 理解JSON数据结构
a. 结构: 名称, 数据类型
b. value
c. value可以变, 但结构不能变

### 2) 编写模拟JSON数据
a. 首页广告轮播数据: src/mock/banners.json

```
[
    {
        "id":"1",
        "imgUrl":"/images/banner1.jpg"
    },
    {
        "id":"2",
        "imgUrl":"/images/banner2.jpg"
    },
    {
        "id":"3",
        "imgUrl":"/images/banner3.jpg"
    },
    {
        "id":"4",
        "imgUrl":"/images/banner4.jpg"
    }
]
```

b. 首页楼层数据: src/mock/floors.json
```
[
  {
    "id|1-3": "001",
    "name|1": ["家用电器1", "家用电器2", "家用电器3"],
    "keywords": ["节能补贴", "4K电视", "空气净化器", "IH电饭煲", "滚筒洗衣机"],
    "imgUrl": "/images/floor-1-1.png",
    "navList": [
      {
        "url": "#",
        "text": "热门"
      },
      {
        "url": "#",
        "text": "大家电"
      },
      {
        "url": "#",
        "text": "生活电器"
      },
      {
        "url": "#",
        "text": "厨房电器"
      },
      {
        "url": "#",
        "text": "应季电器"
      },
      {
        "url": "#",
        "text": "空气/净水"
      },
      {
        "url": "#",
        "text": "高端电器"
      }
    ],
    "carouselList": [
      {
        "id": "0011",
        "imageUrl": "/images/floor-1-b01.png"
      },
      {
        "id": "0012",
        "imageUrl": "/images/floor-1-b02.png"
      }
    ],
    "recommendList": [
      "/images/floor-1-3.png",
      "/images/floor-1-2.png",
      "/images/floor-1-6.png",
      "/images/floor-1-5.png"
    ],
    "bigImg": "/images/floor-1-4.png"
  },
  {
    "id": "002",
    "name": "手机通讯",
    "keywords": ["节能补贴2", "4K电视2", "空气净化器2", "IH电饭煲2"],
    "imgUrl": "/images/floor-1-1.png",
    "navList": [{
        "url": "#",
        "text": "热门2"
      },
      {
        "url": "#",
        "text": "大家电2"
      },
      {
        "url": "#",
        "text": "生活电器2"
      },
      {
        "url": "#",
        "text": "厨房电器2"
      },
      {
        "url": "#",
        "text": "应季电器2"
      },
      {
        "url": "#",
        "text": "空气/净水2"
      },
      {
        "url": "#",
        "text": "高端电器2"
      }
    ],
    "carouselList": [{
        "id": "0011",
        "imageUrl": "/images/floor-1-b01.png"
      },
      {
        "id": "0012",
        "imageUrl": "/images/floor-1-b02.png"
      },
      {
        "id": "0013",
        "imageUrl": "/images/floor-1-b03.png"
      }
    ],
    "recommendList": [
      "/images/floor-1-2.png",
      "/images/floor-1-3.png",
      "/images/floor-1-5.png",
      "/images/floor-1-6.png"
    ],
    "bigImg": "/images/floor-1-4.png"
  }
]
```

## 15.4. 利用mockjs提供模拟数据
### 1) Mockjs

用来拦截ajax请求, 生成随机数据返回

### 2) 学习
a. http://mockjs.com/
b. https://github.com/nuysoft/Mock

## 3) 使用(mock/mockServer.js)

```js
/* 
利用mockjs来mock数据接口
*/
import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'

// 提供广告位轮播数据的接口
Mock.mock('/mock/banners',{
    code: 200,
    data: banners
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floors',{
    code: 200,
    data: floors
})
```

 

## 15.5. api/ajaxMock.js

```js
/* 
专门请求mock接口的axios封装
*/
import axios from 'axios'

const mockAjax = axios.create({
  baseURL: "/mock", // 路径前缀
  timeout: 10000 // 请求超时时间
})

mockAjax.interceptors.request.use((config) => {
  return config
})

mockAjax.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default mockAjax

```



## 15.6. api/index.js

```js
import mockAjax from './mockAjax'

// 获取广告轮播列表
export const reqBanners = ()=> mockAjax.get('/banners')
// 获取首页楼层列表
export const reqFloors = ()=> mockAjax.get('/floors')
```



## 15.7. vuex

- store/modules/home.js

```js
import { reqBaseCategoryList, reqBanners, reqFloors } from '@/api'

const state = {
  baseCategoryList: [], // 所有分类的数组
  banners: [], // 广告位轮播数据的数组
  floors: [], // 所有楼层数据的数组
}

const mutations = {
  /* 
  接收分类列表
  */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    state.baseCategoryList = list.slice(0, list.length-2)
  },

  /* 
  接收广告轮播列表
  */
  RECEIVE_BANNERS(state, banners) {
    state.banners = banners
  },

  /* 
  接收楼层列表
  */
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors
  },
}

const actions = {
  //异步获取首页所有分类
  async getBaseCategoryList({ commit }) {
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
    }
  },

  //异步获取广告位轮播数据
  async getBanners({ commit }) {
    const result = await reqBanners();
    if (result.code === 200) {
      commit('RECEIVE_BANNERS', result.data)
    }
  },

  //异步获取所有楼层数据
  async getFloors({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit('RECEIVE_FLOORS', result.data)
    }
  },
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}
```


