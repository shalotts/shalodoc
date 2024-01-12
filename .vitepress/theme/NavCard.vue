<script setup>
import {usePage} from "vitepress-pages";
import {computed} from "vue";

const page = computed(() => usePage(route.path));
</script>

<template>
  <section v-for="page in pages" :key="page">
    <h2>{{ page.title }}</h2>
    <h3 v-for="child in pages[page.path]" :key="child">{{ child.title }}</h3>
  </section>
</template>

<style scoped>

</style>
