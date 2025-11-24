import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cat1 from "../assets/speaker1.jpg";
import cat2 from "../assets/laptop2.webp";
import cat3 from "../assets/swatch3.jpeg";
import cat4 from "../assets/earbuds3.webp";
import cat5 from "../assets/cat5.jpg";
import cat6 from "../assets/mouse1.webp";
import cat7 from "../assets/usb1.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";

const Category = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  const categories = [
    { img: cat1, name: "Speakers" },
    { img: cat2, name: "Laptops" },
    { img: cat3, name: "Watches" },
    { img: cat4, name: "Earbuds" },
    { img: cat5, name: "Cameras" },
    { img: cat6, name: "Mouse" },
    { img: cat7, name: "USB" },
  ];

  return (
    <div
      id="category"
      className="w-full bg-gray-100 lg:px-20 px-5 pt-32 pb-20 flex lg:flex-row flex-col justify-center items-center gap-20"
    >
      <div
        data-aos="zoom-in"
        data-aos-delay="50"
        className="lg:w-[15%] w-full flex flex-col justify-center items-center lg:items-start gap-5"
      >
        <h1 className="text-[#502ec3] text-xl font-semibold text-center lg:text-left">
          Favorite Items
        </h1>
        <h1 className="text-black font-semibold text-3xl lg:text-[42px] leading-[50px] text-center lg:text-left">
          Popular Category
        </h1>
        <button
          className="bg-[#502ec3] hover:bg-[#f5e60d] text-white hover:text-black px-8 py-3 rounded-lg font-semibold mt-12"
          onClick={() => navigate("/products")}
        >
          VIEW ALL
        </button>
      </div>

      <div className="lg:w-[85%] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-center items-start gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={100 * (index + 1)}
            className="flex flex-col justify-center items-center gap-4"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="rounded-full w-[150px] h-[150px] object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-lg"
            />
            <h1 className="text-black text-xl font-semibold hover:text-[#502ec3] cursor-pointer">
              {cat.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
