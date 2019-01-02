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
                  <el-form-item label="内容">
                    <el-input
                      type="text"
                      v-model="queryParams.description"
                      placeholder="请输入内容关键字"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="日期">
                    <el-date-picker
                      type="daterange"
                      v-model="queryParams.date"
                      range-separator="至"
                      start-placeholder="开始"
                      end-placeholder="结束"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-select v-model="queryParams.status" placeholder="请选择" :multiple="false">
                      <el-option label="全部" value=""></el-option>
                      <!--TODO 自定义选项-->
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
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
            <el-table-column
              prop="id"
              label="ID"
              width="80"
              align="center"
              sortable="custom"
            ></el-table-column>
            <el-table-column prop="title" label="标题" align="left" width="250"></el-table-column>
            <el-table-column prop="description" label="内容" align="left"></el-table-column>
            <el-table-column prop="status" label="状态" width="120" align="center">
              <template slot-scope="scope">
                {{ scope.row.status ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" width="100" sortable="custom">
              <template slot-scope="scope">
                {{ scope.row.date | datetime('YYYY-MM-DD') }}
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="数量" align="right" width="100" sortable="custom">
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
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="text" v-model="form.description" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="请选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择" :multiple="false">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量">
            <el-input type="number" v-model="form.amount" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </template>

      <!--详情页-->
      <template slot="detailTab">
        <!--详情信息 TODO 根据需要修改-->
        <el-form ref="detailForm" :model="detail" label-width="120px" class="detail-form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="ID">
                <span>{{ detail.id }}</span>
              </el-form-item>
              <el-form-item label="标题"> {{ detail.title }} </el-form-item>
              <el-form-item label="内容">
                <span>{{ detail.description }}</span>
              </el-form-item>
              <el-form-item label="日期"> {{ detail.date | datetime('YYYY-MM-DD') }} </el-form-item>
              <el-form-item label="状态"> {{ detail.status === 1 ? '是' : '否' }} </el-form-item>
              <el-form-item label="数量"> {{ detail.amount | thousand }} </el-form-item>
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
        description: '', // 内容
        status: '', // 状态
        date: '', // 日期
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
        id: '',
        title: '',
        description: '',
        status: '',
        date: '',
        amount: '',
      },
      form: {
        id: '',
        title: '',
        description: '',
        status: '',
        date: '',
        amount: '',
      },
      formRules: {
        // TODO 自定义验证规则
        title: [validate.required()],
        status: [validate.requiredForSelect()],
      },
      detail: {
        id: '',
        title: '',
        description: '',
        status: '',
        date: '',
        amount: '',
      },
    };
  },
  mounted() {},
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
                label: type === 'create' ? '新建' : `修改 ID: ${id}`,
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
