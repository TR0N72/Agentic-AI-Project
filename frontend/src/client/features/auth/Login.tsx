import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showValidationWarnings, setShowValidationWarnings] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    // Hide validation warnings when user starts typing
    if (showValidationWarnings && value.trim()) {
      setShowValidationWarnings(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are empty and show validation warnings
    if (!email.trim() || !password.trim()) {
      setShowValidationWarnings(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/login', { // Assuming your AI service runs on port 8000
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // FastAPI's OAuth2PasswordRequestForm expects this
        },
        body: new URLSearchParams({
          username: email, // OAuth2PasswordRequestForm uses 'username' for email
          password: password,
        }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token); // Store the JWT token
        console.log('Login successful', data);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.detail);
        alert(`Login failed: ${errorData.detail}`);
        setShowErrorModal(true); // Show error modal on failed login
      }
    } catch (error) {
      console.error('Network error or unexpected issue:', error);
      alert('An unexpected error occurred. Please try again.');
      setShowErrorModal(true); // Show error modal on network error
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
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
                  value={email}
                  onChange={handleInputChange}
                  placeholder="user@scorelab.com"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
                {/* Warning Icon */}
                {showValidationWarnings && !email.trim() && (
                  <div className="absolute right-4 top-[52px] flex items-center justify-center">
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[27px] h-[27px]"
                    >
                      <path
                        d="M15.5 20.9H15.5108M15.5 10.1V16.85M29 15.5C29 8.04395 22.956 2 15.5 2C8.04395 2 2 8.04395 2 15.5C2 22.956 8.04395 29 15.5 29C22.956 29 29 22.956 29 15.5Z"
                        stroke="#B32121"
                        strokeWidth="2.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-black font-inter text-xl font-normal mb-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="password"
                  className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-inter text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                />
                {/* Warning Icon */}
                {showValidationWarnings && !password.trim() && (
                  <div className="absolute right-4 top-[52px] flex items-center justify-center">
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[27px] h-[27px]"
                    >
                      <path
                        d="M15.5 20.9H15.5108M15.5 10.1V16.85M29 15.5C29 8.04395 22.9561 2 15.5 2C8.04395 2 2 8.04395 2 15.5C2 22.9561 8.04395 29 15.5 29C22.9561 29 29 22.9561 29 15.5Z"
                        stroke="#B32121"
                        strokeWidth="2.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-[55px] bg-pinterin-purple text-white rounded-[10px] border-2 border-white font-poppins text-2xl font-bold leading-normal hover:bg-pinterin-dark-blue transition-colors"
                >
                  Login
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
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-43"
            onClick={closeErrorModal}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-[10px] w-[699px] h-[459px] flex flex-col items-center justify-center p-8 shadow-lg">
            {/* Error Icon */}
            <div className="mb-8">
              <svg
                width="111"
                height="111"
                viewBox="0 0 111 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[111px] h-[111px]"
              >
                <path
                  d="M55.5 63.27L71.595 79.365C72.6125 80.3825 73.9075 80.8912 75.48 80.8912C77.0525 80.8912 78.3475 80.3825 79.365 79.365C80.3824 78.3475 80.8912 77.0525 80.8912 75.48C80.8912 73.9075 80.3824 72.6125 79.365 71.595L63.27 55.5L79.365 39.405C80.3824 38.3875 80.8912 37.0925 80.8912 35.52C80.8912 33.9475 80.3824 32.6525 79.365 31.635C78.3475 30.6175 77.0525 30.1087 75.48 30.1087C73.9075 30.1087 72.6125 30.6175 71.595 31.635L55.5 47.73L39.405 31.635C38.3875 30.6175 37.0925 30.1087 35.52 30.1087C33.9475 30.1087 32.6525 30.6175 31.635 31.635C30.6175 32.6525 30.1087 33.9475 30.1087 35.52C30.1087 37.0925 30.6175 38.3875 31.635 39.405L47.73 55.5L31.635 71.595C30.6175 72.6125 30.1087 73.9075 30.1087 75.48C30.1087 77.0525 30.6175 78.3475 31.635 79.365C32.6525 80.3825 33.9475 80.8912 35.52 80.8912C37.0925 80.8912 38.3875 80.3825 39.405 79.365L55.5 63.27ZM55.5 111C47.8225 111 40.6075 109.542 33.855 106.627C27.1025 103.711 21.2287 99.7575 16.2337 94.7662C11.2388 89.7749 7.2853 83.9012 4.3734 77.145C1.46151 70.3888 0.00370702 63.1738 7.02531e-06 55.5C-0.00369297 47.8262 1.45411 40.6112 4.3734 33.855C7.2927 27.0988 11.2462 21.225 16.2337 16.2337C21.2213 11.2424 27.0951 7.289 33.855 4.3734C40.6149 1.4578 47.8299 0 55.5 0C63.1701 0 70.3851 1.4578 77.145 4.3734C83.9048 7.289 89.7786 11.2424 94.7662 16.2337C99.7538 21.225 103.709 27.0988 106.632 33.855C109.555 40.6112 111.011 47.8262 111 55.5C110.989 63.1738 109.531 70.3888 106.627 77.145C103.722 83.9012 99.7686 89.7749 94.7662 94.7662C89.7638 99.7575 83.89 103.713 77.145 106.632C70.3999 109.551 63.1849 111.007 55.5 111ZM55.5 99.9C67.895 99.9 78.3937 95.5987 86.9962 86.9962C95.5987 78.3937 99.8999 67.895 99.8999 55.5C99.8999 43.105 95.5987 32.6062 86.9962 24.0037C78.3937 15.4012 67.895 11.1 55.5 11.1C43.105 11.1 32.6062 15.4012 24.0037 24.0037C15.4012 32.6062 11.1 43.105 11.1 55.5C11.1 67.895 15.4012 78.3937 24.0037 86.9962C32.6062 95.5987 43.105 99.9 55.5 99.9Z"
                  fill="#DD4A4A"
                />
              </svg>
            </div>

            {/* Error Title */}
            <h2 className="text-black font-inter text-[40px] font-bold leading-normal text-center mb-4">
              Failed to Login
            </h2>

            {/* Error Message */}
            <p className="text-black font-inter text-xl font-normal leading-normal text-center mb-12">
              Wrong Email or Password! Try Again
            </p>

            {/* OK Button */}
            <button
              onClick={closeErrorModal}
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
