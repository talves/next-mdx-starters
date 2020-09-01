import { jsx, Box } from 'theme-ui'

export const FlexLayout = ({ sx, ...props }) =>
  jsx(Box, {
    ...props,
    sx: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      variant: 'styles.Layout',
      ...sx,
    },
  })
export const Main = ({ sx, ...props }) =>
  jsx(Box, {
    as: 'main',
    ...props,
    sx: {
      flex: '1 1 auto',
      variant: 'styles.Main',
      ...sx,
    },
  })
export const Header = ({ sx, ...props }) =>
  jsx(Box, {
    as: 'header',
    ...props,
    sx: {
      display: 'flex',
      variant: 'styles.Header',
      ...sx,
    },
  })
export const Container = ({ sx, ...props }) =>
  jsx(Box, {
    ...props,
    sx: {
      width: '100%',
      minWidth: 0,
      maxWidth: 1024,
      mx: 'auto',
      p: 4,
      variant: 'styles.Container',
      ...sx,
    },
  })
export const Footer = ({ sx, ...props }) =>
  jsx(Box, {
    as: 'footer',
    ...props,
    sx: {
      display: 'flex',
      variant: 'styles.Footer',
      ...sx,
    },
  })
