import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import headset from "../assets/headset.jpg";
import earbuds from "../assets/earbuds.jpg";
import dslr from "../assets/dslr.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  const slides = [
    { image: dslr, title: "DSLR360 Camera" },
    { image: headset, title: "Wireless Headset" },
    { image: earbuds, title: "Ear Buds" },
  ];

  return (
    <div id="hero" className="w-full flex justify-center items-center">
      <Slider className="w-full" {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="w-full lg:px-20 px-5 flex flex-col justify-center items-start gap-10 h-[600px] lg:h-[750px] bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <h1
                data-aos="zoom-in"
                data-aos-delay="50"
                className="text-yellow-300 border border-yellow-400 rounded-lg px-6 py-2 text-xl"
              >
                Get up to 80% Discounts Off
              </h1>
              <h1
                data-aos="zoom-in"
                data-aos-delay="100"
                className="text-white lg:text-[120px] text-[60px] uppercase font-bold lg:leading-[130px] leading-[65px]"
              >
                {slide.title.split(" ").map((word, i) => (
                  <React.Fragment key={i}>
                    {word}
                    <br />
                  </React.Fragment>
                ))}
              </h1>
              <h1
                data-aos="zoom-in"
                data-aos-delay="200"
                className="text-white text-xl lg:text-2xl"
              >
                100% trusted{" "}
                <span className="text-yellow-300 font-semibold">Electronics Gadgets</span>
              </h1>
              <button
                data-aos="zoom-in"
                data-aos-delay="300"
                className="bg-yellow-300 px-6 py-3 rounded-lg text-black uppercase"
              >
                Online Collection
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
