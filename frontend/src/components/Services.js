import React, { useEffect } from 'react';
import payment from '../assets/payment.png';
import shipping from '../assets/shipping.png';
import refund from '../assets/return.png';
import gift from '../assets/gift.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const servicesData = [
  { img: shipping, title: 'Worldwide Shipping', description: 'We deliver products to over 100 countries quickly and safely.', delay: 50 },
  { img: payment, title: 'Secure Payment', description: 'Your payments are encrypted and safe with us.', delay: 150 },
  { img: refund, title: 'Easy Returns', description: 'Hassle-free returns within 30 days for all products.', delay: 250 },
  { img: gift, title: 'Special Gifts', description: 'Surprise your loved ones with our curated gift options.', delay: 350 },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ offset: 100, duration: 500, easing: 'ease-in-out' });
    AOS.refresh();
  }, []);

  return (
    <div id="Services"className="w-full lg:px-20 px-5 py-20 grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-10">
      {servicesData.map((service, index) => (
        <div key={index} data-aos="zoom-in" data-aos-delay={service.delay} className="flex flex-col justify-center items-center gap-3 text-center">
          <img src={service.img} alt={service.title} className="mb-3 w-16 h-16" />
          <h1 className="text-xl text-black font-semibold">{service.title}</h1>
          <p className="text-gray-600 text-sm">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
