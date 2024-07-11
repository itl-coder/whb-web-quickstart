<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router';
import {ElMessage} from "element-plus"

// @ts-ignore
import {toLogin, toRegister} from "@/network/user/index.ts";

const loginForm = ref({
  username: '',
  password: '',
  roleId: '2'
});

const loginFormRef = ref()

const registerForm = ref({
  username: '',
  password: '',
  address: '',
  confirmPassword: '',
  email: '',
  roleId: '',
  phone: ""
});

const forgetPasswordForm = ref({
  email: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: ''
});

const showRegisterForm = ref(false);
let showForgetPasswordForm = ref(false);
const isSendingVerificationCode = ref(false);
const verificationButtonText = ref('发送验证码');

// 登录校验
const loginRules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 2, max: 15, message: '用户名长度在 2 到 15 个字符之间', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 15, message: '密码长度在 3 到 15 个字符之间', trigger: 'blur'}
  ],
  address: [
    {required: true, message: '请输入住址', trigger: 'blur'},
    {min: 3, max: 55, message: '住址长度在 3 到 55 个字符之间', trigger: 'blur'}
  ],
  role: [
    {required: true, message: '请选择身份', trigger: 'blur'},
    {type: 'string', min: 1, max: 1, message: '请正确选择身份', trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'}
  ],
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 3, max: 15, message: '新密码长度在 3 到 15 个字符之间', trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {min: 3, max: 15, message: '确认密码长度在 3 到 15 个字符之间', trigger: 'blur'}
  ],
  verificationCode: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 4, max: 4, message: '验证码长度为 4', trigger: 'blur'}
  ]
});

const router = useRouter();

const submitForm = async () => {
  const form = loginForm.value;
  const res = await toLogin(form);
  if (res.code === 200) {
    ElMessage.success(res.msg || "登录成功!");
    localStorage.setItem("role", res.data.role);
    router.push("/brand")
  } else {
    ElMessage.error(res.msg || "登录失败!");
  }
};

const submitRegisterForm = async () => {
  const form = registerForm.value;
  const res = await toRegister(form);
  if (res.code === 200) {
    ElMessage.success(res.msg);
    // 注册成功后切换回登录界面
    toggleRegisterForm();
  } else {
    ElMessage.error(res.msg || "注册失败!");
  }
};

const forgotPassword = () => {
  showForgetPasswordForm.value = true;
};

const toggleForgetPasswordForm = () => {
  showForgetPasswordForm.value = !showForgetPasswordForm.value;
  if (!showForgetPasswordForm.value) {
    clearForgetPasswordForm();
  }
};

const sendVerificationCode = () => {
  // 模拟发送验证码的过程，这里可以添加实际发送邮件的逻辑
  isSendingVerificationCode.value = true;
  setTimeout(() => {
    isSendingVerificationCode.value = false;
    verificationButtonText.value = '重新发送';
    // 模拟验证码发送成功的提示
    ElMessage.success('验证码发送成功，请注意查收');
  }, 1500);
};

const submitForgetPasswordForm = async () => {
  const form = forgetPasswordForm.value;
  const valid = await forgetPasswordForm.value.validate();
  if (valid) {
    // 执行修改密码的逻辑，这里模拟成功修改密码的提示
    toggleForgetPasswordForm(); // 修改密码成功后切换回登录界面
  } else {
    ElMessage.info('表单校验未通过');
  }
};

const clearForgetPasswordForm = () => {
  forgetPasswordForm.value.email = '';
  forgetPasswordForm.value.verificationCode = '';
  forgetPasswordForm.value.newPassword = '';
  forgetPasswordForm.value.confirmPassword = '';
  verificationButtonText.value = '发送验证码';
};

const clearRegisterForm = () => {
  registerForm.value.username = '';
  registerForm.value.password = '';
  registerForm.value.address = '';
  registerForm.value.confirmPassword = '';
  registerForm.value.email = '';
  registerForm.value.roleId = '';
  registerForm.value.phone = '';
};

const toggleRegisterForm = () => {
  showRegisterForm.value = !showRegisterForm.value;
  if (showRegisterForm.value) {
    clearRegisterForm();
  }
};
</script>


<template>
  <div class="login-page">
    <div class="background-image"></div>
    <div class="login-container" v-if="!showRegisterForm && !showForgetPasswordForm ">
      <div class="login-box">
        <h2>登录</h2>
        <el-form :model="loginForm" ref="loginFormRef" label-width="100px" class="login-form"
                 :rules="loginRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="role">
            <el-radio-group v-model="loginForm.roleId">
              <el-radio label="1">管理员</el-radio>
              <el-radio label="2">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="login-actions">
          <el-button type="text" @click="forgotPassword">忘记密码</el-button>
          <el-button type="text" @click="toggleRegisterForm">注册</el-button>
        </div>
      </div>
    </div>

    <div class="login-container" v-if="showForgetPasswordForm">
      <div class="login-box">
        <h2>找回密码</h2>
        <el-form :model="forgetPasswordForm" ref="forgetPasswordFormRef" label-width="100px" class="login-form"
                 :rules="loginRules">
          <el-form-item label="注册邮箱" prop="email">
            <el-input v-model="forgetPasswordForm.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode" class="inline-input-button">
            <el-input v-model="forgetPasswordForm.verificationCode" class="vcode" type="text"></el-input>
            <el-button @click="sendVerificationCode" :disabled="isSendingVerificationCode"
                       class="send-verification-btn">
              {{ verificationButtonText }}
            </el-button>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="forgetPasswordForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="forgetPasswordForm.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button"
                       @click="submitForgetPasswordForm">确认修改
            </el-button>
            <el-button type="text" @click="clearForgetPasswordForm">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="login-actions">
          <el-button type="text" @click="toggleForgetPasswordForm">返回登录</el-button>
        </div>
      </div>
    </div>

    <div class="login-container register-box" v-if="showRegisterForm">
      <div class="login-box">
        <h2>注册</h2>
        <el-form :model="registerForm" ref="registerFormRef" label-width="100px" class="login-form"
                 :rules="loginRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="address">
            <el-input v-model="registerForm.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="role">
            <el-radio-group v-model="registerForm.roleId">
              <el-radio label="1">管理员</el-radio>
              <el-radio label="2">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button" @click="submitRegisterForm">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="login-actions">
          <el-button type="text" @click="toggleRegisterForm">已有账号？登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.vcode {
  width: 55%;
}

.send-verification-btn {
  margin-left: 10px;
  white-space: nowrap;
}


.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f0f2f5;
  background-image: url('@/assets/storehouse.png');
  background-size: cover;
  background-position: right;
  position: relative;
}

.login-container {
  position: absolute;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.9);
  /* 使用半透明背景以避免背景图影响可读性 */
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  right: 150px;
  bottom: 210px;
}

.login-box {
  text-align: left;
}

.login-form {
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  background-color: #409EFF;
  border-color: #409EFF;
}

.send-verification-btn {
  margin-left: 10px;
  /* 调整发送验证码按钮与输入框之间的间距 */
}

.login-actions {
  margin-top: 20px;
  text-align: center;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>