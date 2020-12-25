(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{357:function(t,e,a){t.exports=a.p+"assets/img/component&vm.b687475e.png"},397:function(t,e,a){"use strict";a.r(e);var n=a(40),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"vue组件间通信-简版"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue组件间通信-简版"}},[t._v("#")]),t._v(" vue组件间通信_简版")]),t._v(" "),n("h2",{attrs:{id:"_1-通信方式列表"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-通信方式列表"}},[t._v("#")]),t._v(" 1. 通信方式列表:")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("\t1) props\n\t2) vue自定义事件\n\t3) 全局事件总线\n\t4) v-model\n\t5) .sync\n\t6) $attrs与$listeners\n\t7) $ref & $children & $parent\n\t8) provide与inject\n\t9) Vuex\n\t10) 插槽 ==> 作用域插槽\n")])])]),n("h2",{attrs:{id:"_2-根据通信的2个组件间的关系来选择一种通信方式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-根据通信的2个组件间的关系来选择一种通信方式"}},[t._v("#")]),t._v(" 2. 根据通信的2个组件间的关系来选择一种通信方式")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("父子\n\t\tprops\n\t\tvue自定义事件\n\t\tv-model\n\t\t.sync\n\t\t$ref, $children与$parent\n\t\t插槽 ==> 作用域插槽\n\t祖孙\n\t\t$attrs与$listeners\n\t\tprovide与inject\n\t兄弟或其它/任意\n\t\t全局事件总线\n\t\tVuex\n")])])]),n("h2",{attrs:{id:"_3-方式一-props"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-方式一-props"}},[t._v("#")]),t._v(" 3. 方式一: props")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("    1). 实现父向子通信: 属性值是非函数\n    2). 实现子向父通信: 属性值是函数\n    应用: 最基本, 用得最多的方式\n")])])]),n("h2",{attrs:{id:"_4-方式二-vue自定义事件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-方式二-vue自定义事件"}},[t._v("#")]),t._v(" 4. 方式二: vue自定义事件")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("    1). 用来实现子组件向父组件通信\n    2). 相关语法:\n        父组件中绑定自定义事件监听:\n          <Child @eventName=\"callback\">\n        子组件中分发事件\n          this.$emit('eventName', data)\n    应用: elment-ui的组件的事件监听语法都用的是自定义事件\n          我们项目中的组件也用了不少自定义事件\n")])])]),n("h2",{attrs:{id:"_5-方式三-全局事件总线-消息订阅与发布"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5-方式三-全局事件总线-消息订阅与发布"}},[t._v("#")]),t._v(" 5. 方式三: 全局事件总线   ===> 消息订阅与发布")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("\t1). 实现任意组件间通信\n    2). 编码:\n        将入口js中的vm作为全局事件总线对象: \n            beforeCreate() {\n                Vue.prototype.$bus = this\n            }\n        分发事件/传递数据的组件: this.$bus.$emit('eventName', data)\n        处理事件/接收数据的组件: this.$bus.$on('eventName', (data) => {})\n    应用: 前台项目中使用全局事件总线\n")])])]),n("p",[n("img",{attrs:{src:a(357),alt:"组件与vm的关系"}})]),t._v(" "),n("h2",{attrs:{id:"_6-方式四-v-model"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_6-方式四-v-model"}},[t._v("#")]),t._v(" 6. 方式四: v-model")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('    1). 实现父子之间相互通信/同步\n    2). 组件标签上的v-model的本质: 动态value属性与自定义input监听来接收子组件分发的数据更新父组件数据\n        父组件: \n            <CustomInput v-model="name"/>\n            \x3c!-- 等价于 --\x3e\n            <CustomInput :value="name" @input="name=$event"/>\n        子组件: \n            <input type="text" :value="value" @input="$emit(\'input\', $event.target.value)">\n            props: [\'value\']\n    应用: element-ui中的表单项相关组件都用了v-model: Input / Select / Checkbox / Radio\n')])])]),n("h2",{attrs:{id:"_7-方式五-sync"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_7-方式五-sync"}},[t._v("#")]),t._v(" 7. 方式五: .sync")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('    1). 实现父子之间相互通信/同步(在原本父向子的基础上增加子向父)\n    2). 组件标签的属性上使用.sync的本质: 通过事件监听来接收子组件分发过来的数据并更新父组件的数据\n        父组件:\n            <child :money.sync="total"/>\n            \x3c!-- 等价于 --\x3e\n            <Child :money="total" @update:money="total=$event"/>\n    \n            data () {\n              return {\n                total: 1000\n              }\n            },\n        子组件:\n            <button @click="$emit(\'update:money\', money-100)">花钱</button>\n            props: [\'money\']\n    应用:  \n        element-ui在有显示隐藏的组件上: Dialog / Drawer\n')])])]),n("h2",{attrs:{id:"_8-attrs与-listeners"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_8-attrs与-listeners"}},[t._v("#")]),t._v(" 8. $attrs与$listeners")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('    1). $attrs\n        实现当前组件的父组件向当前组件的子组件通信\n        它是包含所有父组件传入的标签属性(排除props声明, class与style的属性)的对象\n        使用: 通过 v-bind="$attrs" 将父组件传入的n个属性数据传递给当前组件的子组件\n    2). $listeners\n        实现当前组件的子组件向当前组件的父组件通信\n        $listeners是包含所有父组件传入的自定义事件监听名与对应回调函数的对象\n        使用: 通过v-on="$listeners" 将父组件绑定给当前组件的事件监听绑定给当前组件的子组件\n    应用: 利用它封装了一个自定义的带hover文本提示的el-button\n')])])]),n("h2",{attrs:{id:"_9-refs-children-parent"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_9-refs-children-parent"}},[t._v("#")]),t._v(" 9. $refs & $children & $parent")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("    1). $refs\n        实现父组件向指定子组件通信\n        $refs是包含所有有ref属性的标签对象或组件对象的容器对象\n        使用: 通过 this.$refs.child 得到子组件对象, 从而可以直接更新其数据或调用其方法更新数据\n    2). $children\n        实现父组件向多个子组件通信\n        $children是所有直接子组件对象的数组\n        使用: 通过this.$children 遍历子组件对象, 从而可以更新多个子组件的数据\n    3). $parent\n        实现子组件向父组件通信\n        $parent是当前组件的父组件对象\n        使用: 通过this.$parent 得到父组件对象, 从而可以更新父组件的数据\n    应用: 在后台管理项目中使用了$refs\n")])])]),n("h2",{attrs:{id:"_10-provide与inject"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_10-provide与inject"}},[t._v("#")]),t._v(" 10. provide与inject")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("\t1). 实现祖孙组件间直接通信\n\t2). 使用\n\t\t在祖组件中通过provide配置向后代组件提供数据\n\t\t在后代组件中通过inject配置来声明接收数据\n\t3). 注意:\n\t\t不太建议在应用开发中使用, 一般用来封装vue插件\n\t\tprovide提供的数据本身不是响应式的 ==> 父组件更新了数据, 后代组件不会变化\n\t\tprovide提供的数据对象内部是响应式的 ==> 父组件更新了数据, 后代组件也会变化\n\t应用: element-ui中的Form组件中使用了provide和inject\n")])])]),n("h2",{attrs:{id:"_11-vuex"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_11-vuex"}},[t._v("#")]),t._v(" 11. Vuex")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("    1). 实现任意组件间通信\n    2). Vuex 是一个专为 Vue 应用程序设计的管理多组件共享状态数据的 Vue 插件\n        任意组件都可以读取到Vuex中store的state对象中的数据\n        任意组件都可以通过dispatch()或commit()来触发store去更新state中的数据\n        一旦state中的数据发生变化, 依赖于这些数据的组件就会自动更新\n    应用: 前台和后台项目都有用vuex管理组件数据 \n")])])]),n("h2",{attrs:{id:"_12-插槽-作用域插槽slot-scope"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_12-插槽-作用域插槽slot-scope"}},[t._v("#")]),t._v(" 12. 插槽  ==> 作用域插槽slot-scope")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('    1). 实现父组件向子组件传递标签内容\n    2). 什么情况下使用作用域插槽?\n        父组件需要向子组件传递标签结构内容\n        但决定父组件传递怎样标签结构的数据在子组件中\n    3). 编码:\n        子组件:\n            <slot :row="item" :$index="index">  \x3c!-- slot的属性会自动传递给父组件 --\x3e\n            </slot>\n        父组件:\n            <template slot-scope="{row, $index}">\n                <span>{{$index+1}}</span> &nbsp;&nbsp;\n                <span :style="{color: $index%2===1 ? \'blue\' : \'green\'}" >{{row.text}}</span>\n            </template>\n    应用: element-ui中的Table组件\n')])])])])}),[],!1,null,null,null);e.default=s.exports}}]);