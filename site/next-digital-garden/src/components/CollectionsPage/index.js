import { Box } from 'theme-ui'
import { LinkButton } from 'components/LinkButton'

export default function CollectionsPage({ allMdx }) {
  return (
    <>
      {allMdx.map(({ collectionPath, slug, ...item }, index) => {
        const prePath = collectionPath ? `${collectionPath}/` : '/'
        return (
          <Box key={index} sx={{ mb: 10 }}>
            <LinkButton
              href={`${prePath}[slug]`}
              as={`${prePath}${slug}`}
              passHref
              text={item.frontmatter.title}
            />
          </Box>
        )
      })}
      <pre>{JSON.stringify(allMdx, null, 2)}</pre>
    </>
  )
}
