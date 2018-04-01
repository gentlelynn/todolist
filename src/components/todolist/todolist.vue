<template>
 <div class="thing">
     我是列表页面
     <div v-for="(a,key) in plan" :key="key">
      <p>{{ a.comment}}</p>
      <p>{{ a.date}}</p>
     </div>
     <!-- <p>{{ plan.comment }}</p>
     <p>{{ plan.date }}</p> -->
 </div>
</template>

<script>
// import { mapState } from 'vuex'
// import { tdwhat } from '../tdwhat/tdwhat'
export default {
  name: 'thing',
  computed: {
    plan () {
      return this.$store.state.list
    }
  }
}
</script>

<style>
</style>
