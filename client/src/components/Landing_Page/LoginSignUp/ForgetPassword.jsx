import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate,useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { apiConnector } from "../../../services/apiConnector.js"
import { endpoints } from "../../../services/apis.js";


const {
  RESETPASSTOKEN_API,
}=endpoints
function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [isLoading,setIsLoading]=useState(false)

  const getPasswordResetToken= async (email, setEmailSent)=> {
      const toastId = toast.loading("Loading...")
      setIsLoading(true)
      try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {
          email,
        })
  
        console.log("RESETPASSTOKEN RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.update(toastId, {
          render: "Reset Email Sent",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setEmailSent(true)
      } catch (error) {
        console.log("RESETPASSTOKEN ERROR............", error)
        toast.update(toastId, {
          render: "Failed To Send Reset Email",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      
      setIsLoading(false)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    getPasswordResetToken(email, setEmailSent)
  }

  const navigate = useNavigate();
  const location = useLocation();
  // //Used to change the isregister state variable in Loginsignup to navigate to login page 
  // const handleBackToLogin = () => {
  //   const fromLogin = location?.state?.fromLogin;
  //   if (fromLogin) {
  //     navigate('/auth', { state: { isregister: false } }); // Navigate to login view
  //   }
  // };
  

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
          <button  className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back To Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword