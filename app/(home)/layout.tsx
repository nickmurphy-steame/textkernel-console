export default function HomeLayout({
  children,
  detail,
}: Readonly<{
  children: React.ReactNode;
  detail: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-2xl font-bold my-4">Textkernel Search</h1>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-1">{children}</div>
        <div className="col-span-1">{detail}</div>
      </div>
    </main>
  );
}
