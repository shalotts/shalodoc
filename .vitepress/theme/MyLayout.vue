<script setup>

// Default theme layout to extend
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

// Composables to use
import { usePages, cleanLink, getPages } from 'vitepress-pages'

// The way to react to route changes
import { useRoute } from 'vitepress'

// Build-time data-loader
import { data } from '../../docs/pages.data.mts'

// Component to display pages in a list
import NavCard from './NavCard.vue'
import Logo from './assets/logo.svg?url'
import { computed } from 'vue'
import SideMenu from './SideMenu.vue'

const route = useRoute()
// Composable to process route and data and return reactive computed lists of pages
const { rs, children, parents, siblings, pages } = usePages(route, data)

const separatedPages = computed(() => {
  const activePageIndex = pages.value['/docs/'].findIndex(page => page.url === route.path) + 1
  console.log(activePageIndex)
  return {
    top: pages.value['/docs/'].slice(0, activePageIndex),
    bottom: pages.value['/docs/'].slice(activePageIndex + 1)
  }
})
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <img :src="Logo" alt="logo" style="z-index: 1">
    </template>
    <!-- Extending the default layout - put parents list right into the nav bar -->
    <template #nav-bar-title-after>

      <nav id="parents" class="grid">
        <a v-for="parent in parents.slice(0, -1)" :key="parent.url" class="parent" :href="cleanLink(parent.url)">
          {{ parent.frontmatter?.title }}
        </a>
      </nav>
    </template>

    <template #aside-top>
      <SideMenu :pages="separatedPages.top" :has-last-active="true" />
    </template>

    <template #aside-bottom>
      <SideMenu :pages="separatedPages.bottom"/>
    </template>

    <!-- This block goes right after the page text -->
    <template #doc-after>
      <!-- Children list -->
      <nav id="children" class="grid">
        <NavCard v-for="child in children" :key="child.url" :page="child" class="child">
        </NavCard>
      </nav>

      <!-- Siblings pair -->
      <nav id="siblings" class="grid">
        <a v-if="siblings?.prev" class="side-menu-link" :href="siblings?.prev.url">&lt;- Prev</a>
        <a v-if="siblings?.next" class="side-menu-link" :href="siblings?.next.url">Next -></a>
        <template v-for="sb in ['prev', 'next']" :key="sb">
          <NavCard v-if="siblings?.[sb]" :page="siblings?.[sb]" class="sibling">
          </NavCard>
        </template>
      </nav>

    </template>
  </Layout>
</template>

<style>

</style>
