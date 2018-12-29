<template>
  <div>
    <tab-container ref="tabContainer" :defaultPage="defaultPage" :tabRemove="tabRemove">
      <template>
        <h3>默认页面</h3>
        <el-button @click="addTab(1)">添加标签1</el-button>
        <el-button @click="addTab(2)">添加标签2</el-button>
      </template>

      <template slot="tab1">
        <big-table></big-table>
      </template>

      <template slot="tab2">
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
      defaultPage: {
        label: '默认页面',
        name: 'default',
        slotName: 'default',
        closable: false,
      },
    };
  },
  mounted() {
    // this.$refs.tabContainer.openTabPage(defaultPage);
  },
  methods: {
    addTab(no) {
      this.$refs.tabContainer.$emit(event.OPEN_TAB, {
        label: '标签' + no,
        name: 'tab' + no,
        slotName: 'tab' + no,
        closable: true,
      });
    },
    tabRemove(targetName) {
      this.$message.success(targetName + '关闭');
    },
  },
};
</script>
