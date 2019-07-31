<template>
  <div class="hello">
     <img alt="Vue logo" src="../assets/logo.png">
    <div class="train-index-btnbox" @click="jsonpTest()">
		<button class="g_btn_s">JSONP请求测试</button>
    </div>
    <div class="xxxx"></div>
    <div class="train-index-btnbox" @click="crosTest()">
		<button class="g_btn_s">CROS请求测试</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    msg: String
  },
  methods: {
    jsonpTest(){
        this.$router.push({name:'jsonp'});
    },
    crosTest(){
        this.$router.push({name:'cros'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.xxxx {
    margin: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
