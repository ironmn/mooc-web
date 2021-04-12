<template>
  <div>
    <el-container class="main">
      <el-aside :width="tabWidth+'px'">
        <div>
          <div class="isClossTab" @click="isClossTabFun">
            <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" ></i>
          </div>
          <el-menu :class="'menu'"
                   router
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   :collapse="isCollapse"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   :default-openeds="['6']"
          >
            <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''"
                        v-if="item.name === '教学管理'"><!--只有当该路由页面有名字的时候，才选择加载到当前的导航栏菜单中-->
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item v-for="subItem in item.children"
                            :route="{path:subItem.path,query: {id: id, role: role}}"
                            :index="subItem.path"
                            :class="$route.path==subItem.path?'is-active':''">

                {{ subItem.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header class="main-header">
          <el-dropdown>
                        <span class="el-dropdown-link">
                            <img src="" alt="">
                        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item :to="{ path: '/main2' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
                item.meta.title
              }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer class="main-footer" height="50px">
          <p style="font-size: 10px">Copyright © 2021 Mooc在线教育平台</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<style>
*{
  padding: 0;
  margin: 0;
}

</style>
<style scoped lang="scss">
$header-height:60px;
$background-color: #545c64;
$color: #FFF;

.main{
  height: 100vh;
  min-width: 800px;
  min-height: 600px;
  overflow: hidden;

  aside{
    overflow: visible;
    height: 100%;
    background-color: $background-color;
    color: $color;

    .isClossTab{
      width: 100%;
      height: $header-height;
      cursor: pointer;
      font-size: 25px;
      text-align: center;
      line-height: $header-height;
      font-weight: bold;
      border-right: 1px solid #807c7c;
      box-sizing: border-box;
    }
    .menu {
      width: 100%;
      border-right:0;
    }

  }

  .main-header {
    background-color: $background-color;
    color: $color;

    .el-dropdown{
      cursor: pointer;
      float: right;
    }
    .el-dropdown-link{

      img{
        $imgMargin: (($header-height - 50)/2);
        display:inline-block;
        width:50px;
        height: 50px;
        border-radius: 25px;
        background-color: #FFF;
        margin-top: $imgMargin;
      }
    }
  }

  .crumbs {
    margin-bottom: 20px;
  }

  .main-footer{
    text-align: center;
    background-color: $background-color;
    color: $color;
    line-height: 50px;
  }

}

</style>

<script>
import {checkValid, getCookie} from "../utils/support";

export default {
  data() {
    return {
      id: null,
      role: null,
      isCollapse: false,
      tabWidth: 200,
      test1: 1,
      intelval: null,
      breadList:[] //面包屑导航的导航数组
    };
  },
  methods: {
    getBreadList(val) {
      // 过滤路由matched对象
      if (val.matched) {
        let matched = val.matched.filter(item => item.meta && item.meta.title);
        // 拿到过滤好的路由v-for遍历出来
        this.breadList = matched;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isClossTabFun(){
      clearInterval(this.intelval);
      if(!this.isCollapse){
        this.intelval = setInterval(()=>{
          if(this.tabWidth<= 64)
            clearInterval(this.intelval);
          this.tabWidth -= 1;
        }, 1);
      }else{
        this.tabWidth = 200;
      }
      this.isCollapse = !this.isCollapse;
    }
  },
  watch: {
    // 监听路由
    $route(val) {
      // 调用获取路由数组方法
      this.getBreadList(val);
    }
  },
  created() {
    // console.log(this.$route.query.id);
    // console.log(this.$route.query.role);
    // console.log(getCookie("phone"));
    // 在加载首页之前，首先要检查cookie是否存在。
    this.id = this.$route.query.id;
    this.role = this.$route.query.role;
    if(checkValid(this.id) && checkValid(this.role)){}
    else{
      this.$router.push('/login');
    }
  }
}
</script>
