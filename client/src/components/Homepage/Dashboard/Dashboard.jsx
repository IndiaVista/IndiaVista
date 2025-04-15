import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Camera,
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar.jsx";
import Footer from "../../Landing_Page/Footer.jsx";
import { apiConnector } from "../../../services/apiConnector.js";
import { endpoints, iternaryEndpoints, mapEndpoints } from "../../../services/apis.js";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Your Sites");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [savedSites, setSavedSites] = useState([]);
  const [selectedSite,setSelectedSite]=useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch user data
        const userResponse = await apiConnector("GET", endpoints.GET_USER_DATA);
        setUserData(userResponse.data.data);

        // Fetch user itineraries
        const itinerariesResponse = await apiConnector(
          "GET",
          iternaryEndpoints.GET_USER_ITINERARIES
        );
        setItineraries(itinerariesResponse.data.data.itineraries || []);

        //fetch user Sites
        const savedSites = await apiConnector("GET", endpoints.GET_SAVED_SITES);
        console.log(savedSites.data.data);
        setSavedSites(savedSites.data.data);

        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error fetching dashboard data"
        );
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCreateNew = () => {
    navigate("/home/iternary");
  };

  const handleView = (itinerary) => {
    navigate("/journey-planner", {
      state: {
        itineraryData: itinerary,
        isViewing: true,
      },
    });
  };

  const handleEdit = (itinerary) => {
    navigate("/journey-planner", {
      state: {
        itineraryData: itinerary,
        isEditing: true,
      },
    });
  };

  const handlePreview = (itinerary) => {
    navigate("/iternary/preview", {
      state: itinerary,
    });
  };

  const handleDeleteClick = (itinerary) => {
    setSelectedItinerary(itinerary);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await apiConnector(
        "DELETE",
        `${iternaryEndpoints.DELETE_ITINERARY}/${selectedItinerary._id}`
      );

      // Update the itineraries list after successful deletion
      setItineraries((prevItineraries) =>
        prevItineraries.filter(
          (itinerary) => itinerary._id !== selectedItinerary._id
        )
      );

      setLoading(false);
      setShowDeleteConfirm(false);
      setSelectedItinerary(null);
      toast.success("Itinerary deleted successfully");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error deleting itinerary"
      );
      setLoading(false);
      toast.error("Failed to delete itinerary");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setSelectedItinerary(null);
  };
  const handleUnsave=async(site)=>{
    try {
      console.log(sr_no)
      setSelectedSite(site)
      const sr_no=site.sr_no
      const res=await apiConnector(
        "PUT",
        endpoints.UNSAVE_SITE,
        {sr_no}
      )
      setSavedSites((prevSite) =>
        prevSite.filter(
          (site) => site._id !== selectedSite._id
        )
      );
      setSelectedSite(null)
      toast.success("Site Unsaved successfully");
    } catch (error) {
      toast.error("Failed to unsave itinerary");
    }
  }

  const stats = [
    { title: "Total Sites", value: savedSites.length },
    { title: "Total Events", value: 0 },
    { title: "Itineraries Created", value: itineraries.length },
  ];

  const tabs = [
    { name: "Your Sites", icon: <MapPin size={18} /> },
    { name: "Your Events", icon: <Calendar size={18} /> },
    { name: "Your Itineraries", icon: <BarChart3 size={18} /> },
    { name: "Your Gallery", icon: <Camera size={18} /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pt-28 pb-20">
        {/* Left Section - User Profile & Stats */}
        <div className="space-y-6 lg:col-span-1">
          {/* User Profile */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
              {userData?.fullName?.charAt(0) || "U"}
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-white">
                {userData?.fullName || "User"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {userData?.email || "No email"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Member since{" "}
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
            </div>
          </motion.div>

          {/* Statistics Section */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section - Tabs & Scrollable Content */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Navigation Tabs */}
          <div className="flex space-x-3 mb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`flex  text-white items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap
                ${
                  activeTab === tab.name
                    ? "bg-indigo-500 text-black"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-grey"
                }`}
                // onClick={() => setActiveTab(tab.name)}
                onClick={() => {
                  setActiveTab(tab.name);
                  if (tab.name === "Your Gallery") {
                    navigate("/home/gallery");
                  }
                }}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* Content Section with Scrollable List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-auto h-[400px]">
            {activeTab === "Your Itineraries" ? (
              <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold  text-white">
                    Your Itineraries
                  </h2>
                  <button
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus size={18} />
                    Create New
                  </button>
                </div>

                {itineraries.length > 0 ? (
                  itineraries.map((itinerary) => (
                    <motion.div
                      key={itinerary._id}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-start">
                        <div
                          className="flex-1"
                          onClick={() => handlePreview(itinerary)}
                        >
                          <h3 className="text-lg font-semibold">
                            {itinerary.iternaryName}
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Places: {itinerary.places.length}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Created:{" "}
                              {new Date(itinerary.createdAt).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePreview(itinerary)}
                            className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                            title="Preview"
                          >
                            <Eye size={18} />
                          </button>
                          {/* <button
                            onClick={() => handleEdit(itinerary)}
                            className="p-2 text-indigo-500 hover:text-indigo-600 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button> */}
                          <button
                            onClick={() => handleDeleteClick(itinerary)}
                            className="p-2 text-red-500 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No itineraries created yet
                  </div>
                )}
              </div>
            ) : activeTab === "Your Sites" ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">
                  Your Saved Sites
                </h2>
                {savedSites.length > 0 ? (
                  savedSites.map((site, index) => (
                    <motion.div
                      key={site._id || index}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div
                        className="flex flex-col cursor-pointer"
                        onClick={() =>
                          navigate(`/home/heritage/heritage-site/${site.sr_no}`)
                        }
                      >
                        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                          {site.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Location: {site.location}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Category: {site.site_type || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Added on:{" "}
                          {site.createdAt
                            ? new Date(site.createdAt).toLocaleDateString(
                                "en-GB"
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/home/heritage/heritage-site/${site.sr_no}`
                            )
                          }
                          className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleUnsave(site)}
                          className="p-2 text-red-500 hover:text-red-600 transition-colors"
                          title="Unsave"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No sites saved yet.
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Feature coming soon
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Itinerary</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete "{selectedItinerary?.iternaryName}
              "? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
