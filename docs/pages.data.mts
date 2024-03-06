import { createContentLoader } from 'vitepress';

const formatDate = (dateValue: string) => {
  const date = new Date(dateValue)
  const formatted = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Aqtobe'
  }).format(date)

  return {
    timestamp: Math.floor(date.getTime() / 1000),
    formatted
  }
}
export default createContentLoader('/**/*.md', {
  transform(raw) {
    return raw.map(({ frontmatter, url}) => {
      return {
        frontmatter,
        url,
        date: formatDate(frontmatter.date ?? '2022-04-26')
      }
    })
      .sort((a, b) => a.date.timestamp - b.date.timestamp)
      .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
  }
});
