import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import Reviews from "../components/Reviews"

const Detail = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    author: "",
    description: "",
    img: "",
    rating:0,
    userRated:0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "books", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="p-4 mt-4 flex flex-col lg:flex-row lg:items-start items-center w-full justify-center">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          {" "}
          <ThreeDots height={30} color="white" />
        </div>
      ) : (
        <>
          <img alt="image"
            className="lg:sticky top-24 lg:h-[500px] lg:max-w-sm  lg:w-auto md:h-[350px] h-80 object-cover rounded-lg "
            src={data.img}
          />
          <div className="lg:ml-6 lg:w-1/2 lg:mt-0 mt-4">
            <h1 className="md:text-3xl text-xl font-bold text-gray-300">{data.title}</h1>
            <h1 className="md:text-xl text-lg font-semibold text-gray-600">
              {data.author}
            </h1>
            
            <ReactStars size={40} half={true} value={data.rating/data.userRated} edit={false} />
            <p className="md:text-xl text-lg mt-3 whitespace-normal">{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.userRated}/>
          </div>
        </>
      )}
      
    </div>
  );
};

export default Detail;
