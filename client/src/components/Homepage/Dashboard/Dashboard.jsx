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
import {
  endpoints,
  iternaryEndpoints,
  mapEndpoints,
} from "../../../services/apis.js";
import { toast } from "react-toastify";
import DashSites from "./DashSites.jsx";
import DashIternaries from "./DashIternaries.jsx";

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
  const [selectedSite, setSelectedSite] = useState(null);

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
              <DashIternaries
                itineraries={itineraries}
                setSelectedItinerary={setSelectedItinerary}
                setShowDeleteConfirm={setShowDeleteConfirm}
                showDeleteConfirm={showDeleteConfirm}
                selectedItinerary={selectedItinerary}
                setError={setError}
                setLoading={setLoading}
                setItineraries={setItineraries}
              />
            ) : activeTab === "Your Sites" ? (
              <DashSites savedSites={savedSites} />
            ) : (
              <div className="text-center text-gray-500">
                Feature coming soon
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
