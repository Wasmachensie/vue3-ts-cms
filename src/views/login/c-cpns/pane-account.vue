<template>
  <div class="pane-account">
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      :rules="accountRules"
      label-width="60px"
      status-icon
    >
      <el-form-item label="帐号" prop="account">
        <!-- autocomplete="off"--关闭自动填充 -->
        <el-input v-model="accountForm.account" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <!-- autocomplete="off"--关闭自动填充 -->
        <el-input
          v-model="accountForm.password"
          type="password"
          show-password
        />
      </el-form-item>

      <el-form-item label="验证码" prop="pass">
        <el-input
          type="text"
          style="width: 12vw"
          v-model="inputCode"
          :maxlength="captchaLength"
          autocomplete="off"
        />
        <div
          @click="refreshCode()"
          style="line-height: 0; margin-left: auto; cursor: pointer"
        >
          <!--验证码组件-->
          <SecurityCode :identifyCode="identifyCode" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { CAPTCHA_LENGTH, LOGIN_NAME, LOGIN_PWD } from '@/global/constants'
import useLoginStore from '@/store/login/login.ts'
import { localCache } from '@/utils/cache'
import { message } from '@/utils/resetMessage'
import type { FormInstance, FormRules } from 'element-plus'
import { onBeforeMount, reactive, ref } from 'vue'

// 1.定义account数据
const accountForm = reactive({
  account: localCache.getCache(LOGIN_NAME) ?? '',
  password: localCache.getCache(LOGIN_PWD) ?? ''
})

// 2.校验规则
const accountRules: FormRules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入帐号', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'bulr' },
    {
      pattern: /^[a-z0-9]{6,10}$/, // 用正则自定义校验规则
      message: '长度必须是6-10位数之间',
      trigger: 'blur'
    }
  ]
})

// 3.执行帐号登录逻辑
const ruleFormRef = ref<FormInstance>()
const loginStore = useLoginStore()
const loginAction = (isRemPwd: boolean) => {
  ruleFormRef.value?.validate((valid: boolean, messageTips: any) => {
    if (valid) {
      console.log('检验成功')
      const name = accountForm.account
      const password = accountForm.password
      // 向服务器发送网络请求
      loginStore.loginAccountAction({ name, password }).then(res => {
        console.log('//', res)
        // 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(LOGIN_NAME, name)
          localCache.setCache(LOGIN_PWD, password)
        } else {
          localCache.deleteCache(LOGIN_NAME)
          localCache.deleteCache(LOGIN_PWD)
        }
      })
    } else {
      let firstErrorField = Object.values(messageTips)[0][0].message
      message.error({
        showClose: true,
        message: firstErrorField
      })
      console.log(messageTips)
    }
  })
}

let identifyCode = ref('') //随机组合字符串
let inputCode = ref('') //text框输入的验证码

//随机切换验证码
const makeCode = (length: number) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    const r = Math.floor(Math.random() * 36)
    if (r < 10) {
      code += r
    } else {
      code += String.fromCharCode(r - 10 + 65)
    }
  }
  identifyCode.value = code
  localCache.setCache('code', code)
  console.log(identifyCode.value)
}

// 初始化验证码
const refreshCode = () => {
  inputCode.value = ''
  identifyCode.value = '' //输入框置空
  makeCode(CAPTCHA_LENGTH) //验证码长度为
}

const captchaLength = ref<number>(CAPTCHA_LENGTH) // 验证码输入框最大长度
onBeforeMount(() => {
  refreshCode()
})
// 把属性和方法暴露出去，可以用于父子组件通信，子组件把属性暴露出去，父组件用ref获取子组件DOM，子组件暴露的方法或属性可以用dom获取。
defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.pane-account {
  color: red;
}
</style>
