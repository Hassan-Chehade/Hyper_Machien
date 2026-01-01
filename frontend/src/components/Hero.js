import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hero");
        console.log("Hero data received:", res.data); // THIS WILL SHOW US WHAT DATA YOU'RE GETTING
        setSlides(res.data);
      } catch (err) {
        console.error("Error fetching hero:", err);
      }
    };
    fetchHero();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Show message if no slides
  if (slides.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
        <p className="text-2xl">No hero images found. Check console for data.</p>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div 
              className="w-full h-[600px] lg:h-[750px] bg-cover bg-center flex flex-col justify-center items-start px-5 lg:px-20 gap-5"
              style={{ backgroundImage: `url(http://localhost:5000${slide.img})` }}
            >
              <h1 className="text-white text-4xl lg:text-6xl font-bold">SALES 50%</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;