<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isExpanded = ref(false);
const liItem = ref();

defineProps<{
  buttonName: string
}>()

function menuHandler () {
  isExpanded.value = !isExpanded.value
  liItem.value.querySelector('ul').classList.toggle('group-expanded')
}

onMounted(() => {
  const hasActive = liItem.value.querySelector('a.active') != null;

  if (hasActive) {
    isExpanded.value = true;
    liItem.value.querySelector('ul').classList.toggle('group-expanded')
  }
})
</script>

<template>
  <li ref="liItem">
    <button type="button"
            :title="!isExpanded ? 'expand' : 'collapse'"
            :class="{ 'expanded': isExpanded }"
            @click="menuHandler"
    >
      # {{ buttonName }}

      <svg data-v-09295527="" class="icon-top" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"><path data-v-09295527="" d="M39.6 30.557 24.043 15 8.487 30.557"></path></svg>
    </button>

    <slot />
  </li>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.expanded svg {
  transform: rotate(180deg);
}
svg {
  width: 1.5em;
  height: 1.5em;
  transform: rotate(90deg);
}
</style>
