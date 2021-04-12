<template>
  <el-table
      :data="tableData"
      style="width: 60%"
      >
    <el-table-column
        type="index"
        label="序号"
        :index="indexMethod(1)"
        width="120">
    </el-table-column>
    <el-table-column
        prop="s_id"
        label="学号"
        width="180">
    </el-table-column>
    <el-table-column
        prop="s_name"
        label="姓名"
        width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {

    return {
      c_id: null,
      t_id: null,
      tableData: null
    }
  },
  created() {
    //首先通过路由获取参数
    this.c_id = this.$route.query.c_id;
    this.t_id = this.$route.query.t_id;
    console.log(this.c_id+" "+this.t_id);
    const _this = this;
    //向后端发送一个获取选课学生列表的请求。
    axios.get('http://localhost:8181/mooc/teacher/getStuMenu/'+this.c_id).then(resp => {
      console.log(resp.data);//返回一下响应的结果集。
      _this.tableData = resp.data;

    })
  }
  ,
  methods: {
    indexMethod(index) {
      return index ;
    }
  }
}
</script>