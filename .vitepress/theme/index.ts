// https://vitepress.dev/guide/custom-theme
import Layout from './MyLayout.vue';
import { h }    from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
