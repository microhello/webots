<template>
  <ul class="alert">
    <li v-for="item of messages" :class="{ 'success': item.type === 'success', 'error': item.type === 'error' }">{{ item.message }}</li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Alert',
  computed: {
    ...mapState({
      messages: state => state.help.messages
    })
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.alert {
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 100001;
  transform: translateX(-50%);
  pointer-events: none;
  li {
    padding: 0 14px;
    line-height: 28px;
    color: transparent;
    border: 1px solid transparent;
    border-radius: 14px;
    margin-top: 5px;
  }
  .success {
    color: @main-text-color-success;
    border-color: @main-text-color-success;
  }
  .error {
    color: @main-text-color-failure;
    border-color: @main-text-color-failure;
  }
}
</style>
