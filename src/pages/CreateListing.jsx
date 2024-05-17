import React, { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "../firbase";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    discountPrice: 0,
    category: "Vegetables",
    offer: true,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const { title, description, price, discountPrice, category, offer, image } =
    formData;

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files,
      }));
    }
    // text, number, select
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]:
          e.target.id === "category"
            ? e.target.value
            : boolean ?? e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the refreshing
    setLoading(true);
    if (+discountPrice >= +price) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const imgUrl = await Promise.all(
      [...image].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });
    // console.log(imgUrl)

    const formDataCopy = {
      ...formData,
      imgUrl,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    // console.log(formDataCopy);
    // complete the database operation
    delete formDataCopy.image;
    !formDataCopy.offer && delete formDataCopy.discountPrice;
    const docRef = await addDoc(collection(db, "products"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.category}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/different-fresh-vegetables-baskets-counter_132075-5763.jpg?t=st=1715936396~exp=1715939996~hmac=09ef5d7e77ca26381b6272b41a52434d9d8bee73c25777296fc650d009628c1f&w=1060')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form onSubmit={handleSubmit} className="relative z-10 mt-20 max-w-xl w-full p-8 bg-white bg-opacity-90 shadow-md rounded-lg mb-20">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-4">+ Add Product</h1>
        <label htmlFor="title" className="block mt-4 text-green-900">Title</label>
        <input
          type="text"
          required
          id="title"
          value={title}
          onChange={handleChange}
          placeholder="Enter the title of the listing"
          className="w-full border p-2 mt-1 rounded-lg"
        />
        <label htmlFor="description" className="block mt-4 text-green-900">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={handleChange}
          placeholder="Enter the description of the listing"
          className="w-full border p-2 mt-1 rounded-lg"
        />
        <label htmlFor="price" className="block mt-4 text-green-900">Price(LKR)</label>
        <input
          type="number"
          id="price"
          required
          placeholder="Price"
          onChange={handleChange}
          value={price}
          className="w-full border p-2 mt-1 rounded-lg"
        />
        <label className="block mt-4 text-green-900">Offer</label>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={handleChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-green-500 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={handleChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-green-500 text-white"
            }`}
          >
            No
          </button>
        </div>
        {offer && (
          <>
            <label htmlFor="discountPrice" className="block mt-4 text-green-900">Discounted Price(LKR)</label>
            <input
              type="number"
              id="discountPrice"
              value={discountPrice}
              onChange={handleChange}
              placeholder="Discounted Price"
              className="w-full border p-2 mt-1 rounded-lg"
            />
          </>
        )}
        <label htmlFor="category" className="block mt-4 text-green-900">Category</label>
        <select
          id="category"
          value={category}
          required
          onChange={handleChange}
          className="w-full border p-2 mt-1 rounded-lg"
        >
          <option value="Vegetables">Vegetables</option>
          <option value="Meats">Meats</option>
          <option value="Beverages">Beverages</option>
          <option value="Deserts">Deserts</option>
          <option value="Snacks">Snacks</option>
          <option value="Educational">Educational</option>
          <option value="Beauty">Beauty</option>
        </select>
        <label htmlFor="image" className="block mt-4 text-green-900">Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 mt-1 rounded-lg mb-6"
          required
        />
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-green-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add Product
        </button>
      </form>
    </main>
  );
}
