import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import bg from "../assets/bg2.avif";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { register } = useAuth(); // Assuming you have a register function in AuthContext
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Call register function from AuthContext
    // Note: You will need to implement 'register' in your AuthContext
    if (register) {
        const success = register(username, email, password);
        if (success) {
            alert("Registration successful! Please login.");
            navigate("/login"); // Redirect to login page after success
        } else {
            alert("Username already exists or registration failed.");
        }
    } else {
        console.log({ username, email, password });
        alert("Register logic not yet connected to AuthContext.");
        navigate("/login"); // For now, just redirect
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#502ec3]">
          Register
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502ec3]"
            required
          />
        </div>

        {/* Email Field (New) */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502ec3]"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502ec3]"
            required
          />
        </div>

        {/* Confirm Password Field (New) */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502ec3]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#502ec3] hover:bg-[#f5e60d] text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-3"
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
        
        {/* Link to Login Page */}
        <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
                Already have an account? {" "}
                <span 
                    onClick={() => navigate("/login")}
                    className="text-[#502ec3] font-bold cursor-pointer hover:underline"
                >
                    Login
                </span>
            </p>
        </div>

      </form>
    </div>
  );
}

export default RegisterForm;