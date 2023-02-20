import React, {useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "../firebase/firebase";
import swal from "sweetalert";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { Appstate, UserContext } from "../App";

const Signup = () => {
  const useAppstate = useContext(Appstate);
  const userDetails=useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",

    password: "",
  });
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);

  const createnewUser = () => {
    try {
      setLoading(true);
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          updateProfile(auth.currentUser, {
            displayName: form.name
          })
          uploadData();
          useAppstate.setLogin(true);
          userDetails.setUser(user);
          
          swal({
            text: "User created Redirecting to home page",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);

          // ...
        })
        .catch((error) => {
          swal({
            title: error.message,
            icon: "error",
            buttons: false,
            timer: 3000,
          });
          // ..
        });

      setLoading(false);
    } catch (error) {
      swal({
        text: error.message,
        icon: "error",
        timer: 3000,
      });
      // ..
    }
  };

  const uploadData = async () => {
    try {
      await addDoc(usersRef, {
        name: form.name,
        email: form.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <div className="mb-5">
          <label
            htmlFor="userName"
            className="mb-3 block text-base font-medium text-[#9c9c9c]"
          >
            Name
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#9c9c9c]"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@gmail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="pass"
            className="mb-3 block text-base font-medium text-[#9c9c9c]"
          >
            Password
          </label>
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="*******"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="text-center">
          <button
            onClick={createnewUser}
            className=" hover:shadow-form rounded-md bg-[#2563EB] py-3 px-8 text-base font-semibold text-white outline-none"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Sign Up"}
          </button>
        </div>

        <div className="mt-3 text-base text-center">
          <span className="text-gray-500 font-medium  ">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-blue-600  font-bold">Login</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
