<template>
  <div>
    <data-table
      ref="dateTable"
      :queryParams="queryParams"
      :apiUrl="apiUrl"
      :loadCallback="loadCallback"
    >
      <div slot="conditions">
        <el-form :inline="true" :model="queryParams">
          <el-form-item label="关键字">
            <el-input
              v-model="queryParams.keyword"
              placeholder="请输入关键字"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onQuery">查询</el-button>
          </el-form-item>
          <el-form-item>
            <!--注意这里判断action的方式-->
            <el-button type="success" size="small" v-show="isAuthAction(action.exampleAddUser)"
              >新建用户</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <template slot="columns">
        <el-table-column prop="id" label="ID" width="120" align="center" sortable="custom">
        </el-table-column>
        <el-table-column prop="title" label="地址" align="left"></el-table-column>
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">
              {{ scope.row.status ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i> {{ scope.row.date | datetime }}
          </template>
        </el-table-column>
      </template>
    </data-table>
  </div>
</template>

<script>
import api from '@/resources/api';
import action from '@/resources/action';
import DataTable from '@/components/DataTable';
import event from '@/utils/event';

export default {
  name: 'bigTable',
  components: {
    DataTable,
  },
  data() {
    return {
      action,
      apiUrl: api.example_bigTable,
      queryParams: {
        keyword: '',
      },
    };
  },
  mounted() {},
  methods: {
    onQuery() {
      this.$refs.dateTable.$emit(event.REFRESH_ALL_DATA);
    },
    loadCallback(data, queryParams) {
      this.$notify.info({
        title: '查询参数',
        message: JSON.stringify(queryParams || {}),
      });
    },
  },
};
</script>
