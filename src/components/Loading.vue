<template>
  <div class="loading">
    <div class="sk-three-bounce">
			<div class="sk-child sk-bounce1"></div>
			<div class="sk-child sk-bounce2"></div>
			<div class="sk-child sk-bounce3"></div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="less">
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  .sk-three-bounce {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .sk-child {
      width: 20px;
      height: 20px;
      background-color: salmon;
      border-radius: 100%;
      display: inline-block;
      animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
      &.sk-bounce1 {
        animation-delay: -0.32s;
      }
      &.sk-bounce2 {
        animation-delay: -0.16s;
      }
    }
  }
  @keyframes sk-three-bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
}
</style>
