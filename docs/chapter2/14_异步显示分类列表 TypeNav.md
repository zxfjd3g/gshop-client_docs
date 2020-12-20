# 14. 异步显示分类列表: TypeNav

## 14.1. 重难点说明

1. 组件与vuex交互
2. 事件控制二三级分类列表的显示与隐藏
3. 优化高频事件触发处理: 利用lodash进行函数节流处理
4. 优化减小打包文件: 对lodash库实现按需引入 
5. 解决快速移出后可能显示第一个分类的子分类列表的bug
6. 优化减少组件对象数量: 使用编程式导航代替声明式导航
7. 优化事件处理效率: 利用事件委托
8. 利用标签自定义属性携带动态数据
9. 控制一级列表的显示与隐藏
10. 一级列表显示隐藏的过渡效果
11. 优化请求执行的位置, 减少请求次数
12. 合并分类query参数与搜索的关键字params参数

## 14.2. 编码实现
```vue
<template>
  <div class="type-nav">
    <div class="container" @mouseenter="isShow=true" @mouseleave="hideCategorys">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-if="isShow">
        <div class="all-sort-list2" @click="toSearch">
          <div class="item" 
               v-for="(c1, index) in baseCategoryList" 
               :key="c1.categoryId"
               :class="{'item-on': index===currentIndex}" 
               @mouseenter="showCategorys(index)">
            <h3>
              <!-- <router-link :to="{path: '/search', query:{categoryName: c1.categoryName}}">{{c1.categoryName}}</router-link> -->
              <a href="javascript:" 
                :data-categoryName="c1.categoryName" 
                :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" 
                    v-for="(c2, index) in c1.categoryChild" 
                    :key="c2.categoryId">
                  <dt>
                    <!-- <router-link :to="{path: '/search', query:{categoryName: c2.categoryName}}">{{c2.categoryName}}</router-link> -->
                    <a href="javascript:" 
                      :data-categoryName="c2.categoryName"
                      :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>

                  <dd>
                    <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                      <!-- <router-link :to="{path: '/search', query:{categoryName: c3.categoryName}}">{{c3.categoryName}}</router-link> -->
                      <a href="javascript:" 
                        :data-categoryName="c3.categoryName"
                        :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // import _ from 'lodash'
  import throttle from 'lodash/throttle'
  export default {
    name: 'TypeNav',

    data () {
      return {
        currentIndex: -1, // 当前一级分类的下标(基2/3级分类需要显示)
        isShow: false, // 是否显示一级列表
      }
    },

    mounted () {
      // 如果请求的路径是根路径则显示一级分类列表
      this.isShow = this.$route.path==='/'

      // 异步获取所有分类列表数据  
      // this.$store.dispatch('getBaseCategoryList') // 在App组件中执行, 减少请求的次数
    },

    computed: {
      // 从vuex管理的state中读取数据到当前组件
      ...mapState({
        // 读取home模块的所有分类数组
        baseCategoryList: state => state.home.baseCategoryList
      })
    },

    methods: {
      /* 
      显示当前分类的下级分类列表 (不做节流处理)
      */
      /* 
      showCategorys (index) {
        console.log('showCategorys', index)

        this.currentIndex = index
      }, 
      */

      /* 
      显示当前分类的下级分类列表 (使用lodash做节流处理)
      */
      // showCategorys: _.throttle(function (index) {
      showCategorys: throttle(function (index) {
        // console.log('showCategorys', index)
        this.currentIndex = index
      }, 200), // 间隔时间为200ms

      /* 
      隐藏显示的2/3级分类列表
      */
      hideCategorys () {
        this.currentIndex = -1
        // 如果当前不是是home就隐藏一级分类列表
        if (this.$route.path!=='/') {
          this.isShow = false
        }
      },

      toSearch (event) {
        // 得到事件源标签上的自定义属性
        const { categoryname, category1id, category2id, category3id } = 
              event.target.dataset
        // console.log(categoryname)
        // 如果有分类名称, 说明点击的是某个分类项
        if (categoryname) {
          // 准备query参数
          const query = {categoryName: categoryname}
          if (category1id) {
            query.category1Id = category1id
          } else if (category2id) {
            query.category2Id = category2id
          } else if (category3id) {
            query.category3Id = category3id
          }
          // 跳转到搜索路由, 携带准备的query参数
          this.$router.push({path: '/search', query})
        }
      }
    }
  }
</script>
```
