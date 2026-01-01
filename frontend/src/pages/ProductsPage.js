import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useCart } from "../components/CartContext";

const ProductSection = ({ title, products }) => {
  const { addToCart } = useCart();

  return (
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
                src={`http://localhost:5000${item.img}`}
                alt={item.name}
                className="object-contain w-full h-full rounded-md"
              />
            </div>

            <h3 className="text-lg text-gray-400 font-semibold">{item.category}</h3>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <h3 className="text-lg text-[#502ec3] font-semibold">{item.price}$</h3>

            <button
              onClick={() => addToCart(item)}
              className="mt-3 w-full bg-[#502ec3] hover:bg-yellow-400 text-white hover:text-black px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({ offset: 100, duration: 500, easing: "ease-in-out" });
    AOS.refresh();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);

      const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  return (
    <div className="pt-32">
      {categories.map((cat) => (
        <ProductSection
          key={cat}
          title={cat}
          products={products.filter((p) => p.category === cat)}
        />
      ))}
    </div>
  );
};

export default ProductsPage;