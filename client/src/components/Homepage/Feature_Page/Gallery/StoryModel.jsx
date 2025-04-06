import { FaTimes, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { useState } from 'react';

function StoryModal({ item, onClose, onDelete, onUpdate, isUserGallery }) {
  const [deleteStep, setDeleteStep] = useState(0); // 0: initial, 1: confirmation

  if (!item) return null;

  const handleDeleteClick = () => {
    if (deleteStep === 0) {
      setDeleteStep(1); // Show confirmation button
    } else {
      onDelete(item._id); // Actually delete when clicked second time
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <button
              onClick={() => {
                setDeleteStep(0); // Reset delete step when closing
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="aspect-video w-full">
              {item.type === 'image' ? (
                <img
                  src={item.secure_url}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  src={item.secure_url}
                  controls
                  className="w-full h-full"
                />
              )}
            </div>
          </div>

          <div className="p-6">
            <pre className="text-gray-700 text-lg leading-relaxed font-sans whitespace-pre-line break-words">
              {item.description}
            </pre>
          </div>
          
          <div className="text-cyan-600 font-medium mt-6">
            {item.location}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>

          {isUserGallery && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => onUpdate(item)}
                className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
              >
                Update
              </button>
              <button
                onClick={handleDeleteClick}
                className={`px-4 py-2 text-white rounded flex items-center gap-2 transition-all duration-300 ${
                  deleteStep === 0
                    ? 'bg-red-500 hover:bg-red-600 hover:shadow-md transform hover:-translate-y-0.5'
                    : 'bg-red-600 hover:bg-red-700 animate-pulse'
                }`}
                onMouseLeave={() => {
                  if (deleteStep === 1) {
                    // Reset delete step if mouse leaves during confirmation
                    setTimeout(() => setDeleteStep(0), 2000);
                  }
                }}
              >
                {deleteStep === 0 ? (
                  <>
                    <FaTrash className="w-4 h-4" />
                    <span>Delete</span>
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle className="w-4 h-4" />
                    <span>Click to confirm</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryModal;