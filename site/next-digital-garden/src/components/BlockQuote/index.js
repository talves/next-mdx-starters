import React from 'react'
import { Box, useThemeUI } from 'theme-ui'

const BlockQuote = ({ children, className }) => {
  const { theme } = useThemeUI()

  return (
    <Box
      sx={{
        backgroundColor: `${theme.colors.accent}25`,
        display: 'block',
        marginRight: '-1em',
        marginLeft: '-1em',
        paddingRight: '-1em',
        paddingLeft: '0.75em',
        borderLeft: `0.25em solid ${theme.colors.accent}`,
        '& p': {
          pt: 20,
        },
      }}
      as="blockquote"
    >
      {children}
    </Box>
  )
}

export default BlockQuote
