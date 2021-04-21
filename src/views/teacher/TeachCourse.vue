<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"></el-col>
      <el-col :span="12">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="课程名称" prop="c_name">
            <el-input v-model="form.c_name"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="c_content">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 30}"
                placeholder="请输入内容"
                v-model="form.c_content">
            </el-input>
          </el-form-item>
          <div style="font-size: 12px;margin-bottom: 50px">
            备注：该页面无法编辑章节，请在"我上的课"课程列表中，点击查看，进入课程详情后进行编辑
          </div>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>确定要创建吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getCookie} from "../../utils/support";

export default {
  name: "TeachCourse",
  data() {

    return {
      id: null,
      role: null,
      form: {
        t_id: null,
        c_name: null,
        c_content: null,
        c_count: 0
      },
      rules:{
        c_name: [
          {required: true, message: '请输入课程名称！' ,trigger: 'blur' },
          {min: 2 ,max: 100,message: '课程名称过长或者过段！',trigger: 'blur'},
        ],
        c_content: [
          {required: true, message: '请输入课程的简介', trigger: 'blur'},
          {min: 5,message: '课程简介过短',trigger: 'blur'}
        ]
      },
      dialogVisible: false
    }
  },

  methods:{
    onSubmit(){
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    confirm(){
      const _this = this;
      axios.post('http://localhost:8181/mooc/teacher/addCourse',this.form).then(resp =>{
        console.log(this.form.t_id);
        if(resp.data === 'success'){
          _this.$message({
            message: "创建成功",
            type: 'success'
          })
        }
      })
      this.dialogVisible = false;


    }
  },
  created() {
    this.id = this.$route.query.id;
    this.role = this.$route.query.role;
    this.form.t_id = this.$route.query.id;
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