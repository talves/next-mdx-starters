import { CollectionsPage } from 'components'
// import siteMetadata from 'siteMetadata'

export default CollectionsPage

export async function getStaticProps() {
  const {
    getSlugsFromGlob,
    getFilesFromGlob,
  } = require('utils/mdx-render-tools')
  const globPath = 'garden/**/*.mdx'
  const slugs = getSlugsFromGlob(globPath)

  const files = getFilesFromGlob(globPath)

  const allMdx = slugs.map((slug) => {
    const file = files[slug]
    if (!file) return

    return {
      slug: slug,
      // frontmatter: file.frontmatter,
      frontmatter: {
        ...file.frontmatter,
        date: `${file.frontmatter.date}`,
        update: `${file.frontmatter.update || file.frontmatter.date}`,
      },
    }
  })

  const orderedByDate = allMdx.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })

  return {
    props: {
      allMdx: orderedByDate,
    },
  }
}
