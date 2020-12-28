(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{372:function(t,s,n){"use strict";n.r(s);var a=n(40),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"_4-使用git管理项目"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用git管理项目"}},[t._v("#")]),t._v(" 4. 使用git管理项目")]),t._v(" "),n("h2",{attrs:{id:"_4-1-基本操作-一个分支master"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-基本操作-一个分支master"}},[t._v("#")]),t._v(" 4.1. 基本操作(一个分支master)")]),t._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 1). 创建本地仓库(代码在本地仓库中)")]),t._v("\n    创建.gitignore文本, 并配置好\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"init app"')]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 2). 创建远程仓库")]),t._v("\n    New Repo\n    指定仓库名\n    创建\t\t\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 3). 将本地仓库的代码推送到远程仓库")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin url "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("在本地记录远程仓库的地址"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin master\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 4). 如果本地代码有修改, 要提交到本地仓库, 推送到仓库")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxx"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push\n\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global credential.helper store "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("记住用户和密码"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 5). 如果远程代码有修改, 要拉取到本地仓库")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 6). 将远程仓库的代码clone到本地(生成仓库)")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone url\n")])])]),n("h2",{attrs:{id:"_4-2-多分支操作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-多分支操作"}},[t._v("#")]),t._v(" 4.2. 多分支操作")]),t._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 1). 创建本地个人开发分支, 并推送到远程")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -b atguigu\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin atguigu\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 3). 在个人开发分支上开发, 并推送到远程")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxx"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 4). 根据远程个人开发分支创建本地个人开发分支")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("如果分支是在clone后创建的才需要执行"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -b atguigu origin/atguigu\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 5). 将个人开发分支合并到master")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout master\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge atguigu\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);