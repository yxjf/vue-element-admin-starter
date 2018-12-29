<template>
  <div class="box">
    <div><img src="../assets/404.png" alt="404" /></div>
    <div>
      <h3>Oops!</h3>
      <p>您访问的页面不存在</p>
      <br />
      <router-link to="/" class="el-button el-button--primary">返回首页</router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 507px;
  }

  a {
    text-decoration: none;
  }
}
</style>
