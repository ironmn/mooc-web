
<template>
  <el-container >
    <el-header>
      <el-menu

          :default-active="this.$route.path" router class="el-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(item,index) in navList" :key="index"
                      :index="item.path"

                      :route="{path:item.path,query: {c_id: c_id, t_id: t_id}}"
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
  name: 'teacherCourseDetail',
  data() {
    return {
      c_id: null,
      t_id: null,
      navList:[
        {
          path:'/courseDetail_T/partList_T',
          name:'章节列表'
        },
        {
          path: '/courseDetail_T/homework_T',
          name: '发布作业'
        },

        {
          path:'/courseDetail_T/exam_T',
          name: '发布考试'
        },
        {
          path: '/courseDetail_T/stuMenu',
          name: '学生名单'
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
    this.t_id = this.$route.query.t_id;
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