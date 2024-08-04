export default function Pagination({
  totalPages,
  setCurrPage,
}: {
  totalPages: number;
  setCurrPage: any;
}) {
  return (
    <div className="join col-span-3 justify-center">
      <button className="join-item btn">1</button>
      <button className="join-item btn">2</button>
      <button className="join-item btn btn-disabled">...</button>
      <button className="join-item btn">{totalPages - 1}</button>
      <button className="join-item btn">{totalPages}</button>
    </div>
  );
}
