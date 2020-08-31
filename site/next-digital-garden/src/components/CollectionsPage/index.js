import Link from 'next/link'

export default function CollectionsPage({ allMdx }) {
  return (
    <>
      {allMdx.map((item, index) => {
        return (
          <>
            <Link key={index} href={item.slug} passHref>
              <a>{item.frontmatter.title}</a>
            </Link>
            <br />
          </>
        )
      })}
      <pre>{JSON.stringify(allMdx, null, 2)}</pre>
    </>
  )
}
