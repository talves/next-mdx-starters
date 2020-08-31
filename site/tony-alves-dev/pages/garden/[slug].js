import { DefaultPage, Box } from 'components'

const components = { Box }

// import { renderWithReact, getFilesFromGlob } from 'utils/mdx-render-tools'

export async function getStaticPaths() {
  const { getSlugsFromGlob } = require('utils/mdx-render-tools')
  const files = getSlugsFromGlob('garden/**/*.mdx')

  const paths = files.map((slug) => {
    return {
      params: {
        slug,
      },
    }
  })
  console.log(JSON.stringify(paths, null, 2))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const {
    renderWithReact,
    getFilesFromGlob,
  } = require('utils/mdx-render-tools')
  const files = getFilesFromGlob('garden/**/*.mdx')
  const file = files[slug]

  if (!file) {
    console.warn(`No MDX file found for slug: ${slug}`)
  }

  const mdxHtml = await renderWithReact(file.content, { components })

  return {
    props: {
      mdxHtml,
      frontmatter: {
        ...file.frontmatter,
        date: `${file.frontmatter.date}`,
        update: `${file.frontmatter.update || file.frontmatter.date}`,
      },
    },
  }
}

export default DefaultPage
