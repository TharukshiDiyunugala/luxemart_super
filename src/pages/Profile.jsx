import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { db } from "../firbase";
import { doc, orderBy, query, updateDoc } from "firebase/firestore";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {useEffect} from "react";
import { collection, where } from "firebase/firestore";
import { getDocs,deleteDoc } from "firebase/firestore";
import ListingItems from "../components/ListingItems";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userName: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { userName, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async () => {
    try {
      //update name in firebase auth
      if (auth.currentUser.displayName !== userName) {
        await updateProfile(auth.currentUser, {
          displayName: userName,
        });
        //update the user name in the database
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          userName: userName,
        });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Could not update profile. Please try again.");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  };
  useEffect(() => {
    async function fetchUserProducts() {
      const productRef = collection(db, "products");
      const q = query(
        productRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      
      const querySnap = await getDocs(q);
      let products = [];
      querySnap.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setProducts(products);
      setLoading(false);
    }
    fetchUserProducts();
  }, [auth.currentUser.uid]);

  const onDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this item?")){
      //delete the item
      await deleteDoc(doc(db, "products", id));
      //update the state
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      toast.success("Item deleted successfully");
    }
  };

  const onEdit = async (id) => {
    navigate(`/edit-list/${id}`)
  };




  return (
    <>
      <section className="max-w-8xl  mx-auto flex justify-center items-center flex-col">
      <h1 className="text-2xl font-semibold text-center text-green-900 mt-4 my-6">
  <div className="relative h-64">
    <img
      src="https://img.freepik.com/free-photo/side-view-man-buying-watermelon_23-2149729534.jpg?t=st=1715934043~exp=1715937643~hmac=2493c80b96ce850735d7363793681c15fca9486bc9319a394b2bb734f225e2cc&w=1060"
      alt=" Banner"
      className="h-full "
    />
    <div className="absolute inset-0 flex mt-20 justify-center bg-black bg-opacity-30">
      <span className="text-white mb-2 text-5xl font-bold ">Profile</span>
    </div>
  </div>
</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="userName"
              value={userName}
              disabled={!changeDetail}
              onChange={handleChange}
              className={`mb-6 w-full px-4 py-2 text-l text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-l text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to change your user name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button type="submit" className="  w-full bg-green-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-green-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-800">
          <Link to='/create-list' className="flex justify-center items-center">
          <RiShoppingBag3Fill className="mr-2 text-3xl  rounded-full p-1 border-2"/>
            Add Items
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && products.length>0 && (
          <>
            <h2 className="text-xl text-center  mb-6 text-blue-900 mt-8 ">{userName}'S Listings </h2>
            
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
              {products.map((product) => (  
               <ListingItems key={product.id} products={product.data} id={product.id}
                 onDelete={()=>onDelete(product.id)}
                 onEdit={()=>onEdit(product.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
