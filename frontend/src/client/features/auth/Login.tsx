import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.post("/users/login", {
        email: formData.email,
        password: formData.password
      });
      
      setSession(response.data);
      navigate("/dashboard");

    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pinterin-cream relative overflow-hidden">
      {/* Colorful Background Shapes */}
      <div className="absolute inset-0">
        {/* Red blur */}
        <div 
          className="absolute w-[346px] h-[346px] rounded-full bg-[#DD4A4A] blur-[100px] opacity-70"
          style={{ 
            left: '918px', 
            top: '149px',
          }}
        />
        
        {/* Purple blur */}
        <div 
          className="absolute w-[347px] h-[351px] rounded-full bg-[#6C5CE7] blur-[100px] opacity-50"
          style={{ 
            left: '1064px', 
            top: '388px',
          }}
        />
        
        {/* Green blur */}
        <div 
          className="absolute w-[346px] h-[260px] rounded-full bg-[#89D767] blur-[100px] opacity-70 rotate-[35deg]"
          style={{ 
            left: '472px', 
            top: '309px',
          }}
        />
        
        {/* Orange blur */}
        <div 
          className="absolute w-[350px] h-[390px] rounded-full bg-[#F79534] blur-[100px] opacity-50"
          style={{ 
            left: '500px', 
            top: '610px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative w-full border-b border-pinterin-border bg-pinterin-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-24">
          <div className="flex h-[137px] items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="h-11 w-11 rounded-full bg-pinterin-purple flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-white"></div>
              </div>
              <span className="ml-2 text-xl font-bold text-pinterin-dark-blue font-dm-sans">
                Pinterin
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              <Link 
                to="/" 
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 hover:underline"
              >
                Home
              </Link>
              <Link 
                to="/exam" 
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 hover:underline"
              >
                Exam
              </Link>
              <Link 
                to="/pricing" 
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 hover:underline"
              >
                Pricing
              </Link>
              <Link 
                to="/partnership" 
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 hover:underline"
              >
                Partnership
              </Link>
              <Link 
                to="/contact" 
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 hover:underline"
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 underline"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="bg-pinterin-dark-blue text-white px-5 py-3 rounded-full font-dm-sans text-base font-normal leading-6 border border-pinterin-dark-blue hover:bg-transparent hover:text-pinterin-dark-blue transition-colors"
              >
                Sign Up
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="lg:hidden text-pinterin-dark-blue">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex items-center justify-center min-h-[calc(100vh-137px)] px-6 py-20">
        <div className="w-full max-w-[544px]">
          {/* Login Form Card */}
          <div className="bg-white rounded-[36px] shadow-lg border border-white p-8 relative">
            {/* Header with Icon */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-[85px] h-[83px] rounded-full bg-pinterin-purple flex items-center justify-center border border-white">
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
              </div>
              <h1 className="text-black font-inter text-[30px] font-bold leading-normal">
                Login
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-black font-inter text-xl font-normal mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="user@scorelab.com"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-black font-inter text-xl font-normal mb-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="password"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[55px] bg-pinterin-purple text-white rounded-[10px] border-2 border-white font-poppins text-2xl font-bold leading-normal hover:bg-pinterin-dark-blue transition-colors"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-[#595C5F] font-inter text-lg font-normal">
                New to our platform?{" "}
              </span>
              <Link 
                to="/signup" 
                className="text-pinterin-purple font-inter text-lg font-normal hover:underline"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-43"
            onClick={() => setError("")}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-[10px] w-[699px] h-[459px] flex flex-col items-center justify-center p-8 shadow-lg">
            {/* Error Title */}
            <h2 className="text-black font-inter text-[40px] font-bold leading-normal text-center mb-4">
              Login Failed
            </h2>

            {/* Error Message */}
            <p className="text-black font-inter text-xl font-normal leading-normal text-center mb-12">
              {error}
            </p>

            {/* OK Button */}
            <button
              onClick={() => setError("")}
              className="relative w-[92px] h-[70px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-pinterin-purple rounded-[10px] border-4 border-pinterin-purple translate-x-2 translate-y-1" />
              <span className="relative text-white font-poppins text-[25px] font-bold leading-normal">
                OK
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
