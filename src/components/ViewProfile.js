import React, { useState, useContext, useEffect } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../App";
import { getAuth, updateProfile } from "firebase/auth";
import swal from "sweetalert";
const ViewProfile = () => {
  const userDetails = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  console.log(userDetails);
  useEffect(() => {
    if (userDetails.user != null) {
      setForm({
        name: userDetails.user.displayName,
        email: userDetails.user.email,
      });
    }
  }, [userDetails]);

  const auth = getAuth();
  const updateProfilehandle = () => {
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: form.name,
      email: form.email,
    })
      .then(() => {
        setLoading(false);
        swal({
          title: "updated profile",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        setLoading(false);
        swal({
          title: error.message,
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        // Handle the error here
      });
  };

  return (
    <div className="sm:w-[600px] p-4 mx-4 sm:mx-auto my-4">
      <p className="text-3xl font-semibold mb-5">User Details</p>
      <div className=" flex flex-col-reverse sm:flex sm:flex-row  justify-between  ">
        <div className="sm:w-[350px]">
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="mb-1 block text-base font-medium text-[#9c9c9c]"
            >
              Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-1 block text-base font-medium text-[#9c9c9c]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <button
              onClick={updateProfilehandle}
              className=" hover:shadow-form rounded-md bg-[#2563EB] py-1 px-2 text-base font-normal text-white outline-none"
            >
              {loading ? (
                <TailSpin height={25} color="white" />
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
          <div className="mb-5">
            <button
              type="submit"
              className=" hover:shadow-form rounded-md bg-[#2a2a2c] py-1 px-2 text-base font-normal text-white outline-none"
            >
              {loading2 ? (
                <TailSpin height={25} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </div>

        <AccountCircleRoundedIcon
          className="m-4"
          sx={{ height: 150, width: 150, borderRadius: 50 }}
        />
      </div>
    </div>
  );
};

export default ViewProfile;
