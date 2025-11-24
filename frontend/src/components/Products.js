// src/components/Products.js
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import { Products as ProductsArray } from "../export";

const Products = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  return (
    <div
      id="Products"
      className="w-full lg:px-20 px-5 py-[80px] bg-gray-100 flex flex-col justify-center items-center gap-4"
    >
      <h1
        data-aos="zoom-in"
        data-aos-delay="100"
        className="text-purple-800 text-xl font-semibold"
      >
        Browser Collection
      </h1>

      <h1
        data-aos="zoom-in"
        data-aos-delay="200"
        className="text-black font-semibold text-[42px] leading-[50px] text-center"
      >
        Trending Products
      </h1>

      <div
        data-aos="zoom-in"
        data-aos-delay="300"
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mt-10"
      >
        {ProductsArray.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-start items-center gap-2 bg-white p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <span className="absolute top-3 right-3 bg-purple-700 text-white px-2 py-1 rounded-lg text-sm font-semibold">
              SALE 15%
            </span>

            <div className="w-full h-[250px] flex justify-center items-center">
              <img
                src={item.img}
                alt={item.name}
                className="object-contain w-full h-full rounded-md"
              />
            </div>

            <h1 className="text-lg text-gray-400 font-semibold">{item.category}</h1>
            <h1 className="text-xl text-black font-semibold">{item.name}</h1>
            <h1 className="text-lg text-purple-800 font-semibold">{item.price}</h1>

            <div className="w-full mt-2 flex flex-col justify-center items-center gap-3">
              <div className="flex justify-center items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-purple-800" />
                ))}
              </div>

              <button className="bg-purple-800 hover:bg-yellow-400 text-white hover:text-black font-semibold px-6 py-2 rounded-lg transition-colors duration-300 w-full">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          data-aos="zoom-in"
          data-aos-delay="400"
          className="bg-purple-800 hover:bg-yellow-400 text-white hover:text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          onClick={() => (window.location.href = "/products")}
        >
          VIEW MORE
        </button>
      </div>
    </div>
  );
};

export default Products;
