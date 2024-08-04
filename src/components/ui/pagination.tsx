export default function Pagination({
  totalPages,
  currPage,
  handlePagination,
}: {
  totalPages: number;
  currPage: number;
  handlePagination: any;
}) {
  if (currPage >= 5 && currPage <= totalPages - 4) {
    return (
      <div className="join col-span-3 justify-center">
        <button className="join-item btn" onClick={() => handlePagination(1)}>
          1
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(currPage - 5)}
        >
          ...
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(currPage - 1)}
        >
          {currPage - 1}
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(currPage)}
        >
          {currPage}
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(currPage + 1)}
        >
          {currPage + 1}
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(currPage + 5)}
        >
          ...
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages)}
        >
          {totalPages}
        </button>
      </div>
    );
  } else if (currPage > totalPages - 4) {
    return (
      <div className="join col-span-3 justify-center">
        <button className="join-item btn" onClick={() => handlePagination(1)}>
          1
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages - 5)}
        >
          ...
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages - 4)}
        >
          {totalPages - 4}
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages - 3)}
        >
          {totalPages - 3}
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages - 2)}
        >
          {totalPages - 2}
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages - 1)}
        >
          {totalPages - 1}
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages)}
        >
          {totalPages}
        </button>
      </div>
    );
  } else {
    return (
      <div className="join col-span-3 justify-center">
        <button className="join-item btn" onClick={() => handlePagination(1)}>
          1
        </button>
        <button className="join-item btn" onClick={() => handlePagination(2)}>
          2
        </button>
        <button className="join-item btn" onClick={() => handlePagination(3)}>
          3
        </button>
        <button className="join-item btn" onClick={() => handlePagination(4)}>
          4
        </button>
        <button className="join-item btn" onClick={() => handlePagination(5)}>
          5
        </button>
        <button className="join-item btn" onClick={() => handlePagination(5)}>
          ...
        </button>
        <button
          className="join-item btn"
          onClick={() => handlePagination(totalPages)}
        >
          {totalPages}
        </button>
      </div>
    );
  }
}
