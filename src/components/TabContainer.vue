<template>
  <div class="tab-container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      @tab-remove="handleRemove"
    >
      <el-tab-pane
        :label="defaultPage.label || '默认页'"
        :name="defaultPage.name || 'default'"
        :closable="defaultPage.closable || false">
        <slot :name="defaultPage.slotName || 'default'"></slot>
      </el-tab-pane>
      <el-tab-pane
        v-for="item in pages"
        :label="item.label"
        :name="item.name"
        :closable="item.closable"
        :key="item.name">
        <slot :name="item.slotName"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // 包含标签的页面，适合逻辑较多的功能页面
  import event from '@/utils/event'

  export default {
    name: 'TabPage',
    props: {
      // 默认开启页
      defaultPage: {
        type: Object
      },
      // tab 被选中时触发
      tabClick: {
        type: Function,
        required: false
      },
      // 点击 tab 移除按钮后触发
      tabRemove: {
        type: Function,
        required: false
      },
    },
    data() {
      return {
        activeName: this.defaultPage.name,
        pages: [],
        length: 0,
        tabPage: {},
        index: 0,
        showLoad: true
      }
    },
    mounted() {
      this.$on(event.OPEN_TAB, (tabPage) => {
        this.openTabPage(tabPage);
      });
    },
    methods: {
      // 关闭页面
      handleRemove(targetName) {
        const tabs = this.pages.filter((tab) => {
          return tab.name !== targetName
        })
        this.pages = tabs
        // 设置关闭后默认打开的标签页
        this.activeName = tabs.length > 0 ? tabs[tabs.length - 1].name : this.defaultPage.name

        if (this.tabRemove) {
          this.tabRemove(targetName)
        }
      },
      // tab 被选中时触发
      handleClick(tab) {
        if (this.tabClick) {
          this.tabClick(tab)
        }
      },
      // 打开新页面
      openTabPage(tabPage) {
        // 先关闭存在的同名的，再打开
        if (this.pages.some(item => item.name === tabPage.name)) {
          this.handleRemove(tabPage.name);
        }
        this.pages.push(tabPage);
        this.activeName = tabPage.name;
      },
    }
  }

</script>

<style scoped>
  .tab-page, .el-tabs {
    height: 100%;
  }

  .el-tab-pane {
    position: relative !important;
    min-height: 300px !important;
    padding-bottom: 50px !important;
  }

  .el-tabs--border-card {
    border-bottom: none;
    box-shadow: none;
  }

</style>
