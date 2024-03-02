import { createContentLoader, defineConfig, useRoute } from 'vitepress';
import { fileURLToPath, URL } from 'node:url'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shalo.DOCS",
  description: "Shalotts doc",
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: process.env.VITE_APP_ID,
        apiKey: process.env.VITE_API_KEY,
        indexName: process.env.VITE_APP_INDEX
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        docFooterText: 'sidebar'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  appearance: 'force-dark',
  vite: {
    server: {
      port: 3000
    },
    resolve: {
      alias: [
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/MyVPSidebar.vue', import.meta.url)
          )
        }
      ]
    }
  },
})
