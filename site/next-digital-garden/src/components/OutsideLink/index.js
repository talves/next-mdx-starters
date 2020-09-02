import React from 'react'
import { Box } from 'theme-ui'

const OutsideLink = ({
  as = 'span',
  to = '#',
  description,
  children,
  ...props
}) => {
  return (
    <Box as={as} {...props}>
      <Box
        as="a"
        href={to || `#`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ padding: 20 }}
      >
        <Box as="span" sx={{ padding: 10 }}>
          {description}
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export default OutsideLink
