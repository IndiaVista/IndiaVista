import React from 'react'
import { motion } from 'framer-motion'
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
const DashSites = ({savedSites}) => {
    const navigate=useNavigate()
    const handleUnsave = async (site) => {
        try {
          console.log(sr_no);
          setSelectedSite(site);
          const sr_no = site.sr_no;
          const res = await apiConnector("PUT", endpoints.UNSAVE_SITE, { sr_no });
          setSavedSites((prevSite) =>
            prevSite.filter((site) => site._id !== selectedSite._id)
          );
          setSelectedSite(null);
          toast.success("Site Unsaved successfully");
        } catch (error) {
          toast.error("Failed to unsave itinerary");
        }
      };
    return (
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
  )
}

export default DashSites
