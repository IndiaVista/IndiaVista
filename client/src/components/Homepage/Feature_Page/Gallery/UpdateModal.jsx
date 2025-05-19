import { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

function UpdateModal({ item, onClose, onUpdateComplete }) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [location, setLocation] = useState(item.location);
  const [isPublic, setIsPublic] = useState(item.isPublic);
  const [updating, setUpdating] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    if (updating) return; // Prevent file change while updating
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview({
        url: previewUrl,
        type: file.type.startsWith('image/') ? 'image' : 'video'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const accessToken = profile?.token;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('isPublic', isPublic);
      
      if (newFile) {
        formData.append('media', newFile);
      }
      
      // await axios.put(`http://localhost:8000/api/gallery/${item._id}`, formData, {
      //   headers: { 
      //     'Authorization': `Bearer ${accessToken}`,
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

       await axios.put(`https://indiavista.onrender.com/api/gallery/${item._id}`, formData, {
        headers: { 
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Media updated successfully');
      onUpdateComplete();
      onClose();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to update media');
      } else {
        toast.error('Failed to update media');
      }
      setUpdating(false); // Only reset updating if there's an error
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Update Media</h2>
            <button
              onClick={onClose}
              className={`text-gray-500 hover:text-gray-700 ${updating ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={updating}
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  updating ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
                disabled={updating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-32 ${
                  updating ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
                disabled={updating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  updating ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
                disabled={updating}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Media
              </label>
              <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
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
                    disabled={updating}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Media (Optional)
              </label>
              <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${
                updating ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={updating}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer flex flex-col items-center ${
                    updating ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <FaUpload className={`text-4xl mb-2 ${updating ? 'text-gray-300' : 'text-gray-400'}`} />
                  <span className={updating ? 'text-gray-400' : 'text-gray-600'}>
                    {updating ? 'Updating...' : 'Click to upload new image or video'}
                  </span>
                </label>
              </div>

              {/* Preview Section */}
              {preview && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Media Preview
                  </label>
                  <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {preview.type === 'image' ? (
                      <img
                        src={preview.url}
                        alt="preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        src={preview.url}
                        className="w-full h-full object-contain"
                        controls
                        disabled={updating}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className={`h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded ${
                  updating ? 'cursor-not-allowed' : ''
                }`}
                disabled={updating}
              />
              <label htmlFor="isPublic" className={`ml-2 block text-sm ${
                updating ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Make this media public
              </label>
            </div>

            <button
              type="submit"
              disabled={updating}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                updating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-600'
              }`}
            >
              {updating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Media'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal; 