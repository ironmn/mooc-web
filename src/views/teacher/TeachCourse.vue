<template>
  <h1>添加课程</h1>
</template>

<script>
import {getCookie} from "../../utils/support";

export default {
  name: "TeachCourse",
  data() {
    return {
      id: null,
      role: null,
    }
  },

  created() {
    this.id = this.$route.query.id;
    this.role = this.$route.query.role;
    console.log(this.id);
    console.log(this.role);

    //先判断是不是老师
    //如果不是老师就退回到刚才的页面
    let role =  this.$route.query.role;
    if(role !== 'teacher'){
      this.$alert('检测到您不是教师用户，没有权限查看!', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({
            path: '/course',
            query: {
              id: this.id,
              role: this.role
            }
          })
        }
      });
    }
  }
}
</script>

<style scoped>

</style>