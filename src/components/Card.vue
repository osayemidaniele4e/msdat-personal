<template>
    <div class="base-card">
    <slot></slot>
    </div>
</template>

<style scoped>
.base-card {
    width: 103%;
    height: 20vh;
    background-color: #ffff ;
    border: 0.5px solid rgb(163, 163, 163);
    overflow-y: scroll;
}
</style>