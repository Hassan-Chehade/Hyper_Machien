import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { reviewdata } from "../export";

const Reviews = () => {
  useEffect(() => {
    AOS.init({ offset: 100, duration: 500, easing: "ease-in-out" });
    AOS.refresh();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div
      id="Reviews"
      className="w-full lg:px-20 px-5 py-[80px] bg-gray-100 flex flex-col items-center gap-4"
    >
      <h1 className="text-[#502ec3] text-xl font-semibold capitalize">
        1300+ Customer Reviews
      </h1>

      <h1 className="text-black font-semibold text-[42px] leading-[50px] text-center capitalize">
        Our Customers Love Us
      </h1>

      <div className="w-full mt-10">
        <Slider {...settings}>
          {reviewdata.map((item, index) => (
            <div key={index} className="w-full flex justify-center">
              <div className="flex flex-col justify-center items-center gap-4 lg:p-10 p-3 bg-white rounded-2xl shadow-md">
                <FaQuoteLeft className="text-[#502ec3] text-3xl" />
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 rounded-full border-4 border-[#502ec3]"
                />
                <p className="text-gray-600 text-center italic">
                  "{item.text}"
                </p>
                <div className="flex text-[#502ec3]">
                  {Array(item.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.post}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;
