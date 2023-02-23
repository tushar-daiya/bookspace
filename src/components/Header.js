import React, { useContext, useState , useRef ,useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { UserContext } from "../App";
import { getAuth, signOut } from "firebase/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";
const Header = () => {
  const useAppstate = useContext(Appstate);
  const userDetails = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add event listener to detect clicks outside the dropdown container
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  
  const logout = async () => {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          useAppstate.setLogin(false);
          userDetails.setUser(null);
          swal({
            title:"Logged out Redirecting to home page",
            icon:"success",
            buttons:false,
            timer: 3000
          })
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          swal({
            title:error.code,
            icon:"error",
            buttons:false,
            timer: 3000
          })
        });
    } catch (error) {}
  };
  return (
    <div className="header lg:text-3xl text-xl bg-[#15161a] z-10 sticky top-0 font-bold p-3 border-b-2 border-gray-500 flex justify-between items-center">
      <Link to={"/"}>
        <span>
          <span className="text-blue-600">Book</span>Space
        </span>
      </Link>
      {useAppstate.login ? (
        <>
          <Link to={"/addbook"}>
            <h1 className="lg:text-lg text-sm  flex items-center cursor-pointer">
              <Button color="primary">
                {" "}
                <AddIcon className="mr-2 " color="inherit" /> Add New
              </Button>
            </h1>
          </Link>
          <div className="relative inline-block ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-10 flex items-center "
            >
              <AccountCircleRoundedIcon
                sx={{ height: 36, width: 36, borderRadius: 50 }}
              />
            </button>
            {isOpen && (
              <div
              ref={dropdownRef}
                onClick={() => setIsOpen(false)}
                className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
              >
                
                  <Link to={'/viewprofile'} className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <div className="mx-1">
                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {userDetails.user.displayName}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userDetails.user.email}
                    </p>
                  </div>
                  </Link>
                

                <hr className="border-gray-200 dark:border-gray-700 " />
                <Link to={'/viewprofile'}><p className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  view profile
                </p></Link>
                <Link to={'/userReviews'}><p className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  your reviews
                </p></Link>
                <Link onClick={logout}><p className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  Signout
                </p></Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg  rounded-lg flex items-center cursor-pointer">
            <Button color="primary">
              <PersonIcon className="mr-2 " style={{ color: "#2563eb" }} />
              <span className="font-bold text-blue-600"> Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
