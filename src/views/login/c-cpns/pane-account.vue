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
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login.ts'
import { message } from '@/utils/resetMessage'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
// 1.定义account数据
const accountForm = reactive({
  account: '',
  password: ''
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
const loginAction = () => {
  ruleFormRef.value?.validate((valid: boolean, messageTips: any) => {
    if (valid) {
      console.log('检验成功')
      const name = accountForm.account
      const password = accountForm.password
      loginStore.loginAccountAction({ name, password })
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
