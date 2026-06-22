import App from "../../views/App/AppWrapped";


export async function generateStaticParams() {
  return [
    { page: '1' },
  ];
}

export default async function ({ params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params;
  const { page } = resolvedParams;

  return (
    <App page={page} />
  );
}
