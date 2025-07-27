import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { IoNotificationsSharp, IoSearchSharp } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { FaUserGroup } from "react-icons/fa6";
import dp from "../assets/dp.png";
import { userDataContext } from "../context/UserContext";

const Navbar = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const { userData, setUserData } = useContext(userDataContext);

  return (
    <div className="w-full h-[80px] bg-white fixed top-0 shadow-lg  flex justify-between md:justify-around items-center px-[10px]">
      <div className="flex justify-center items-center gap-[10px] ">
        <div onClick={() => setActiveSearch(false)}>
          <img src={logo} alt="" className="w-[50px]" />
        </div>

        {!activeSearch && (
          <div>
            <IoSearchSharp
              className="w-[25px] h-[23px] text-gray-600 lg:hidden"
              onClick={() => setActiveSearch(true)}
            />
          </div>
        )}

        <form
          className={`lg:w-[350px] w-[190px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${
            !activeSearch ? "hidden" : "flex"
          } `}
        >
          <div>
            <IoSearchSharp className="w-[25px] h-[23px] text-gray-600 " />
          </div>
          <input
            type="text"
            className="w-[80%] h-full bg-transparent outline-none border-0 "
            placeholder="search users"
          />
        </form>
      </div>

      <div className="flex justify-center items-center gap-[20px] relative ">
        <div className="w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg flex flex-col items-center p-[20px] gap-[20px] ">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <img src={dp} alt="" />
          </div>

          <div className="text-gray-700 text-[19px] font-semibold ">
            {`${userData.firstName} ${userData.lastName}`}
          </div>
          <button className="w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] ">
            View Profile
          </button>
          <div className="w-full h-[1px] bg-gray-700"></div>
          <div className="w-full flex items-center justify-start text-gray-600 gap-[10px] ">
            <FaUserGroup className="w-[23px] h-[23px] text-gray-600 " />
            <div>My Connections</div>
          </div>
          <button className="w-[100%] h-[40px] rounded-full border-2 border-[#ec4545] text-[#ec4545] ">
            Sign Out
          </button>
        </div>

        <div className="lg:flex flex-col items-center justify-center text-gray-600 hidden">
          <TiHome className="w-[23px] h-[23px] text-gray-600 " />
          <div>Home</div>
        </div>
        <div className="md:flex flex-col items-center justify-center text-gray-600 hidden">
          <FaUserGroup className="w-[23px] h-[23px] text-gray-600 " />
          <div>Connections</div>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-600">
          <IoNotificationsSharp className="w-[23px] h-[23px] text-gray-600 " />
          <div className="hidden  md:block">Notifications</div>
        </div>
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img src={dp} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
