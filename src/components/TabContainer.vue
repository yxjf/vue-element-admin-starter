<template>
  <div class="tab-container">
    <el-tabs
      v-model="activeName"
      :type="tabType"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        :label="defaultTab.label || '默认页'"
        :name="defaultTab.name || 'default'"
        :closable="defaultTab.closable || false"
      >
        <slot :name="defaultTab.slotName || 'default'" :data="defaultTab.data"></slot>
      </el-tab-pane>
      <el-tab-pane
        v-for="item in pages"
        :label="item.label"
        :name="item.name"
        :closable="item.closable"
        :key="item.name"
      >
        <slot :name="item.slotName" :data="item.data"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 包含标签的页面，适合逻辑较多的功能页面
import event from '@/utils/event';

export default {
  name: 'TabContainer',
  props: {
    // 风格类型
    tabType: {
      type: String,
      required: false,
      default: '',
    },
    // 默认开启页
    // 格式：
    // {
    //   label: 标签页标题
    //   name: 与标签页 activeName 对应的标识符，表示标签页别名
    //   slotName: 标签页内容slot name
    //   closable: 标签是否可关闭，默认 false
    //   disabled: 是否禁用，默认 false
    //   data: 需要传递给标签页slot的props
    // }
    defaultTab: {
      type: Object,
      required: true,
    },
    // 其他默认显示的标签页
    otherTabs: {
      type: Array,
      required: false,
    },
    // tab 新建时触发
    tabCreate: {
      type: Function,
      required: false,
    },
    // tab 被选中时触发
    tabClick: {
      type: Function,
      required: false,
    },
    // 点击 tab 移除按钮后触发
    tabRemove: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      activeName: this.defaultTab.name,
      pages: this.otherTabs || [],
      length: 0,
      tabPage: {},
      index: 0,
      showLoad: true,
    };
  },
  mounted() {
    this.$on(event.OPEN_TAB, (tabPage, cb) => {
      this.openTabPage(tabPage, cb);
    });
    this.$on(event.CLOSE_TAB, (tabPageName, cb) => {
      this.handleTabRemove(tabPageName, cb);
    });
    this.$on(event.ACTIVE_TAB, (tabPageName, cb) => {
      this.activeName = tabPageName;

      if (cb && typeof cb === 'function') {
        cb(this.activeName);
      }
    });
  },
  methods: {
    // 关闭页面
    handleTabRemove(targetName, cb) {
      const tabs = this.pages.filter(tab => {
        return tab.name !== targetName;
      });
      this.pages = tabs;
      // 设置关闭后默认打开的标签页
      this.activeName = tabs.length > 0 ? tabs[tabs.length - 1].name : this.defaultTab.name;

      if (cb && typeof cb === 'function') {
        cb(this.activeName);
      }

      if (this.tabRemove) {
        this.tabRemove(targetName);
      }
    },
    // tab 被选中时触发
    handleTabClick(tab) {
      if (this.tabClick) {
        this.tabClick(tab);
      }
    },
    // 打开新页面
    openTabPage(tabPage, cb) {
      // 先关闭存在的同名的，再打开
      if (this.pages.some(item => item.name === tabPage.name)) {
        this.handleTabRemove(tabPage.name);
      }

      this.$nextTick(() => {
        this.pages.push(tabPage);
        this.activeName = tabPage.name;
      });

      if (cb && typeof cb === 'function') {
        cb(this.activeName);
      }

      if (this.tabCreate) {
        this.tabCreate(tabPage);
      }
    },
  },
};
</script>

<style scoped>
.tab-page,
.el-tabs {
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
