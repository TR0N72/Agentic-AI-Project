import { Link } from "react-router-dom";

export default function PracticeWithAI() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
      <div className="w-[413px] bg-white shadow-lg flex-shrink-0">
        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center mb-8 mt-16">
            <div className="h-11 w-11 rounded-full bg-pinterin-purple flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-white"></div>
            </div>
            <span className="ml-3 text-xl font-bold text-pinterin-dark-blue font-dm-sans">
              Pinterin
            </span>
          </div>

          {/* Pages Navigation */}
          <div className="mb-8">
            <h3 className="text-[#595C5F] font-inter text-xl font-light mb-6">
              Pages
            </h3>
            
            <Link to="/dashboard" className="flex items-center p-3 mb-4">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  d="M12.8333 7C12.5028 7 12.2259 6.888 12.0027 6.664C11.7794 6.44 11.6674 6.16311 11.6667 5.83333V1.16667C11.6667 0.836111 11.7787 0.559222 12.0027 0.336C12.2267 0.112778 12.5036 0.000777778 12.8333 0H19.8333C20.1639 0 20.4412 0.112 20.6652 0.336C20.8892 0.56 21.0008 0.836889 21 1.16667V5.83333C21 6.16389 20.888 6.44117 20.664 6.66517C20.44 6.88917 20.1631 7.00078 19.8333 7H12.8333ZM1.16667 11.6667C0.836111 11.6667 0.559222 11.5547 0.336 11.3307C0.112778 11.1067 0.000777778 10.8298 0 10.5V1.16667C0 0.836111 0.112 0.559222 0.336 0.336C0.56 0.112778 0.836889 0.000777778 1.16667 0H8.16667C8.49722 0 8.7745 0.112 8.9985 0.336C9.2225 0.56 9.33411 0.836889 9.33333 1.16667V10.5C9.33333 10.8306 9.22133 11.1078 8.99733 11.3318C8.77333 11.5558 8.49644 11.6674 8.16667 11.6667H1.16667ZM12.8333 21C12.5028 21 12.2259 20.888 12.0027 20.664C11.7794 20.44 11.6674 20.1631 11.6667 19.8333V10.5C11.6667 10.1694 11.7787 9.89255 12.0027 9.66933C12.2267 9.44611 12.5036 9.33411 12.8333 9.33333H19.8333C20.1639 9.33333 20.4412 9.44533 20.6652 9.66933C20.8892 9.89333 21.0008 10.1702 21 10.5V19.8333C21 20.1639 20.888 20.4412 20.664 20.6652C20.44 20.8892 20.1631 21.0008 19.8333 21H12.8333ZM1.16667 21C0.836111 21 0.559222 20.888 0.336 20.664C0.112778 20.44 0.000777778 20.1631 0 19.8333V15.1667C0 14.8361 0.112 14.5592 0.336 14.336C0.56 14.1128 0.836889 14.0008 1.16667 14H8.16667C8.49722 14 8.7745 14.112 8.9985 14.336C9.2225 14.56 9.33411 14.8369 9.33333 15.1667V19.8333C9.33333 20.1639 9.22133 20.4412 8.99733 20.6652C8.77333 20.8892 8.49644 21.0008 8.16667 21H1.16667Z"
                  fill="#7F8183"
                />
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">
                Dashboard
              </span>
            </Link>

            <Link to="/practice-with-ai" className="bg-[#F4F4F5] rounded-[10px] p-3 mb-4 flex items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  d="M20.713 8.1281L20.467 8.6941C20.4286 8.78627 20.3637 8.865 20.2806 8.92038C20.1975 8.97575 20.0999 9.00531 20 9.00531C19.9001 9.00531 19.8025 8.97575 19.7194 8.92038C19.6363 8.865 19.5714 8.78627 19.533 8.6941L19.287 8.1281C18.8545 7.12683 18.0624 6.32402 17.067 5.8781L16.308 5.5391C16.2159 5.49675 16.1379 5.42887 16.0832 5.34353C16.0286 5.25819 15.9995 5.15896 15.9995 5.0576C15.9995 4.95625 16.0286 4.85702 16.0832 4.77168C16.1379 4.68633 16.2159 4.61846 16.308 4.5761L17.025 4.2571C18.0454 3.79848 18.8511 2.96599 19.276 1.9311L19.529 1.3201C19.5662 1.22546 19.631 1.1442 19.715 1.08693C19.799 1.02966 19.8983 0.999023 20 0.999023C20.1017 0.999023 20.201 1.02966 20.285 1.08693C20.369 1.1442 20.4338 1.22546 20.471 1.3201L20.724 1.9301C21.1485 2.96518 21.9538 3.79804 22.974 4.2571L23.692 4.5771C23.7838 4.61958 23.8615 4.68745 23.916 4.77268C23.9705 4.85791 23.9994 4.95695 23.9994 5.0581C23.9994 5.15926 23.9705 5.2583 23.916 5.34353C23.8615 5.42876 23.7838 5.49662 23.692 5.5391L22.932 5.8771C21.9368 6.32347 21.1451 7.12663 20.713 8.1281ZM20 11.0001C20.6787 11.0006 21.3526 10.886 21.993 10.6611C21.9977 10.7744 22 10.8874 22 11.0001C22 13.1218 21.1571 15.1567 19.6569 16.657C18.1566 18.1573 16.1217 19.0001 14 19.0001V22.5001C9 20.5001 2 17.5001 2 11.0001C2 8.87837 2.84285 6.84354 4.34315 5.34325C5.84344 3.84296 7.87827 3.0001 10 3.0001H14C14.1133 3.0001 14.2263 3.00244 14.339 3.0071C14.0203 3.91203 13.9233 4.88018 14.056 5.83035C14.1888 6.78052 14.5475 7.685 15.102 8.46792C15.6565 9.25084 16.3906 9.88938 17.2429 10.33C18.0951 10.7706 19.0406 11.0004 20 11.0001Z"
                  fill="#381FD1"
                />
              </svg>
              <span className="text-pinterin-purple font-inter text-xl font-medium">
                Practice with AI
              </span>
            </Link>

            <Link to="/exam" className="flex items-center p-3 mb-4">
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  d="M15.75 2.25H6.75C6.15326 2.25 5.58097 2.48705 5.15901 2.90901C4.73705 3.33097 4.5 3.90326 4.5 4.5V22.5C4.5 23.0967 4.73705 23.669 5.15901 24.091C5.58097 24.5129 6.15326 24.75 6.75 24.75H20.25C20.8467 24.75 21.419 24.5129 21.841 24.091C22.2629 23.669 22.5 23.0967 22.5 22.5V9L15.75 2.25ZM20.25 22.5H6.75V4.5H14.625V10.125H20.25V22.5Z"
                  fill="#7F8183"
                />
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">
                Exam
              </span>
            </Link>

            <Link to="/my-profile" className="flex items-center p-3 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 4C10.6008 3.99974 9.22593 4.36649 8.01273 5.06363C6.79952 5.76077 5.79038 6.76392 5.08603 7.97295C4.38168 9.18199 4.00675 10.5546 3.99868 11.9538C3.9906 13.3531 4.34966 14.7299 5.04001 15.947C5.50662 15.3406 6.10644 14.8496 6.7931 14.512C7.47975 14.1744 8.23485 13.9992 9.00001 14H15C15.7652 13.9992 16.5203 14.1744 17.2069 14.512C17.8936 14.8496 18.4934 15.3406 18.96 15.947C19.6504 14.7299 20.0094 13.3531 20.0013 11.9538C19.9933 10.5546 19.6183 9.18199 18.914 7.97295C18.2096 6.76392 17.2005 5.76077 15.9873 5.06363C14.7741 4.36649 13.3993 3.99974 12 4ZM19.943 18.076C20.0683 17.9127 20.1883 17.7453 20.303 17.574C21.4116 15.9267 22.0026 13.9856 22 12C22 6.477 17.523 2 12 2C6.47701 2 2.00001 6.477 2.00001 12C1.99686 14.1968 2.72005 16.3329 4.05701 18.076L4.05201 18.094L4.40701 18.507C5.3449 19.6035 6.50939 20.4836 7.82024 21.0866C9.13109 21.6897 10.5571 22.0013 12 22C12.216 22 12.4307 21.9933 12.644 21.98C14.4484 21.8662 16.1877 21.2629 17.675 20.235C18.3863 19.7443 19.031 19.1635 19.593 18.507L19.948 18.094L19.943 18.076ZM12 6C11.2044 6 10.4413 6.31607 9.87869 6.87868C9.31608 7.44129 9.00001 8.20435 9.00001 9C9.00001 9.79565 9.31608 10.5587 9.87869 11.1213C10.4413 11.6839 11.2044 12 12 12C12.7957 12 13.5587 11.6839 14.1213 11.1213C14.6839 10.5587 15 9.79565 15 9C15 8.20435 14.6839 7.44129 14.1213 6.87868C13.5587 6.31607 12.7957 6 12 6Z"
                  fill="#7F8183"
                />
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">
                My profile
              </span>
            </Link>

            <Link to="/reports" className="flex items-center p-3 mb-8">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  d="M14.6667 10.7983L18.5534 4.07917L20.1392 4.99583L15.345 13.2917L9.37754 9.85417L5.00504 17.4167H20.1667V19.25H1.83337V2.75H3.66671V16.0783L8.70837 7.33333L14.6667 10.7983Z"
                  fill="#7F8183"
                />
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">
                Reports
              </span>
            </Link>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-[#C5C5C5] mb-8"></div>

          {/* Others */}
          <div>
            <h3 className="text-[#595C5F] font-inter text-xl font-light mb-6">
              Others
            </h3>
            <Link to="/profile-settings" className="flex items-center p-3">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  d="M21.5583 13.7148C21.3846 13.5171 21.2888 13.263 21.2888 12.9998C21.2888 12.7367 21.3846 12.4825 21.5583 12.2848L22.945 10.7248C23.0978 10.5544 23.1927 10.3399 23.216 10.1122C23.2394 9.88452 23.19 9.65526 23.075 9.45735L20.9083 5.70901C20.7944 5.51133 20.6211 5.35463 20.4129 5.26126C20.2048 5.16788 19.9725 5.1426 19.7491 5.18901L17.7125 5.60068C17.4533 5.65423 17.1835 5.61107 16.954 5.47935C16.7245 5.34762 16.5511 5.13645 16.4666 4.88568L15.8058 2.90318C15.7331 2.68801 15.5947 2.50112 15.41 2.36892C15.2253 2.23673 15.0037 2.16593 14.7766 2.16651H10.4433C10.2071 2.15418 9.97328 2.21952 9.77766 2.35254C9.58205 2.48556 9.43535 2.67895 9.35997 2.90318L8.7533 4.88568C8.6688 5.13645 8.49544 5.34762 8.26592 5.47935C8.03641 5.61107 7.76662 5.65423 7.50747 5.60068L5.41664 5.18901C5.2049 5.15909 4.98904 5.1925 4.79626 5.28504C4.60348 5.37757 4.4424 5.52509 4.3333 5.70901L2.16664 9.45735C2.04873 9.65305 1.99571 9.88102 2.01517 10.1087C2.03462 10.3363 2.12556 10.552 2.27497 10.7248L3.6508 12.2848C3.82448 12.4825 3.92026 12.7367 3.92026 12.9998C3.92026 13.263 3.82448 13.5171 3.6508 13.7148L2.27497 15.2748C2.12556 15.4477 2.03462 15.6634 2.01517 15.891C1.99571 16.1187 2.04873 16.3466 2.16664 16.5423L4.3333 20.2907C4.44716 20.4884 4.62051 20.6451 4.82866 20.7384C5.0368 20.8318 5.26911 20.8571 5.49247 20.8107L7.52914 20.399C7.78829 20.3455 8.05808 20.3886 8.28759 20.5203C8.51711 20.6521 8.69047 20.8632 8.77497 21.114L9.4358 23.0965C9.51118 23.3207 9.65788 23.5141 9.8535 23.6472C10.0491 23.7802 10.2829 23.8455 10.5191 23.8332H14.8525C15.0796 23.8338 15.3011 23.763 15.4858 23.6308C15.6705 23.4986 15.809 23.3117 15.8816 23.0965L16.5425 21.114C16.627 20.8632 16.8003 20.6521 17.0298 20.5203C17.2594 20.3886 17.5292 20.3455 17.7883 20.399L19.825 20.8107C20.0483 20.8571 20.2806 20.8318 20.4888 20.7384C20.6969 20.6451 20.8703 20.4884 20.9841 20.2907L23.1508 16.5423C23.2658 16.3444 23.3152 16.1152 23.2918 15.8875C23.2685 15.6598 23.1736 15.4453 23.0208 15.2748L21.5583 13.7148Z"
                  fill="#7F8183"
                />
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">
                Profile Settings
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white border-b border-pinterin-border px-8 py-6 -m-8 mb-8">
          <div className="h-11 w-11 rounded-full bg-pinterin-purple flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-white"></div>
          </div>
          <span className="ml-3 text-xl font-bold text-pinterin-dark-blue font-dm-sans absolute left-24">
            Pinterin
          </span>
          
          <div className="flex items-center gap-12">
            <div className="flex items-center">
              <svg
                width="29"
                height="41"
                viewBox="0 0 29 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  d="M9.63292 0.375711C7.0789 -0.994817 2.04531 1.65337 0.599314 3.98474C-0.0448777 5.02798 0.000700393 5.77979 0.000700393 6.20632V29.0254L18.8769 41L22.4265 39.024V16.8011L3.04568 5.4566C4.0857 4.12216 6.42473 2.49493 8.17858 3.14847L25.4414 12.5613L25.4414 37.3178L29 35.3383V10.5824L9.63292 0.375711Z"
                  fill="black"
                />
              </svg>
              <span className="text-black font-poppins text-2xl font-semibold mr-4">
                User
              </span>
              <div className="w-16 h-16 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                <span className="text-black font-poppins text-2xl font-bold">
                  U
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Session Content */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-pinterin-dark-blue font-inter text-2xl font-bold mb-4">
            Practice Session
          </h1>
          <p className="text-pinterin-dark-blue font-roboto text-base font-medium mb-12">
            Choose your Difficulty Level
          </p>

          {/* Difficulty Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Easy Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-pinterin-dark-blue font-roboto text-xl font-medium mb-8">
                Easy
              </h3>
              <div className="flex justify-center mb-12">
                <svg
                  width="86"
                  height="86"
                  viewBox="0 0 87 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <g clipPath="url(#clip0_8456_79)">
                    <g filter="url(#filter0_d_8456_79)">
                      <path
                        d="M16.2017 0C11.925 0 7.82359 1.69888 4.79956 4.7229C1.77554 7.74693 0.0766602 11.8484 0.0766602 16.125L0.0766602 69.875C0.0766602 74.1516 1.77554 78.2531 4.79956 81.2771C7.82359 84.3011 11.925 86 16.2017 86H69.9517C74.2283 86 78.3297 84.3011 81.3538 81.2771C84.3778 78.2531 86.0767 74.1516 86.0767 69.875V16.125C86.0767 11.8484 84.3778 7.74693 81.3538 4.7229C78.3297 1.69888 74.2283 0 69.9517 0L16.2017 0ZM43.0767 51.0625C40.9384 51.0625 38.8876 50.2131 37.3756 48.701C35.8636 47.189 35.0142 45.1383 35.0142 43C35.0142 40.8617 35.8636 38.811 37.3756 37.299C38.8876 35.7869 40.9384 34.9375 43.0767 34.9375C45.215 34.9375 47.2657 35.7869 48.7777 37.299C50.2897 38.811 51.1392 40.8617 51.1392 43C51.1392 45.1383 50.2897 47.189 48.7777 48.701C47.2657 50.2131 45.215 51.0625 43.0767 51.0625Z"
                        fill="#1814F3"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_8456_79"
                      x="-7.92334"
                      y="-8"
                      width="102"
                      height="102"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_8456_79"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_8456_79"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_8456_79">
                      <rect
                        width="86"
                        height="86"
                        fill="white"
                        transform="translate(0.0766602)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <button className="bg-pinterin-dark-blue text-white px-8 py-4 rounded-full font-roboto text-2xl">
                Begin
              </button>
            </div>

            {/* Intermediate Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-pinterin-dark-blue font-roboto text-xl font-medium mb-8">
                Intermediate
              </h3>
              <div className="flex justify-center mb-12">
                <svg
                  width="89"
                  height="89"
                  viewBox="0 0 89 89"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <g clipPath="url(#clip0_8415_2780)">
                    <rect width="89" height="89" fill="white" />
                    <g filter="url(#filter0_d_8415_2780)">
                      <path
                        d="M16.6875 0C12.2617 0 8.01717 1.75814 4.88766 4.88766C1.75814 8.01717 0 12.2617 0 16.6875L0 72.3125C0 76.7383 1.75814 80.9828 4.88766 84.1123C8.01717 87.2419 12.2617 89 16.6875 89H72.3125C76.7383 89 80.9828 87.2419 84.1123 84.1123C87.2419 80.9828 89 76.7383 89 72.3125V16.6875C89 12.2617 87.2419 8.01717 84.1123 4.88766C80.9828 1.75814 76.7383 0 72.3125 0L16.6875 0ZM30.5938 22.25C30.5938 24.4629 29.7147 26.5852 28.1499 28.1499C26.5852 29.7147 24.4629 30.5938 22.25 30.5938C20.0371 30.5938 17.9148 29.7147 16.3501 28.1499C14.7853 26.5852 13.9062 24.4629 13.9062 22.25C13.9062 20.0371 14.7853 17.9148 16.3501 16.3501C17.9148 14.7853 20.0371 13.9062 22.25 13.9062C24.4629 13.9062 26.5852 14.7853 28.1499 16.3501C29.7147 17.9148 30.5938 20.0371 30.5938 22.25ZM75.0938 66.75C75.0938 68.9629 74.2147 71.0852 72.6499 72.6499C71.0852 74.2147 68.9629 75.0938 66.75 75.0938C64.5371 75.0938 62.4148 74.2147 60.8501 72.6499C59.2853 71.0852 58.4062 68.9629 58.4062 66.75C58.4062 64.5371 59.2853 62.4148 60.8501 60.8501C62.4148 59.2853 64.5371 58.4062 66.75 58.4062C68.9629 58.4062 71.0852 59.2853 72.6499 60.8501C74.2147 62.4148 75.0938 64.5371 75.0938 66.75ZM44.5 52.8438C42.2871 52.8438 40.1648 51.9647 38.6001 50.3999C37.0353 48.8352 36.1562 46.7129 36.1562 44.5C36.1562 42.2871 37.0353 40.1648 38.6001 38.6001C40.1648 37.0353 42.2871 36.1562 44.5 36.1562C46.7129 36.1562 48.8352 37.0353 50.3999 38.6001C51.9647 40.1648 52.8438 42.2871 52.8438 44.5C52.8438 46.7129 51.9647 48.8352 50.3999 50.3999C48.8352 51.9647 46.7129 52.8438 44.5 52.8438Z"
                        fill="#FC7900"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_8415_2780"
                      x="-8"
                      y="-8"
                      width="105"
                      height="105"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_8415_2780"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_8415_2780"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_8415_2780">
                      <rect width="89" height="89" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <button className="bg-pinterin-dark-blue text-white px-8 py-4 rounded-full font-roboto text-2xl">
                Begin
              </button>
            </div>

            {/* Difficult Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-pinterin-dark-blue font-roboto text-xl font-medium mb-8">
                Difficult
              </h3>
              <div className="flex justify-center mb-12">
                <svg
                  width="94"
                  height="94"
                  viewBox="0 0 95 94"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <g clipPath="url(#clip0_8415_2784)">
                    <g filter="url(#filter0_d_8415_2784)">
                      <path
                        d="M17.9958 0C13.3214 0 8.83842 1.85691 5.53309 5.16224C2.22776 8.46757 0.37085 12.9506 0.37085 17.625L0.37085 76.375C0.37085 81.0494 2.22776 85.5324 5.53309 88.8378C8.83842 92.1431 13.3214 94 17.9958 94H76.7458C81.4203 94 85.9033 92.1431 89.2086 88.8378C92.5139 85.5324 94.3708 81.0494 94.3708 76.375V17.625C94.3708 12.9506 92.5139 8.46757 89.2086 5.16224C85.9033 1.85691 81.4203 0 76.7458 0L17.9958 0ZM32.6833 23.5C32.6833 25.8372 31.7549 28.0787 30.1022 29.7314C28.4496 31.384 26.2081 32.3125 23.8708 32.3125C21.5336 32.3125 19.2921 31.384 17.6395 29.7314C15.9868 28.0787 15.0583 25.8372 15.0583 23.5C15.0583 21.1628 15.9868 18.9213 17.6395 17.2686C19.2921 15.616 21.5336 14.6875 23.8708 14.6875C26.2081 14.6875 28.4496 15.616 30.1022 17.2686C31.7549 18.9213 32.6833 21.1628 32.6833 23.5ZM79.6833 23.5C79.6833 25.8372 78.7549 28.0787 77.1022 29.7314C75.4496 31.384 73.2081 32.3125 70.8708 32.3125C68.5336 32.3125 66.2921 31.384 64.6395 29.7314C62.9868 28.0787 62.0583 25.8372 62.0583 23.5C62.0583 21.1628 62.9868 18.9213 64.6395 17.2686C66.2921 15.616 68.5336 14.6875 70.8708 14.6875C73.2081 14.6875 75.4496 15.616 77.1022 17.2686C78.7549 18.9213 79.6833 21.1628 79.6833 23.5ZM70.8708 79.3125C68.5336 79.3125 66.2921 78.384 64.6395 76.7314C62.9868 75.0787 62.0583 72.8372 62.0583 70.5C62.0583 68.1628 62.9868 65.9213 64.6395 64.2686C66.2921 62.616 68.5336 61.6875 70.8708 61.6875C73.2081 61.6875 75.4496 62.616 77.1022 64.2686C78.7549 65.9213 79.6833 68.1628 79.6833 70.5C79.6833 72.8372 78.7549 75.0787 77.1022 76.7314C75.4496 78.384 73.2081 79.3125 70.8708 79.3125ZM32.6833 70.5C32.6833 72.8372 31.7549 75.0787 30.1022 76.7314C28.4496 78.384 26.2081 79.3125 23.8708 79.3125C21.5336 79.3125 19.2921 78.384 17.6395 76.7314C15.9868 75.0787 15.0583 72.8372 15.0583 70.5C15.0583 68.1628 15.9868 65.9213 17.6395 64.2686C19.2921 62.616 21.5336 61.6875 23.8708 61.6875C26.2081 61.6875 28.4496 62.616 30.1022 64.2686C31.7549 65.9213 32.6833 68.1628 32.6833 70.5ZM47.3708 55.8125C4... [truncated]
                        fill="#FA00FF"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_8415_2784"
                      x="-7.62915"
                      y="-8"
                      width="110"
                      height="110"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_8415_2784"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_8415_2784"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_8415_2784">
                      <rect
                        width="94"
                        height="94"
                        fill="white"
                        transform="translate(0.37085)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <button className="bg-pinterin-dark-blue text-white px-8 py-4 rounded-full font-roboto text-2xl">
                Begin
              </button>
            </div>
          </div>

          {/* Personalized Study Roadmap Section */}
          <div className="bg-pinterin-dark-blue rounded-xl shadow-lg p-8 relative overflow-hidden mb-[200px]">
            {/* Robot Character */}
            <div className="absolute right-8 top-0 bottom-0 flex items-center">
              <svg
                width="782"
                height="214"
                viewBox="0 0 782 229"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-80 h-auto"
              >
                <mask
                  id="mask0_8467_882"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="9"
                  width="782"
                  height="214"
                >
                  <rect y="9" width="782" height="214" rx="12" fill="#10284B" />
                </mask>
                <g mask="url(#mask0_8467_882)">
                  <circle cx="589" cy="109" r="109" fill="#EDA10D" />
                  <g filter="url(#filter0_d_8467_882)">
                    <circle cx="590" cy="105" r="86" fill="#FFBB38" />
                  </g>
                  <circle cx="658" cy="52" r="6" fill="#10284B" />
                  <path
                    d="M658 54V67L636 78V100"
                    stroke="#10284B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="6"
                    cy="6"
                    r="6"
                    transform="matrix(-1 0 0 1 525 49)"
                    fill="#10284B"
                  />
                  <path
                    d="M519 57V70L541 81V103"
                    stroke="#10284B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M625.437 164.897C641.451 164.897 654.628 177.041 656.264 192.623C656.372 192.783 656.437 192.976 656.437 193.184V227.879C656.436 228.432 655.989 228.879 655.437 228.879H526C525.448 228.879 525 228.432 525 227.879V193.184C525 192.976 525.063 192.783 525.172 192.623C526.808 177.041 539.985 164.897 556 164.897H625.437Z"
                    fill="white"
                  />
                  <rect
                    x="570.759"
                    y="138.551"
                    width="36.0233"
                    height="47.8121"
                    rx="14"
                    fill="#D6E5FF"
                  />
                  <rect
                    x="570.759"
                    y="137.576"
                    width="36.0233"
                    height="42.9333"
                    rx="14"
                    fill="#10284B"
                  />
                  <path
                    d="M588.284 40C623.235 40 651.568 63.5903 651.568 92.6904C651.568 94.3417 651.475 95.9754 651.297 97.5879C651.474 99.2303 651.568 100.898 651.568 102.588V110.115C651.568 135.52 630.973 156.115 605.568 156.115H571C545.595 156.115 525 135.52 525 110.115V102.588C525 100.898 525.093 99.2302 525.271 97.5879C525.092 95.9755 525 94.3416 525 92.6904C525 63.5903 553.333 40 588.284 40Z"
                    fill="white"
                  />
                  <rect
                    x="549.34"
                    y="80.0063"
                    width="79.8354"
                    height="35.1272"
                    rx="8"
                    fill="#D6E5FF"
                  />
                  <path
                    d="M571.733 129.77C571.733 129.77 578.122 138.551 588.771 138.551C599.42 138.551 605.809 129.77 605.809 129.77"
                    stroke="#10284B"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <ellipse
                    cx="566.378"
                    cy="100.985"
                    rx="7.30202"
                    ry="10.2454"
                    fill="#10284B"
                  />
                  <ellipse
                    cx="611.164"
                    cy="100.985"
                    rx="7.30202"
                    ry="10.2454"
                    fill="#10284B"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_8467_882"
                    x="500"
                    y="19"
                    width="180"
                    height="180"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.884615 0 0 0 0 0.643245 0 0 0 0 0.175222 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_8467_882"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_8467_882"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Text Content */}
            <div className="relative z-10 max-w-md">
              <h2 className="text-white font-roboto text-2xl font-normal leading-10 mb-8">
                Let's make your{" "}
                <span className="font-bold">Personalized</span> Study Roadmap!
              </h2>
              <Link to="/chat" className="bg-white text-pinterin-dark-blue px-6 py-2 rounded-full font-roboto text-base">
                Let's Start
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <div className="fixed bottom-8 right-8">
          <div className="w-24 h-24 bg-pinterin-purple rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <svg
              width="50"
              height="45"
              viewBox="0 0 50 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.35316e-06 14.985C-0.00131458 13.0155 0.385882 11.0651 1.13942 9.24548C1.89296 7.42584 2.99804 5.77272 4.39137 4.38078C5.78471 2.98883 7.43894 1.88541 9.25933 1.13369C11.0797 0.381977 13.0305 -0.00326753 15 2.08756e-05H35C43.2825 2.08756e-05 50 6.73752 50 14.985V45H15C6.7175 45 3.35316e-06 38.2625 3.35316e-06 30.015V14.985ZM30 20V25H35V20H30ZM15 20V25H20V20H15Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
