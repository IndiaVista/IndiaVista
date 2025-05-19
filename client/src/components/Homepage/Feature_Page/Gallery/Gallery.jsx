import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadModal from './UploadModel.jsx';
import StoryModal from './StoryModel';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import UpdateModal from './UpdateModal.jsx';

function Gallery() {
  const [media, setMedia] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('public'); // 'public' or 'user'
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  // Add this to check if user is logged in
  const isLoggedIn = !!localStorage.getItem("profile");

  useEffect(() => {
    fetchMedia();
  }, [activeTab]); // Refetch when tab changes

  const fetchMedia = async () => {
    try {
      // const endpoint = activeTab === 'public' 
      //   ? 'http://localhost:8000/api/gallery/public'
      //   : 'http://localhost:8000/api/gallery/user';

      const endpoint = activeTab === 'public' 
        ? 'https://indiavista.onrender.com/api/gallery/public'
        : 'https://indiavista.onrender.com/api/gallery/user';
      
      let config = {};
      
      // Only add authorization header for user gallery
      if (activeTab === 'user') {
        const profile = JSON.parse(localStorage.getItem("profile"));
        const accessToken = profile?.token;
        config.headers = {
          'Authorization': `Bearer ${accessToken}`
        };
      }
      
      const response = await axios.get(endpoint, config);
      setMedia(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (error.response?.status === 401 && activeTab === 'user') {
        toast.error('Please login to view your gallery');
        setActiveTab('public');
      } else {
        toast.error('Failed to fetch media');
      }
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const accessToken = profile?.token;

      await axios.delete(`http://localhost:8000/api/gallery/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      toast.success('Media deleted successfully');
      fetchMedia();
      setSelectedItem(null);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to delete media');
      } else {
        toast.error('Failed to delete media');
      }
    }
  };

  const handleUpdate = (item) => {
    setItemToUpdate(item);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Travel Gallery</h1>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('public')}
              className={`py-2 px-4 ${
                activeTab === 'public'
                  ? 'border-b-2 border-cyan-500 text-cyan-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Explore Gallery
            </button>
            {isLoggedIn && (
              <button
                onClick={() => setActiveTab('user')}
                className={`py-2 px-4 ${
                  activeTab === 'user'
                    ? 'border-b-2 border-cyan-500 text-cyan-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Gallery
              </button>
            )}
          </div>

          {/* Upload Button - Only show in user gallery */}
          {activeTab === 'user' && (
            <div className="flex justify-end">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaPlus /> Add Media
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No media items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item) => {
              return (
                <div 
                  key={item._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative w-full h-64">
                    {item.type === 'image' ? (
                      <img
                        src={item.secure_url}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        src={item.secure_url}
                        className="w-full h-full object-contain"
                        controls
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="text-cyan-600 text-sm mb-2">
                      {item.location}
                    </div>
                    <p className="text-gray-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedItem && (
        <StoryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          isUserGallery={activeTab === 'user'}
        />
      )}

      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUploadComplete={fetchMedia}
        />
      )}

      {isUpdateModalOpen && itemToUpdate && (
        <UpdateModal
          item={itemToUpdate}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setItemToUpdate(null);
          }}
          onUpdateComplete={() => {
            fetchMedia();
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}

export default Gallery;