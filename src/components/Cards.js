import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import {getDocs} from 'firebase/firestore'
import {booksRef} from '../firebase/firebase'
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loading , setLoading]=useState(false);

  useEffect(()=>{
    async function getData(){
      setLoading(true);
      const _data = await getDocs(booksRef);
      _data.forEach((doc)=>{
        setData((prv)=>[...prv, {...(doc.data()),id: doc.id}])
      })
      setLoading(false);

    }
    getData();
  },[])

  return (
    <div className="container flex flex-wrap justify-center align-middle sm:p-3 mt-2 mx-auto">
      {loading ? <div className="flex justify-center items-center min-h-screen"><ThreeDots height={40} color="white"/></div> : 
      data.map((e) => {
        
        return (
          
          <Link to={`/detail/${e.id}`}><div key={e.id} className="card  sm:w-48 lg:w-60 w-[170px] bg-zinc-900 shadow-lg p-2 leading-relaxed md:leading-loose text-sm md:text-lg font-medium hover:-translate-y-3  transition-all duration-500 cursor-pointer m-2 rounded-md">
            <img
              className="w-full h-[200px] sm:h-56 lg:h-80 self-center mb-2 rounded-lg mx-auto object-cover"
              src={e.img}
            />
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="font-semibold text-gray-500 ">Name:</span> {e.title}
            </p>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="font-semibold text-gray-500">Author:</span> {e.author}
            </p>
            <p className="flex items-center">
              <span className="font-semibold text-gray-500 mr-1  align-middle">Rating:</span>
              <ReactStars
              size={20}
              half={true}
              value={e.rating/e.userRated}
              edit={false}
              />
            </p>
          </div></Link>
        );
      })}
    </div>
    
  );
};

export default Cards;
