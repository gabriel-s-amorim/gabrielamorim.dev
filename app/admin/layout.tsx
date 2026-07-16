export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-soil-950">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">{children}</div>
    </div>
  );
}
