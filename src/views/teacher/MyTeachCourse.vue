<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="c_id"
          label="课程编号"
      >
      </el-table-column>
      <el-table-column
          prop="c_name"
          label="课程名称"
      >
      </el-table-column>

      <el-table-column
          prop="c_count"
          label="选课人数"
      >
      </el-table-column>


      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="checkForDetail(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="deleteCourse(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="25%"
    >
      <span>确定要删除这门课吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="yes">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {getCookie} from "../../utils/support";

export default {
  methods: {
    checkForDetail(row) {
      let routeURL = this.$router.resolve({
        path: '/courseDetail_T',
        query: {
          t_id: this.id,
          c_id: row.c_id
        }
      })
      window.open(routeURL.href,'_blank')
    },
    deleteCourse(row){
      this.tmp_id = row.c_id;
      console.log(this.tmp_id);
      this.dialogVisible = true;
    },
    yes(){
      const _this = this;
      this.dialogVisible = false;
      axios.post('http://localhost:8181/mooc/teacher/delete/'+this.tmp_id+'/'+this.id).then(resp => {
        if(resp.data === 'failed'){
          this.$message({
            message: '操作失败，请稍后再试！',
            type: 'error'
          })
        }
        else{
          this.$message({
            message: '已将请求提交给管理员！',
            type: 'success'
          })
        }
        //重新刷新当前浏览器对象
        _this.$router.go(0);
      })
    }
  },
  data() {
    return {
      id: null,
      role: null,
      tmp_id: null,
      dialogVisible: false,
      tableData: null
    }
  },
  created() {
    //通过axios组件获取选课列表
    //console.log(getCookie("id"));
    const _this = this;
    this.id = this.$route.query.id;
    this.role = this.$route.query.role;
    axios.get('http://localhost:8181/mooc/teacher/myTeach/'+this.$route.query.id).then(
        function (resp){
          _this.tableData = resp.data;
        }
    )
  }
}
</script>