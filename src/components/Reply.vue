<template>
  <div class="reply">
    <div class="reply-content border-box">
      <h1>来自“{{ from }}”：</h1>
      <textarea v-model="message"></textarea>
      <a class="submit-btn">发送</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  data () {
    return {
      from: 'tina',
      message: '@Notwowait'
    }
  }
}
</script>

<style lang="less">
.reply {
  .reply-content {
    padding: 30px 40px;
    h1 {
      font-size: 16px;
      line-height: 40px;
      margin-bottom: 15px;
    }
    textarea {
      width: 100%!important;
      min-height: 200px;
      margin-bottom: 30px;
    }
    .submit-btn {
      display: block;
      width: 80px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #fff;
      background-color: #169bd5;
      border-radius: 5px;
      margin: 0 auto;
    }
  }
}
</style>
