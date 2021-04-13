<template>
  <el-row :gutter="20">
    <h1>目录</h1>
    <el-button type="info" round @click="addNewPart"
      style="float: left;margin-bottom: 30px">新建章节</el-button>

    <el-table
        :data="tableData"
        style="width: 100%"
        height="350">
      <el-table-column
          prop="p_id"
          label="章节编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="p_index"
          label="序号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="p_name"
          label="名称"
          width="240">
      </el-table-column>
      <el-table-column
          prop="file_status"
          label="课件状态"
          width="100">

      </el-table-column>
      <el-table-column
          prop="homework_status"
          label="作业状态"
          width="100">

      </el-table-column>
      <el-table-column
          label="编辑"
          width="150">
        <template slot-scope="scope">
          <el-button  @click="updatePart(scope.row)" type="primary" size="small">修改</el-button>
          <el-button @click="dropPart(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="新建章节"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        >
      <el-form :model="editPart" :rules="rules" ref="editPart" label-width="100px" class="demo-ruleForm">
        <el-form-item label="章节序号" prop="p_index">
          <el-input v-model="editPart.p_index"></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="p_name">
          <el-input v-model="editPart.p_name"></el-input>
        </el-form-item>

        <el-form-item label="上传课件">
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" style="float: right">只能上传pdf文件，且不超过100MB</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('editPart')">立即创建</el-button>
          <el-button @click="resetForm('editPart')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="confirmDelete"
        width="30%"
        >
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="confirmDelete = false">取 消</el-button>
    <el-button type="primary" @click="innerDropPart">确 定</el-button>
  </span>
    </el-dialog>
  </el-row>
</template>


<script>
import pdf from 'vue-pdf'
import qs from "qs";
export default {
  name: 'partList',
  components:{
    pdf
  },
  data() {
    let checkIfIndexValid = (rule, value, callback) => {
      //去后台查看part的编号是否正确
      axios.get('http://localhost:8181/mooc/part/validIndex/'+this.c_id+'/'+value).then(resp => {
        if(resp.data === 'failed'){
          callback(new Error('章节编号已经存在！'));
        }
        else callback();
      })
    }

    return {
      c_id: null,
      t_id: null,
      tmp_p_id: null,//作为前后端交互的临时变量
      tableData: [
        {
          p_id: 'aaa001_1',
          p_index: '1',
          p_name: 'fuck!',
          file_status: '已上传',
          homework_status: '未发布'
        }
      ],
      //最大的章节序号，默认为0
      maxPartIndex: 0,
      //用于添加或者修改使用的数据结构
      editPart: {
        p_id: null,
        p_index: null,
        p_name: null,
        c_id: null,
      },
      dialogVisible: false,
      //删除的对话框
      confirmDelete: false,
      url:"http://localhost:8181/mooc/file/pdf",
      rules: {
        p_index: [
          { required: true, message: '请输入章节编号', trigger: 'blur' },
          { pattern: /^(([0-9])|([1-9]([0-9]+)))$/ , message: '请输入合理的数字', trigger: 'change' },
          { validator: checkIfIndexValid  ,trigger: 'change'}
        ],
        p_name: [
          { required: true, message: '请输入课程名！', trigger: 'change' }
        ],
      }
    }
  },
  created() {
    this.c_id = this.$route.query.c_id;
    this.t_id = this.$route.query.t_id;
    this.editPart.c_id = this.c_id;
    const _this = this;
    axios.get('http://localhost:8181/mooc/teacher/getTeacherPart/'+this.c_id).then(resp => {
        _this.tableData = resp.data;
    })

  },
  methods: {

    updatePart(row){
      //访问后台的文件系统
      console.log(row.p_id);
      this.url = 'http://localhost:8181/mooc/file/pdf/'+row.p_id;
      this.pageNum = 1;
    },

    dropPart(row){
      console.log(row.p_id);
      this.tmp_p_id = row.p_id;//把表格数据赋值给临时变量
      this.confirmDelete = true;
    },
    innerDropPart(){
      //进入后台的删除页面
      const _this = this;
      console.log(this.tmp_p_id);
      axios.post('http://localhost:8181/mooc/part/delete/'+this.tmp_p_id).then(resp => {
        this.confirmDelete = false;//关闭删除页面
        console.log(resp.data)
        if(resp.data === 'success'){
          _this.$message({
            message: '删除成功！',
            type: 'success'
          })
          _this.$router.go(0);
        }
        else{
          _this.$message({
            message: '发生错误,请稍后再试',
            type: 'error'
          })
        }

      })
    },
    handleClose(){
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    addNewPart(){
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.editPart.c_id);
          const _this = this;
          axios.post('http://localhost:8181/mooc/part/insert',this.editPart).then(resp => {
            console.log(resp.data);
            if(resp.data === 'failed'){
              _this.$message({
                message: "请求发生错误，请重试！",
                type: 'warning'
              })
            }
            else{
              //如果收到了服务器端返回的结果，就把对话框关掉
              //弹出成功的消息提示
              _this.$message({
                message: '添加成功！',
                type: 'success'
              })

              _this.timer = setTimeout(() =>{
                _this.dialogVisible = false;
                //过500ms后自动关闭对话框
              },500);
              //刷新浏览器对象
              _this.$router.go(0);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    }
  }
}
</script>