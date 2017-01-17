<template>
  <div class="modal">
    <div class="modal-cover" @click="close"></div>
    <div class="modal-container">
      <slot></slot>
      <i class="iconfont modal-close-btn" @click="close">&#xe601;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .modal-cover {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
  .modal-container {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .modal-close-btn {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      transform: translateX(100%);
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 35px;
      cursor: pointer;
    }
  }
}
</style>
