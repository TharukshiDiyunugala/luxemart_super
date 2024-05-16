import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firbase";
import Spinner from "../components/Spinner";
import ImageSwipper from '../components/ImageSwipper';


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import './listing.css'
//import { getAuth } from "firebase/auth";

export default function Listing() {
  const params = useParams();
  //const auth = getAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <Spinner />;
  }
  // return <div>{product.title}</div>
  return (
    <main >
     <section ><p><ImageSwipper/></p></section>
      
    <div className="custom-frame bg-white md:flex-row mt-20 mb-20 px-6 py-12 max-w-6xl lg:mx-auto shadow-xl hover:shadow-2xl rounded-md">
 <div className="text-center mb-3">
    <h1 className="text-3xl text-green-900 font-semibold">{product.title}</h1>
  </div>
  <div className="flex flex-col md:flex-row justify-center items-center">
    <div className="w-full md:w-1/2 lg:w-1/2 px-4">
    <p className="text-lg mb-5">
  <span className="text-green-900 font-semibold">About Product: </span>
  <div className="text-justify">
    {product.description}
  </div>
</p>

      
    </div>
    <div className="w-full md:w-1/2 lg:w-1/2 px-4">
    <p className="text-[#2c5440] mt-2 text-xl text-md text-center">
        Price: Rs. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00
      </p>
      <p className="text-[#ed4b4b] mt-2 font-bold text-xl text-center "> Discount: Rs. {product.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00
      </p>
      <img
        className="w-full md:w-[400px] h-auto object-cover"
        src={product.imgUrl[0]}
        alt={product.title}
      />
      
    </div>
    
  </div>
  {/* <p className="text-sm font-bold text-end mt-5 ">listed by: {auth.currentUser.displayName}</p> */}
</div>

     
    </main>
  );
}
