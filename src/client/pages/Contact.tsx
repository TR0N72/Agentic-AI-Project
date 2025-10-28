import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-pinterin-cream">
      {/* Header */}
      <header className="w-full border-b border-pinterin-border bg-pinterin-cream">
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
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 underline"
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
      <main className="px-6 lg:px-24 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-20">
            <h1 className="text-pinterin-dark-blue font-dm-sans text-4xl lg:text-6xl font-bold leading-tight lg:leading-[76px] mb-6">
              Greetings!
            </h1>
            <p className="text-pinterin-blue font-dm-sans text-lg lg:text-xl font-normal leading-8 max-w-2xl mx-auto">
              Thank you for using our service, we wish you good luck on your up coming exam, if you have any question please let us know!
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[35px] shadow-lg p-16 lg:p-20">
              <div className="mb-12">
                <h2 className="text-pinterin-dark-blue font-roboto text-2xl lg:text-4xl font-medium leading-11 mb-4">
                  Questions? Don't hesitate to contact us!
                </h2>
                <p className="text-pinterin-blue font-dm-sans text-lg lg:text-xl font-normal leading-8">
                  We'll get back to you as soon as possible through email or a call.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name Field */}
                <div>
                  <label className="block text-black font-poppins text-xl font-normal mb-4">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-poppins text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-black font-poppins text-xl font-normal mb-4">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-poppins text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-black font-poppins text-xl font-normal mb-4">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full h-[61px] px-6 border-2 border-[#DEE2E6] rounded-[10px] font-poppins text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-black font-poppins text-xl font-normal mb-4">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                    rows={8}
                    className="w-full h-[200px] px-6 py-4 border-2 border-[#DEE2E6] rounded-[10px] font-poppins text-lg text-[#595C5F] placeholder:text-[#595C5F] focus:outline-none focus:border-pinterin-purple transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-8">
                  <button
                    type="submit"
                    className="bg-pinterin-dark-blue text-white px-12 py-4 rounded-full font-roboto text-2xl font-normal leading-8 hover:bg-pinterin-purple transition-colors border border-[#0D1E2F]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-pinterin-purple text-white mt-20">
        <div className="px-6 lg:px-24 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-white font-inter text-5xl font-bold leading-tight">
                  Pinterin
                </h3>
                <p className="text-white font-roboto text-2xl font-medium leading-8">
                  Where Smart Meets Strategic
                </p>
              </div>

              {/* Footer Links */}
              <div className="flex flex-col space-y-4 text-right">
                <Link to="/support" className="text-white font-inter text-2xl font-bold leading-tight hover:underline">
                  Support & Help
                </Link>
                <Link to="/terms" className="text-white font-inter text-2xl font-bold leading-tight hover:underline">
                  Terms & Privacy
                </Link>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/20 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-white font-inter text-2xl font-bold">
                © 2025 Pinterin
              </p>
              <div className="flex space-x-8">
                <Link to="/support" className="text-white font-inter text-2xl font-bold hover:underline">
                  Support & Help
                </Link>
                <Link to="/terms" className="text-white font-inter text-2xl font-bold hover:underline">
                  Terms & Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
