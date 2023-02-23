import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";

import { booksRef } from "../firebase/firebase";
import swal from "sweetalert";
const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    img: "",
    rating:0,
    userRated:0
    
  });
const [loading, setLoading]=useState(false);
const addbook= async(event)=>{
  event.preventDefault();
  if(form.description.split(" ").length>100){
    document.getElementById("alert_description").classList.add("hidden");
  setLoading(true);
  await addDoc(booksRef,form);
  swal({
    title:"Succesfully added",
    icon:"success",
    buttons:false,
    timer: 3000
  })
  setForm({
    title: "",
    author: "",
    description: "",
    img: "",
    rating:0,
    userRated:0
  })
  setLoading(false);}
  else{
    document.getElementById("alert_description").classList.remove("hidden");
  }
}
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <h1 className="text-2xl font-bold text-center">Add Book</h1>
        <form onSubmit={addbook}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#9c9c9c]"
            >
              Book Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={form.title}
              onChange={(e)=>setForm({...form, title: e.target.value})}
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="author"
              className="mb-3 block text-base font-medium text-[#9c9c9c]"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Author"
              value={form.author}
              onChange={(e)=>setForm({...form, author: e.target.value})}
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="img"
              className="mb-3 block text-base font-medium text-[#9c9c9c]"
            >
              Image
            </label>
            <input
              type="url"
              name="img"
              id="img"
              placeholder="Image Url"
              value={form.img}
              onChange={(e)=>setForm({...form, img: e.target.value})}
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-3 block text-base font-medium text-[#9c9c9c]"
            >
              Description
            </label>
            <textarea
              rows="4"
              name="description"
              id="description"
              placeholder="Type your description"value={form.description}
              onChange={(e)=>setForm({...form, description: e.target.value})}
              required
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          <p id="alert_description" className="hidden text-red-600 italic text-sm ">Description should be more than 100 words</p>
          </div>
          <div>
            <button type="submit" className=" hover:shadow-form rounded-md bg-[#2563EB] py-3 px-8 text-base font-semibold text-white outline-none">
              {loading ? <TailSpin  height={25} color='white'/>:'Submit'}
            </button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default AddBook;
