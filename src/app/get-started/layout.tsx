export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="justify-center">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="flex justify-center">
        <progress
          className="progress progress-primary w-1/3 h-5 mt-20"
          value="10"
          max="100"
        ></progress>
      </div>

      {children}
    </section>
  );
}
