<template>
    <div class="base-card">
    <slot></slot>
    </div>
</template>

<style scoped>
.base-card {
    width: 103%;
    height: 25vh;
    background-color: #ffff ;
    border: 0.5px solid #e3e3e3;
    overflow-y: scroll;
}
</style>
