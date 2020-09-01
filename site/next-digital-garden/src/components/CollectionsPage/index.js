import { Box } from 'theme-ui'
import Link from 'next/link'

/*
When routing to a dynamic route using Link or router, you will need to specify the href as the dynamic route, for example /garden/[slug] and as as the decorator for the URL, for example /garden/my-post.
*/

export default function CollectionsPage({ allMdx }) {
  return (
    <>
      {allMdx.map(({ collectionPath, slug, ...item }, index) => {
        const prePath = collectionPath ? `${collectionPath}/` : '/'
        return (
          <Box key={index}>
            <Link href={`${prePath}[slug]`} as={`${prePath}${slug}`} passHref>
              <a>{item.frontmatter.title}</a>
            </Link>
          </Box>
        )
      })}
      <pre>{JSON.stringify(allMdx, null, 2)}</pre>
    </>
  )
}
