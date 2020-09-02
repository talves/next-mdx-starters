/* Created from: https://github.com/mdx-js/mdx/blob/master/packages/test-util/index.js */
const babel = require('@babel/core')
const { MDXProvider, mdx: createElement } = require('@mdx-js/react')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const fs = require('fs')
const matter = require('gray-matter')
const glob = require('fast-glob')

const mdx = require('@mdx-js/mdx')
const { ThemeProvider } = require('theme-ui')
const { default: theme } = require('styles/theme')

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

  const elementWithThemeProvider = React.createElement(
    ThemeProvider,
    { theme },
    elementWithProvider,
  )

  return renderToStaticMarkup(elementWithThemeProvider)
}

const getFiles = (globPath) => {
  const files = glob.sync(globPath)
  const allFiles = {}

  files.forEach((filename) => {
    const mdxSource = fs.readFileSync(filename)
    const { content, data } = matter(mdxSource)

    allFiles[data.slug] = {
      frontmatter: data,
      content,
    }
  })

  return allFiles
}

/* Create object to store (cache) mdx file content and frontmatter */
/*
{ 
  "glob/path/with/wildcards": {
    {
      "slug-1" {
        frontmatter: { title, description, ... },
        content: "this would be the mdx content in the file",
    },
      "slug-2" {
        frontmatter: { title, description, ... },
        content: "this would be the mdx content in the file",
      }
    }
  }
}
*/
const globFactory = {}

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
  const files = getFilesFromGlob(globPath)
  const slugs = Object.keys(files).map((slug) => slug)

  return slugs
}

module.exports.getSlugsFromGlob = getSlugsFromGlob
module.exports.getFilesFromGlob = getFilesFromGlob
module.exports.renderWithReact = renderWithReact
