// Assets imports
import earbuds1 from "./assets/earbuds1.webp";
import earbuds2 from "./assets/earbuds2.jpg";
import earbuds3 from "./assets/earbuds3.webp";
import earbuds4 from "./assets/earbuds4.jpg";

import speakers1 from "./assets/speaker1.jpg";
import speakers2 from "./assets/speaker2.jpg";
import speakers3 from "./assets/speaker3.jpeg";
import speakers4 from "./assets/speaker4.jpg";

import watch1 from "./assets/swatch1.jpeg";
import watch2 from "./assets/swatch2.jpeg";
import watch3 from "./assets/swatch3.jpeg";
import watch4 from "./assets/swatch4.jpg";

import USB1 from "./assets/usb1.jpeg";
import USB2 from "./assets/usb2.jpg";
import USB3 from "./assets/usb3.webp";
import USB4 from "./assets/usb4.jpg";

import laptop1 from "./assets/laptop1.webp";
import laptop2 from "./assets/laptop2.webp";
import laptop3 from "./assets/laptop3.webp";
import laptop4 from "./assets/laptop4.jpg";

import headset1 from "./assets/headset1.webp";
import headset2 from "./assets/headset2.jpg";
import headset3 from "./assets/headset3.webp";
import headset4 from "./assets/headset4.jpeg";

import mouse1 from "./assets/mouse1.webp";
import mouse2 from "./assets/mouse2.jpg";
import mouse3 from "./assets/mouse3.webp";
import mouse4 from "./assets/mouse4.webp";

import camera1 from "./assets/camera1.jpg";
import camera2 from "./assets/camera2.png";
import camera3 from "./assets/camera3.avif";
import camera4 from "./assets/camera4.jpg";

import test1 from "./assets/test-1.jpg";
import test2 from "./assets/test-2.jpg";
import test3 from "./assets/test-3.jpg";
import test4 from "./assets/test-4.jpg";
import test5 from "./assets/test-5.jpg";

// Functions returning products per category
export const getEarbuds = () => [
  { img: earbuds1, category: "Earphones", name: "Smart Earbuds ", price: "$45.98" },
  { img: earbuds2, category: "Earphones", name: "Smart Earbuds ", price: "$49.99" },
  { img: earbuds3, category: "Earphones", name: "Smart Earbuds ", price: "$55.00" },
  { img: earbuds4, category: "Earphones", name: "Smart Earbuds ", price: "$60.50" },
];

export const getSpeakers = () => [
  { img: speakers1, category: "Speakers", name: "Bluetooth Speaker ", price: "$192.23" },
  { img: speakers2, category: "Speakers", name: "Bluetooth Speaker ", price: "$200.00" },
  { img: speakers3, category: "Speakers", name: "Bluetooth Speaker ", price: "$210.00" },
  { img: speakers4, category: "Speakers", name: "Bluetooth Speaker ", price: "$220.00" },
];

export const getWatches = () => [
  { img: watch1, category: "Smart Watch", name: "Smart Watch ", price: "$120.00" },
  { img: watch2, category: "Smart Watch", name: "Smart Watch ", price: "$130.00" },
  { img: watch3, category: "Smart Watch", name: "Smart Watch ", price: "$140.00" },
  { img: watch4, category: "Smart Watch", name: "Smart Watch ", price: "$150.00" },
];

export const getUSB = () => [
  { img: USB1, category: "Accessories", name: "USB ", price: "$11.98" },
  { img: USB2, category: "Accessories", name: "USB ", price: "$12.50" },
  { img: USB3, category: "Accessories", name: "USB ", price: "$14.00" },
  { img: USB4, category: "Accessories", name: "USB ", price: "$15.00" },
];

export const getLaptops = () => [
  { img: laptop1, category: "Computers", name: "Mac Book", price: "$897.28" },
  { img: laptop2, category: "Computers", name: "Lenovo Ligon", price: "$1200.50" },
  { img: laptop3, category: "Computers", name: "ORIGIN Gaming Laptop", price: "$999.99" },
  { img: laptop4, category: "Computers", name: "Sony VAIO", price: "$850.00" },
];

export const getHeadsets = () => [
  { img: headset1, category: "Music", name: "HeadSet ", price: "$67.88" },
  { img: headset2, category: "Music", name: "HeadSet ", price: "$70.00" },
  { img: headset3, category: "Music", name: "HeadSet ", price: "$75.00" },
  { img: headset4, category: "Music", name: "HeadSet ", price: "$80.00" },
];

export const getMouse = () => [
  { img: mouse1, category: "Computer Accessories", name: "Wireless Mouse ", price: "$32.78" },
  { img: mouse2, category: "Computer Accessories", name: "Wireless Mouse ", price: "$29.99" },
  { img: mouse3, category: "Computer Accessories", name: "Wireless Mouse ", price: "$35.00" },
  { img: mouse4, category: "Computer Accessories", name: "Wireless Mouse ", price: "$40.00" },
];

export const getCamera = () => [
  { img: camera1, category: "Films & Gaming", name: "Chino CM-5 ", price: "$145.28" },
  { img: camera2, category: "Films & Gaming", name: "Chino CM-3 ", price: "$199.99" },
  { img: camera3, category: "Films & Gaming", name: "Sony HXR-MC2500 ", price: "$250.00" },
  { img: camera4, category: "Films & Gaming", name: "Canon EOS 4000D ", price: "$300.00" },
];

// Review data remains the same
export const reviewdata = [
  {
    img: test1,
    name: "Albert Twinson",
    post: "store owner",
    rating: 5,
    text: "Great website for electronics! The prices are fair and the delivery was faster than I expected. Customer support was also very helpful.",
  },
  {
    img: test2,
    name: "Alex Grind",
    post: "electrician",
    rating: 4,
    text: "I buy tools and components from this site all the time. Everything is original and the quality is excellent. Highly recommended for anyone who works with electronics.",
  },
  {
    img: test3,
    name: "Drew Anderson",
    post: "android developer",
    rating: 5,
    text: "Found all the parts I needed for my project in one place. The product descriptions are clear and the checkout process is simple.",
  },
  {
    img: test5,
    name: "Alex Brown",
    post: "web developer",
    rating: 4,
    text: "Amazing online store! I purchased a new keyboard and monitor, and both came in perfect condition. The website is easy to use.",
  },
  {
    img: test4,
    name: "James Bond",
    post: "army officer",
    rating: 5,
    text: "Reliable store with good packaging and fast shipping. I ordered headphones and a power bank, and both worked perfectly.",
  },

]
export const Products= [
  getEarbuds()[0],    // First Earbuds
  getUSB()[0],        // First USB
  getSpeakers()[0],   // First Speakers
  getLaptops()[0],    // First Laptops
  getHeadsets()[0],   // First Headsets
  getMouse()[0],      // First Mouse
  getCamera()[0],     // First Camera
  getWatches()[0],    // First Watch
];