<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="文本框" prop="title">
        <el-input v-model="form.title" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="下拉选择" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker
          v-model="form.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开关"> <el-switch v-model="form.switch"></el-switch> </el-form-item>
      <el-form-item label="多选框">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="选项1" name="type"></el-checkbox>
          <el-checkbox label="选项2" name="type"></el-checkbox>
          <el-checkbox label="选项3" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单选框">
        <el-radio-group v-model="form.resource">
          <el-radio label="选项1"></el-radio>
          <el-radio label="选项2"></el-radio>
          <el-radio label="选项3"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="多行文本">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
      <pre class="code">
        表单值：<br>
        {{ JSON.stringify(form) }}
      </pre>
    </el-form>
  </div>
</template>

<script>
import validate from '@/utils/validate';

export default {
  name: 'bigForm',

  data() {
    return {
      form: {
        title: '',
        status: '',
        dateRange: '',
        switch: false,
        type: [],
        resource: '',
        desc: '',
      },
      formRules: {
        title: [validate.required()],
        status: [validate.required()],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success('提交成功');
        }
        return false;
      });
    },
    onCancel() {
      this.$message.warning('取消');
    },
  },
};
</script>

<style scoped>
.code {
  color: #409eff;
  margin-left: 120px;
  font-size: 14px;
  white-space: normal;
  word-wrap: break-word;
  line-height: 2;
}
</style>
