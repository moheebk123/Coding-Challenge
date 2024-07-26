import Header from "../../components/Header";
import data from "../../data/data.json";
import thumbnail from "../../assets/thumbnail.png";
import { useEffect, useRef, useState } from "react";
import propTypes from "prop-types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Batches() {
  const inputRef = useRef(null);
  const [defaultBatches, setDefaultBatches] = useState([]);
  const [batches, setBatches] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(batches.length / rowsToShow);
  const currentItems = batches.slice(
    (currentPage - 1) * rowsToShow,
    currentPage * rowsToShow
  );

  useEffect(() => {
    setDefaultBatches(data);
    setBatches(data);
  }, []);

  const searchBatch = () => {
    const searchTitle = inputRef.current.value.toLowerCase();
    setBatches(() => {
      return defaultBatches.filter((batch) => {
        const batchTitle = batch.title.toLowerCase();
        return batchTitle.includes(searchTitle);
      });
    });
  };

  const handleBatchesPerPage = (event) => {
    setRowsToShow(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full min-h-screen pt-36 px-5 pb-10 bg-fuchsia-200 flex items-center justify-center">
      <div className="max-w-[1024px] w-full min-h-[50vh] h-fit p-5 bg-white rounded-xl shadow-lg">
        <Header
          heading="Batches"
          para="Create learner’s batch and share information at the same time."
        />
        <div className="flex gap-2 my-8 items-center">
          <input
            ref={inputRef}
            className="outline-0 border-1 border-slate-400 p-2 text-slate-600 rounded text-sm"
            type="text"
            placeholder="Search by Title.."
          />
          <button
            onClick={searchBatch}
            className="bg-indigo-900/80 rounded-md shadow-lg px-4 py-2 text-white"
          >
            Search
          </button>
        </div>
        <table className="w-full shadow-md border-1 border-slate-500 rounded-md">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-1 border-zinc-900 p-2">Title</th>
              <th className="hidden md:table-cell border-1 border-zinc-900 p-2">
                Start Date
              </th>
              <th className="hidden md:table-cell border-1 border-zinc-900">
                End Date
              </th>
              <th className="hidden sm:table-cell border-1 border-zinc-900 p-2">
                Price
              </th>
              <th className="hidden lg:table-cell  border-1 border-zinc-900 p-2">
                Validity/Expiry
              </th>
              <th className="hidden lg:table-cell border-1 border-zinc-900 p-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((batch, index) => {
              return <Row key={index} batch={batch} />;
            })}
          </tbody>
        </table>
        <div className="w-full flex gap-2 justify-start items-center mt-3">
          <p>Rows per page</p>
          <select
            onChange={handleBatchesPerPage}
            className="rounded outline-0"
            value={rowsToShow}
          >
            {[...Array(10)].map((_, index) => (
              <option key={index}>{index + 1}</option>
            ))}
          </select>
          <div className="flex gap-2 items-center">
            <FaAngleLeft
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <FaAngleRight
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Row = ({ batch }) => {
  return (
    <tr>
      <td className="flex gap-3 items-center h-full p-2">
        <div className="hidden sm:block my-3 w-28 rounded-md overflow-hidden h-full">
          <img
            src={thumbnail}
            className="w-full h-full object-cover"
            alt={batch.title}
          />
        </div>
        <div className="text-sm w-full p-2 sm:p-2 sm:w-fit sm:border-b-0 border-b-1 border-slate-500">
          {batch.title}
        </div>
      </td>
      <td className="hidden md:table-cell text-sm text-center p-2 border-l-1 border-slate-500">
        {batch.startDate}
      </td>
      <td className="hidden md:table-cell text-sm text-center p-2 border-l-1 border-slate-500">
        {batch.endDate}
      </td>
      <td className="hidden sm:table-cell text-sm text-center p-2 border-l-1 border-slate-500">
        {batch.price === "Free" ? "₹0" : `₹${batch.price}`}
      </td>
      <td className="hidden lg:table-cell text-sm text-center p-2 border-l-1 border-slate-500">
        {batch.expiryIn}
      </td>
      <td className="hidden lg:table-cell text-sm p-2 border-l-1 border-slate-500">
        <div
          className={`${
            batch.status === "Published"
              ? "border-slate-700 bg-slate-200"
              : "border-green-500 bg-[#DBFFCE]"
          } border-1 text-center rounded py-1`}
        >
          {batch.status}
        </div>
      </td>
    </tr>
  );
};

Row.propTypes = {
  batch: propTypes.shape().isRequired,
};

export default Batches;
