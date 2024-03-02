<script setup>
import { data } from '../../docs/pages.data.mts'
import { useSidebar } from 'vitepress/theme'
import { usePages } from 'vitepress-pages'
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const { hasSidebar } = useSidebar()
const route = useRoute()
const { rs, children, parents, siblings, pages } = usePages(route, data)

const sideBarPages = pages.value['/docs/'].reduce((acc, item) => {
  const { parent } = item.frontmatter;

  if (!acc[parent]) {
    acc[parent] = [];
  }

  acc[parent].push(item)

  return acc;
}, []);

</script>

<template>
  <div v-if="hasSidebar" class="sidebar">
    <template v-for="(parentKey, parentIndex) in Object.keys(sideBarPages)" :key="parentIndex">
      <span class="sidebar-menu-parent">
        # {{ parentKey }}
      </span>

      <ul>
        <li v-for="(page, pageIndex) in sideBarPages[parentKey]" :key="pageIndex">
          <a :href="page.url"
             :class="{ 'active': page.url === route.path }"
             class="sidebar-menu-link"
          >
            {{ page.frontmatter.title || page.url.split('/').pop().replace('.html', '') }}
          </a>
        </li>
      </ul>

    </template>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  position: fixed;
  top: var(--vp-layout-top-height, 0px);
  bottom: 0;
  left: 0;
  z-index: var(--vp-z-index-sidebar);
  padding: 32px 32px 96px;
  width: calc(100vw - 64px);
  max-width: 320px;
  opacity: 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 1);
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: opacity 0.5s, transform 0.25s ease;
  overscroll-behavior: contain;
  background: linear-gradient(45deg, var(--vp-c-gray-soft), var(--vp-c-gray-3));
  backdrop-filter: blur(8px);
}

.sidebar ul {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.sidebar-menu-parent {
  margin-bottom: 0.5em;
  color: var(--vp-c-danger-1);
}
.sidebar-menu-link {
  padding: 5px 10px;
  color: var(--vp-c-text-1);
  transition: color 300ms ease-in-out;
}

.sidebar-menu-link:hover {
  color: var(--vp-c-brand-1);
}

.active {
  background: var(--vp-c-warning-1);
  color: var(--vp-c-divider);
  pointer-events: none;
}

.sidebar[open="true"] {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  transition: opacity 0.25s,
  transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.dark .sidebar {
  box-shadow: 0 2px 2px rgba(255, 255, 255, 1);
}
@media (min-width: 960px) {
  .sidebar {
    padding-top: var(--vp-nav-height);
    width: var(--vp-sidebar-width);
    max-width: 100%;
    background-color: var(--vp-sidebar-bg-color);
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    transform: translateX(0);
    backdrop-filter: blur(8px);
  }
}
@media (min-width: 1440px) {
  .sidebar {
    padding-left: max(32px, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
    width: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
  }
}
</style>