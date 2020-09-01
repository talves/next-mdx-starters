/* @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

const Box = ({ children, sx = {}, ...props }) => (
  <div sx={sx} {...props}>
    {children}
  </div>
)

export default Box
