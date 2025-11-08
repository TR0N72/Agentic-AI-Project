import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "nameAccount") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/register', { // Assuming your AI service runs on port 8000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful', data);
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.detail);
        alert(`Registration failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Network error or unexpected issue:', error);
      alert('An unexpected error occurred. Please try again.');
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
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 hover:underline"
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
          {/* Sign Up Form Card */}
          <div className="bg-white rounded-[24px] shadow-lg p-8 relative">
            {/* Header with Icon */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-[86px] h-[86px] rounded-full bg-pinterin-purple flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
              </div>
              <h1 className="text-black font-inter text-2xl font-bold leading-normal">
                Sign Up
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-black font-inter text-xl font-normal mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="user@scorelab.com"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-black font-inter text-xl font-normal mb-3">
                  Username
                </label>
                <input
                  type="text"
                  name="nameAccount"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
              </div>

              {/* Create Password Field */}
              <div>
                <label className="block text-black font-inter text-xl font-normal mb-3">
                  Create Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="password"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-black font-inter text-xl font-normal mb-3">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="password"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-[55px] bg-pinterin-purple text-white rounded-[10px] font-inter text-2xl font-bold leading-normal hover:bg-pinterin-dark-blue transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-[#595C5F] font-inter text-lg font-normal">
                Already have an account?{" "}
              </span>
              <Link 
                to="/login" 
                className="text-pinterin-purple font-inter text-lg font-normal hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
