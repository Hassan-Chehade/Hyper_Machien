import React, { useEffect } from "react";
import instal from "../assets/insta-1.jpg";
import insta2 from "../assets/insta-2.jpg";
import insta3 from "../assets/insta-3.jpg";
import insta4 from "../assets/insta-4.jpg";
import insta5 from "../assets/insta-5.jpg";
import insta6 from "../assets/insta-6.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Insta = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  const instaImages = [instal, insta2, insta3, insta4, insta5, insta6];

  return (
    <div
      id="Contact"
      className="w-full lg:px-20 px-5 py-20 bg-white flex flex-col justify-center items-center gap-4"
    >
      <h1
        data-aos="zoom-in"
        data-aos-delay="100"
        className="text-[#502ec3] text-xl font-semibold capitalize"
      >
        Our Instagram Shop
      </h1>
      <h1
        data-aos="zoom-in"
        data-aos-delay="200"
        className="text-black font-semibold text-4xl lg:text-[42px] leading-[50px] text-center capitalize"
      >
        Follow on Instagram
      </h1>

      <div
        data-aos="zoom-in"
        data-aos-delay="300"
        className="w-full grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 justify-center items-center gap-4 mt-8"
      >
        {instaImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Instagram ${index + 1}`}
            className="w-full h-32 sm:h-40 lg:h-auto object-cover rounded-lg"
          />
        ))}
      </div>

      <button
        data-aos="zoom-in"
        data-aos-delay="400"
        className="bg-[#502ec3] hover:bg-[#f5e60d] text-white hover:text-black font-semibold px-8 py-3 rounded-lg mt-12 uppercase"
      >
        #ElectraShop
      </button>
    </div>
  );
};

export default Insta;
