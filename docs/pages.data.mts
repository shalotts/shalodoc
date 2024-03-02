import { createContentLoader } from 'vitepress';

// import the main transformer factory

// export the content data-loader for your markdown files folder
export default createContentLoader('/**/*.md', {});
