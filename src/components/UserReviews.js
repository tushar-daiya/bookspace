import React, { useEffect, useContext, useState } from "react";
import { reviewsRef, db } from "../firebase/firebase";
import ReactStars from "react-stars";
import { query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { UserContext } from "../App";
import { ThreeDots } from "react-loader-spinner";
const UserReviews = () => {
  const [data, setData] = useState([]);
  const [booksdata, setbooksData] = useState([]);
  const userDetails = useContext(UserContext);
  useEffect(() => {
    async function getData() {
      let quer = query(
        reviewsRef,
        where("userUID", "==", userDetails.user.uid)
      );
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
        getBookData(doc.data().movieid);
      });
    }
    getData();
  }, []);
  async function getBookData(bookId) {
    const bookRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookRef);
    if (bookDoc.exists()) {
      setbooksData((prev) => [...prev, { ...bookDoc.data(), id: bookDoc.id }]);
    } else {
      throw new Error("Book document not found");
    }
  }

  return (
    <div className="container mx-auto flex flex-col items-center md:gap-2">
      <h1 className="text-gray-300 text-3xl font-bold mt-4 ">Your Reviews</h1>
      {data.map((e, i) => {
        const book = booksdata.find((b) => b.id === e.movieid);

        return (
          <>
          {book ? (
            <>
          <div
            key={i}
            className="flex m-4 p-2  bg-zinc-900 w-11/12 md:h-40 lg:h-72 h-32"
          >
            <img
              className="w-auto h-full object-contain"
              src={book.img}
            />
            <div className="ml-4 lg:text-2xl md:text-lg text-sm mr-2 overflow-hidden text-ellipsis leading-normal md:leading-relaxed">
                
                  <p className=" whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-semibold text-gray-500 ">Name:</span>{" "}
                    {book.title}
                  </p>
                  <p className="lg:mt-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-semibold text-gray-500">Author:</span>{" "}
                    {book.author}
                  </p>
                  <p className="flex items-center lg:mt-3 ">
                    <span className="font-semibold text-gray-500 mr-1  align-middle">
                      Rating:
                    </span>
                    <ReactStars
                      size={20}
                      half={true}
                      value={e.rating}
                      edit={false}
                    />
                  </p>
                  <p className="lg:mt-3 lg:leading-9" >
                    <span className="font-semibold text-gray-500">
                      {userDetails.user.displayName}:
                    </span>{" "}
                    {e.thought}
                  </p>
                
              
            </div>
      </div></>):<div className="flex justify-center items-center min-h-screen"><ThreeDots height={40} color="white"/></div>}
        </>
        );
      })}
    </div>
  );
};

export default UserReviews;
