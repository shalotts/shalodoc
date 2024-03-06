<script setup>

// Default theme layout to extend
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

// Composables to use
import { usePages } from 'vitepress-pages'

// The way to react to route changes
import { useRoute } from 'vitepress'

// Build-time data-loader
import { data } from '../../docs/pages.data.mts'

// Component to display pages in a list
import NavCard from './NavCard.vue'
import Logo from './assets/logo.svg?url'

const route = useRoute()
const { rs, children, parents, siblings, pages } = usePages(route, data)
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <img :src="Logo" alt="logo" style="z-index: 1">
    </template>

    <template #nav-bar-content-after>
      <a href="https://algolia.com" target="_blank">
        <img class="algolia" src="https://res.cloudinary.com/dr5gcup5n/image/upload/v1709389302/shalodoc/zdhoyhsodtlw4nxtlzbe.svg" alt="algolia">
      </a>
    </template>

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
.VPNavBarTitle {
  padding: 0 5px;
  background: var(--vp-c-gray-3);
  z-index: 10;
}

.image-container {
  display: flex;
}

.main {
  backdrop-filter: blur(100px);
}

.algolia {
  padding-left: 10px;
  display: block;
  width: auto;
  height: 20px;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

.algolia:hover {
  opacity: 1;
}

@media (min-width: 960px) {
  html {
    overflow-y: scroll;
  }
  .main {
    backdrop-filter: none;
  }

}
</style>
