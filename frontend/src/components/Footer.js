import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaArrowUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import client1 from "../assets/client1.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";
import client5 from "../assets/client5.png";
import client6 from "../assets/client6.png";
import google from "../assets/google.jpg";
import apple from "../assets/apple.jpg";
import pay1 from "../assets/pay-1.jpg";
import pay2 from "../assets/pay-2.jpg";
import pay3 from "../assets/pay-3.jpg";
import pay4 from "../assets/pay-4.jpg";

const Footer = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
      once: true,
    });
    AOS.refresh();
  }, []);

  const clients = [client1, client2, client3, client4, client5, client6];
  const payments = [pay1, pay2, pay3, pay4];

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter an email!");
      return;
    }
    const data = { email };
    alert(JSON.stringify(data, null, 2));
    setEmail("");
  };

  return (
    <div id="About" className="w-full flex flex-col justify-center items-center bg-gray-100">
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        className="w-full bg-[#502ec3] lg:px-20 px-10 py-8 flex flex-wrap justify-center items-center gap-6"
      >
        {clients.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`client${i + 1}`}
            className="w-[130px] sm:w-[110px] xs:w-[90px] opacity-70 cursor-pointer hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </div>

      <div className="w-full lg:px-20 px-5 py-16 flex flex-col lg:flex-row justify-between gap-10">
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="flex flex-col justify-start items-start gap-6 lg:w-[30%]"
        >
          <h1 className="text-4xl font-bold text-[#502ec3] underline italic">
            Hyper Machines
          </h1>
          <p className="text-gray-500 text-justify">
            Hyper Machines Shop is your one-stop online store for all things electronics. From headphones and smart watches to laptops and cameras, we deliver quality products with fast shipping and excellent customer service.
          </p>
          <div className="flex flex-col gap-4">
            <h2 className="text-black text-xl font-semibold">Download Our App</h2>
            <div className="flex justify-start items-center gap-4">
              <img src={google} alt="Google Play" className="w-28 sm:w-24 xs:w-20" />
              <img src={apple} alt="App Store" className="w-28 sm:w-24 xs:w-20" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between lg:w-[65%] gap-10 items-start">
          <div data-aos="zoom-in" data-aos-delay="200" className="flex flex-col gap-4">
            <h1 className="text-black text-xl font-semibold">Useful Links</h1>
            <ul className="flex flex-col gap-2">
              <li className="text-gray-500 cursor-pointer hover:text-black">Home</li>
              <li className="text-gray-500 cursor-pointer hover:text-black">About</li>
              <li className="text-gray-500 cursor-pointer hover:text-black">Products</li>
              <li className="text-gray-500 cursor-pointer hover:text-black">Services</li>
              <li className="text-gray-500 cursor-pointer hover:text-black">Contact</li>
            </ul>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="flex gap-3">
              {payments.map((img, i) => (
                <img key={i} src={img} alt={`pay${i + 1}`} className="w-[50px] rounded-lg" />
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter valid email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-l-lg border border-gray-300"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#502ec3] hover:bg-[#f5e60d] text-white hover:text-black px-4 py-2 rounded-r-lg"
              >
                SUBMIT
              </button>
            </div>

            <p className="text-gray-500 whitespace-nowrap">&copy; 2025 Powered by Debug Entity</p>
          </div>
        </div>
      </div>

      <div className="bg-[#502ec3] text-white p-4 rounded-full hover:bg-[#f5e60d] hover:text-black cursor-pointer fixed bottom-6 right-6 flex justify-center items-center">
        <Link to="hero" spy={true} offset={-100} smooth={true}>
          <FaArrowUp className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
