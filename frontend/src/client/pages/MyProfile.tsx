import { Link } from "react-router-dom";

export default function MyProfile() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
      <div className="w-[413px] bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] flex-shrink-0 h-screen overflow-y-auto">
        <div className="p-8">
          {/* Pages Section */}
          <div className="mb-8">
            <h3 className="text-[#595C5F] font-inter text-xl font-light mb-6 mt-[50px]">
              Pages
            </h3>

            {/* Dashboard */}
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

            {/* Practice with AI */}
            <Link to="/practice-with-ai" className="flex items-center p-3 mb-4">
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
                  fill="#7F8183"
                />
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">
                Practice with AI
              </span>
            </Link>

            {/* Exam */}
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

            {/* My profile - Active */}
            <div className="bg-[#F4F4F5] rounded-[10px] p-3 mb-4 flex items-center w-[294px] h-[49px]">
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
                  fill="#381FD1"
                />
              </svg>
              <span className="text-[#381FD1] font-inter text-xl font-medium">
                My profile
              </span>
            </div>

            {/* Reports */}
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
                  d="M14.6668 10.7983L18.5535 4.07917L20.1393 4.99583L15.3452 13.2917L9.37766 9.85417L5.00516 17.4167H20.1668V19.25H1.8335V2.75H3.66683V16.0783L8.7085 7.33333L14.6668 10.7983Z"
                  fill="#7F8183"
                />
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">
                Reports
              </span>
            </Link>
          </div>

          {/* Divider */}
          <div className="w-[294px] h-0 bg-[#C5C5C5] border-t border-[#C5C5C5] mb-8"></div>

          {/* Others Section */}
          <div>
            <h3 className="text-[#595C5F] font-inter text-xl font-light mb-6">
              Others
            </h3>

            {/* Profile Settings */}
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
                  d="M21.5583 13.7148C21.3846 13.5171 21.2888 13.263 21.2888 12.9998C21.2888 12.7367 21.3846 12.4825 21.5583 12.2848L22.945 10.7248C23.0978 10.5544 23.1927 10.3399 23.216 10.1122C23.2394 9.88452 23.19 9.65526 23.075 9.45735L20.9083 5.70901C20.7944 5.51133 20.6211 5.35463 20.4129 5.26126C20.2048 5.16788 19.9725 5.1426 19.7491 5.18901L17.7125 5.60068C17.4533 5.65423 17.1835 5.61107 16.954 5.47935C16.7245 5.34762 16.5511 5.13645 16.4666 4.88568L15.8058 2.90318C15.7331 2.68801 15.5947 2.50112 15.41 2.36892C15.2253 2.23673 15.0037 2.16593 14.7766 2.16651H10.4433C10.2071 2.15418 9.97328 2.21952 9.77766 2.35254C9.58205 2.48556 9.43535 2.67895 9.35997 2.90318L8.7533 4.88568C8.6688 5.13645 8.49544 5.34762 8.26592 5.47935C8.03641 5.61107 7.76662 5.65423 7.50747 5.60068L5.41664 5.18901C5.2049 5.15909 4.98904 5.1925 4.79626 5.28504C4.60348 5.37757 4.4424 5.52509 4.3333 5.70901L2.16664 9.45735C2.04873 9.65305 1.99571 9.88102 2.01517 10.1087C2.03462 10.3363 2.12556 10.552 2.27497 10.7248L3.6508 12.2848C3.82448 12.4825 3.92026 12.7367 3.92026 12.9998C3.92026 13.263 3.82448 13.5171 3.6508 13.7148L2.27497 15.2748C2.12556 15.4477 2.03462 15.6634 2.01517 15.891C1.99571 16.1187 2.04873 16.3466 2.16664 16.5423L4.3333 20.2907C4.44716 20.4884 4.62051 20.6451 4.82866 20.7384C5.0368 20.8318 5.26911 20.8571 5.49247 20.8107L7.52914 20.399C7.78829 20.3455 8.05808 20.3886 8.28759 20.5203C8.51711 20.6521 8.69047 20.8632 8.77497 21.114L9.4358 23.0965C9.51118 23.3207 9.65788 23.5141 9.8535 23.6472C10.0491 23.7802 10.2829 23.8455 10.5191 23.8332H14.8525C15.0796 23.8338 15.3011 23.763 15.4858 23.6308C15.6705 23.4986 15.809 23.3117 15.8816 23.0965L16.5425 21.114C16.627 20.8632 16.8003 20.6521 17.0298 20.5203C17.2594 20.3886 17.5292 20.3455 17.7883 20.399L19.825 20.8107C20.0483 20.8571 20.2806 20.8318 20.4888 20.7384C20.6969 20.6451 20.8703 20.4884 20.9841 20.2907L23.1508 16.5423C23.2658 16.3444 23.3152 16.1152 23.2918 15.8875C23.2685 15.6598 23.1736 15.4453 23.0208 15.2748L21.5583 13.7148ZM19.9441 15.1665L20.8108 16.1415L19.4241 18.5465L18.1458 18.2865C17.3656 18.127 16.5539 18.2596 15.8649 18.659C15.176 19.0584 14.6576 19.6968 14.4083 20.4532L13.9966 21.6665H11.2233L10.8333 20.4315C10.584 19.6752 10.0656 19.0367 9.37666 18.6373C8.68768 18.2379 7.87604 18.1054 7.0958 18.2648L5.81747 18.5248L4.40914 16.1307L5.2758 15.1557C5.80875 14.5598 6.1034 13.7884 6.1034 12.989C6.1034 12.1896 5.80875 11.4182 5.2758 10.8223L4.40914 9.84735L5.7958 7.46401L7.07414 7.72401C7.85438 7.8835 8.66602 7.75097 9.35499 7.35156C10.044 6.95216 10.5623 6.31368 10.8116 5.55735L11.2233 4.33318H13.9966L14.4083 5.56818C14.6576 6.32452 15.176 6.96299 15.8649 7.36239C16.5539 7.7618 17.3656 7.89434 18.1458 7.73485L19.4241 7.47485L20.8108 9.87985L19.9441 10.8548C19.4172 11.4493 19.1262 12.2163 19.1262 13.0107C19.1262 13.8051 19.4172 14.572 19.9441 15.1665ZM12.61 8.66651C11.7529 8.66651 10.9151 8.92066 10.2025 9.39681C9.48988 9.87296 8.93447 10.5497 8.60649 11.3416C8.27851 12.1334 8.1927 13.0047 8.3599 13.8452C8.5271 14.6858 8.93981 15.4579 9.54584 16.064C10.1519 16.67 10.924 17.0827 11.7646 17.2499C12.6052 17.4171 13.4765 17.3313 14.2683 17.0033C15.0601 16.6753 15.7369 16.1199 16.213 15.4073C16.6892 14.6947 16.9433 13.8569 16.9433 12.9998C16.9433 11.8506 16.4868 10.7484 15.6741 9.93572C14.8614 9.12306 13.7592 8.66651 12.61 8.66651ZM12.61 15.1665C12.1814 15.1665 11.7625 15.0394 11.4062 14.8014C11.0499 14.5633 10.7722 14.2249 10.6082 13.829C10.4442 13.4331 10.4013 12.9974 10.4849 12.5772C10.5685 12.1569 10.7749 11.7708 11.0779 11.4678C11.3809 11.1648 11.767 10.9584 12.1873 10.8748C12.6076 10.7912 13.0432 10.8341 13.4391 10.9981C13.835 11.1621 14.1734 11.4398 14.4115 11.7961C14.6496 12.1524 14.7766 12.5713 14.7766 12.9998C14.7766 13.5745 14.5484 14.1256 14.142 14.5319C13.7357 14.9382 13.1846 15.1665 12.61 15.1665Z"
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-white border-b border-[#DEE5ED] px-24 py-8 h-[137px]">
          <div className="flex items-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/1ae64bb127a8720e83bb138afd16a02600c4c0c4?width=88"
              alt="Pinterin Logo"
              className="w-11 h-11 mr-3"
            />
            <span className="text-[#10284B] font-dm-sans text-xl font-bold">
              Pinterin
            </span>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <svg
                width="29"
                height="41"
                viewBox="0 0 29 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.63292 0.375711C7.0789 -0.994817 2.04531 1.65337 0.599314 3.98474C-0.0448777 5.02798 0.000700393 5.77979 0.000700393 6.20632V29.0254L18.8769 41L22.4265 39.024V16.8011L3.04568 5.4566C4.0857 4.12216 6.42473 2.49493 8.17858 3.14847L25.4414 12.5613L25.4414 37.3178L29 35.3383V10.5824L9.63292 0.375711Z"
                  fill="black"
                />
              </svg>
              <span className="text-black font-poppins text-2xl font-semibold">
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

        {/* Page Content */}
        <div className="flex-1 p-8">
          <h1 className="text-[#10284B] font-inter text-2xl font-bold mb-8">
            My Profile
          </h1>

          <div className="flex gap-8 mb-8">
            {/* Left Section - Profile Card */}
            <div className="w-[397px] h-[352px]">
              <div className="bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] p-8 h-full flex flex-col">
                {/* Profile Avatar and Info */}
                <div className="flex items-start mb-8">
                  <svg
                    width="66"
                    height="66"
                    viewBox="0 0 66 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-4 flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.9999 3.62582e-10C37.3335 -2.03135e-05 41.6247 0.853533 45.6285 2.51192C49.6322 4.17032 53.2701 6.60107 56.3345 9.6654C59.3988 12.7297 61.8296 16.3676 63.488 20.3714C65.1464 24.3751 66 28.6663 66 32.9999C66 51.2253 51.2253 66 32.9999 66C14.7747 66 0 51.2253 0 32.9999C0 14.7747 14.7747 3.62582e-10 32.9999 3.62582e-10ZM36.3 36.3H29.7C21.5302 36.3 14.5162 41.248 11.491 48.3112C16.2776 55.0232 24.1277 59.4 32.9999 59.4C41.8722 59.4 49.7222 55.0232 54.509 48.3107C51.4838 41.248 44.4698 36.3 36.3 36.3ZM32.9999 9.89999C27.5323 9.89999 23.0999 14.3324 23.0999 19.8C23.0999 25.2676 27.5323 29.7 32.9999 29.7C38.4675 29.7 42.8999 25.2676 42.8999 19.8C42.8999 14.3324 38.4677 9.89999 32.9999 9.89999Z"
                      fill="#10284B"
                    />
                  </svg>
                  <div className="flex-1">
                    <h2 className="text-[#10284B] font-roboto text-xl font-medium mb-4">
                      John Doe
                    </h2>
                    <div className="text-[#595C5F] font-roboto text-base leading-6">
                      <div>user@gmail.com</div>
                      <div>English Level</div>
                    </div>
                  </div>
                </div>

                {/* SAT Exam Info */}
                <div className="mt-auto">
                  <h3 className="text-[#10284B] font-roboto text-base font-medium mb-1">
                    SAT Exam
                  </h3>
                  <p className="text-[#595C5F] font-roboto text-base leading-6">
                    You are surrently enrolled in the SAT course
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - My Plan */}
            <div className="w-[569px] h-[352px]">
              <div className="bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] p-8 h-full">
                <h2 className="text-[#10284B] font-roboto text-xl font-medium mb-8">
                  My Plan
                </h2>

                <div className="mb-8">
                  <h3 className="text-[#381FD1] font-roboto text-5xl font-medium mb-6 leading-none">
                    SAT STARTER
                  </h3>

                  <div className="bg-[#F3F3F6] rounded-[7px] p-4 flex justify-between items-center w-[364px] h-[40px]">
                    <span className="text-[#595C5F] font-roboto text-base leading-6">
                      currently on{" "}
                      <span className="underline">Monthly Plan</span>
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V14M12 12L20 4M20 4V9M20 4H15"
                        stroke="#595C5F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Resolved Chart Section */}
          <div className="bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] p-8 w-[818px] h-[464px]">
            <h2 className="text-[#10284B] font-roboto text-xl font-medium mb-8">
              Daily resolved
            </h2>

            <div className="relative w-[751px] h-[356px]">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 w-[82px] h-[325px] flex flex-col justify-between">
                <span className="text-[#718EBF] font-inter text-sm text-right">
                  40
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-right">
                  30
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-right">
                  20
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-right">
                  10
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-right">
                  0
                </span>
              </div>

              {/* Chart area */}
              <div className="absolute left-[96px] top-[22px] w-[655px] h-[298px]">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 w-full h-0.5 border-t border-dashed border-[#DFE5EE]"></div>
                  <div className="absolute top-[75px] w-full h-0.5 border-t border-dashed border-[#DFE5EE]"></div>
                  <div className="absolute top-[150px] w-full h-0.5 border-t border-dashed border-[#DFE5EE]"></div>
                  <div className="absolute top-[225px] w-full h-0.5 border-t border-dashed border-[#DFE5EE]"></div>
                  <div className="absolute bottom-0 w-full h-0.5 border-t border-dashed border-[#DFE5EE]"></div>
                </div>

                {/* Chart line and points */}
                <svg
                  width="604"
                  height="253"
                  viewBox="0 0 604 253"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[11px] left-[20px]"
                >
                  <path
                    d="M10.9614 241.245L128.407 108.526L241.217 167.859L357.89 10.1577L473.791 130.386L593.554 69.491"
                    stroke="#FCAA0B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.189 234.938C14.4665 234.939 17.9603 238.447 17.9604 242.807C17.9604 247.167 14.4666 250.676 10.189 250.676C5.91117 250.676 2.4165 247.167 2.4165 242.807C2.41664 238.446 5.91126 234.938 10.189 234.938Z"
                    fill="white"
                    stroke="#EDA10D"
                    strokeWidth="3"
                  />
                  <path
                    d="M129.18 102.219C133.457 102.219 136.951 105.727 136.951 110.087C136.951 114.448 133.457 117.956 129.18 117.957C124.902 117.957 121.407 114.448 121.407 110.087C121.407 105.727 124.902 102.219 129.18 102.219Z"
                    fill="white"
                    stroke="#EDA10D"
                    strokeWidth="3"
                  />
                  <path
                    d="M240.444 158.43C244.722 158.43 248.216 161.938 248.216 166.298C248.216 170.658 244.722 174.167 240.444 174.167C236.167 174.167 232.672 170.658 232.672 166.298C232.672 161.938 236.167 158.43 240.444 158.43Z"
                    fill="white"
                    stroke="#EDA10D"
                    strokeWidth="3"
                  />
                  <path
                    d="M359.436 2.28955C363.713 2.28978 367.207 5.79771 367.207 10.1577C367.207 14.5178 363.713 18.0266 359.436 18.0269C355.158 18.0269 351.663 14.518 351.663 10.1577C351.663 5.79756 355.158 2.28955 359.436 2.28955Z"
                    fill="white"
                    stroke="#EDA10D"
                    strokeWidth="3"
                  />
                  <path
                    d="M475.336 120.956C479.614 120.956 483.108 124.464 483.108 128.824C483.108 133.184 479.614 136.693 475.336 136.693C471.059 136.693 467.564 133.184 467.564 128.824C467.564 124.464 471.059 120.956 475.336 120.956Z"
                    fill="white"
                    stroke="#EDA10D"
                    strokeWidth="3"
                  />
                  <path
                    d="M594.327 60.0615C598.605 60.0618 602.098 63.5697 602.099 67.9297C602.099 72.2898 598.605 75.7986 594.327 75.7988C590.049 75.7988 586.555 72.29 586.555 67.9297C586.555 63.5695 590.049 60.0615 594.327 60.0615Z"
                    fill="white"
                    stroke="#EDA10D"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-[102px] w-[635px] h-[25px] flex justify-between">
                <span className="text-[#718EBF] font-inter text-sm text-center w-[53px]">
                  monday
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-center w-[51px]">
                  tuesday
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-center w-[73px]">
                  wednesday
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-center w-[59px]">
                  thursday
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-center w-[50px]">
                  friday
                </span>
                <span className="text-[#718EBF] font-inter text-sm text-center w-[56px]">
                  saturday
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
