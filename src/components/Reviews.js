import React, { useEffect, useState, useContext } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin,  ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { UserContext , AppContext} from "../App";


const Reviews = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsloading, setReviewsLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const userDetails = useContext(UserContext);
  const sendReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewsRef, {
        movieid: id,
        name: userDetails.user.displayName,
        thought: form,
        rating: rating,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "books", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        userRated: userRated + 1,
      });
      setRating(0);
      setForm("");
      swal({
        title: "Review Added",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewsLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="w-full mt-4 border-t-2 border-gray-500">
      <ReactStars
        value={rating}
        size={40}
        half={true}
        onChange={(rate) => setRating(rate)}
      />
      
      
      
      <textarea
        value={form}
        onChange={(e) => setForm(e.target.value)}
        rows={3}
        placeholder="Share your thoughts..."
        className="w-full p-2 outline-none bg-[#15161a] resize-none"
      />
      <button
        onClick={sendReview}
        className="relative px-2 mt-2 py-1 bg-green-600 rounded-lg"
      >
        {loading ? (
          <TailSpin
            className="absolute top-1/2 left-1/2"
            height={24}
            width={42}
          />
        ) : (
          "Share"
        )}
      </button>

      {reviewsloading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div>
          {data.map((e, i) => {
            return (
              <div key={i} className="mt-2 p-2 bg-[#15161a]">
                <div className="flex items-center">
                  <p className="text-green-600">{e.name}</p>
                  <p className="ml-2 text-gray-400 text-xs ">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
