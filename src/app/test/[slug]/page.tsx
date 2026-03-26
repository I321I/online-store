
export default function Home({ params }: { params: { slug: string } }) {
    return (<h1>{`this is ${params.slug} page`}</h1>);
}
