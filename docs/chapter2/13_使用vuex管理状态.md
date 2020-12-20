# 13. 使用vuex管理状态

## 13.1. 下载依赖包
```shell
npm install vuex
```

## 13.2. store/modules/home.js
```js
/* 
vuex管理的home模块
*/
import {reqBaseCategoryList} from '@/api'

const state = {
  baseCategoryList: [], // 所有分类的数组
}

const mutations = {
  /* 
  接收保存分类列表
  */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    state.baseCategoryList = list
  }
}

const actions = {
  /* 
  异步获取商品三级分类列表
  */
  async getBaseCategoryList({ commit }) {
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
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

## 13.3. store/modules/index.js
```js
/* 
收集所有vuex管理的模块
*/
import home from './home'
// 向外暴露包含所有vuex管理的模块的对象
export default{
  home,
}
```

## 13.4. store/index.js
```js
/* 
Vuex最核心的管理对象store
*/
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

// 声明使用vuex插件
Vue.use(Vuex)

// 向外暴露store对象
export default new Vuex.Store({
  modules, // 配置store的所有模块
})
```

## 13.5. 注册store
- main.js
```js
import store from './store'

new Vue({
  store, // 注册vuex的store对象  ==> 所有组件对象都有一个$store属性
})
```

 