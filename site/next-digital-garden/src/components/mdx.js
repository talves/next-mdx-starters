import React from 'react'
import { Box } from 'theme-ui'
import CodeBlock from 'components/CodeBlock'
import BlockQuote from 'components/BlockQuote'
import OutsideLink from 'components/OutsideLink'
import PreBlock from 'components/PreBlock'
import { LinkButton } from 'components/LinkButton'

const Paragraph = ({ children, ...props }) => {
  return (
    <Box as="p" sx={{ pl: '20px', pb: ['15px', '20px', '30px'] }} {...props}>
      {children}
    </Box>
  )
}

const UnorderedList = ({ children, ...props }) => {
  return (
    <Box as="ul" sx={{ pl: '40px', pb: ['15px', '20px', '30px'] }} {...props}>
      {children}
    </Box>
  )
}

const components = {
  Box,
  OutsideLink,
  LinkButton,
  code: CodeBlock,
  blockquote: BlockQuote,
  pre: PreBlock,
  p: Paragraph,
  ul: UnorderedList,
}

export default components
