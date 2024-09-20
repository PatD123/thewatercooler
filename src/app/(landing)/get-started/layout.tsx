export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-fit bg-gradient-to-b from-cyan-500 to-blue-500">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="flex justify-center">
        <progress
          className="progress progress-primary w-1/3 h-5 mt-20"
          value="10"
          max="100"
        ></progress>
      </div>

      {children}
    </div>
  );
}
