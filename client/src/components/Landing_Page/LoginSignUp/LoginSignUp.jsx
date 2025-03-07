import { React, useState,useEffect } from "react";
import logo from "../../../assets/Landing_page/IndiaVista_logo.png";
import Captcha from "./Captcha";
import AuthErrorMessage from "../../AuthErrorMsg";
import validate from "../../../common/validation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bgImg from "../../../assets/Landing_page/VisitIndia_.jpg";
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiConnector } from "../../../services/apiConnector.js";
import { endpoints } from "../../../services/apis.js";
import { toast } from 'react-toastify';

const {
  SIGNUP_API,
  LOGIN_API,
} = endpoints

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const LoginSignUp = () => {
  const [isregister, setIsregister] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [trackState, setTrackState] = useState(false);
  const [error, setError] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name != "confirmPassword") {
      const validationMessage = validate[e.target.name](e.target.value);
      setError((prev) => {
        return { ...prev, ...validationMessage };
      });
    } else {
      if (form.password !== e.target.value) {
        setError((prev) => {
          return {
            ...prev,
            confirmPassword: true,
            confirmPasswordError: "Password does not match",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            confirmPassword: false,
            confirmPasswordError: false,
          };
        });
      }
    }
  };

  const togglePassword = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const location = useLocation();

  // useEffect(() => {
  //   if (location.state && location.state.isregister === false) {
  //     setIsregister(false); // Ensure it switches to login if isRegister is false
  //   }
  // }, [location.state]);

  const switchMode = () => {
    setForm(initialForm);
    setIsregister((prevIsregister) => !prevIsregister);
  };
  // const handleBackToLogin = () => {
  //     navigate('/auth', { state: { isregister: false } }); // Navigate to login view
    
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    let submitable = true;

    Object.values(error).forEach((e) => {
      if (e) {
        submitable = false;
        return;
      }
    });

    if (submitable) {
      setIsLoading(true);

      try {
        console.log(isregister);
        const res = isregister
          ? await apiConnector("POST", SIGNUP_API, form)
          : await apiConnector("POST", LOGIN_API,  form,null);
        console.log(res.data)
        const result = res.data;
        console.log(document.cookie);

        toast.success(isregister? "User registered in successfully!" : "User logged in successfully!",
          {
            position: "top-right", // Position of the toast
            autoClose: 1500,      // Delay time in milliseconds 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.log(res.data.token)
        localStorage.setItem("profile", JSON.stringify(res.data));

        setIsLoading(false)
       navigate("/home")

      }catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message); 
        } else {
          toast.error("An error occurred. Please try again.");
        }
        setIsLoading(false);
      }
    } else {
      toast.error("Please enter valid values");
    }
  };

  // const googleSuccess = async (res) => {
  //   const result = jwt_decode(res?.credential);
  //   localStorage.setItem(
  //     "profile",
  //     JSON.stringify({
  //       result
  //     })
  //   );

  //   try {
  //     navigateTo("/home");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const googleError = () => {
  //   alert("Google Sign In was unsuccessful. Try again later");
  // };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative z-10 bg-black bg-opacity-80 p-8 rounded-lg shadow-lg text-white w-full max-w-md">
        <div className="flex items-center justify-center  bg-center">
          <img
            src={logo}
            alt="India Vista Logo"
            className="w-[90px] h-[80px] mb-0 -mt-5"
          />
          {/* Other component code */}
        </div>
        <h1 className="text-3xl font-bold mb-6">
          {isregister ? "Register" : "Sign In"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isregister && (
            <div>
              <input
                type="text"
                name="fullName"
                id="name"
                value={form.fullName}
                placeholder="Name"
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Enter you name"
                required
                aria-required="true"
                aria-describedby="name-error"
                aria-invalid={error.nameError ? "true" : "false"}
              />
              {error.fullName && error.nameError ? (
                <AuthErrorMessage message={error.nameError} name="name" />
              ) : null}
            </div>
          )}

          <div>
            {/* <label htmlFor="password" className="block mb-2 text-sm">Password</label> */}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={form.email}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
              aria-label="Enter you email"
              required
              aria-required="true"
              aria-describedby="email-error"
              aria-invalid={error.emailError ? "true" : "false"}
            />
            {error.email && error.emailError ? (
              <AuthErrorMessage message={error.emailError} name="email" />
            ) : null}
          </div>

          <div>
            <input
              type={passwordType}
              name="password"
              id="password"
              value={form.password}
              placeholder="Password"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
              aria-label="Enter you password"
              required
              aria-required="true"
              aria-describedby="password-error"
              aria-invalid={error.passwordError ? "true" : "false"}
            />
            <div
              onClick={togglePassword}
              className="absolute cursor-pointer flex items-center z-[5] mt-[-1.8rem] ml-[22rem]"
            >
              {passwordType === "password" ? <FiEyeOff /> : <FiEye />}
            </div>
            {error.password && error.passwordError ? (
              <AuthErrorMessage message={error.passwordError} name="password" />
            ) : null}
          </div>

          {isregister && (
            <div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Confirm your password"
                required
                aria-required="true"
                aria-describedby="confirmPassword-error"
                aria-invalid={error.confirmPassword ? "true" : "false"}
              />
              {error.confirmPassword && error.confirmPasswordError ? (
                <AuthErrorMessage
                  message={"Password does not match"}
                  name="confirmPassword"
                />
              ) : null}
            </div>
          )}

          <Captcha message={setTrackState} trackState={trackState} />

          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition duration-200 font-bold"
            >
              {isregister ? "Register" : "Sign In"}
            </button>
          </div>

          {!isregister && 
          <Link to="/forget-password">
          <div className="flex justify-center items-center mt-4 text-sm">
            <a className="text-blue-400 hover:underline">Forgot Password?</a>
          </div>
          </Link>
          }
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">
            {isregister ? "Already a user?" : "Don't have an account?"}{" "}
          </span>
          <a
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={switchMode}
          >
            {isregister ? "  Sign In" : "  Register"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
