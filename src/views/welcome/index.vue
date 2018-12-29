<template>
  <div>欢迎访问 {{ systemName }}</div>
</template>

<script>
import config from '@/config';

export default {
  name: 'welcome',
  data() {
    return {
      systemName: config.systemName,
    };
  },
};
</script>
