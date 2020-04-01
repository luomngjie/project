<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script> 
export default {
  name: 'Home',
  props: {
    msg: String
  },
  mounted(){
    this.$nextTick(() => {
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
  }
  a {
    color: #42b983;
  }
</style>
