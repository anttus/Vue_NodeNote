<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>


<!-- Global -->
<style>
* {
  box-sizing: border-box;
  margin: auto;
  padding: 0;
}
body {
  font-family: "Slabo 27px", serif;
  line-height: 1.4;
}
.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
</style>