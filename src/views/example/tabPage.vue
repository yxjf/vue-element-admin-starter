<template>
  <div>
    <tab-container
      ref="tabContainer"
      :defaultTab="defaultTab"
      :tabClick="tabClick"
      :tabRemove="tabRemove"
      :tabCreate="tabCreate"
    >
      <template slot-scope="defaultSlot">
        <h3>默认页面</h3>
        <p>自定义参数：{{ defaultSlot.data }}</p>
        <el-button @click="addTab(1)">添加标签1</el-button>
        <el-button @click="addTab(2)">添加标签2</el-button>
      </template>

      <template slot="tab1" slot-scope="tab1">
        <p>自定义参数：{{ tab1.data }}</p>
        <big-table></big-table>
      </template>

      <template slot="tab2" slot-scope="tab2">
        <p>自定义参数：{{ tab2.data }}</p>
        <big-form></big-form>
      </template>
    </tab-container>
  </div>
</template>

<script>
import TabContainer from '@/components/TabContainer';
import event from '@/utils/event';
import bigTable from '@/views/example/bigTable';
import bigForm from '@/views/example/bigForm';

export default {
  name: 'tabPage',
  components: {
    TabContainer,
    bigTable,
    bigForm,
  },
  data() {
    return {
      defaultTab: {
        label: '默认页面',
        name: 'default',
        slotName: 'default',
        closable: false,
        data: {
          id: 1,
        },
      },
    };
  },
  mounted() {
    // this.$refs.tabContainer.openTabPage(defaultTab);
  },
  methods: {
    addTab(no) {
      this.$refs.tabContainer.$emit(
        event.OPEN_TAB,
        {
          label: '标签' + no,
          name: 'tab' + no,
          slotName: 'tab' + no,
          closable: true,
          data: {
            tabName: '标签' + no,
          },
        },
        this.$notify.success({ message: 'tab' + no + '添加' })
      );
    },
    tabClick(tab) {
      this.$notify.success({ message: tab.name + '点击' });
    },
    tabRemove(targetName) {
      this.$notify.success({ message: targetName + '关闭' });
    },
    tabCreate(tab) {
      this.$message(tab.name + '创建完毕');
    },
  },
};
</script>
