import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../firbase';
import { ref, UploadBytesResumable, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
    const navigate = useNavigate();

    const [enterName, setEnterName] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterDiscount, setEnterDiscount] = useState('');
    const [enterOffer, setEnterOffer] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true)

        // const product = {
        //     name: enterName,
        //     shortDesc: enterShortDesc,
        //     category: enterCategory,
        //     price: enterPrice,
        //     discount: enterDiscount,
        //     offer: enterOffer,
        //     imgUrl: enterProductImg
        // };

        // ============add product to the firebase ===============

        try {
            const docRef = await collection(db, 'products')
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

            uploadTask.on(() => {
                toast.error('images not uploaded!')
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await addDoc(docRef, {
                        name: enterName,
                        shortDesc: enterShortDesc,
                        category: enterCategory,
                        price: enterPrice,
                        discount: enterDiscount,
                        offer: enterOffer,
                        imgUrl: downloadURL,
                    })
                })
                setLoading(false)
                toast.success("product successfully added!");
                navigate('/');
            }
            );

        } catch (error) {
            setLoading(false)
            toast.error('product not added!')

        }

        toast.success('product successfully added!');

        //console.log(product);
    };

    return (
        <section className="px-5 py-10 ml-64">
            <div className="max-w-4xl mx-auto">
                <div className="mb-5">
                    {
                        loading ? <h4 className='py-5'>Loading............</h4> : <>

                            <form onSubmit={addProduct}>
                                <div className="mb-4">
                                    <label className="block mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter the name"
                                        value={enterName}
                                        onChange={(e) => setEnterName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex justify-between gap-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block mb-1">Product Category</label>
                                        <select
                                            value={enterCategory}
                                            onChange={(e) => setEnterCategory(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="vegitable">Vegetable</option>
                                            <option value="meats">Meats</option>
                                            <option value="beverages">Beverages</option>
                                            <option value="deserts">Deserts</option>
                                            <option value="snacks">Snacks</option>
                                            <option value="educational">Educational</option>
                                            <option value="beauty">Beauty</option>
                                        </select>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block mb-1">Product Price</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={enterPrice}
                                            onChange={(e) => setEnterPrice(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Description</label>
                                    <input
                                        type="text"
                                        placeholder="Description,,,,,"
                                        value={enterShortDesc}
                                        onChange={(e) => setEnterShortDesc(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Product Discount Offer</label>
                                    <input
                                        type="checkbox"
                                        value={enterOffer}
                                        onChange={(e) => setEnterOffer(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Product Discount Price</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={enterDiscount}
                                        onChange={(e) => setEnterDiscount(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1">Product Image</label>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg"
                                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" type="submit">Add Product</button>
                            </form>

                        </>
                    }
                </div>
            </div>
        </section>
    );
};

export default AddProducts;
