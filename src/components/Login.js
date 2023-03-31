import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Appstate, UserContext } from "../App";
import swal from "sweetalert";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  console.log(process.env.REACT_APP_API_KEY)
  const useAppstate = useContext(Appstate);
  const userDetails = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        useAppstate.setLogin(true);
        userDetails.setUser(user);

        swal({
          title: "Logged in Succesfully",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        swal({
          title: error.code,
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        setLoading(false);
      });
  };
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={login}>
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
              required
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
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className=" hover:shadow-form rounded-md bg-[#2563EB] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              {loading ? <TailSpin height={25} color="white" /> : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-3 text-base text-center">
          <span className="text-gray-500 font-medium  ">
            New to BookSpace?{" "}
            <Link to={"/sign-up"}>
              <span className="text-blue-600  font-bold">Sign Up</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
