import React from 'react'
import { Box } from 'theme-ui'
import rangeParser from 'parse-numeric-range'
import Highlight, { defaultProps } from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'

// Create a closure that determines if we have
// to highlight the given index
const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1]
    const lineNumbers = rangeParser(strlineNumbers)
    return (index) => lineNumbers.includes(index + 1)
  } else {
    return () => false
  }
}

const highlightStyle = {
  backgroundColor: '#ffffff12',
  display: 'block',
  marginRight: '-1em',
  marginLeft: '-1em',
  paddingRight: '-1em',
  paddingLeft: '0.75em',
  borderLeft: '0.25em solid #fd3',
}

const CodeBlock = ({ children, className, metastring }) => {
  // Pull the className
  const language = className.replace(/language-/, '') || ''
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={nightOwl}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          sx={{
            overflow: 'auto',
          }}
        >
          <Box
            as="pre"
            className={className}
            style={{ ...style }}
            sx={{
              padding: '1em',
              overflow: 'auto',
              float: 'left',
              minWidth: '100%',
            }}
          >
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index })
              if (
                line.length === 1 &&
                line[0].empty === true &&
                index === tokens.length - 1
              ) {
                // Empty line at end of code block ???
                return null
              }
              return (
                <Box
                  key={index}
                  {...lineProps}
                  sx={shouldHighlightLine(index) ? highlightStyle : {}}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </Box>
              )
            })}
          </Box>
        </Box>
      )}
    </Highlight>
  )
}

export default CodeBlock
