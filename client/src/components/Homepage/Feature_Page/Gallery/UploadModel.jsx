import { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

function UploadModal({ onClose, onUploadComplete }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create preview URLs
    const previews = selectedFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('isPublic', isPublic.toString());
    
    files.forEach(file => {
      formData.append('media', file);
    });

    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const accessToken = profile?.token;
      
      await axios.post('http://localhost:8000/api/gallery/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      toast.success('Media uploaded successfully');
      onUploadComplete();
      onClose();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to upload media');
      } else {
        toast.error('Failed to upload media');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Media</h2>
            <button
              onClick={onClose}
              className={`text-gray-500 hover:text-gray-700 ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={uploading}
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
                  uploading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
                disabled={uploading}
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
                  uploading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Enter your description here."
                required
                disabled={uploading}
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
                  uploading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                required
                disabled={uploading}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className={`h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded ${
                  uploading ? 'cursor-not-allowed' : ''
                }`}
                disabled={uploading}
              />
              <label htmlFor="isPublic" className={`ml-2 block text-sm ${
                uploading ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Make this media public
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Media
              </label>
              <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  required
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer flex flex-col items-center ${
                    uploading ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <FaUpload className={`text-4xl mb-2 ${uploading ? 'text-gray-300' : 'text-gray-400'}`} />
                  <span className={uploading ? 'text-gray-400' : 'text-gray-600'}>
                    {uploading ? 'Uploading...' : 'Click to upload images or videos'}
                  </span>
                </label>
              </div>

              {/* Preview Section */}
              {preview.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {preview.map((file, index) => (
                    <div key={index} className="relative h-32">
                      {file.type === 'image' ? (
                        <img
                          src={file.url}
                          alt="preview"
                          className={`h-full w-full object-cover rounded-lg ${
                            uploading ? 'opacity-50' : ''
                          }`}
                        />
                      ) : (
                        <video
                          src={file.url}
                          className={`h-full w-full object-cover rounded-lg ${
                            uploading ? 'opacity-50' : ''
                          }`}
                          controls
                          disabled={uploading}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-600'
              }`}
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                'Upload Media'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadModal; 
