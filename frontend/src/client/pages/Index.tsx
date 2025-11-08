import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-pinterin-cream">
      {/* Header */}
      <header className="w-full border-b border-pinterin-border bg-pinterin-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-24">
          <div className="flex h-[137px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-11 w-11 rounded-full bg-pinterin-purple flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-white"></div>
              </div>
              <span className="ml-2 text-xl font-bold text-pinterin-dark-blue font-dm-sans">
                Pinterin
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              <Link 
                to="/" 
                className="text-pinterin-dark-blue font-dm-sans text-base font-normal leading-6 underline"
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

      {/* Hero Section */}
      <section className="px-6 lg:px-24 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Hero Content */}
            <div className="flex-1 max-w-2xl">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-pinterin-blue font-dm-sans text-xl font-medium leading-6">
                    get your
                  </p>
                  <h1 className="text-pinterin-blue font-dm-sans text-4xl lg:text-6xl font-bold leading-tight lg:leading-[76px]">
                    BOOST YOUR SAT SCORES
                  </h1>
                </div>
                <p className="text-pinterin-dark-blue font-dm-sans text-lg lg:text-xl font-normal leading-8 max-w-xl">
                  We provides tailored learning materials, in-depth practice sessions, and mock exams for SAT and UTBK, all based on real questions from previous tests. Our platform supports your preparation journey with insightful analytics to help you achieve top scores.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="bg-pinterin-purple text-white px-5 py-3 rounded-full font-dm-sans text-base font-normal leading-6 border border-pinterin-purple hover:bg-transparent hover:text-pinterin-purple transition-colors">
                    Get Started
                  </button>
                  <button className="border border-pinterin-muted text-pinterin-muted px-5 py-3 rounded-full font-dm-sans text-base font-normal leading-6 hover:bg-pinterin-muted hover:text-white transition-colors">
                    Explore
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 w-full max-w-2xl">
              <div className="aspect-[854/603] bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 rounded-3xl relative overflow-hidden">
                {/* Study materials illustration */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Laptop */}
                    <div className="absolute top-8 left-8 w-40 h-28 bg-gray-100 rounded-lg border-2 border-gray-300 shadow-lg">
                      <div className="w-full h-20 bg-gray-800 rounded-t-md"></div>
                      <div className="h-8 bg-gray-200 rounded-b-md"></div>
                    </div>
                    
                    {/* Papers and documents */}
                    <div className="absolute top-12 right-12 w-32 h-40 bg-white rounded-lg shadow-lg transform rotate-12">
                      <div className="p-3 space-y-2">
                        <div className="h-2 bg-gray-300 rounded"></div>
                        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-300 rounded"></div>
                        <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                    
                    {/* Calculator */}
                    <div className="absolute bottom-16 left-12 w-20 h-24 bg-gray-900 rounded-lg shadow-lg">
                      <div className="p-2 space-y-1">
                        <div className="h-4 bg-green-400 rounded"></div>
                        <div className="grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="h-3 bg-gray-700 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Coffee mug */}
                    <div className="absolute top-20 right-24 w-12 h-12 bg-amber-800 rounded-full shadow-lg">
                      <div className="absolute top-2 left-2 w-8 h-8 bg-amber-900 rounded-full"></div>
                      <div className="absolute -right-2 top-3 w-4 h-6 border-2 border-amber-800 rounded-r-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-24 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-[33px] shadow-lg p-16 lg:p-20">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Feature Image */}
              <div className="flex-1">
                <div className="aspect-[487/333] bg-[#9CB0C9] rounded-[30px]"></div>
              </div>

              {/* Feature Content */}
              <div className="flex-1 max-w-2xl">
                <div className="space-y-4">
                  <p className="text-pinterin-muted font-dm-sans text-xl font-medium leading-6">
                    Label goes here
                  </p>
                  <h2 className="text-pinterin-dark-blue font-dm-sans text-4xl lg:text-6xl font-bold leading-tight lg:leading-[76px]">
                    Features
                  </h2>
                  <p className="text-pinterin-dark-blue font-dm-sans text-lg lg:text-xl font-normal leading-8">
                    Our platform delivers AI-powered adaptive learning designed specifically for exams like SAT and UTBK. We offer realistic mock exams, detailed performance analytics, an intuitive user interface, comprehensive reports for deeper insights, and customizable dashboards to personalize your preparation journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 lg:px-24 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Driven Learning Card */}
            <div className="bg-white rounded-[25px] shadow-lg p-12">
              <div className="space-y-6">
                <div className="w-[72px] h-[68px] bg-[#1814F3] rounded-[10px] flex items-center justify-center">
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M36.1771 1.91659C36.1771 1.4718 36.0004 1.04522 35.6859 0.730708C35.3714 0.416194 34.9448 0.239502 34.5 0.239502C34.0553 0.239502 33.6287 0.416194 33.3142 0.730708C32.9997 1.04522 32.823 1.4718 32.823 1.91659V4.32679C28.1846 4.52133 24.4375 8.18792 24.4375 12.9374C24.4375 14.1353 24.5171 15.5355 24.6053 16.72C24.7758 19.0152 26.4865 20.9395 28.8459 21.2222C30.3198 21.3995 32.2796 21.5624 34.5 21.5624C36.7195 21.5624 38.6793 21.3995 40.1542 21.2222C42.5127 20.9395 44.2233 19.0152 44.3939 16.72C44.482 15.5355 44.5625 14.1363 44.5625 12.9374C44.5625 8.18792 40.8145 4.52133 36.1771 4.32679V1.91659ZM32.3438 12.4583C32.3438 12.0135 32.1671 11.5869 31.8526 11.2724C31.5381 10.9579 31.1115 10.7812 30.6667 10.7812C30.2219 10.7812 29.7954 10.9579 29.4808 11.2724C29.1663 11.5869 28.9896 12.0135 28.9896 12.4583V13.4166C28.9896 13.8614 29.1663 14.2879 29.4808 14.6025C29.7954 14.917 30.2219 15.0937 30.6667 15.0937C31.1115 15.0937 31.5381 14.917 31.8526 14.6025C32.1671 14.2879 32.3438 13.8614 32.3438 13.4166V12.4583ZM40.0105 12.4583C40.0105 12.238 39.9671 12.0199 39.8828 11.8165C39.7985 11.613 39.675 11.4281 39.5193 11.2724C39.3635 11.1166 39.1786 10.9931 38.9752 10.9088C38.7717 10.8245 38.5536 10.7812 38.3334 10.7812C38.1131 10.7812 37.8951 10.8245 37.6916 10.9088C37.4881 10.9931 37.3032 11.1166 37.1475 11.2724C36.9918 11.4281 36.8682 11.613 36.784 11.8165C36.6997 12.0199 36.6563 12.238 36.6563 12.4583V13.4166C36.6563 13.6368 36.6997 13.8549 36.784 14.0584C36.8682 14.2618 36.9918 14.4467 37.1475 14.6025C37.3032 14.7582 37.4881 14.8817 37.6916 14.966C37.8951 15.0503 38.1131 15.0937 38.3334 15.0937C38.5536 15.0937 38.7717 15.0503 38.9752 14.966C39.1786 14.8817 39.3635 14.7582 39.5193 14.6025C39.675 14.4467 39.7985 14.2618 39.8828 14.0584C39.9671 13.8549 40.0105 13.6368 40.0105 13.4166V12.4583ZM11.3985 6.03263C14.467 6.27796 17.757 7.5535 20.9933 9.51233C21.2401 9.66174 21.4441 9.87227 21.5858 10.1236C21.7274 10.3749 21.8018 10.6585 21.8018 10.947C21.8018 11.2354 21.7274 11.519 21.5858 11.7703C21.4441 12.0216 21.2401 12.2322 20.9933 12.3816C18.3569 13.9782 15.6381 16.1478 13.018 18.7679C10.6855 21.1024 8.70842 23.5126 7.17605 25.8749C8.70842 28.2372 10.6845 30.6474 13.018 32.9819C15.3516 35.3164 17.7628 37.2915 20.125 38.8239C22.4873 37.2915 24.8975 35.3145 27.2311 32.9819C29.8521 30.3618 32.0228 27.643 33.6184 25.0067C33.7678 24.7599 33.9783 24.5558 34.2296 24.4142C34.4809 24.2726 34.7645 24.1982 35.053 24.1982C35.3415 24.1982 35.6251 24.2726 35.8764 24.4142C36.1277 24.5558 36.3382 24.7599 36.4876 25.0067C38.4465 28.243 39.722 31.5329 39.9664 34.6005C40.2155 37.7151 39.3971 40.638 37.1422 42.892C34.8872 45.147 31.9643 45.9664 28.8507 45.7172C26.0571 45.4939 23.0786 44.4167 20.125 42.7464C17.1705 44.4167 14.193 45.4939 11.3985 45.7172C8.2858 45.9664 5.36288 45.147 3.10792 42.892C0.852966 40.6371 0.0335907 37.7142 0.282757 34.6005C0.506049 31.807 1.58322 28.8295 3.25359 25.8749C1.58322 22.9213 0.506049 19.9428 0.282757 17.1493C0.0335907 14.0347 0.852966 11.1118 3.10792 8.85779C5.36288 6.60283 8.2858 5.78442 11.3985 6.03263ZM5.33509 22.6214C6.83776 20.5111 8.62888 18.4143 10.6462 16.396C12.6644 14.3788 14.7613 12.5876 16.8705 11.085C14.7996 10.0902 12.858 9.51329 11.132 9.37625C8.8033 9.19033 6.91155 9.79792 5.4798 11.2297C4.04709 12.6624 3.44047 14.5522 3.62638 16.8819C3.76342 18.6079 4.34034 20.5504 5.33509 22.6214ZM5.33509 29.1275C4.34034 31.1994 3.76342 33.141 3.62638 34.867C3.44047 37.1957 4.04709 39.0865 5.4798 40.5192C6.91251 41.9519 8.80234 42.5585 11.132 42.3726C12.857 42.2346 14.7996 41.6587 16.8705 40.6639C14.7613 39.1612 12.6635 37.3701 10.6462 35.3528C8.62888 33.3355 6.83776 31.2377 5.33509 29.1285M23.3786 40.6649C25.4505 41.6596 27.3921 42.2365 29.118 42.3736C31.4468 42.5595 33.3376 41.9519 34.7703 40.5202C36.203 39.0875 36.8096 37.1976 36.6237 34.8679C36.4857 33.1429 35.9098 31.2004 34.915 29.1294C33.4123 31.2387 31.6212 33.3365 29.603 35.3538C27.5857 37.3711 25.4888 39.1622 23.3786 40.6649ZM20.125 19.6458C18.473 19.6458 16.8886 20.302 15.7204 21.4702C14.5522 22.6384 13.8959 24.2228 13.8959 25.8749C13.8959 27.527 14.5522 29.1114 15.7204 30.2796C16.8886 31.4478 18.473 32.1041 20.125 32.1041C21.7771 32.1041 23.3615 31.4478 24.5297 30.2796C25.6979 29.1114 26.3542 27.527 26.3542 25.8749C26.3542 24.2228 25.6979 22.6384 24.5297 21.4702C23.3615 20.302 21.7771 19.6458 20.125 19.6458Z" fill="white"/>
                  </svg>
                </div>
                <h3 className="text-black font-poppins text-xl font-semibold">
                  AI-Driven Personalized Learning
                </h3>
                <p className="text-pinterin-dark-blue font-poppins text-base font-normal">
                  AI-powered learning that tailors SAT and UTBK questions to your skill level—target your weak spots and sharpen your strengths.
                </p>
              </div>
            </div>

            {/* Exam Practice Card */}
            <div className="bg-white rounded-[25px] shadow-lg p-12">
              <div className="space-y-6">
                <div className="w-[72px] h-[68px] bg-[#1814F3] rounded-[10px] flex items-center justify-center">
                  <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M43.3162 6.74672C42.6342 3.50864 39.7514 1.3751 36.4705 1.54047C33.3447 1.69768 28.4773 2.0611 21.6367 2.89206C14.7971 3.72199 9.98391 4.53458 6.91324 5.1287C3.68639 5.75447 1.40687 8.51991 1.53651 11.8274C1.64676 14.6367 1.93974 18.8579 2.65943 24.6603C2.96976 27.1593 3.28622 29.3551 3.59043 31.2651C3.64759 35.3168 3.8293 38.3977 4.01918 40.6067C4.32645 44.1664 7.14191 46.8093 10.6495 47.0451C13.7692 47.2544 18.6396 47.4688 25.52 47.4688C32.4004 47.4688 37.2718 47.2544 40.3915 47.0451C43.8991 46.8093 46.7145 44.1664 47.0208 40.6067C47.2515 37.9342 47.4689 33.9836 47.4689 28.5834C47.4689 23.1821 47.2515 19.2325 47.0218 16.559C46.9419 15.5651 46.6498 14.6 46.1652 13.7286C45.6805 12.8573 45.0147 12.1 44.2125 11.5079C43.9459 9.91494 43.6471 8.32756 43.3162 6.74672ZM25.521 13.7803C18.7243 13.7803 13.9447 13.9916 10.9231 14.1947C9.35712 14.3009 8.21582 15.4258 8.08822 16.9101C7.86772 19.4581 7.65539 23.2903 7.65539 28.5834C7.65539 33.8743 7.86772 37.7076 8.08822 40.2566C8.21582 41.7409 9.35712 42.8658 10.9231 42.971C13.9447 43.1741 18.7243 43.3855 25.521 43.3855C32.3167 43.3855 37.0962 43.1741 40.1179 42.971C41.6838 42.8658 42.8251 41.7409 42.9527 40.2556C43.1732 37.7076 43.3856 33.8754 43.3856 28.5834C43.3856 23.2914 43.1732 19.4581 42.9527 16.9101C42.8251 15.4258 41.6838 14.3009 40.1179 14.1947C37.0962 13.9916 32.3177 13.7803 25.521 13.7803ZM11.5856 17.6227C11.0441 17.6227 10.5248 17.8378 10.1419 18.2207C9.75903 18.6036 9.54393 19.1229 9.54393 19.6643C9.54393 20.2058 9.75903 20.7251 10.1419 21.108C10.5248 21.4909 11.0441 21.706 11.5856 21.706H19.5481C20.0896 21.706 20.6089 21.4909 20.9918 21.108C21.3747 20.7251 21.5898 20.2058 21.5898 19.6643C21.5898 19.1229 21.3747 18.6036 20.9918 18.2207C20.6089 17.8378 20.0896 17.6227 19.5481 17.6227H11.5856ZM9.54393 37.4993C9.54393 36.9578 9.75903 36.4385 10.1419 36.0557C10.5248 35.6728 11.0441 35.4577 11.5856 35.4577H39.4543C39.9958 35.4577 40.5151 35.6728 40.898 36.0557C41.2809 36.4385 41.496 36.9578 41.496 37.4993C41.496 38.0408 41.2809 38.5601 40.898 38.943C40.5151 39.3259 39.9958 39.541 39.4543 39.541H11.5856C11.0441 39.541 10.5248 39.3259 10.1419 38.943C9.75903 38.5601 9.54393 38.0408 9.54393 37.4993ZM11.5856 23.568C11.0441 23.568 10.5248 23.7831 10.1419 24.166C9.75903 24.5489 9.54393 25.0682 9.54393 25.6097C9.54393 26.1512 9.75903 26.6705 10.1419 27.0534C10.5248 27.4362 11.0441 27.6513 11.5856 27.6513H19.5481C20.0896 27.6513 20.6089 27.4362 20.9918 27.0534C21.3747 26.6705 21.5898 26.1512 21.5898 25.6097C21.5898 25.0682 21.3747 24.5489 20.9918 24.166C20.6089 23.7831 20.0896 23.568 19.5481 23.568H11.5856ZM9.54495 31.6459C9.54495 31.1044 9.76005 30.5851 10.1429 30.2022C10.5258 29.8193 11.0451 29.6042 11.5866 29.6042H19.5491C20.0906 29.6042 20.6099 29.8193 20.9928 30.2022C21.3757 30.5851 21.5908 31.1044 21.5908 31.6459C21.5908 32.1874 21.3757 32.7067 20.9928 33.0895C20.6099 33.4724 20.0906 33.6875 19.5491 33.6875H11.5866C11.0451 33.6875 10.5258 33.4724 10.1429 33.0895C9.76005 32.7067 9.54495 32.1874 9.54495 31.6459ZM28.7387 17.9545C29.7595 17.9034 31.06 17.8646 32.6668 17.8646C34.2736 17.8646 35.5742 17.9034 36.595 17.9545C38.5989 18.0555 40.1322 19.5888 40.2332 21.5927C40.2843 22.6135 40.3231 23.9141 40.3231 25.5209C40.3231 27.1277 40.2843 28.4282 40.2332 29.449C40.1322 31.4529 38.5989 32.9862 36.595 33.0873C35.5742 33.1383 34.2736 33.1771 32.6668 33.1771C31.06 33.1771 29.7595 33.1383 28.7387 33.0873C26.7348 32.9862 25.2015 31.4529 25.1004 29.449C25.0494 28.4282 25.0106 27.1277 25.0106 25.5209C25.0106 23.9141 25.0494 22.6135 25.1004 21.5927C25.2015 19.5888 26.7348 18.0555 28.7387 17.9545Z" fill="white"/>
                  </svg>
                </div>
                <h3 className="text-black font-poppins text-xl font-semibold">
                  Exam-Like Practice Sessions
                </h3>
                <p className="text-pinterin-dark-blue font-poppins text-base font-normal">
                  Experience the real SAT and UTBK with full-length mock exams designed to reflect the exact format and pressure of the actual test day.
                </p>
              </div>
            </div>

            {/* Analytics Card */}
            <div className="bg-white rounded-[25px] shadow-lg p-12 md:col-span-2 lg:col-span-1">
              <div className="space-y-6">
                <div className="w-[72px] h-[68px] bg-[#1814F3] rounded-[10px] flex items-center justify-center">
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3333 26C16.7194 26 16.2052 26.208 15.7907 26.624C15.3761 27.04 15.1681 27.5542 15.1667 28.1667V34.6667C15.1667 35.2806 15.3747 35.7955 15.7907 36.2115C16.2067 36.6275 16.7209 36.8348 17.3333 36.8333C17.9458 36.8319 18.4607 36.6239 18.8782 36.2093C19.2956 35.7948 19.5029 35.2806 19.5 34.6667V28.1667C19.5 27.5528 19.292 27.0386 18.876 26.624C18.46 26.2094 17.9458 26.0014 17.3333 26ZM34.6667 15.1667C34.0528 15.1667 33.5386 15.3747 33.124 15.7907C32.7094 16.2067 32.5014 16.7209 32.5 17.3333V34.6667C32.5 35.2806 32.708 35.7955 33.124 36.2115C33.54 36.6275 34.0542 36.8348 34.6667 36.8333C35.2791 36.8319 35.7941 36.6239 36.2115 36.2093C36.6289 35.7948 36.8362 35.2806 36.8333 34.6667V17.3333C36.8333 16.7194 36.6253 16.2052 36.2093 15.7907C35.7933 15.3761 35.2791 15.1681 34.6667 15.1667ZM26 30.3333C25.3861 30.3333 24.8719 30.5413 24.4573 30.9573C24.0428 31.3733 23.8348 31.8876 23.8333 32.5V34.6667C23.8333 35.2806 24.0413 35.7955 24.4573 36.2115C24.8733 36.6275 25.3876 36.8348 26 36.8333C26.6124 36.8319 27.1274 36.6239 27.5448 36.2093C27.9623 35.7948 28.1696 35.2806 28.1667 34.6667V32.5C28.1667 31.8861 27.9587 31.3719 27.5427 30.9573C27.1267 30.5428 26.6124 30.3348 26 30.3333ZM10.8333 45.5C9.64167 45.5 8.62189 45.0761 7.774 44.2282C6.92611 43.3803 6.50144 42.3598 6.5 41.1667V10.8333C6.5 9.64167 6.92467 8.62189 7.774 7.774C8.62333 6.92611 9.64311 6.50144 10.8333 6.5H41.1667C42.3583 6.5 43.3788 6.92467 44.2282 7.774C45.0775 8.62333 45.5014 9.64311 45.5 10.8333V41.1667C45.5 42.3583 45.0761 43.3788 44.2282 44.2282C43.3803 45.0775 42.3598 45.5014 41.1667 45.5H10.8333ZM26 26C26.6139 26 27.1288 25.792 27.5448 25.376C27.9608 24.96 28.1681 24.4458 28.1667 23.8333C28.1652 23.2209 27.9572 22.7067 27.5427 22.2907C27.1281 21.8747 26.6139 21.6667 26 21.6667C25.3861 21.6667 24.8719 21.8747 24.4573 22.2907C24.0428 22.7067 23.8348 23.2209 23.8333 23.8333C23.8319 24.4458 24.0399 24.9607 24.4573 25.3782C24.8748 25.7956 25.389 26.0029 26 26Z" fill="white"/>
                  </svg>
                </div>
                <h3 className="text-black font-poppins text-xl font-semibold">
                  Analysis and Statistic Report
                </h3>
                <p className="text-pinterin-dark-blue font-poppins text-base font-normal">
                  Enjoy an intuitive interface that makes it easy to navigate and track your SAT and UTBK progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-24 py-20">
        <div className="mx-auto max-w-7xl text-center space-y-8">
          <h2 className="text-pinterin-dark-blue font-dm-sans text-4xl lg:text-7xl font-bold leading-tight">
            ready to take your next step?
          </h2>
          <button className="bg-pinterin-dark-blue text-white px-12 py-6 rounded-full font-roboto text-2xl lg:text-4xl font-normal leading-11 border border-white hover:bg-transparent hover:text-pinterin-dark-blue hover:border-pinterin-dark-blue transition-colors">
            Ready
          </button>
        </div>
      </section>

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
