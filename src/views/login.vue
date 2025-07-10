<!-- 注释 -->
<template>
  <div class="content">
    <el-card style="max-width: 480px">
      <h2
        style="text-align: center"
        v-if="activeIndex == 1 || activeIndex == 2"
      >
        登录
      </h2>
      <h2 style="text-align: center" v-else>注册</h2>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        style="margin: 10px 0px; width: 90%"
        @select="handleSelect"
      >
        <el-menu-item index="1">账号密码登录</el-menu-item>
        <el-menu-item index="2">手机号登录</el-menu-item>
      </el-menu>
      <el-form
        v-if="activeIndex == 1"
        ref="AccountFormRef"
        style="width: 95%; margin: 10px 0px"
        :model="AccountForm"
        :rules="AccountRules"
        label-width="auto"
      >
        <el-form-item prop="username">
          <el-input v-model="AccountForm.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="AccountForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-button size="large" @click="AccountLogin">登录</el-button>
      </el-form>
      <el-form
        v-if="activeIndex == 2"
        ref="PhoneFormRef"
        style="width: 95%; margin: 10px 0px"
        :model="PhoneForm"
        :rules="PhoneRules"
        label-width="auto"
      >
        <el-form-item prop="phone">
          <el-input v-model="PhoneForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="code" class="password-item">
          <el-input v-model="PhoneForm.code" placeholder="请输入验证码" />
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-button size="large">登录</el-button>
      </el-form>
      <el-form
        v-if="activeIndex == 3"
        ref="RegisterFormRef"
        style="width: 95%; margin: 10px 0px"
        :model="RegisterForm"
        :rules="RegisterRules"
        label-width="auto"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="RegisterForm.userName"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="RegisterForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input v-model="RegisterForm.rePassword" placeholder="确认密码" />
        </el-form-item>
        <el-button @click="submitForm">注册</el-button>
      </el-form>
      <div
        style="
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        "
      >
        <span
          >还没有账号吗？<span
            style="color: aqua; cursor: pointer"
            @click="goRegister"
            >立即注册</span
          ></span
        >
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { RegisterUser } from "@/axios/user";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import {useStore} from "vuex"
import axios from "axios";
const router = useRouter();
const RegisterFormRef = ref();
const store=useStore();
const PhoneFormRef = ref();
const AccountFormRef = ref();
const AccountLogin = () => {
  axios.post("/api/user/login",AccountForm).then(res=>{
    if(res!=null){
      ElMessage({
        type:"success",
        message:"登录成功"
      })
      console.log(res.data.data)
      store.dispatch('saveUser',res.data.data);
      localStorage.setItem('token',res.data.data.token)
      console.log(store.state)
      router.push("/home")
    }
  })
};
const activeIndex = ref("3");
const goRegister = () => {
  activeIndex.value = 3;
};
const handleSelect = (index) => {
  activeIndex.value = index;
};
const AccountForm = reactive({
  userName: "",
  password: "",
});
const AccountRules = reactive({
  userName: [
    { required: true, message: "账号不能为空", trigger: "blur" },
    { min: 3, max: 10, message: "账号长度在3到10区间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 10, message: "密码长度在3到10区间", trigger: "blur" },
  ],
});
const PhoneForm = reactive({
  phone: "",
  code: "",
});
const PhoneRules = reactive({
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入有效的手机号码",
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "验证码不能为空", trigger: "blur" },
    { pattern: /^\d{6}$/, message: "验证码必须是六位数字", trigger: "blur" },
  ],
});
const RegisterForm = reactive({
  userName: "",
  password: "",
  rePassword: "",
});
const RegisterRules = reactive({
  userName: [
    { required: true, message: "账号不能为空", trigger: "blur" },
    { min: 3, max: 10, message: "账号长度在3到10区间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 10, message: "密码长度在3到10区间", trigger: "blur" },
  ],
  rePassword: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== RegisterForm.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
const submitForm = () => {
  RegisterFormRef.value.validate((valid) => {
    if (valid) {
      axios.post("/api/user/register",RegisterForm).then(res=>{
        activeIndex.value=1,
        ElMessage({
          message:"请登录",
          type:"success"
        })
      })
      RegisterForm.password=null,
      RegisterForm.rePassword=null,
      RegisterForm.userName=null
    } else {
      ElMessage({
        message: "请填写正确的表单项",
        type: "error",
      });
    }
  });
};
</script>
<style scoped>
.content {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 设置容器高度为视口高度 */
  margin: 0; /* 移除默认的 margin */
}

.el-card {
  margin: 0 auto; /* 如果不需要使用 Flexbox，也可以使用 margin 自动居中 */
  height: 450px;
  width: 500px;
  position: relative;
}
::v-deep .password-item {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 水平分布 */
}

::v-deep .password-item .el-input {
  flex: 1; /* 输入框占据剩余空间 */
  margin-right: 10px; /* 添加一些间距 */
}

::v-deep .password-item .el-button {
  width: 120px; /* 设置按钮宽度 */
}
</style>