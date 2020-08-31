export default function CollectionsPage({ allMdx }) {
  return <pre>{JSON.stringify(allMdx, null, 2)}</pre>
}
