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
          prop="t_name"
          label="任课教师"
      >
      </el-table-column>

      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="checkForDetail(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button style="margin-left: 20px" @click="selectCourse(scope.row)" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="40%"
      >
      <!--
        课程详情这个数据结构应该具备的功能：
        课程id、课程名称、任课教师、课程简介
       -->
      <h1>课程详情</h1>
      <br>
      <h5 style="float: left;text-align: left">课程编号：{{courseDetail.c_id}}</h5>
      <br>
      <h5 style="float: left;text-align: left">课程名称：{{courseDetail.c_name}}</h5>
      <br>
      <h5 style="float: left;text-align: left">任课教师：{{courseDetail.t_name}}</h5>
      <br>
      <h5 style="float: left;text-align: left">课程简介：</h5>
      <p style="float: left;text-align: left">
        {{courseDetail.c_content}}
      </p>
    <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="25%"
    >
      <span>确定要选这门课吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="choose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  methods: {
    checkForDetail(row) {
      const _this = this;
      axios.get('http://localhost:8181/mooc/course/getDetail/'+row.c_id).then(resp => {
        _this.courseDetail = resp.data
      })
      console.log(this.courseDetail);
      this.dialogVisible = true;
    },
    selectCourse(row){
      this.dialogVisible2 = true;
      this.tmp_id = row.c_id;
      console.log(this.tmp_id);
    },
    choose(){
      const _this = this;
      //通过post请求提交到后台的选课界面
      this.dialogVisible2 = false;
      axios.post('http://localhost:8181/mooc/course/add/'+this.tmp_id+'/'+this.id).then(resp => {
        if(resp.data === 'failed'){
          _this.$message.error('您已经选了该课程！');
        }
        else {
          _this.$message({
            message: '选课成功！',
            type: 'success'
          })
        }
      })

    }
  },
  data() {
    return {
      id: null,
      tmp_id: null,
      tableData: null,
      dialogVisible: false,
      dialogVisible2: false,
      courseDetail: {
        c_id: null,
        c_name: null,
        t_name: null,
        c_content: null
      }
    }
  },
  created() {
    //通过axios组件获取选课列表
    //console.log(getCookie("id"));
    const _this = this;
    this.id = this.$route.query.id;
    axios.get('http://localhost:8181/mooc/course/list').then(
        function (resp){
          _this.tableData = resp.data;
        }
    )
  }
}
</script>

<style scoped>

</style>