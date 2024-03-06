import DefaultTheme from 'vitepress/theme';
import Layout from './MyLayout.vue';
import type { Theme } from 'vitepress'
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import {
  NolebaseGitChangelogPlugin,
} from '@nolebase/vitepress-plugin-git-changelog/client'

import {
  NolebasePagePropertiesPlugin,
} from '@nolebase/vitepress-plugin-page-properties/client'
import { useRoute } from 'vitepress';

import 'viewerjs/dist/viewer.min.css';
import 'vitepress-plugin-back-to-top/dist/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'
import './style.css'

export default {
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    // Register global components, if you don't want to use it, you don't need to add it
    ctx.app.component('vImageViewer', vImageViewer);
    vitepressBackToTop({
      threshold:300
    })

    ctx.app.use(NolebaseGitChangelogPlugin, {})
    ctx.app.use(NolebasePagePropertiesPlugin(),
      {
        properties: {
          'ru-RU': [
            {
              key: 'tags',
              type: 'tags',
              title: 'Тэги',
            },
            {
              key: 'progress',
              type: 'progress',
              title: 'Прогресс',
            },
            {
              key: 'wordCount',
              type: 'dynamic',
              title: 'Кол-во слов',
              options: {
                type: 'wordsCount',
              },
            },
            {
              key: 'readingTime',
              type: 'dynamic',
              title: 'Время чтения',
              options: {
                type: 'readingTime',
                dateFnsLocaleName: 'ru',
              },
            },
          ]
        }
      })
  },
  setup() {
    const route = useRoute();
    imageViewer(route);
  }
} satisfies Theme
