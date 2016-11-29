<template>
  <div id="help">
    <loading v-if="showLoading"></loading>
    <alert></alert>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const Loading = resolve => require(['../components/Loading'], resolve)
const Alert = resolve => require(['../components/Alert'], resolve)

export default {
  name: 'Help',
  computed: {
    ...mapState({
      showLoading: state => state.help.showLoading
    })
  },
  components: {
    Loading,
    Alert
  }
}
</script>

<style lang="less">
#help {

}
</style>
