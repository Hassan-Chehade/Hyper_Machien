import React, { useEffect } from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Types = () => {
  useEffect(() => {
    AOS.init({ offset: 100, duration: 500, easing: "ease-in-out" });
    AOS.refresh();
  }, []);

  const banners = [
    { img: banner1, discount: "60% Off", title: "Wireless Devices", delay: 100 },
    { img: banner2, discount: "40% Off", title: "EarBuds", delay: 200 },
    { img: banner3, discount: "75% Off", title: "Smart Watches", delay: 300 },
  ];

  return (
    <div id='Types' className="w-full lg:px-20 px-5 py-20 grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-10">
      {banners.map((item, index) => (
        <div
          key={index}
          data-aos="zoom-in"
          data-aos-delay={item.delay}
          className="flex flex-col justify-center items-end gap-6 bg-cover bg-center p-10 rounded-lg h-[350px] hover:-translate-y-2 transition-all duration-300"
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <h1 className="text-[#f5e60d] border rounded-lg border-[#f5e60d] px-6 py-2 text-lg">
            {item.discount}
          </h1>
          <h1 className="text-4xl text-end text-white font-semibold">
            {item.title.split(" ").map((word, i) => (
              <React.Fragment key={i}>
                {word} <br />
              </React.Fragment>
            ))}
          </h1>
         
        </div>
      ))}
    </div>
  );
};

export default Types;
