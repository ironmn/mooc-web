<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">用户注册</p>
        <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="20px"
            class="demo-ruleForm"
        >
          <el-form-item prop="phone">
            <el-input v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="ruleForm2.name" auto-complete="off" placeholder="请输入真实姓名">
            </el-input>
          </el-form-item>
          <el-form-item prop="gender">
            <el-select v-model="ruleForm2.gender" placeholder="请选择性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="role">
            <el-select v-model="ruleForm2.role" placeholder="请选择身份">
              <el-option label="老师" value="teacher"></el-option>
              <el-option label="学生" value="student"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    //验证身份是否合法
    let checkrole = (rule, value, callback) =>{
      if(value === '' || value === undefined || value === null|| value === 0){
        callback(new Error('请选择身份'));
      }
      else {
        callback();
      }
    }

    let checkGender = (rule,value,callback) => {
      if(value === '' || value === undefined || value === null || value === 0){
        callback(new Error('请选择性别'));
      }
      else{
        callback();
      }
    }
    // <!--验证手机号是否合法-->
    let checkphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        password: null,
        checkPass: null,
        phone: null,
        role: null,
        gender: null,
        name: null,
      },
      rules2: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        phone: [{ validator: checkphone, trigger: 'blur' }],
        role: [{validator: checkrole, trigger: 'blur'}],
        gender: [{validator: checkGender , trigger: 'blur'}],
        name: [{required: true, message: '请输入您的姓名！',trigger: 'blur'},
          {
            min:2, max:20,message: '姓名格式不符合规范',trigger: 'blur'
          }]
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let phone = this.ruleForm2.phone
      if (this.checkMobile(phone)) {
        console.log(phone)
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm2);
          const _this = this;
          axios.post('http://localhost:8181/mooc/user/register'
              ,this.ruleForm2).then(resp => {
            console.log(resp.data);
            if(resp.data === 'success'){
              _this.$alert('注册成功！点击确定跳转到登录页面', '消息提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/login');
                }
              });
              return true;
            }
            else if (resp.data === 'failed'){
              _this.$message({
                message: '注册失败，请过一会再试试',
                type: 'warning'
              });
              return false;
            }
          })
        } else {
          console.log("error submit!!");
          this.$message({
            message: '输入的格式有误，请重新检查后再试',
            type: 'warning'
          })
          return false;
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}
</style>