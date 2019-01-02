<template>
  <div>
    <tab-container
      ref="tabContainer"
      :defaultTab="defaultTab"
      :tabRemove="tabRemove"
      :tabCreate="tabCreate"
    >
      <!--数据列表页-->
      <template slot="default">
        <data-table
          ref="dateTable"
          :queryParams="queryParams"
          :apiUrl="listUrl"
          :loadCallback="loadCallback"
        >
          <div slot="conditions">
            <el-row>
              <el-col :span="21">
                <el-form :inline="true" :model="queryParams" size="small">
                  <!--查询条件 TODO 根据需要修改-->
                  <el-form-item label="标题">
                    <el-input
                      type="text"
                      v-model="queryParams.title"
                      placeholder="请输入标题关键字"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-select
                      v-model="queryParams.status"
                      placeholder="请选择状态"
                      :multiple="false"
                    >
                      <el-option label="全部" value=""></el-option>
                      <!--TODO 自定义选项-->
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="更新日期">
                    <el-date-picker
                      type="daterange"
                      v-model="queryParams.updateTime"
                      range-separator="至"
                      start-placeholder="开始"
                      end-placeholder="结束"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="small" @click="queryData">
                      <i class="el-icon-search"></i>&nbsp;&nbsp;查询
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="3">
                <div class="pull-right">
                  <el-button type="success" size="small" @click="openCreateTab">
                    <i class="el-icon-plus"></i>&nbsp;&nbsp;新建
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <template slot="columns">
            <!--列设置 TODO 根据需要修改-->
            <el-table-column prop="id" label="ID" align="center" width="80" sortable="custom">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" align="left">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              align="center"
              width="120"
              sortable="custom"
            >
              <template slot-scope="scope">
                {{ scope.row.status === 1 ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新日期"
              align="center"
              width="100"
              sortable="custom"
            >
              <template slot-scope="scope">
                {{ scope.row.updateTime | datetime('YYYY-MM-DD') }}
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额" align="right" width="100" sortable="custom">
              <template slot-scope="scope">
                {{ scope.row.amount | thousand }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-more"
                  circle
                  title="查看"
                  @click="openDetailTab(scope.row.id)"
                ></el-button>
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-edit-outline"
                  circle
                  title="修改"
                  @click="openEditTab(scope.row.id)"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  title="删除"
                  @click="deleteItem(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </template>
        </data-table>
      </template>

      <!--新建/编辑页-->
      <template slot="editTab">
        <!--编辑表单 TODO 根据需要修改-->
        <el-form
          ref="editForm"
          :model="form"
          :rules="formRules"
          label-width="120px"
          class="edit-form"
        >
          <el-input type="hidden" v-model="form.id" v-show="false"></el-input>
          <el-form-item label="标题" prop="title">
            <el-input type="text" v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态" :multiple="false">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额" prop="amount">
            <el-input type="number" v-model="form.amount" placeholder="请输入金额"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </template>

      <!--详情页-->
      <template slot="detailTab">
        <!--详情信息 TODO 根据需要修改布局和字段-->
        <el-form ref="detailForm" :model="detail" label-width="120px" class="detail-form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="ID">
                <span>{{ detail.id }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ detail.title }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ detail.status === 1 ? '是' : '否' }}</span>
              </el-form-item>
              <el-form-item label="更新日期">
                <span>{{ detail.updateTime | datetime('YYYY-MM-DD') }}</span>
              </el-form-item>
              <el-form-item label="金额">
                <span>{{ detail.amount | thousand }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </tab-container>
  </div>
</template>

<script>
import TabContainer from '@/components/TabContainer';
import DataTable from '@/components/DataTable';
import api from '@/resources/api';
import event from '@/utils/event';
import validate from '@/utils/validate';
import request from '@/utils/request';

export default {
  name: 'sample',
  components: {
    TabContainer,
    DataTable,
  },
  data() {
    return {
      listUrl: api.sample_list, // TODO 列表数据获取接口
      detailUrl: api.sample_detail, // TODO 详情接口
      createUrl: api.sample_create, // TODO 新建接口
      updateUrl: api.sample_update, // TODO 更新接口
      deleteUrl: api.sample_delete, // TODO 删除接口
      queryParams: {
        title: '', // 标题
        status: '', // 状态
        updateTime: '', // 更新日期
      },
      defaultTab: {
        label: '数据列表',
        name: 'default',
        slotName: 'default',
        closable: false,
      },
      isEditTabOpen: false, // 编辑页是否打开，暂时只允许同时打开一个编辑页
      // 初始值，用于重置
      initialForm: {
        title: '', // 标题
        status: '', // 状态
        amount: '', // 金额
      },
      form: {
        title: '', // 标题
        status: '', // 状态
        amount: '', // 金额
      },
      formRules: {
        // TODO 自定义验证规则

        title: [validate.requiredForSelect()], // 标题 校验规则
        status: [validate.required()], // 状态 校验规则
        amount: [validate.requiredForSelect()], // 金额 校验规则
      },
      detail: {
        id: '', // ID
        title: '', // 标题
        status: '', // 状态
        updateTime: '', // 更新日期
        amount: '', // 金额
      },
    };
  },
  methods: {
    // region 数据和API相关

    // 新建/修改 提交
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this._saveInfo().then(() => {
            this.$message.success('保存成功');
            this.$refs.tabContainer.$emit(event.ACTIVE_TAB, 'default', this.queryData());
          });
        }
        return false;
      });
    },
    // 删除条目
    deleteItem(id) {
      this.$confirm(`是否确认删除ID为 ${id} 的条目？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this._deleteInfo(id).then(() => {
            this.queryData();
          });
        })
        .catch(() => {});
    },
    // 获取详细信息，用于编辑/查看
    _getDetailInfo(id) {
      // TODO 根据接口需要修改，也可以提取到 @/api/** 中
      console.log('get detail for id: %s', id);
      return request({
        url: this.detailUrl,
        method: 'post',
        data: {
          id,
        },
      });
    },
    // 删除信息
    _deleteInfo(id) {
      // TODO 根据接口需要修改，也可以提取到 @/api/** 中
      console.log('delete item for id: %s', id);
      return request({
        url: this.deleteUrl,
        method: 'post',
        data: {
          id,
        },
      });
    },
    // 保存信息
    _saveInfo() {
      // TODO 根据接口需要修改，也可以提取到 @/api/** 中
      if (this.form.id) {
        // 修改
        console.log('update item for id: %s', this.form.id);
        return request({
          url: this.updateUrl,
          method: 'post',
          data: this.form,
        });
      } else {
        // 新建
        console.log('create item');
        return request({
          url: this.createUrl,
          method: 'post',
          data: this.form,
        });
      }
    },

    // endregion

    // region Tab相关

    // 打开新建标签页
    openCreateTab() {
      this._openEditTab('create', null, () => {
        if (this.$refs.editForm && typeof this.$refs.editForm.clearValidate !== 'undefined') {
          // 如果非第一次载入
          this.form = Object.assign({}, this.initialForm);
          this.$nextTick(() => {
            this.$refs.editForm.clearValidate();
          });
        }
      });
    },
    // 打开编辑标签页
    openEditTab(id) {
      this._openEditTab('edit', id, () => {
        this._getDetailInfo(id).then(data => {
          this.form = Object.assign({}, this.initialForm, data);
        });
      });
    },
    // 打开详情标签页
    openDetailTab(id) {
      this.$refs.tabContainer.$emit(
        event.OPEN_TAB,
        {
          label: `详情 ID: ${id}`,
          name: 'detailTab',
          slotName: 'detailTab',
          closable: true,
        },
        () => {
          this._getDetailInfo(id).then(data => {
            this.detail = Object.assign({}, this.initialForm, data);
          });
        }
      );
    },
    _openEditTab(type, id, cb) {
      if (this.isEditTabOpen) {
        this.$confirm('此操作将会关闭现有的编辑窗口，请确认您的工作已经保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$refs.tabContainer.$emit(
              event.OPEN_TAB,
              {
                label: type === 'create' ? '新建' : '修改',
                name: 'editTab',
                slotName: 'editTab',
                closable: true,
              },
              cb
            );
          })
          .catch(() => {});
      } else {
        this.$refs.tabContainer.$emit(
          event.OPEN_TAB,
          {
            label: type === 'create' ? '新建' : `修改 ID: ${id}`,
            name: 'editTab',
            slotName: 'editTab',
            closable: true,
          },
          cb
        );
      }
    },
    // tab 创建时触发
    tabCreate(tab) {
      console.log(tab);
      if (tab.name === 'editTab') {
        this.isEditTabOpen = true;
      }
    },
    // tab 关闭时触发
    tabRemove(targetName) {
      console.log(targetName + ' 关闭');
      if (targetName === 'editTab') {
        this.isEditTabOpen = false;
      }
    },

    // endregion

    // region 列表相关

    // 查询数据
    queryData() {
      this.$refs.dateTable.$emit(event.REFRESH_ALL_DATA);
    },
    // 列表数据载入后的回调
    loadCallback() {
      // TODO 这里可以写一些列表数据载入后要执行的事情
    },

    // endregion
  },
};
</script>

<style lang="less" scoped>
.detail-form,
.edit-form {
  margin-top: 20px;
}
</style>
