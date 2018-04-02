# todolist

> A Vue + Vuex project
## 前期思路
+ 实现功能：todolist即一个代办事项卡，基本功能是实现我们对代办事项的增删改查操作，使用vue来实现数据的实时刷新和渲染，vuex用来实现我们对数据的增删改查操作。另外其中可能涉及到的页面间的路由，则有vue-router实现。
## 准备工作
### [vue](https://cn.vuejs.org)
### [vue-router](https://router.vuejs.org/zh-cn/)
### [vuex](https://vuex.vuejs.org)
+ state，驱动应用的数据源；
+ view，以声明方式将 state 映射到视图；
+ actions，响应在 view 上的用户输入导致的状态变化。
## 项目环境搭建

``` bash

# 安装vue-cli如果之前已经安装过，则可以跳过这一步
npm install -g vue-cli

# 项目初始化，初始话过程中可能会需要填写一些项目名称、作者是否需要测试等等，可根据需要酌情填写
vue init webpack + 项目名称

# 进入文件夹并安装其他依赖
cd 项目名
npm install
# 另外我们可能会去安装一些css与处理器less-loader等，这个项目中还没有对样式做调整，暂时可不做处理

# 安装vuex，这个需要单独安装，可全局安装也可只在本项目中使用
npm install vuex --save

# 启动服务器并热加载localhost:8080，能看到页面即说明安装正常。
npm run dev
```
## 页面处理
我们需要对vue安装完成后的初始化页面进行简单处理，可删除不必要的链接和图片
### 页面创建
不管是创建页面还是列表页面都可做为子组件添加到App.vue中，因此我们需要在component页面下新建两个文件夹，一个用来存放tdwaht页面(事项添加页面)和todolist页面(事项展示页面)并在其下分别创建tdwhat.vue和todolist.vue(为什么要创建文件夹的原因是后面可能组件中会有一些图片或者其他文件，方便管理)
### 路由处理
可参考官方文档
```
### 子组件
export default {}//目前先搭结构，后面再做其他处理

### App.vue文件
<router-link to="/tdwhat" class="btn">创建</router-link>
<router-view></router-view>

### main.js文件
Vue.use(VueRouter)

const routes = [
  { path: '/tdwhat', component: todowhat },
  { path: '/todolist', component: todolist }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  todowhat,
  todolist
})
```
## vuex
+ 在component同级创建store文件夹，用来存放vuex的各个文件，在其内部分别创建index.js, action.js, mutations.js, mutation-types.js文件
+ mutation-types.js的作用是为了方便我们对模块进行管理，其中我们定义方法并将其export。
```
// 新增和删除一条计划
export const SAVE_PLAN = 'SAVE_PLAN'
```
+ mutations.js的作用则是import mutation-types中的方法并实现，新增操作即在stat.list中push进从input中获得的数据
```
import * as types from './mutation-types'

export default {
  // 新增计划
  [types.SAVE_PLAN] (state, plan) {
    state.list.push(
      Object.assign(plan)
    )
  }
}
```
+ action.js通过对mutations的提交，一般我们从后端拿到数据之后，可能会对数据做些处理，当然了这个例子中我们没有，而是直接提交到plan这个相当于存放数据的数据库中
```
import * as types from './mutation-types'

export default {
  save ({commit}, plan) {
    commit(types.SAVE_PLAN, plan)
  }
}
```
+ index.js也就是我们常说的store.js，负责存储整个应用的状态数据，一般需要在使用的时候在跟节点注入store对象，后期就可以使用this.$store.state直接获取状态。可将其理解为一个容器，存放着应用中的state等。后续在组件中如果想要获取对应的状态你就可以直接使用this.$store.state获取，当然，也可以利用vuex提供的mapState辅助函数将state映射到计算属性中去
```
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  list: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
```
回到组件中去，todolist中可以利用计算属性去获取存放在store中的值
```
computed: {
    plan () {
      return this.$store.state.list
    }
  }
```
tdwhat对输入的数据存储到store中去
```
methods: {
    save () {
      const plan = {
        date: this.date,
        comment: this.comment
      }
      this.$store.dispatch('save', plan)
      this.$router.go(-1)
    }
  }
```

## 过程中遇到的问题
###  todolist未获取到store中的值
+ 出现原因：template中未获取到正确的数据
+ 解决方法：使用v-for指令，因为store中存取的其实是一个list结构，是无法直接通过.方法来获取它的数据项，这个有点儿类似于数组的操作，获取list中每个对应的数组，再去获取具体每个数组中的值
```
<div v-for="(a,key) in plan" :key="key">
    <p>{{ a.comment}}</p>
    <p>{{ a.date}}</p>
</div>
```
### eslint各种报错
使用eslint的话，会有很多可能我们平常不注意的格式问题，一般常见的就是以下几个
+ semi,多余的分号错误
+ indent，缩进错误
+ no-multiple-empty-lines,空行太多，最多只允许有一行。
+ key-spacing,意思就是说属性的键后面跟的值要在紧挨着属性的冒号后再空一个格。
+ 在最后一行后面要保留有一行空行
+ v-for指令要有key值
+ 。。。
### [HMR] Waiting for update signal from WDS...
[可参考该网站](https://segmentfault.com/a/1190000005690280)
## 未解决
+ 另外最后有一个vue-devtools未运行的问题，目前还未解决，正在努力查找问题原因。
## github代码上传
可参考[该网站](https://www.cnblogs.com/zlxbky/p/7727895.html)


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).