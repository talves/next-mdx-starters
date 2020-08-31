import React from 'react'

const Box = ({ children, ...props }) => <div {...props}>{children}</div>

export default Box
