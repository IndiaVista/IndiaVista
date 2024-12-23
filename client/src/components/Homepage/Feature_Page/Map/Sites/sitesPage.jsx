import React, { useState } from "react";
import cities from "../cities.json";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
const SitesPage = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerPage = 5;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = cities.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(cities.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);
  const navigate=useNavigate();
  function handlePageClick(e) {
    console.log(e);
  }
  return (
    <div className="p-4 sm:p-8">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                SR.No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Heritage Site Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Location
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Site Type
              </th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {city.sr_no}
                </td>
                <td className="border border-gray-300 px-4 py-2" onClick={()=>navigate(`/home/heritage/heritage-site/${city.sr_no}`)}>
                  {city.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {city.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {city.site_type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
  breakLabel="..."
  nextLabel="next >"
  onPageChange={handlePageClick}
  pageRangeDisplayed={5}
  pageCount={8}
  previousLabel="< previous"
  renderOnZeroPageCount={null}
  marginPagesDisplayed={2}
  containerClassName="flex justify-center space-x-2 mt-4"
  pageClassName="border border-gray-300 rounded px-3 py-1"
  pageLinkClassName="text-blue-600 hover:text-blue-800"
  previousClassName="border border-gray-300 rounded px-3 py-1"
  previousLinkClassName="text-gray-500 hover:text-gray-700"
  nextClassName="border border-gray-300 rounded px-3 py-1"
  nextLinkClassName="text-gray-500 hover:text-gray-700"
  activeClassName="bg-blue-500 text-white"
/>

      </div>
    </div>
  );
};

export default SitesPage;
