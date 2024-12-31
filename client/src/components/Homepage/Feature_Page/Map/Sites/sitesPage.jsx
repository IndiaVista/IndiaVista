import React, { useState, useEffect, useRef } from "react";
// import cities from "../cities.json";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../../services/apiConnector";
import {mapEndpoints } from "../../../../../services/apis";
const {
  PAGINATED_SITES,
} = mapEndpoints;
const SitesPage = () => {
  const currentPage = useRef(1);
  const [limit, setLimit] = useState(10);
  const [pagecount, setPageCount] = useState(1);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    currentPage.current = 1;
    getPaginatedSites();
  }, []);
  //when clicking any page no.
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedSites();
  }
  const getPaginatedSites = async () => {
    try {
      // console.log(currentPage)
      // console.log(limit)
      //to pass any query
      const response = await apiConnector("GET", PAGINATED_SITES, null, null, {
        page: currentPage.current,
        limit: limit,
      });
      console.log(response.data.data);
      setCities(response.data.data.result);
      setPageCount(response.data.data.pagecount);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  function changeLimit() {
    currentPage.current = 1; //to set it to 1st page whenever we change limit
    getPaginatedSites();
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
                <td
                  className="border border-gray-300 px-4 py-2"
                  onClick={() =>
                    navigate(`/home/heritage/heritage-site/${city.sr_no}`)
                  }
                >
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
        {/* Taken from react-paginate CSS from github */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pagecount}
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
          forcePage={currentPage.current - 1} //to set it to 1st page whenever we change limit
        />

        {/* to change limit of records */}
        <input
          className="border-black border-2"
          placeholder="Limit"
          onChange={(e) => setLimit(e.target.value)}
        />
        <button onClick={changeLimit}>Set Limit</button>
      </div>
    </div>
  );
};

export default SitesPage;
