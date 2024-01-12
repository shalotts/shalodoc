<script setup>

// Default theme layout to extend
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme

// Composables to use
import { usePages, cleanLink, getPages } from 'vitepress-pages';

// The way to react to route changes
import { useRoute } from 'vitepress'

// Build-time data-loader
import { data } from '../../docs/pages.data.mts'

// Component to display pages in a list
import NavCard from './NavCard.vue';

// Composable to process route and data and return reactive computed lists of pages
const { rs, children, parents, siblings, pages } = usePages(useRoute(), data);
</script>

<template>
  <Layout>
    <!-- Extending the default layout - put parents list right into the nav bar -->
    <template #nav-bar-title-after>

      <nav id="parents" class="grid">
        <a v-for="parent in parents.slice(0, -1)" :key="parent.url" class="parent" :href="cleanLink(parent.url)">
          {{ parent.frontmatter?.title }}
        </a>
      </nav>
    </template>

    <template #aside-top>
      <nav class="side-menu">
        <template v-for="(page, index) in pages['/docs/']">
          <span v-if="pages['/docs/'][index - 1]?.frontmatter.parent !== page?.frontmatter.parent" class="side-menu-parent">
            # {{ page?.frontmatter.parent}}
          </span>
          <a :href="page.url" class="side-menu-link">
            {{ page.frontmatter.title || page.url.split('/').pop().replace('.html', '') }}
          </a>
        </template>

      </nav>
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
</style>
