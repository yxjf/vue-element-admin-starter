<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="toggle-sidebar" :class="{ collapse: isCollapse }" @click.prevent="toggleSideBar">
      <i class="fa fa-bars"></i>
    </div>
    <breadcrumb></breadcrumb>
  </el-menu>
</template>

<script>
import { mapActions } from 'vuex';
import actionTypes from '@/store/action-types';
import Breadcrumb from '@/components/Breadcrumb';

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions([actionTypes.toggleSideBar]),
  },
};
</script>
