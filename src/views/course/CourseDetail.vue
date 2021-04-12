
<template>
  <el-container >
    <el-header>
      <el-menu

          :default-active="this.$route.path" router class="el-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(item,index) in navList" :key="index"
                      :index="item.path"
                      :route="{path:item.path,query: {c_id: c_id, s_id: s_id}}"
                      :class="'is-active'">
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>

  </el-container>

</template>
<script>
export default {
  name: 'courseDetail',
  data() {
    return {
      c_id: null,
      s_id: null,
      navList:[
        {
          path:'/courseDetail/partList',name:'章节列表'
        },
        {
          path: '/courseDetail/homework',
          name: '家庭作业'
        },
        {
          path: '/courseDetail/question',
          name: '提问'
        },
        {
          path:'/courseDetail/exam',
          name: '考试'
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.c_id = this.$route.query.c_id;
    this.s_id = this.$route.query.s_id;
  }
}
</script>

<style>
.el-header {
  position: relative;
  width: 100%;
  height: 60px;
}

.router-link-active{
  text-decoration: none;
}

</style>