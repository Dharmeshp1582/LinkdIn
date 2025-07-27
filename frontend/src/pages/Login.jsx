import React, { useState } from 'react'
import logo from '../assets/image.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from "axios"
import { userDataContext } from '../context/UserContext';

const Login = () => {
  const [show, setShow] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const {userData,setUserData} = useContext(userDataContext);
  const navigate = useNavigate()

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(serverUrl + "/api/auth/login", {
        email, password
      }, { withCredentials: true })
      console.log(res)
      navigate("/")
      setLoading(false)
     setUserData(res.data)
      setEmail(""); setPassword("");

    } catch (error) {
      setLoading(false)
      setErr(error.response?.data?.message || "Something went wrong!")
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 flex items-center justify-center md:justify-start">
        <img src={logo} alt="logo" className="w-24 sm:w-28 md:w-36 h-auto" />
      </div>

      {/* Center form */}
      <div className="flex-grow flex items-center justify-center px-3 sm:px-6 pb-6">
        <form
          onSubmit={handleLogin}
          className="w-full sm:w-[90%] md:w-[450px] bg-white shadow-lg rounded-lg sm:rounded-xl flex flex-col gap-4 p-4 sm:p-6 md:p-8"
        >
          <h1 className="text-gray-800 text-xl sm:text-2xl md:text-3xl font-bold text-center">
            Login
          </h1>

          {/* Inputs */}
        
          <input
            className="w-full h-11 sm:h-12 md:h-14 border border-gray-300 focus:border-blue-500 rounded-md px-3 sm:px-4 text-gray-800 text-sm sm:text-base md:text-lg transition duration-200 outline-none shadow-sm focus:shadow-md bg-gray-50"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          {/* Password Field */}
          <div className="w-full h-11 sm:h-12 md:h-14 border border-gray-300 focus-within:border-blue-500 rounded-md bg-gray-50 shadow-sm focus:shadow-md relative">
            <input
              type={show ? "text" : "password"}
              className="w-full h-full rounded-md px-3 sm:px-4 pr-10 text-gray-800 text-sm sm:text-base md:text-lg outline-none bg-transparent"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              className="absolute right-3 top-2.5 sm:top-3 md:top-4 text-lg sm:text-xl md:text-2xl text-gray-600 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <IoEyeOffSharp /> : <IoEyeOutline />}
            </span>
          </div>

          {/* Error Message */}
          {err && <p className="text-red-500 text-xs sm:text-sm">*{err}</p>}

          {/* Button */}
          <button
            className="w-full h-11 sm:h-12 md:h-14 rounded-full bg-[#1dc9fd] text-white text-sm sm:text-base font-semibold mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="border border-gray-300 w-full my-2 sm:my-3"></div>

          <p className="text-center text-xs sm:text-sm md:text-base">
           Don't have an account?{" "}
            <span
              className="text-[#1dc9fd] font-medium cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              signUp
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
