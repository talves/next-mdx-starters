export default function DefaultPage({ mdxHtml, frontmatter }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: mdxHtml }} />
      <pre>{JSON.stringify(frontmatter, null, 2)}</pre>
    </>
  )
}
