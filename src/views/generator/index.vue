<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="editor">
          <editor
            v-model="sourceCode"
            :options="options"
            lang="javascript"
            theme="github"
            @init="sourceCodeEditorInit"
          ></editor>
        </div>
      </el-col>
      <el-col :span="16">
        <p class="small">
          这里主要是快速生成带有数据列表、查询、新建、修改、删除功能的页面代码，
          <router-link :to="{ name: 'generator.sample' }">
            <el-button type="text">效果例子</el-button>
          </router-link>
        </p>
        <el-form
          :model="dynamicForm"
          ref="dynamicForm"
          label-width="100px"
          :inline="true"
          size="small"
          class="dynamic"
        >
          <el-form-item class="label"> <span class="tiny-input">属性名</span> </el-form-item>
          <el-form-item class="label"> <span class="tiny-input">属性显示名</span> </el-form-item>
          <el-form-item class="label"> <span class="tiny-select">请选择类型</span> </el-form-item>
          <el-form-item class="label"> <span class="tiny-select">是否查询</span> </el-form-item>
          <el-form-item class="label"> <span class="tiny-select">是否编辑</span> </el-form-item>
          <el-form-item class="label"> <span class="tiny-select">是否校验</span> </el-form-item>
          <el-form-item class="label">
            <span class="tiny-select">是否在列表显示</span>
          </el-form-item>
          <el-form-item class="label"> <span class="tiny-select">是否可排序</span> </el-form-item>
          <br />
          <div v-for="(prop, index) in dynamicForm.props" :key="index">
            <el-form-item :prop="'props[' + index + '].name'" :rules="validate.required()">
              <el-input v-model="prop.name" placeholder="属性名" class="tiny-input"></el-input>
            </el-form-item>
            <el-form-item :prop="'props[' + index + '].displayName'" :rules="validate.required()">
              <el-input
                v-model="prop.displayName"
                placeholder="属性显示名"
                class="tiny-input"
              ></el-input>
            </el-form-item>
            <el-form-item :prop="'props[' + index + '].type'" :rules="validate.requiredForSelect()">
              <el-select
                v-model="prop.type"
                placeholder="请选择类型"
                class="tiny-select"
                :disabled="index === 0"
              >
                <el-option label="String" value="String"></el-option>
                <el-option label="Number" value="Number"></el-option>
                <el-option label="Date" value="Date"></el-option>
                <el-option label="Boolean" value="Boolean"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'props[' + index + '].isQuery'"
              :rules="validate.requiredForSelect()"
            >
              <el-select
                v-model="prop.isQuery"
                placeholder="是否查询"
                class="tiny-select"
                :disabled="index === 0"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'props[' + index + '].isEdit'"
              :rules="validate.requiredForSelect()"
            >
              <el-select
                v-model="prop.isEdit"
                placeholder="是否编辑"
                class="tiny-select"
                :disabled="index === 0"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'props[' + index + '].isValidate'"
              :rules="validate.requiredForSelect()"
            >
              <el-select
                v-model="prop.isValidate"
                placeholder="是否校验"
                class="tiny-select"
                :disabled="index === 0"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'props[' + index + '].isTableShow'"
              :rules="validate.requiredForSelect()"
            >
              <el-select
                v-model="prop.isTableShow"
                placeholder="是否在列表显示"
                class="tiny-select"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'props[' + index + '].isSortable'"
              :rules="validate.requiredForSelect()"
            >
              <el-select v-model="prop.isSortable" placeholder="是否可排序" class="tiny-select">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="index > 0">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                title="删除"
                @click="removeProp(prop)"
              ></el-button>
            </el-form-item>
            <el-form-item v-if="index === dynamicForm.props.length - 1">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                circle
                title="增加"
                @click="addProp"
              ></el-button>
            </el-form-item>
          </div>
          <br />
          <el-form-item>
            <el-button type="primary" @click="submitForm">生成代码</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import editor from '@/components/VueBrace';
import validate from '@/utils/validate';

// 代码生成器
export default {
  name: 'generator',
  components: {
    editor,
  },
  data() {
    return {
      lang: 'javascript',
      theme: 'github',
      sourceCode: '',
      options: {
        tabSize: 2,
        useSoftTabs: true,
        highlightActiveLine: true,
        highlightSelectedWord: true,
        useWorker: false, // 关闭 lint
      },
      sourceCodeEditor: null, // editor 引用
      validate,
      dynamicForm: {
        props: [
          {
            name: 'id', // 字段名
            displayName: 'ID', // 显示名
            type: 'ID', // 类型
            isQuery: false, // 是否查询
            isEdit: false, // 是否编辑
            isValidate: false, // 是否校验，默认校验规则是必填
            isTableShow: true, // 是否在列表显示
            isSortable: false, // 是否可排序
          },
          {
            name: '', // 字段名
            displayName: '', // 显示名
            type: 'String', // 类型
            isQuery: false, // 是否查询
            isEdit: true, // 是否编辑
            isValidate: false, // 是否校验，默认校验规则是必填
            isTableShow: true, // 是否在列表显示
            isSortable: false, // 是否可排序
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    sourceCodeEditorInit(editor) {
      // 获取 editor 引用
      this.sourceCodeEditor = editor;
    },
    submitForm() {
      this.$refs.dynamicForm.validate(valid => {
        if (valid) {
          this.generateCode();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$confirm(`此操作将会清空所有条目，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.dynamicForm = {
            props: [
              {
                name: '',
                displayName: '',
                type: 'String',
                isQuery: false,
                isEdit: true,
                isValidate: false,
                isTableShow: true,
                isSortable: false,
              },
            ],
          };
        })
        .catch(() => {});
    },
    removeProp(item) {
      var index = this.dynamicForm.props.indexOf(item);
      if (index !== -1) {
        this.dynamicForm.props.splice(index, 1);
      }
    },
    addProp() {
      this.dynamicForm.props.push({
        name: '',
        displayName: '',
        type: 'String',
        isQuery: false,
        isEdit: true,
        isValidate: false,
        isTableShow: true,
        isSortable: false,
      });
    },
    generateCode() {
      /* eslint-disable */
      const scriptBegin = '<script>';
      const scriptEnd = '<\/script>';
      let searchFormHtml = '';
      let columnsHtml = '';
      let editFormHtml = '';
      let detailFormHtml = '';
      let queryParamsProps = '';
      let editFormProps = '';
      let editFormRules = '';
      let detailFormProps = '';

      this.dynamicForm.props.forEach((prop, index, props) => {
        let _searchItem = '';
        let _columnItem = '';
        let _editItem = '';
        let _detailItem = '';

        switch (prop.type) {
          case 'String':
            _searchItem = prop.isQuery
              ? `
                  <el-form-item label="${prop.displayName}">
                    <el-input type="text" v-model="queryParams.${prop.name}" placeholder="请输入${
                  prop.displayName
                }关键字"></el-input>
                  </el-form-item>`
              : '';

            _columnItem = prop.isTableShow
              ? `
            <el-table-column prop="${prop.name}" label="${prop.displayName}" align="left" ${
                  prop.isSortable ? 'sortable="custom"' : ''
                }>
              <template slot-scope="scope">
                {{ scope.row.${prop.name} }}
              </template>
            </el-table-column>`
              : '';

            _editItem = prop.isEdit
              ? `
          <el-form-item label="${prop.displayName}" ${
                  prop.isValidate ? 'prop="' + prop.name + '"' : ''
                }>
            <el-input type="text" v-model="form.${prop.name}" placeholder="请输入${
                  prop.displayName
                }"></el-input>
          </el-form-item>`
              : '';

            _detailItem = `
              <el-form-item label="${prop.displayName}">
                <span>{{ detail.${prop.name} }}</span>
              </el-form-item>`;
            break;

          case 'Number':
            _searchItem = prop.isQuery
              ? `
                  <el-form-item label="${prop.displayName}">
                    <el-input type="number" v-model="queryParams.${prop.name}" placeholder="请输入${
                  prop.displayName
                }关键字"></el-input>
                  </el-form-item>`
              : '';

            _columnItem = prop.isTableShow
              ? `
            <el-table-column prop="${prop.name}" label="${
                  prop.displayName
                }" align="right" width="100" ${prop.isSortable ? 'sortable="custom"' : ''}>
              <template slot-scope="scope">
                {{ scope.row.${prop.name} | thousand }}
              </template>
            </el-table-column>`
              : '';

            _editItem = prop.isEdit
              ? `
          <el-form-item label="${prop.displayName}" ${
                  prop.isValidate ? 'prop="' + prop.name + '"' : ''
                }>
            <el-input type="number" v-model="form.${prop.name}" placeholder="请输入${
                  prop.displayName
                }"></el-input>
          </el-form-item>`
              : '';

            _detailItem = `
              <el-form-item label="${prop.displayName}">
                <span>{{ detail.${prop.name} | thousand }}</span>
              </el-form-item>`;
            break;

          case 'Date':
            _searchItem = prop.isQuery
              ? `
                  <el-form-item label="${prop.displayName}">
                    <el-date-picker type="daterange" v-model="queryParams.${prop.name}"
                                    range-separator="至" start-placeholder="开始" end-placeholder="结束">
                    </el-date-picker>
                  </el-form-item>`
              : '';

            _columnItem = prop.isTableShow
              ? `
            <el-table-column prop="${prop.name}" label="${
                  prop.displayName
                }" align="center" width="100" ${prop.isSortable ? 'sortable="custom"' : ''}>
              <template slot-scope="scope">
                {{ scope.row.${prop.name} | datetime('YYYY-MM-DD') }}
              </template>
            </el-table-column>`
              : '';

            _editItem = prop.isEdit
              ? `
          <el-form-item label="${prop.displayName}" ${
                  prop.isValidate ? 'prop="' + prop.name + '"' : ''
                }>
            <el-date-picker v-model="form.${prop.name}" type="date" placeholder="请选择${
                  prop.displayName
                }"></el-date-picker>
          </el-form-item>`
              : '';

            _detailItem = `
              <el-form-item label="${prop.displayName}">
                <span>{{ detail.${prop.name} | datetime('YYYY-MM-DD') }}</span>
              </el-form-item>`;
            break;

          case 'Boolean':
            _searchItem = prop.isQuery
              ? `
                  <el-form-item label="${prop.displayName}">
                    <el-select v-model="queryParams.${prop.name}" placeholder="请选择${
                  prop.displayName
                }" :multiple="false">
                      <el-option label="全部" value=""></el-option>
                      <!--TODO 自定义选项-->
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>`
              : '';

            _columnItem = prop.isTableShow
              ? `
            <el-table-column prop="${prop.name}" label="${
                  prop.displayName
                }" align="center" width="120" ${prop.isSortable ? 'sortable="custom"' : ''}>
              <template slot-scope="scope">
                {{ scope.row.${prop.name} === 1 ? '是' : '否' }}
              </template>
            </el-table-column>`
              : '';

            _editItem = prop.isEdit
              ? `
          <el-form-item label="${prop.displayName}" ${
                  prop.isValidate ? 'prop="' + prop.name + '"' : ''
                }>
            <el-select v-model="form.${prop.name}" placeholder="请选择${
                  prop.displayName
                }" :multiple="false">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>`
              : '';

            _detailItem = `
              <el-form-item label="${prop.displayName}">
                <span>{{ detail.${prop.name} === 1 ? '是' : '否' }}</span>
              </el-form-item>`;
            break;

          case 'ID':
            _searchItem = prop.isQuery
              ? `
                  <el-form-item label="${prop.displayName}">
                    <el-input type="text" v-model="queryParams.${prop.name}" placeholder="请输入${
                  prop.displayName
                }关键字"></el-input>
                  </el-form-item>`
              : '';

            _columnItem = prop.isTableShow
              ? `
            <el-table-column prop="${prop.name}" label="${
                  prop.displayName
                }" align="center" width="80" ${prop.isSortable ? 'sortable="custom"' : ''}>
              <template slot-scope="scope">
                {{ scope.row.${prop.name} }}
              </template>
            </el-table-column>`
              : '';

            _editItem = `
          <el-input type="hidden" v-model="form.${prop.name}" v-show="false"></el-input>`; // ID 默认不能编辑

            _detailItem = `
              <el-form-item label="${prop.displayName}">
                <span>{{ detail.${prop.name} }}</span>
              </el-form-item>`;
            break;

          default:
            break;
        }

        searchFormHtml += _searchItem;
        columnsHtml += _columnItem;
        editFormHtml += _editItem;
        detailFormHtml += _detailItem;
        queryParamsProps += prop.isQuery
          ? `
            ${prop.name}: '',  // ${prop.displayName}`
          : '';
        editFormProps += prop.isEdit
          ? `
            ${prop.name}: '',  // ${prop.displayName}`
          : '';
        editFormRules += prop.isValidate
          ? `
            ${prop.name}: ${
              prop.type === 'Boolean' ? '[validate.required()]' : '[validate.requiredForSelect()]'
            },  // ${prop.displayName} 校验规则`
          : '';
        detailFormProps += `
            ${prop.name}: '',  // ${prop.displayName}`;
      });

      this.sourceCode = `<template>
  <div>
    <tab-container ref="tabContainer"
                   :defaultTab="defaultTab"
                   :tabRemove="tabRemove"
                   :tabCreate="tabCreate">
      <!--数据列表页-->
      <template slot="default">
        <data-table ref="dateTable"
                    :queryParams="queryParams"
                    :apiUrl="listUrl"
                    :loadCallback="loadCallback">
          <div slot="conditions">
            <el-row>
              <el-col :span="21">
                <el-form :inline="true" :model="queryParams" size="small">
                  <!--查询条件 TODO 根据需要修改-->${searchFormHtml}
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
            <!--列设置 TODO 根据需要修改-->${columnsHtml}
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-more" circle
                           title="查看" @click="openDetailTab(scope.row.id)"></el-button>
                <el-button type="warning" size="mini" icon="el-icon-edit-outline" circle
                           title="修改" @click="openEditTab(scope.row.id)"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" circle
                           title="删除" @click="deleteItem(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </template>
        </data-table>
      </template>

      <!--新建/编辑页-->
      <template slot="editTab">
        <!--编辑表单 TODO 根据需要修改-->
        <el-form ref="editForm" :model="form" :rules="formRules" label-width="120px" class="edit-form">${editFormHtml}
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
            <el-col :span="24">${detailFormHtml}
            </el-col>
          </el-row>
        </el-form>
      </template>
    </tab-container>
  </div>
</template>

${scriptBegin}
    import TabContainer from '@/components/TabContainer'
    import DataTable from '@/components/DataTable'
    import api from '@/resources/api'
    import event from '@/utils/event'
    import validate from '@/utils/validate'
    import request from '@/utils/request'


    export default {
      name: 'sample',
      components: {
        TabContainer,
        DataTable,
      },
      data() {
        return {
          listUrl: api.sample_list,  // TODO 列表数据获取接口
          detailUrl: api.sample_detail,  // TODO 详情接口
          createUrl: api.sample_create,  // TODO 新建接口
          updateUrl: api.sample_update,  // TODO 更新接口
          deleteUrl: api.sample_delete,  // TODO 删除接口
          queryParams: {${queryParamsProps}
          },
          defaultTab: {
            label: '数据列表',
            name: 'default',
            slotName: 'default',
            closable: false
          },
          isEditTabOpen: false, // 编辑页是否打开，暂时只允许同时打开一个编辑页
          // 初始值，用于重置
          initialForm: {${editFormProps}
          },
          form: {${editFormProps}
          },
          formRules: {
            // TODO 自定义验证规则
            ${editFormRules}
          },
          detail: {${detailFormProps}
          },
        }
      },
      methods: {

        // region 数据和API相关

        // 新建/修改 提交
        editSubmit() {
          this.$refs.editForm.validate(valid => {
            if (valid) {
              this._saveInfo().then(() => {
                this.$message.success('保存成功')
                this.$refs.tabContainer.$emit(event.ACTIVE_TAB, 'default', this.queryData());
              })
            }
            return false
          })
        },
        // 删除条目
        deleteItem(id) {
          this.$confirm(\`是否确认删除ID为 \${id} 的条目？\`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._deleteInfo(id).then(() => {
              this.queryData()
            })
          }).catch(() => {
          })
        },
        // 获取详细信息，用于编辑/查看
        _getDetailInfo(id) {
          // TODO 根据接口需要修改，也可以提取到 @/api/** 中
          console.log('get detail for id: %s', id);
          return request({
            url: this.detailUrl,
            method: 'post',
            data: {
              id
            }
          })
        },
        // 删除信息
        _deleteInfo(id) {
          // TODO 根据接口需要修改，也可以提取到 @/api/** 中
          console.log('delete item for id: %s', id);
          return request({
            url: this.deleteUrl,
            method: 'post',
            data: {
              id
            }
          })
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
              data: this.form
            })
          } else {
            // 新建
            console.log('create item');
            return request({
              url: this.createUrl,
              method: 'post',
              data: this.form
            })
          }
        },

        // endregion

        // region Tab相关

        // 打开新建标签页
        openCreateTab() {
          this._openEditTab('create', null, () => {
            if (this.$refs.editForm && typeof this.$refs.editForm.clearValidate !== 'undefined') {
              // 如果非第一次载入
              this.form = Object.assign({}, this.initialForm)
              this.$nextTick(() => {
                this.$refs.editForm.clearValidate()
              });
            }
          })
        },
        // 打开编辑标签页
        openEditTab(id) {
          this._openEditTab('edit', id, () => {
            this._getDetailInfo(id).then(data => {
              this.form = Object.assign({}, this.initialForm, data)
            })
          })
        },
        // 打开详情标签页
        openDetailTab(id) {
          this.$refs.tabContainer.$emit(event.OPEN_TAB, {
            label: \`详情 ID: \${id}\`,
            name: 'detailTab',
            slotName: 'detailTab',
            closable: true
          }, () => {
            this._getDetailInfo(id).then(data => {
              this.detail = Object.assign({}, this.initialForm, data)
            })
          });
        },
        _openEditTab(type, id, cb) {
          if (this.isEditTabOpen) {
            this.$confirm('此操作将会关闭现有的编辑窗口，请确认您的工作已经保存？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$refs.tabContainer.$emit(event.OPEN_TAB, {
                label: type === 'create' ? '新建' : \`修改 ID: \${id}\`,
                name: 'editTab',
                slotName: 'editTab',
                closable: true
              }, cb);
            }).catch(() => {
            })
          } else {
            this.$refs.tabContainer.$emit(event.OPEN_TAB, {
              label: type === 'create' ? '新建' : \`修改 ID: \${id}\`,
              name: 'editTab',
              slotName: 'editTab',
              closable: true
            }, cb);
          }
        },
        // tab 创建时触发
        tabCreate(tab) {
          console.log(tab);
          if (tab.name === 'editTab') {
            this.isEditTabOpen = true
          }
        },
        // tab 关闭时触发
        tabRemove(targetName) {
          console.log(targetName + ' 关闭')
          if (targetName === 'editTab') {
            this.isEditTabOpen = false
          }
        },

        // endregion

        // region 列表相关

        // 查询数据
        queryData() {
          this.$refs.dateTable.$emit(event.REFRESH_ALL_DATA)
        },
        // 列表数据载入后的回调
        loadCallback() {
          // TODO 这里可以写一些列表数据载入后要执行的事情
        },

        // endregion

      }
    }
${scriptEnd}

<style lang="less" scoped>
  .detail-form, .edit-form {
    margin-top: 20px;
  }
</style>

  `;

      /* eslint-enable */
    },
  },
};
</script>

<style lang="less" scoped>
.editor {
  margin-top: 10px;
  width: 100%;
  height: calc(~'100vh - 150px');
  border: 1px solid #ccc;
}

.tiny-select {
  width: 90px !important;
}

.tiny-input {
  width: 120px !important;
}

.label {
  margin-bottom: 5px;
  text-align: center;

  span.tiny-select,
  span.tiny-input {
    font-size: 12px;
    display: inline-block;
  }
}
</style>
