<script setup>
defineProps({
  pages: {
    type: Array,
    required: true
  },
  hasLastActive: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <nav class="side-menu">
    <template v-for="(page, index) in pages">
      <span v-if="pages[index - 1]?.frontmatter.parent !== page?.frontmatter.parent" class="side-menu-parent">
        # {{ page?.frontmatter.parent}}
      </span>
      <a :href="page.url"
         :class="{ 'active': hasLastActive && index === pages.length - 1 }"
         class="side-menu-link"
      >
        {{ page.frontmatter.title || page.url.split('/').pop().replace('.html', '') }}
      </a>
    </template>
  </nav>
</template>

<style scoped>
  .side-menu {
    display: flex;
    flex-direction: column;
  }
  .side-menu-parent {
    margin-bottom: 0.5em;
    color: var(--vp-c-danger-1);
  }
  .side-menu-link {
    margin-bottom: 0.5em;
    color: var(--vp-c-text-1);
    transition: color 300ms ease-in-out;
  }

  .side-menu-link:hover {
    color: var(--vp-c-brand-1);
  }

  .active {
    color: var(--vp-c-warning-1);
  }
</style>