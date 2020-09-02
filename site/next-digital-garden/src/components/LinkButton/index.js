import React from 'react'
import Link from 'next/link'
import { Box } from 'theme-ui'

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

export const ButtonLink = ({
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
