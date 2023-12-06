<template>
  <div class="userSearch">
    <el-form ref="formRef" :model="searchForm" size="large" label-width="80px">
      <!-- element layout布局 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="enable" label="状态">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="createAt" label="创建时间">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button @click="handleResetClick" icon="Refresh">重置</el-button>
      <el-button @click="handleSearchClick" icon="Search" type="primary">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: []
})
const formRef = ref<InstanceType<typeof ElForm>>()
// 重置按钮
const handleResetClick = () => {
  // 重置有两种方式，一种是将表单的值赋为空，还有一种就是下面这样，
  // 但是需要前置条件：1、ref绑定表单；2、每一个item要有prop
  formRef.value?.resetFields()
}

// 查询按钮
function handleSearchClick() {
  console.log('点击查询按钮')
}
</script>

<style scoped lang="less">
.userSearch {
  background-color: white;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    // display: flex;
    // flex-direction: row-reverse;
    text-align: right; // 因为里面的元素都是行内布局可以直接用text-align不需要用flex布局
    padding: 0 50px 10px 0;
  }
}
</style>
