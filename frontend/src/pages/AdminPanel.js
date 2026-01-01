import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ---------------- Products ----------------
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    img: null,
  });
  const [editProductId, setEditProductId] = useState(null);

  // ---------------- Hero Images ----------------
  const [heroImages, setHeroImages] = useState([]);
  const [heroFile, setHeroFile] = useState(null);

  const categories = [
    "Earbuds",
    "USB",
    "Speakers",
    "Laptops",
    "Headsets",
    "Mouse",
    "Camera",
    "Watches",
  ];

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) navigate("/login");
    else {
      fetchProducts();
      fetchHeroImages();
    }
  }, [isAdmin]);

  // --------- Fetch Data ----------
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHeroImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hero");
      setHeroImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // --------- Handlers for Products ----------
  const handleProductChange = (e) => {
    if (e.target.name === "img") setProductForm({ ...productForm, img: e.target.files[0] });
    else setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("category", productForm.category);
    formData.append("price", productForm.price);
    if (productForm.img) formData.append("img", productForm.img);

    try {
      if (editProductId) {
        await axios.put(
          `http://localhost:5000/api/admin/update-product/${editProductId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/add-product",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      setProductForm({ name: "", category: "", price: "", img: null });
      setEditProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setProductForm({ ...product, img: null });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-product/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // --------- Handlers for Hero ----------
  const handleHeroFileChange = (e) => {
    setHeroFile(e.target.files[0]);
  };

  const handleAddHero = async () => {
    if (!heroFile) return alert("Please select an image");
    const formData = new FormData();
    formData.append("img", heroFile);

    try {
      await axios.post("http://localhost:5000/api/admin/add-hero", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setHeroFile(null);
      fetchHeroImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteHero = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-hero/${id}`);
      fetchHeroImages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 p-5">
      <h2 className="text-3xl font-bold mb-5">Admin Panel</h2>

      {/* ---------------- Products Form ---------------- */}
      <div className="mb-10 border p-4 rounded">
        <h3 className="text-xl font-semibold mb-3">
          {editProductId ? "Edit Product" : "Add Product"}
        </h3>
        <input
          name="name"
          placeholder="Name"
          value={productForm.name}
          onChange={handleProductChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <select
          name="category"
          value={productForm.category}
          onChange={handleProductChange}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          name="price"
          placeholder="Price"
          value={productForm.price}
          onChange={handleProductChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          name="img"
          type="file"
          onChange={handleProductChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleAddOrUpdateProduct}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          {editProductId ? "Update" : "Add"}
        </button>
      </div>

      {/* ---------------- Products Table ---------------- */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-3">All Products</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Img</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.category}</td>
                <td className="border px-2 py-1">{p.price}</td>
                <td className="border px-2 py-1">
                  {p.img && <img src={`http://localhost:5000${p.img}`} alt={p.name} className="w-16 h-16 object-contain" />}
                </td>
                <td className="border px-2 py-1 flex gap-2">
                  <button onClick={() => handleEditProduct(p)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/* ---------------- Hero Images Table ---------------- */}
<div className="mb-10 border p-4 rounded">
  <h3 className="text-xl font-semibold mb-3">Hero Images</h3>
  <input type="file" onChange={handleHeroFileChange} className="border p-2 rounded mb-2 w-full" />
  <button onClick={handleAddHero} className="bg-blue-600 text-white px-3 py-2 rounded mb-3">Add Hero</button>

  <table className="w-full border">
    <thead>
      <tr className="bg-gray-200">
        <th className="border px-2 py-1">Image</th>
        <th className="border px-2 py-1">Actions</th>
      </tr>
    </thead>
    <tbody>
      {heroImages.map((hero, index) => (
        <tr key={index}>
          <td className="border px-2 py-1">
            {hero.img && <img src={`http://localhost:5000${hero.img}`} alt="Hero" className="w-32 h-16 object-cover" />}
          </td>
          <td className="border px-2 py-1">
            <button onClick={() => handleDeleteHero(hero.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default AdminPanel;
