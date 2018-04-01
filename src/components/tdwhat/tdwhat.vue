<template>
  <div class="tdwhat">
      <div class="time">
        <label>日期</label>
          <input type="date" v-model="date" placeholder="Date"/>
      </div>
      <div class="thing">
        <label>代办事项</label>
        <input type="text" v-model="comment" placeholder="Comment"/>
      </div>
    <button @click="save()">保存</button>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'tdwhat',
  data () {
    return {
      date: '',
      comment: ''
    }
  },
  methods: {
    save () {
      const plan = {
        date: this.date,
        comment: this.comment
      }
      this.$store.dispatch('save', plan)
      this.$router.go(-1)
    }
  }
}
</script>
