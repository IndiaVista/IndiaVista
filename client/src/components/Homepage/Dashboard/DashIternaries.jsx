import React from 'react'
import { motion } from 'framer-motion';
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
  import { apiConnector } from '../../../services/apiConnector';
  import { useNavigate } from "react-router-dom";
  import { iternaryEndpoints } from '../../../services/apis';
  import { toast } from "react-toastify";
const DashIternaries = ({itineraries,setSelectedItinerary,setShowDeleteConfirm,showDeleteConfirm,selectedItinerary,setError,setLoading,setItineraries}) => {
    const navigate=useNavigate()
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
  return (
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
              </div>
              
  )
}

export default DashIternaries
