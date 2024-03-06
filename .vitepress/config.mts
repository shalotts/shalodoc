import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url'
// https://vitepress.dev/reference/site-config

const githubRepoLink = 'https://github.com/shalotts/shalodoc'
export default defineConfig({
  lang: 'ru-RU',
  title: "Shalo.DOCS",
  description: "Shalotts doc",
  cleanUrls: true,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: true
  },
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.shalotts.site'
  },
  themeConfig: {
    socialLinks: [{ icon: 'github', link: githubRepoLink }],
    search: {
      provider: 'local',
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
