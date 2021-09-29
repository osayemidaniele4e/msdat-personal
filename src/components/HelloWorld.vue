<template>
  <div class="hello">
    <h3 class="inst">Installed CLI Plugins</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: auto;
  text-align: center;
  max-width: 500px;
  position: relative;
  color: #000;
}
h3:before {
  content: "";
  width: 150px;
  height: 2px;
  display: block;
  background: black;
  position: absolute;
  top: 50%;
  left: 0;
}
h3:after {
  content: "";
  width: 150px;
  height: 2px;
  display: block;
  background: black;
  position: absolute;
  top: 50%;
  right: 0;
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
