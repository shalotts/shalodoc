import { defineConfig } from 'vite';
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite';
import { PageProperties, PagePropertiesMarkdownSection } from '@nolebase/vitepress-plugin-page-properties/vite'

export default defineConfig({
  plugins: [
    GitChangelog({
      repoURL: () => 'https://github.com/shalotts/shalodoc',
      maxGitLogCount: 1000
    }),
    GitChangelogMarkdownSection({
      getChangelogTitle: (): string => {
        return 'Changelog'
      },
      getContributorsTitle: (): string => {
        return 'Contributors'
      },
      excludes: [],
      exclude: (_, { helpers }): boolean => {
        if (helpers.idEquals('toc.md'))
          return true
        if (helpers.idEquals('index.md'))
          return true

        return false
      },
    }),
    PageProperties(),
    PagePropertiesMarkdownSection()
  ]
})
