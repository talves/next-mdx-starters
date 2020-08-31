/* Created from: https://github.com/mdx-js/mdx/blob/master/packages/test-util/index.js */
const babel = require('@babel/core')
const { MDXProvider, mdx: createElement } = require('@mdx-js/react')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const fs = require('fs')
const matter = require('gray-matter')
const glob = require('fast-glob')

const mdx = require('@mdx-js/mdx')

const transform = (code) =>
  babel.transform(code, {
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-object-rest-spread',
      'babel-plugin-remove-export-keywords',
    ],
  }).code

const renderWithReact = async (mdxCode, { components } = {}) => {
  const jsx = await mdx(mdxCode, { skipExport: true })
  const code = transform(jsx)
  const scope = { mdx: createElement }

  const fn = new Function( // eslint-disable-line no-new-func
    'React',
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`,
  )

  const element = fn(React, ...Object.values(scope))

  const elementWithProvider = React.createElement(
    MDXProvider,
    { components },
    element,
  )

  return renderToStaticMarkup(elementWithProvider)
}

const globFactory = {}

const getFiles = (globPath) => {
  const files = glob.sync(globPath)
  const allFiles = {}

  files.forEach((filename) => {
    const mdxSource = fs.readFileSync(filename)
    const { content, data } = matter(mdxSource)
    console.log(filename, data.date)
    allFiles[data.slug] = {
      frontmatter: data,
      content,
    }
  })

  return allFiles
}

const getFilesFromGlob = (globPath) => {
  const files = globFactory[globPath]
  if (files) {
    return files
  } else {
    globFactory[globPath] = getFiles(globPath)
    return globFactory[globPath]
  }
}

/* returns array of slug paths for posts using a glob path */
const getSlugsFromGlob = (globPath) => {
  const files = glob.sync(globPath)
  const slugs = []

  files.forEach((filename) => {
    const mdxSource = fs.readFileSync(filename)
    const { data } = matter(mdxSource)
    if (data.slug) {
      slugs.push(data.slug)
    } else {
      console.warn(`Missing path in frontmatter of post: ${filename}`)
    }
  })

  return slugs
}

module.exports.getSlugsFromGlob = getSlugsFromGlob
module.exports.getFilesFromGlob = getFilesFromGlob
module.exports.renderWithReact = renderWithReact
