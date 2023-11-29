<template>
  <div class="panel-phone">
    <el-form
      :model="formPhone"
      :rules="phoneRules"
      ref="phoneRef"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formPhone.phone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formPhone.verifyCode" style="width: 12vw"></el-input>
        <div class="verify-code">
          <el-button
            @click="getVerifyCode"
            :disabled="disabled"
            class="get-btn"
            :color="!disabled ? '#5b9dc9' : ''"
            >获取验证码
            <span v-if="disabled">({{ countdownTime }})</span>
          </el-button>
        </div>
        <!--    :class="!disabled ? 'countdownTimeActive' : ''" -->

        <!-- 这样也能在一行 -->
        <!-- <div style="display: flex">
          <el-input v-model="formPhone.verifyCode"></el-input>
          <el-button>获取验证码</el-button>
        </div> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// 表单数据
const formPhone = reactive({
  phone: '',
  verifyCode: ''
})

// 表单校验规则
const phoneRules = reactive({
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1(3[0-9]|4[0-9]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-9])\d{8}$/,
      message: '请输入正确的手机号'
    }
  ]
})

// **************************验证码模块---start**********************************
const disabled = ref(false) // 发送按钮验证码按钮
const countdownTime = ref(0) // 验证码倒计时
const getVerifyCode = () => {
  // 点击发送验证码
  disabled.value = true
  countdownTime.value = 5
  let t = setInterval(() => {
    countdownTime.value -= 1
    if (countdownTime.value < 1) {
      clearInterval(t)
      disabled.value = false
      countdownTime.value = 0
    }
  }, 1000)
}
// **************************验证码模块---end**********************************
</script>

<style scoped lang="less">
.verify-code {
  // display: flex;
  margin-left: auto;
  .get-btn {
    width: 120px;
    cursor: pointer;
    // margin-left: auto;
  }
}
.countdownTimeActive {
  background-color: #409eff;
}
</style>
