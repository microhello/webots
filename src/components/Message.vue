<template>
  <div class="message">
    <p v-for="item in messages" v-html="highLight(item)"></p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: String,
    keyword: String
  },
  data () {
    return {
      now: new Date().valueOf()
    }
  },
  computed: {
    messages () {
      return this.message.split('\n')
    },
    keywords () {
      return this.keyword ? this.keyword.split(/[+,]/).filter(item => item !== '') : undefined
    }
  },
  methods: {
    highLight (text) {
      let replaceCode = {
        '<': '&lt;',
        '>': '&gt;'
      }
      if (typeof this.keywords !== 'undefined') {
        text = text.replace(new RegExp(this.keywords.join('|'), 'gi'), $ => `<mark data-${this.now}>${$}</mark>`)
      }
      return text.replace(/[<>]/g, $ => replaceCode[$])
      .replace(new RegExp(`&lt;mark data-${this.now}&gt;(.+?)&lt;/mark&gt;`, 'g'), ($, $1) => `<mark>${$1}</mark>`)
    }
  }
}
</script>

<style lang="less">
.message {
  word-wrap: break-word;
  word-break: normal;
}
</style>
