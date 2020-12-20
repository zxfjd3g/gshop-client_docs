# 17. Search路由

## 17.1. 重难点列表
1. 搜索查询条件参数理解与准备
2. 组件动态数据显示
3. 根据分类和关键字进行搜索
4. 根据品牌进行搜索
5. 根据属性进行搜索
6. 排序搜索
7. 自定义分页组件

##  17.2. 接口请求函数
- api/index.js

```js
// 请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)
```



##  17.3. vuex管理的搜索模块

- store/modules/search.js

```js
/* 
管理搜索模块的数据
*/
import {reqProductList} from '@/api'

const state = {
  productList: {}, // 搜索出的商品列表相关数据的对象 
}
const mutations = {
  /* 
  接收保存商品列表相关数据对象
  */
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {

  /* 
  根据指定的搜索条件, 异步获取商品列表的action
  */
  async getProductList ({commit}, searchParams) {
    // 如果不想改变组件中的options
    searchParams = {...searchParams}

    // 过滤掉searchParams对象中所有属性值为空串的属性
    // Object.keys(obj): 得到对象本身所有属性名的数组
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]==='') {
        delete searchParams[key]  // 组件中的options也改变了
      }
    })
    

    // 1. ajax请求, 获取数据
    const result = await reqProductList(searchParams)
    // 2. 如果成功, 提交给mutation
    if (result.code===200) {
      const productList = result.data
      commit('RECEIVE_PRODUCT_LIST', productList)
    }
  }
}
const getters = {
  // 返回品牌列表
  trademarkList (state) {
    return state.productList.trademarkList || []
  },

  // 返回属性列表
  attrsList (state) {
    return state.productList.attrsList || []
  },

  // 商品列表
  goodsList (state) {
    return state.productList.goodsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
```

 

##  17.4. Search的子组件: 属性选择器

- pages/Search/SearchSelector/SearchSelector.vue

```vue
<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li v-for="tm in trademarkList" :key="tm.tmId" 
            @click="setTrademark(`${tm.tmId}:${tm.tmName}`)">{{tm.tmName}}</li>
        </ul>
      </div>
    </div>
    <div class="type-wrap" v-for="attr in attrList" :key="attr.attrId">
      <div class="fl key">{{attr.attrName}}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="value in attr.attrValueList" :key="value">
            <a href="javascript:void(0);" 
               @click="addProp(attr.attrId, value, attr.attrName)">{{value}}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
   
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'SearchSelector',

    props: {
      setTrademark: Function,  // 是用于更新父组件的trademark数据的函数
      addProp: Function, // 是用于更新父组件的props数据的函数
    },

    computed: {
      ...mapState({
        trademarkList: state => state.search.productList.trademarkList,  // 品牌列表
        attrList: state => state.search.productList.attrsList, // 属性列表
      })
    }
  }
</script>

<style lang="less" scoped>
  .selector {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    overflow: hidden;

    .logo {
      border-top: 0;
      margin: 0;
      position: relative;
      overflow: hidden;

      .key {
        padding-bottom: 87px !important;
      }
    }

    .type-wrap {
      margin: 0;
      position: relative;
      border-top: 1px solid #ddd;
      overflow: hidden;

      .key {
        width: 100px;
        background: #f1f1f1;
        line-height: 26px;
        text-align: right;
        padding: 10px 10px 0 15px;
        float: left;
      }

      .value {
        overflow: hidden;
        padding: 10px 0 0 15px;
        color: #333;
        margin-left: 120px;
        padding-right: 90px;

        .logo-list {
          li {
            float: left;
            border: 1px solid #e4e4e4;
            margin: -1px -1px 0 0;
            width: 105px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
            color: #e1251b;
            font-style: italic;
            font-size: 14px;

            img {
              max-width: 100%;
              vertical-align: middle;
            }
          }
        }

        .type-list {
          li {
            float: left;
            display: block;
            margin-right: 30px;
            line-height: 26px;

            a {
              text-decoration: none;
              color: #666;
            }
          }
        }
      }

      .ext {
        position: absolute;
        top: 10px;
        right: 10px;

        .sui-btn {
          display: inline-block;
          padding: 2px 14px;
          box-sizing: border-box;
          margin-bottom: 0;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          padding: 0 10px;
          background: #fff;
          border: 1px solid #d5d5d5;
        }

        a {
          color: #666;
        }
      }
    }
  }
</style>

```



##  17.5. 通用的分页组件Pagination

### 1) 静态组件

```vue
<template>
  <div class="pagination">
    <button>1</button>
    <button>上一页</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
    
    <button>···</button>
    <button>9</button>
    <button>上一页</button>
    
    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
```

### 2) 动态组件

```vue
<template>
  <div class="pagination">
    <!-- 当前页码等于1就不可操作 -->
    <button :disabled="mcPage===1" @click="changeCurrentPage(mcPage-1)">上一页</button>
    <!-- 只有start大于1 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 只有start大于2 -->
    <button disabled v-if="startEnd.start>2">···</button>

    <!-- 连续页码 -->
    <button v-for="item in startEnd.end" v-if="item>=startEnd.start" :key="item"
      @click="changeCurrentPage(item)" :class="{active: mcPage===item}">
      {{item}}
    </button>
    <!-- 只有end<totalPages-1才显示  -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 只有end<totalPages才显示 -->
    <button v-if="startEnd.end<totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!-- 当前页码等于总页码就不可操作 -->
    <button :disabled="mcPage===totalPages" @click="changeCurrentPage(mcPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      currentPage: { // 当前页码
        type: Number,
        default: 1
      },
      pageSize: { // 每页数量
        type: Number,
        default: 5
      },
      total: { // 总数量
        type: Number,
        default: 0
      },
      showPageNo: { // 连续页码数
        type: Number,
        default: 5
      }
    },

    data () {
      return {
        mcPage: this.currentPage  // 保存自己的当前页码
      }
    },

    computed: {

      /* 
      总页码数
      依赖数据: 
        总数量: total    
        每页数量: pageSize  
      */
      totalPages () {
        // 取出依赖数据   31 5 ==> 7
        const {total, pageSize} = this
        // 返回计算后的结果
        return Math.ceil(total/pageSize)
      },

      /* 
      返回连续页码的开始页码(start)与结束页码(end): 
      比如: {start: 3, end: 7}
      依赖数据:
          当前页码: mcPage
          最大连续页码数: showPageNo
          总页码数: totalPages
      注意:
          start的最小值为1
          end的最大值为totalPages
          start与end之间的最大差值为showPageNo-1
      */
      startEnd () {
        const {mcPage, showPageNo, totalPages} = this

        // 计算start
        /* 
        mcPage showPageNo totalPages     start到end
          4        5          10           23[4]56
        */
        let start = mcPage - Math.floor(showPageNo/2)  // 4 - 2
        /* 
        mcPage showPageNo totalPages  start到end
          2        5          10         1[2]345
        但start上面计算得到是: 0
        */
        // start的最小值是1, 如果小于1, 修正为1
        if (start<1) {
          start = 1
        }

        // 计算end
        /* 
        mcPage showPageNo totalPages     start到end
          4        5          10           23[4]56
        */
        // start与end之间的最大差值为showPageNo-1
        let end = start + showPageNo - 1    // 2 + 5 -1


        /* 
        mcPage showPageNo totalPages     start到end
          4        5          5           123[4]5
        但上面计算的end为6, 应该为5    ==> end = totalPages
                   start为2, 应该为1  ==> start = end - showPageNo + 1
        */
        // 如果end超过了totalPages, 修正为totalPages
        if (end > totalPages) {
          end = totalPages
          // 根据最大连续页码修正start
          start = end - showPageNo + 1

          /* 
           mcPage showPageNo totalPages     start到end
              4        5          4           123[4]
            上面计算
                start为0  应该为1
                end为4   没问题
          */
          // start不能小于最小值1
          if (start<1) {
            start = 1
          }
        }

        return {start, end}
      }
    },

    watch: {
      /*
      当接收的currentPage发生改变时调用 
       */
      currentPage (value) {
        // 将当前页码指定为外部传入的值
        this.mcPage = value
      }
    },

    methods: {

      /* 
      将当前页码改为指定页码
      */
      changeCurrentPage (page) {
        // 修改当前页码
        this.mcPage = page
        // 通知外部父组件
        this.$emit('currentChange', page)
      }
    },
  }
</script>
```

### 3) 注册为全局组件

```js
import Pagination from './components/Pagination'

Vue.component(Pagination.name, Pagination) // 全局使用<Pagination/> <pagination/>
```



##  17.6. TypeNav组件

```js
/* 
点击某个分类项跳转到search路由
*/
toSearch(event) { // 只绑定的一个点击监听
  // console.dir(event.target)
  // 得到所有标签上的data自定义属性
  const dataset = event.target.dataset
  // console.log('dataset', dataset)
  // 取出自定义属性值
  const {
    categoryname,
    category1id,
    category2id,
    category3id
  } = dataset

  //if (event.target.tagName==='A') { // 如果点击的是a标签就可以跳转了
  if (categoryname) { // 必然点击的是分类项
    // 准备query参数对象
    const query = {
      categoryName: categoryname
    }
    if (category1id) {
      query.category1Id = category1id
    } else if (category2id) {
      query.category2Id = category2id
    } else if (category3id) {
      query.category3Id = category3id
    }

    // 得到当前路由路径     /  或者 /search 或者 /search/xxx
    const {
      path,
      params
    } = this.$route

    this.hideFirst()

    // 如果当前已经在搜索界面
    if (path.indexOf('/search') === 0) {
      // 跳转到搜索, path为原本的路径(可能携带了params参数)
      this.$router.replace({
        name: 'search',
        params,
        query
      })
    } else { // 当前没在搜索界面
      // 跳转路由, 并携带query参数
      this.$router.push({
        path: '/search',
        query
      })
    }
  }
},
```



##  17.7. Header组件

```js
mounted () {
  // 通过全局总线绑定removeKeyword事件监听
  this.$bus.$on('removeKeyword', () => {
    this.keyword = ''  // 置空我们的搜索关键字
  })
},


toSearch () {
  // 得到当前的请求路径和query参数对象
  const {path, query} = this.$route
  if (this.keyword) {
    // 如果当前在搜索页面, 需要携带params和query参数
    if (path.indexOf('/search')===0) {
      this.$router.push({
        name: 'search',
        params: {keyword: this.keyword},
        query
      })  // 可以
    } else {  // 如果不在, 只需要携带params参数
      this.$router.push({name: 'search', params: {keyword: this.keyword}})  // 可以
    }
  } else {
    if (path.indexOf('/search')===0) {
      this.$router.push({name: 'search', query})
    } else {
      this.$router.push({name: 'search'})
    }
  }
}
```



##  17.8. Search路由组件

```vue
<template>
  <div>
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>

            <li class="with-x" v-for="(prop, index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :addProp="addProp"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: options.order.indexOf('1')===0}" @click="setOrder('1')">
                  <a href="javascript:">
                    综合
                    <!-- 1:desc icondown 1:asc iconup  其它不显示 -->
                    <i class="iconfont" :class="orderIcon" v-if="options.order.indexOf('1')===0"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:">销量</a>
                </li>
                <li>
                  <a href="javascript:">新品</a>
                </li>
                <li>
                  <a href="javascript:">评价</a>
                </li>
                <li :class="{active: options.order.indexOf('2')===0}" @click="setOrder('2')">
                  <a href="javascript:">
                    价格
                    <i class="iconfont" :class="orderIcon" v-if="options.order.indexOf('2')===0"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in productList.goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          <Pagination 
            :currentPage="options.pageNo" 
            :pageSize="options.pageSize" 
            :total="productList.total"
            :showPageNo="5"
            @currentChange="getProductList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    // props: ['keyword3', 'keyword4'],

    data () {
      return {
        // 包含所有用于搜索请求的参数数据的对象
        options: {
          category1Id: '', // 一级分类ID
          category2Id: '', // 二级分类ID
          category3Id: '', // 三级分类ID
          categoryName: '', // 分类名称
          keyword: '', // 关键字
          trademark: '', // 品牌  "ID:品牌名称"
          props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
          order: '2:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
          pageNo: 1, // 当前页码
          pageSize: 5, // 每页数量
        }
      }
    },

    computed: {
      ...mapState({
        productList: state => state.search.productList
      }),

      /* 
      返回排序方式的图标类名
      */
      orderIcon () {
        return this.options.order.split(':')[1]==='desc' ? 'icondown' : 'iconup'
      }
    },

    watch: {
      /* 
      当路由跳转时只有路由参数发生了变化
      */
      $route () {
        // 更新options
        this.updateOptions()
        // 请求获取数据
        this.getProductList()
      }
    },

    /* 
    放初始同步更新data数据的代码
    */
    beforeMount () {
      this.updateOptions()
    },

    /* 
    初始异步更新的代码
    */
    mounted () {
      console.log('Search mounted()')
      /* this.$store.dispatch('getProductList', {
        "category3Id": "61",
        "categoryName": "手机",
        "keyword": "小米",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 10,
        "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
        "trademark": "4:小米"
      }) */

      // this.$store.dispatch('getProductList', this.options)
      this.getProductList()

      /* 
      const obj1 = {a: 1, b: 2, c: 3}
      const obj2 = {b: 4, d: 5}
      const obj3 = {...obj1, ...obj2, d: 6}   // {a: 1, b: 4, c: 3, d: 6}
      */

    },

    methods: {

      /* 
      异步获取指定页码(默认为1)的数据数据
      */
      getProductList (currentPage=1) {
        this.options.pageNo = currentPage
        this.$store.dispatch('getProductList', this.options)
      },

      /* 
      设置新的排序方式
      */
      setOrder (newOrderFlag) {// orderFlag为1/2
        let [orderFlag, orderType] = this.options.order.split(':')
        if (newOrderFlag===orderFlag) {
          orderType = orderType==='desc' ? 'asc' : 'desc'
        } else {
          orderFlag = newOrderFlag
          orderType = 'desc'
        }
        this.options.order = orderFlag + ':' + orderType

        this.getProductList()
      },

      /* 
      删除指定下标的属性条件
      */
      removeProp (index) {
        // 删除对应的prop
        this.options.props.splice(index, 1)
        // 重新请求数据显示
        this.getProductList()
      },

      /* 
      添加一个属性条件
      */
      addProp (attrId, value, attrName) {

        // 组装prop
        const prop = `${attrId}:${value}:${attrName}`

        // 如果已经添加过了当前属性, 直接结束
        // ["属性ID:属性值:属性名"]
        if (this.options.props.indexOf(prop)!==-1) return

        // 向options中的props添加一个prop
        this.options.props.push(prop)

        // 重新请求数据显示
        this.getProductList()
      },

      /* 
      设置新的品牌条件数据
      */
      setTrademark (trademark) {
        // 更新options中的trademark
        this.options.trademark = trademark
        // 重新请求获取商品列表显示
        this.getProductList()
      },

      /* 
      移除品牌搜索条件
      */
      removeTrademark () {
        // 重置trademark数据
        this.options.trademark = ''

        // 重新请求获取商品列表显示
        this.getProductList()
      },

      /* 
      移除分类的搜索条件
      */
      removeCategory () {
        // 重置分类的条件数据
        this.options.categoryName = ''
        this.options.category1Id = ''
        this.options.category2Id = ''
        this.options.category3Id = ''
        // 重新获取数据
        // this.$store.dispatch('getProductList', this.options) // 不可以
        // 重新跳转到当前路由, 不再携带query参数, 只携带原本的params参数
        this.$router.replace(this.$route.path)  
          // $route.path不带query参数, 但带params参数(如果有)
      },

      /* 
      移除关键字的搜索条件
      */
      removeKeyword () {
        // 重置分类的条件数据
        this.options.keyword = ''
        // 重新获取数据
        // this.$store.dispatch('getProductList', this.options) // 不可以

        // 重新跳转到当前路由, 不再携带params参数, 只携带原本的query参数
        this.$router.replace({name: 'search', query: this.$route.query})

        // 通知Header组件也删除输入的关键字
        // 在Search, 通过事件总线对象来分发事件
        this.$bus.$emit('removeKeyword')
      },

      /* 
      根据query和params来更新options数据
      */
      updateOptions () {
        // 根据query和params更新options
        const {categoryName, category1Id, category2Id, category3Id} = this.$route.query
        const {keyword} = this.$route.params
        this.options = {
          ...this.options,
          categoryName,
          category1Id,
          category2Id,
          category3Id,
          keyword,
        }
      },

      /* handleCurrentChange (currentPage) {
        this.options.pageNo = currentPage
        this.$store.dispatch('getProductList', this.options)
      } */
    },

    components: {
      SearchSelector
    }
  }
</script>
```



##  17.9. 使用阿里的iconfont

1. 在线地址: https://www.iconfont.cn/

2. 注册并登陆

3. 创建一个可以包含需要的所有图标的项目

4. 搜索图标并添加到购物车

5. 将购物车中的图标添加到指定项目

6. 修改图标的名称

7. 选择Font class的使用方式, 并点击生成在线样式url

8. 在index页面中引入此图标的在线样式链接: 

   ```html
   <link rel="stylesheet" href="http://at.alicdn.com/t/font_1766283_dobjk7xxze7.css">
   ```

9. 在组件中使用

- <i class=”iconfont icondown”>

- 可以通过color改变颜色, 通过font-size改变大小