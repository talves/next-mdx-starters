import { ThemeProvider } from 'theme-ui'
import theme from 'styles/theme'
import { LinkButton } from 'components/LinkButton'
import {
  FlexLayout,
  Header,
  Main as LayoutMain,
  Container,
  Footer,
} from 'components/Layouts/wrappers'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <FlexLayout>
        <LayoutMain variant="styles.Layout">
          <LinkButton href="/" text="Home" sx={{ m: 20 }} />
          <Container sx={{ mt: [10, 15, 20], fontSize: [1, 2, 3] }}>
            <Component {...pageProps} />
          </Container>
        </LayoutMain>
      </FlexLayout>
    </ThemeProvider>
  )
}

export default App
