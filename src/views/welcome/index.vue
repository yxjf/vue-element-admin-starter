<template>
  <div>welcome {{ env }}</div>
</template>

<script>
export default {
  name: 'welcome',
  data() {
    return {
      env: process.env.NODE_ENV,
    };
  },
};
</script>
