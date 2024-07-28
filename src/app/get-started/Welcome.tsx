export default function Welcome({ buildProfile }: { buildProfile: any }) {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="py-8 text-3xl font-bold">
        <span>Welcome to </span>
        <span className="text-teal-900">the</span>
        <span className="text-teal-700">watercooler!</span>
      </div>
      <div>
        <button className="btn btn-primary" onClick={buildProfile}>
          Build Profile
        </button>
      </div>
    </div>
  );
}
