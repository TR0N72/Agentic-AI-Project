import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
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
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-pinterin-blue font-dm-sans text-4xl lg:text-6xl font-bold leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-pinterin-dark-blue font-dm-sans text-lg lg:text-xl font-normal leading-8">
              {description}
            </p>
          )}
          <div className="space-y-4">
            <p className="text-pinterin-muted font-dm-sans text-base">
              This page is currently under development.
            </p>
            <p className="text-pinterin-muted font-dm-sans text-sm">
              Continue prompting to help us fill in the content for this page!
            </p>
            <Link 
              to="/" 
              className="inline-block bg-pinterin-purple text-white px-6 py-3 rounded-full font-dm-sans text-base font-normal leading-6 hover:bg-pinterin-dark-blue transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-pinterin-purple text-white">
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
