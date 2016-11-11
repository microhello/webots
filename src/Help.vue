<template>
  <div id="help">
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const Loading = resolve => require(['./components/Loading'], resolve)

export default {
  name: 'Help',
  computed: {
    ...mapState({
      showLoading: state => state.help.showLoading
    })
  },
  components: {
    Loading
  }
}
</script>

<style lang="less">
#help {

}
</style>
