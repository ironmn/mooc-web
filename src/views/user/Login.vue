<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录mooc</h3>
      <el-form-item label="账号" prop="phone">
        <el-input type="text" placeholder="请输入手机号" v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item style="margin-bottom: 60px;text-align: center">
        <el-button style="width: 45%" type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        <el-button style="width: 45%" type="primary" @click="$router.push('/register')">
          注册
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>手机号或密码错误，请重新检查！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getCookie, setCookie} from "../../utils/support";

export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: '',
        password: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        phone: [
          {required: true, message: '手机号格式错误，请检查', trigger: 'blur',min: 8,max: 12}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  created() {
    this.form.phone = getCookie("phone");
    if(this.form.phone === undefined || this.form.phone === '' || this.form.phone === null){
      this.form.phone = '';
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          //测试一下axios的post方法能否正常访问后端
          axios.post('http://localhost:8181/mooc/user/login',_this.form).then(function (resp){
            console.log(resp.data);
            //如果登录校验失败，那么弹出失败的会话框
            if(resp.data.info === 'failed'){
              _this.dialogVisible = true;
              return false;
            }
            else if(resp.data.info === 'success'){
              setCookie("phone",_this.form.phone);
              setCookie("id",resp.data.id);
              setCookie("role",resp.data.role);
              //如果是学生，就跳转到学生主页
              if(resp.data.role === 'student'){
                _this.$router.push({
                  path: '/main',
                  query: {
                    id: resp.data.id,
                    role: resp.data.role
                  }
                });
              }
              //老师跳转到老师页面
              else if(resp.data.role === 'teacher'){
                _this.$router.push({
                  path: '/main2',//main2页面代表教师页面
                  query: {
                    id: resp.data.id,
                    role: resp.data.role
                  }
                });
              }
              //管理员跳转到管理员页面
              else if(resp.data.role === 'admin'){
                _this.$router.push({
                  path: '/main3',
                  query: {
                    id: resp.data.id,
                    role: resp.data.role
                  }
                });
              }
            }
          })
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>