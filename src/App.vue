<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登录和注册组件中隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入Header组件
import Header from './components/Header/index.vue'
//引入Footer组件
import Footer from './components/Footer/index.vue'
export default {
  name: '',
  components: {
    Header,
    Footer
  },
  mounted() {
     //派发action,获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  }
}
</script>

<style scoped>

</style>
