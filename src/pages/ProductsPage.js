import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  getEarbuds,
  getUSB,
  getSpeakers,
  getLaptops,
  getHeadsets,
  getMouse,
  getCamera,
  getWatches,
} from "../export";

const ProductSection = ({ title, products }) => (
  <div className="w-full lg:px-20 px-5 py-16 bg-gray-100 flex flex-col gap-8">
    <h2 className="text-3xl font-semibold text-[#502ec3]">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((item, index) => (
        <div
          key={index}
          data-aos="zoom-in"
          className="relative bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col justify-start items-center gap-3"
        >
          <div className="w-full h-[250px] flex justify-center items-center">
            <img
              src={item.img}
              alt={item.name}
              className="object-contain w-full h-full rounded-md"
            />
          </div>

          <div className="absolute top-3 right-3 bg-[#f5e60d] text-black px-2 py-1 rounded text-sm font-semibold">
            Sale
          </div>

          <h3 className="text-lg text-gray-400 font-semibold">{item.category}</h3>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <h3 className="text-lg text-[#502ec3] font-semibold">{item.price}</h3>

          <div className="flex justify-center items-center mt-2 gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#502ec3]" />
            ))}
          </div>

          <button className="mt-3 w-full bg-[#502ec3] hover:bg-yellow-400 text-white hover:text-black px-4 py-2 rounded-lg font-semibold transition-colors">
            Shop Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

const ProductsPage = () => {
  useEffect(() => {
    AOS.init({ offset: 100, duration: 500, easing: "ease-in-out" });
    AOS.refresh();
  }, []);

  return (
    <div className="pt-32">
      <ProductSection title="Earbuds" products={getEarbuds()} />
      <ProductSection title="USB" products={getUSB()} />
      <ProductSection title="Speakers" products={getSpeakers()} />
      <ProductSection title="Laptops" products={getLaptops()} />
      <ProductSection title="Headsets" products={getHeadsets()} />
      <ProductSection title="Mouse" products={getMouse()} />
      <ProductSection title="Camera" products={getCamera()} />
      <ProductSection title="Watches" products={getWatches()} />
    </div>
  );
};

export default ProductsPage;
