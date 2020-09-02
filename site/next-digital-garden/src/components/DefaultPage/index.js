import { Box } from 'theme-ui'
import { LinkButton } from 'components/LinkButton'

export default function DefaultPage({ mdxHtml, frontmatter }) {
  return (
    <>
      <Box sx={{ mb: 10 }}>
        <LinkButton href="/garden" text="Return to Garden" />
      </Box>
      <div dangerouslySetInnerHTML={{ __html: mdxHtml }} />
      <Box as="pre" sx={{ fontSize: [1, 2] }}>
        {JSON.stringify(frontmatter, null, 2)}
      </Box>
    </>
  )
}
