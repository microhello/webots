<template>
  <div class="login">
    <div class="qr-code-box">
      <img src="../assets/image/login.png" @click="login" />
      <h2>扫描二维码登录微信</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login () {
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style lang="less">
.login {
  background: rgba(255, 255, 255, .4);
  position: relative;
  .qr-code-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    padding: 50px;
    img {
      width: 250px;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 18px;
    }
  }
}
</style>
