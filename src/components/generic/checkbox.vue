<template>
  <label>
    <input
      type="checkbox"
      class="focus:outline-none"
      @change="$emit('input', $event.target.checked)"
    />
    <span></span>
  </label>
</template>
<script>
export default {
  name: 'c-checkbox',
};
</script>
<style scoped>
label {
  position: relative;
}
span {
width: 21px;
height: 18.4px;
border: 1px solid #DADEE2;
  display: inline-block;
  border-radius: 3px;
  transition: all linear 0.3s;

}
span:after {
  content: "";
  position: absolute;
  top: 3px;
  left: 8px;
  border-bottom: 2px solid #348481;
  border-right: 2px solid #348481;
  height: 9px;
  width: 4px;
  transform: rotate(45deg);
  visibility: hidden;
}
input {
  display: none;
}
input:checked ~ span {
 background: #fff
}
input:checked ~ span:after {
  visibility: visible;
}
</style>
