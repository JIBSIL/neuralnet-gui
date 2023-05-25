<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import DataSelection from './DataSelection.vue';
export default {
  name: 'App',
  components: {
        Header
    }
}
</script>