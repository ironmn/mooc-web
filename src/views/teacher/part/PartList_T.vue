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
          <el-button  @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
          <el-button @click="drop(scope.row)" type="danger" size="small">删除</el-button>
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
        <el-form-item label="课程序号" prop="p_index">
          <el-input v-model="editPart.p_index"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="p_name">
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('editPart')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>


<script>
import pdf from 'vue-pdf'
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
      },
      dialogVisible: false,
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
    const _this = this;
    axios.get('http://localhost:8181/mooc/teacher/getTeacherPart/'+this.c_id).then(resp => {
        _this.tableData = resp.data;
    })

  },
  methods: {

    handleClick(row){
      //访问后台的文件系统
      console.log(row.p_id);
      this.url = 'http://localhost:8181/mooc/file/pdf/'+row.p_id;
      this.pageNum = 1;
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
          alert('submit!');
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