import { useState } from "react";
import { createProductAsync } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from 'react-loaders'

const CreateProduct = () => {
  const dispatch = useDispatch();
  const categories = ["Men", "Women"];

  const { createLoading } = useSelector((state) => state.product);

  const [formdata, setFormdata] = useState({
    name: "",
    price: 0,
    sale_price: 0,
    category: "",
    quantity: 0,
    description: "",
    product_code:"",
    file: null,
    file2: null,
    file3: null,
    file4: null,
    latest: false,
  });

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormdata({
      ...formdata,
      category: selectedCategory,
    });
  };

  const handleChange = (e, fieldName) => {
    if (e.target.type === "file") {
      setFormdata({
        ...formdata,
        [fieldName]: e.target.files[0],
      });
    } else {
      setFormdata({
        ...formdata,
        [fieldName]: e.target.value,
      });
    }
  };

  const handleCheckChange = (event) => {
    const { name, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : event.target.value;

    setFormdata({
      ...formdata,
      [name]: newValue,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("primary", formdata.file);
    formData.append("image2", formdata.file2);
    formData.append("image3", formdata.file3);
    formData.append("image4", formdata.file4);
    formData.append("name", formdata.name);
    formData.append("price", formdata.price);
    formData.append("product_code", formdata.product_code);
    formData.append("sale_price", formdata.sale_price);
    formData.append("category", formdata.category);
    formData.append("stock", formdata.quantity);
    formData.append("description", formdata.description);
    formData.append("latest", formdata.latest);

    try {
      dispatch(createProductAsync(formData)).then((res) => {
        if (res.payload.message) {
          setFormdata({
            name: "",
            price: 0,
            sale_price: 0,
            category: "",
            quantity: 0,
            description: "",
            product_code:"",
            file: null,
            file2: null,
            file3: null,
            file4: null,
            latest: false,
          });
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <section className="bg-[#E5E5E5] dark:bg-gray-900">
        <div className="py-8 px-18 sm:px-20 md:px-16 lg:px-14 mx-auto max-w-full lg:py-10">
          <h2 className="mb-5 playfair text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            Add a new product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* NAME */}
              <div className="">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="name"
                >
                  Product Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="name"
                  name="name"
                  placeholder="Type product name"
                  type="text"
                  value={formdata.name}
                  onChange={(e) =>
                    setFormdata({ ...formdata, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* QUANTITY */}
              <div>
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="quantity"
                  name="quantity"
                  placeholder="Available quantity"
                  type="number"
                  value={formdata.quantity}
                  onChange={(e) =>
                    setFormdata({ ...formdata, quantity: e.target.value })
                  }
                  required
                />
              </div>

              {/* PRICE */}
              <div className="w-full">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="price"
                  name="price"
                  placeholder="Price"
                  type="number"
                  value={formdata.price}
                  onChange={(e) =>
                    setFormdata({ ...formdata, price: e.target.value })
                  }
                  required
                />
              </div>

              {/* SALE PRICE */}
              <div className="w-full">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="sale_price"
                >
                  Sale Price
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="sale_price"
                  name="sale_price"
                  placeholder="Sale Price"
                  type="number"
                  value={formdata.sale_price}
                  onChange={(e) =>
                    setFormdata({ ...formdata, sale_price: e.target.value })
                  }
                  required
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="category"
                  value={formdata.category}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

               {/* PRODUCT CODE */}
               <div className="w-full">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="price"
                >
                  Product Code
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="product_code"
                  name="product_code"
                  placeholder="product-code"
                  type="text"
                  value={formdata.product_code}
                  onChange={(e) =>
                    setFormdata({ ...formdata, product_code: e.target.value })
                  }
                  required
                />
              </div>

              {/* DESC */}
              <div className="sm:col-span-2">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="description"
                  placeholder="Your description here"
                  rows="3"
                  value={formdata.description}
                  onChange={(e) =>
                    setFormdata({ ...formdata, description: e.target.value })
                  }
                />
              </div>

               {/* LATEST PRODUCTS */}
               <div className="flex items-center">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultValue=""
                  id="default-checkbox"
                  type="checkbox"
                  name="latest"
                  checked={formdata.latest}
                  onChange={handleCheckChange}
                />
                <label
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="default-checkbox"
                >
                  Popular Products
                </label>
              </div>

            </div>

            {/* IMAGES */}
            <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">

              {/* First file upload */}
              {formdata?.file ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#7666CFborder-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                    htmlFor="dropzone-file"
                  >
                    <img
                      src={URL.createObjectURL(formdata.file)}
                      alt="Selected"
                      className="h-full object-contain"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#7666CF] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    htmlFor="dropzone-file"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 20 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-[#DEC344] dark:text-gray-400">
                        <span className="font-semibold">Primary Image</span>
                      </p>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      className="hidden"
                      id="dropzone-file"
                      type="file"
                      onChange={(e) => handleChange(e, "file")}
                    />
                  </label>
                </div>
              )}

              {/* Second file upload */}
              {formdata?.file2 ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                    htmlFor="dropzone-file-2"
                  >
                    <img
                      src={URL.createObjectURL(formdata.file2)}
                      alt="Selected"
                      className="h-full object-contain"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    htmlFor="dropzone-file-2"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 20 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      className="hidden"
                      id="dropzone-file-2"
                      type="file"
                      onChange={(e) => handleChange(e, "file2")}
                    />
                  </label>
                </div>
              )}

              {/* Third file upload */}
              {formdata?.file3 ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                    htmlFor="dropzone-file-3"
                  >
                    <img
                      src={URL.createObjectURL(formdata.file3)}
                      alt="Selected"
                      className="h-full object-contain"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    htmlFor="dropzone-file-3"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 20 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      className="hidden"
                      id="dropzone-file-3"
                      type="file"
                      onChange={(e) => handleChange(e, "file3")}
                    />
                  </label>
                </div>
              )}

              {/* Fourth file upload */}
              {formdata?.file4 ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                    htmlFor="dropzone-file-4"
                  >
                    <img
                      src={URL.createObjectURL(formdata.file4)}
                      alt="Selected"
                      className="h-full object-contain"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    htmlFor="dropzone-file-4"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 20 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      className="hidden"
                      id="dropzone-file-4"
                      type="file"
                      onChange={(e) => handleChange(e, "file4")}
                    />
                  </label>
                </div>
              )}
            </div>

            {createLoading ? (
              <div className="w-36 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-cente">           
             <Loader type="ball-beat" active={true} />
             </div>
            ) : (
              <button
                type="submit"
                className="w-36 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-center text-white bg-[#DEC344] rounded-lg hover:bg-[#614FC9]"
              >
                Add product
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateProduct;
