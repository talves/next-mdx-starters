import React from 'react'
import Link from 'next/link'
import { Box } from 'theme-ui'

/*
When routing to a dynamic route using Link or router, you will need to specify the href as the dynamic route, for example /garden/[slug] and as as the decorator for the URL, for example /garden/my-post.
*/
// <Link href={`${prePath}[slug]`} as={`${prePath}${slug}`} passHref>
//   <a>{item.frontmatter.title}</a>
// </Link>

const ButtonBaseStyle = {
  appearance: 'none',
  border: 0,
  borderRadius: '0.325em',
  bg: 'primary',
  color: 'navtext',
  minWidth: '6.5em',
  padding: '0.5em 1em',
  fontFamily: 'inherit',
  fontSize: ['0.8rem', '0.9rem', '1rem'],
  cursor: 'pointer',
  transition: '0.3s ease-out',
  textDecoration: 'none',
  '&:hover': {
    bg: 'secondary',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px #cccccc`,
  },
  '&:disabled': {
    color: 'background',
    bg: 'muted',
    cursor: 'not-allowed',
  },
}

export const LinkButton = ({
  text = 'Button',
  // href = '/',
  sx = {},
  ...props
}) => (
  <Link {...props}>
    <Box as="button" sx={{ ...ButtonBaseStyle, ...sx }}>
      <span>{text}</span>
    </Box>
  </Link>
)
