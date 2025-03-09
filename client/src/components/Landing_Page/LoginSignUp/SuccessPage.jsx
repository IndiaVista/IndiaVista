import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        // Navigate to auth page with login mode
        navigate("/auth", { 
            state: { loginMode: true }
        });
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">Successfully Registered!</h1>
            <p className="text-lg mb-6">You can now log in to your account.</p>
            
            <button 
                onClick={handleLoginClick}
                className="bg-orange-600 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded transition duration-200"
            >
                Go to Login
            </button>
        </div>
  );
};

export default SuccessPage;
