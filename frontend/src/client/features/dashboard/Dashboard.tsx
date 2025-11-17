import { Link, useNavigate } from "react-router-dom";
import apiClient from "@/services/api";
import { useAuthStore } from "@/store/authStore";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const session = useAuthStore.getState().session;
      if (session) {
        await apiClient.post("/users/logout", {}, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
      }
    } catch (error) {
      console.error("Failed to logout", error);
    } finally {
      useAuthStore.getState().logout();
      navigate("/login");
    }
  };

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

          {/* Pages Section */}
          <div className="mb-8">
            <h3 className="text-[#595C5F] font-inter text-xl font-light mb-6">Pages</h3>
            
            {/* Dashboard - Active */}
            <div className="bg-[#F4F4F5] rounded-[10px] p-3 mb-4 flex items-center">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M12.8333 7C12.5028 7 12.2259 6.888 12.0027 6.664C11.7794 6.44 11.6674 6.16311 11.6667 5.83333V1.16667C11.6667 0.836111 11.7787 0.559222 12.0027 0.336C12.2267 0.112778 12.5036 0.000777778 12.8333 0H19.8333C20.1639 0 20.4412 0.112 20.6652 0.336C20.8892 0.56 21.0008 0.836889 21 1.16667V5.83333C21 6.16389 20.888 6.44117 20.664 6.66517C20.44 6.88917 20.1631 7.00078 19.8333 7H12.8333ZM1.16667 11.6667C0.836111 11.6667 0.559222 11.5547 0.336 11.3307C0.112778 11.1067 0.000777778 10.8298 0 10.5V1.16667C0 0.836111 0.112 0.559222 0.336 0.336C0.56 0.112778 0.836889 0.000777778 1.16667 0H8.16667C8.49722 0 8.7745 0.112 8.9985 0.336C9.2225 0.56 9.33411 0.836889 9.33333 1.16667V10.5C9.33333 10.8306 9.22133 11.1078 8.99733 11.3318C8.77333 11.5558 8.49644 11.6674 8.16667 11.6667H1.16667ZM12.8333 21C12.5028 21 12.2259 20.888 12.0027 20.664C11.7794 20.44 11.6674 20.1631 11.6667 19.8333V10.5C11.6667 10.1694 11.7787 9.89255 12.0027 9.66933C12.2267 9.44611 12.5036 9.33411 12.8333 9.33333H19.8333C20.1639 9.33333 20.4412 9.44533 20.6652 9.66933C20.8892 9.89333 21.0008 10.1702 21 10.5V19.8333C21 20.1639 20.888 20.4412 20.664 20.6652C20.44 20.8892 20.1631 21.0008 19.8333 21H12.8333ZM1.16667 21C0.836111 21 0.559222 20.888 0.336 20.664C0.112778 20.44 0.000777778 20.1631 0 19.8333V15.1667C0 14.8361 0.112 14.5592 0.336 14.336C0.56 14.1128 0.836889 14.0008 1.16667 14H8.16667C8.49722 14 8.7745 14.112 8.9985 14.336C9.2225 14.56 9.33411 14.8369 9.33333 15.1667V19.8333C9.33333 20.1639 9.22133 20.4412 8.99733 20.6652C8.77333 20.8892 8.49644 21.0008 8.16667 21H1.16667Z" fill="#381FD1"/>
              </svg>
              <span className="text-pinterin-purple font-inter text-xl font-medium">Dashboard</span>
            </div>

            {/* Practice with AI */}
            <Link to="/practice-with-ai" className="flex items-center p-3 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M20.713 8.1281L20.467 8.6941C20.4286 8.78627 20.3637 8.865 20.2806 8.92038C20.1975 8.97575 20.0999 9.00531 20 9.00531C19.9001 9.00531 19.8025 8.97575 19.7194 8.92038C19.6363 8.865 19.5714 8.78627 19.533 8.6941L19.287 8.1281C18.8545 7.12683 18.0624 6.32402 17.067 5.8781L16.308 5.5391C16.2159 5.49675 16.1379 5.42887 16.0832 5.34353C16.0286 5.25819 15.9995 5.15896 15.9995 5.0576C15.9995 4.95625 16.0286 4.85702 16.0832 4.77168C16.1379 4.68633 16.2159 4.61846 16.308 4.5761L17.025 4.2571C18.0454 3.79848 18.8511 2.96599 19.276 1.9311L19.529 1.3201C19.5662 1.22546 19.631 1.1442 19.715 1.08693C19.799 1.02966 19.8983 0.999023 20 0.999023C20.1017 0.999023 20.201 1.02966 20.285 1.08693C20.369 1.1442 20.4338 1.22546 20.471 1.3201L20.724 1.9301C21.1485 2.96518 21.9538 3.79804 22.974 4.2571L23.692 4.5771C23.7838 4.61958 23.8615 4.68745 23.916 4.77268C23.9705 4.85791 23.9994 4.95695 23.9994 5.0581C23.9994 5.15926 23.9705 5.2583 23.916 5.34353C23.8615 5.42876 23.7838 5.49662 23.692 5.5391L22.932 5.8771C21.9368 6.32347 21.1451 7.12663 20.713 8.1281ZM20 11.0001C20.6787 11.0006 21.3526 10.886 21.993 10.6611C21.9977 10.7744 22 10.8874 22 11.0001C22 13.1218 21.1571 15.1567 19.6569 16.657C18.1566 18.1573 16.1217 19.0001 14 19.0001V22.5001C9 20.5001 2 17.5001 2 11.0001C2 8.87837 2.84285 6.84354 4.34315 5.34325C5.84344 3.84296 7.87827 3.0001 10 3.0001H14C14.1133 3.0001 14.2263 3.00244 14.339 3.0071C14.0203 3.91203 13.9233 4.88018 14.056 5.83035C14.1888 6.78052 14.5475 7.685 15.102 8.46792C15.6565 9.25084 16.3906 9.88938 17.2429 10.33C18.0951 10.7706 19.0406 11.0004 20 11.0001Z" fill="#7F8183"/>
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">Practice with AI</span>
            </Link>

            {/* Exam */}
            <div className="flex items-center p-3 mb-4">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M15.75 2.25H6.75C6.15326 2.25 5.58097 2.48705 5.15901 2.90901C4.73705 3.33097 4.5 3.90326 4.5 4.5V22.5C4.5 23.0967 4.73705 23.669 5.15901 24.091C5.58097 24.5129 6.15326 24.75 6.75 24.75H20.25C20.8467 24.75 21.419 24.5129 21.841 24.091C22.2629 23.669 22.5 23.0967 22.5 22.5V9L15.75 2.25ZM20.25 22.5H6.75V4.5H14.625V10.125H20.25V22.5Z" fill="#7F8183"/>
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">Exam</span>
            </div>

            {/* My profile */}
            <div className="flex items-center p-3 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 4C10.6008 3.99974 9.22593 4.36649 8.01272 5.06363C6.79951 5.76077 5.79037 6.76392 5.08602 7.97295C4.38167 9.18199 4.00674 10.5546 3.99867 11.9538C3.99059 13.3531 4.34965 14.7299 5.04 15.947C5.50661 15.3406 6.10643 14.8496 6.79309 14.512C7.47974 14.1744 8.23484 13.9992 9 14H15C15.7652 13.9992 16.5203 14.1744 17.2069 14.512C17.8936 14.8496 18.4934 15.3406 18.96 15.947C19.6504 14.7299 20.0094 13.3531 20.0013 11.9538C19.9933 10.5546 19.6183 9.18199 18.914 7.97295C18.2096 6.76392 17.2005 5.76077 15.9873 5.06363C14.7741 4.36649 13.3992 3.99974 12 4ZM19.943 18.076C20.0683 17.9127 20.1883 17.7453 20.303 17.574C21.4116 15.9267 22.0026 13.9856 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C1.99685 14.1968 2.72004 16.3329 4.057 18.076L4.052 18.094L4.407 18.507C5.34489 19.6035 6.50939 20.4836 7.82023 21.0866C9.13108 21.6897 10.5571 22.0013 12 22C12.216 22 12.4307 21.9933 12.644 21.98C14.4484 21.8662 16.1877 21.2629 17.675 20.235C18.3863 19.7443 19.031 19.1635 19.593 18.507L19.948 18.094L19.943 18.076ZM12 6C11.2044 6 10.4413 6.31607 9.87868 6.87868C9.31607 7.44129 9 8.20435 9 9C9 9.79565 9.31607 10.5587 9.87868 11.1213C10.4413 11.6839 11.2044 12 12 12C12.7957 12 13.5587 11.6839 14.1213 11.1213C14.6839 10.5587 15 9.79565 15 9C15 8.20435 14.6839 7.44129 14.1213 6.87868C13.5587 6.31607 12.7957 6 12 6Z" fill="#7F8183"/>
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">My profile</span>
            </div>

            {/* Reports */}
            <div className="flex items-center p-3 mb-8">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M14.6667 10.7983L18.5533 4.07917L20.1392 4.99583L15.345 13.2917L9.3775 9.85417L5.005 17.4167H20.1667V19.25H1.83334V2.75H3.66667V16.0783L8.70834 7.33333L14.6667 10.7983Z" fill="#7F8183"/>
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">Reports</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#C5C5C5] mb-8"></div>

          {/* Others Section */}
          <div>
            <h3 className="text-[#595C5F] font-inter text-xl font-light mb-6">Others</h3>
            
            {/* Profile Settings */}
            <div className="flex items-center p-3">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M21.5583 13.7148C21.3847 13.5171 21.2889 13.263 21.2889 12.9998C21.2889 12.7367 21.3847 12.4825 21.5583 12.2848L22.945 10.7248C23.0978 10.5544 23.1927 10.3399 23.216 10.1122C23.2394 9.88452 23.19 9.65526 23.075 9.45735L20.9083 5.70901C20.7945 5.51133 20.6211 5.35463 20.413 5.26126C20.2048 5.16788 19.9725 5.1426 19.7492 5.18901L17.7125 5.60068C17.4533 5.65423 17.1836 5.61107 16.954 5.47935C16.7245 5.34762 16.5512 5.13645 16.4667 4.88568L15.8058 2.90318C15.7332 2.68801 15.5947 2.50112 15.41 2.36892C15.2253 2.23673 15.0038 2.16593 14.7767 2.16651H10.4433C10.2071 2.15418 9.97331 2.21952 9.7777 2.35254C9.58208 2.48556 9.43538 2.67895 9.36 2.90318L8.75333 4.88568C8.66883 5.13645 8.49547 5.34762 8.26596 5.47935C8.03644 5.61107 7.76665 5.65423 7.5075 5.60068L5.41667 5.18901C5.20493 5.15909 4.98907 5.1925 4.79629 5.28504C4.60351 5.37757 4.44243 5.52509 4.33333 5.70901L2.16667 9.45735C2.04876 9.65305 1.99574 9.88102 2.0152 10.1087C2.03465 10.3363 2.12559 10.552 2.275 10.7248L3.65083 12.2848C3.82451 12.4825 3.9203 12.7367 3.9203 12.9998C3.9203 13.263 3.82451 13.5171 3.65083 13.7148L2.275 15.2748C2.12559 15.4477 2.03465 15.6634 2.0152 15.891C1.99574 16.1187 2.04876 16.3466 2.16667 16.5423L4.33333 20.2907C4.44719 20.4884 4.62054 20.6451 4.82869 20.7384C5.03683 20.8318 5.26914 20.8571 5.4925 20.8107L7.52917 20.399C7.78832 20.3455 8.05811 20.3886 8.28762 20.5203C8.51714 20.6521 8.6905 20.8632 8.775 21.114L9.43583 23.0965C9.51121 23.3207 9.65791 23.5141 9.85353 23.6472C10.0491 23.7802 10.2829 23.8455 10.5192 23.8332H14.8525C15.0796 23.8338 15.3012 23.763 15.4858 23.6308C15.6705 23.4986 15.809 23.3117 15.8817 23.0965L16.5425 21.114C16.627 20.8632 16.8004 20.6521 17.0299 20.5203C17.2594 20.3886 17.5292 20.3455 17.7883 20.399L19.825 20.8107C20.0484 20.8571 20.2807 20.8318 20.4888 20.7384C20.697 20.6451 20.8703 20.4884 20.9842 20.2907L23.1508 16.5423C23.2659 16.3444 23.3152 16.1152 23.2919 15.8875C23.2685 15.6598 23.1736 15.4453 23.0208 15.2748L21.5583 13.7148ZM19.9442 15.1665L20.8108 16.1415L19.4242 18.5465L18.1458 18.2865C17.3656 18.127 16.554 18.2596 15.865 18.659C15.176 19.0584 14.6577 19.6968 14.4083 20.4532L13.9967 21.6665H11.2233L10.8333 20.4315C10.584 19.6752 10.0657 19.0367 9.37669 18.6373C8.68771 18.2379 7.87607 18.1054 7.09583 18.2648L5.8175 18.5248L4.40917 16.1307L5.27583 15.1557C5.80878 14.5598 6.10343 13.7884 6.10343 12.989C6.10343 12.1896 5.80878 11.4182 5.27583 10.8223L4.40917 9.84735L5.79583 7.46401L7.07417 7.72401C7.85441 7.8835 8.66605 7.75097 9.35502 7.35156C10.044 6.95216 10.5623 6.31368 10.8117 5.55735L11.2233 4.33318H13.9967L14.4083 5.56818C14.6577 6.32452 15.176 6.96299 15.865 7.36239C16.554 7.7618 17.3656 7.89434 18.1458 7.73485L19.4242 7.47485L20.8108 9.87985L19.9442 10.8548C19.4172 11.4493 19.1262 12.2163 19.1262 13.0107C19.1262 13.8051 19.4172 14.572 19.9442 15.1665ZM12.61 8.66651C11.7529 8.66651 10.9151 8.92066 10.2025 9.39681C9.48992 9.87296 8.9345 10.5497 8.60652 11.3416C8.27854 12.1334 8.19273 13.0047 8.35993 13.8452C8.52713 14.6858 8.93984 15.4579 9.54587 16.064C10.1519 16.67 10.924 17.0827 11.7646 17.2499C12.6052 17.4171 13.4765 17.3313 14.2683 17.0033C15.0601 16.6753 15.7369 16.1199 16.213 15.4073C16.6892 14.6947 16.9433 13.8569 16.9433 12.9998C16.9433 11.8506 16.4868 10.7484 15.6741 9.93572C14.8615 9.12306 13.7593 8.66651 12.61 8.66651ZM12.61 15.1665C12.1815 15.1665 11.7626 15.0394 11.4063 14.8014C11.05 14.5633 10.7723 14.2249 10.6083 13.829C10.4443 13.4331 10.4014 12.9974 10.485 12.5772C10.5686 12.1569 10.7749 11.7708 11.0779 11.4678C11.3809 11.1648 11.767 10.9584 12.1873 10.8748C12.6076 10.7912 13.0432 10.8341 13.4391 10.9981C13.8351 11.1621 14.1734 11.4398 14.4115 11.7961C14.6496 12.1524 14.7767 12.5713 14.7767 12.9998C14.7767 13.5745 14.5484 14.1256 14.1421 14.5319C13.7357 14.9382 13.1846 15.1665 12.61 15.1665Z" fill="#7F8183"/>
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">Profile Settings</span>
            </div>

            {/* Logout Button */}
            <div className="flex items-center p-3 cursor-pointer" onClick={handleLogout}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M17 16L21 12M21 12L17 8M21 12H9M12 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12" stroke="#7F8183" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[#7F8183] font-inter text-xl font-medium">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white border-b border-pinterin-border px-8 py-6 -m-8 mb-8">
          <div></div>
          <div className="flex items-center gap-12">
            <div className="flex items-center">
              <svg width="29" height="41" viewBox="0 0 29 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M9.63292 0.375711C7.0789 -0.994817 2.04531 1.65337 0.599314 3.98474C-0.0448777 5.02798 0.000700393 5.77979 0.000700393 6.20632V29.0254L18.8769 41L22.4265 39.024V16.8011L3.04568 5.4566C4.0857 4.12216 6.42473 2.49493 8.17858 3.14847L25.4414 12.5613L25.4414 37.3178L29 35.3383V10.5824L9.63292 0.375711Z" fill="black"/>
              </svg>
              <span className="text-black font-poppins text-2xl font-semibold mr-4">User</span>
              <div className="w-16 h-16 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                <span className="text-black font-poppins text-2xl font-bold">U</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1">
            {/* Dashboard Title */}
            <h1 className="text-pinterin-dark-blue font-inter text-2xl font-bold mb-8">Dashboard</h1>

            {/* Exam & Practices Section */}
            <div className="bg-white rounded-[10px] shadow-lg p-6 mb-8">
              <h2 className="text-pinterin-dark-blue font-roboto text-base font-medium mb-6">Exam & Practices</h2>
              
              {/* Welcome Card */}
              <div className="bg-pinterin-dark-blue rounded-[11px] p-8 relative">
                <div className="text-white mb-6">
                  <div className="font-roboto text-3xl font-bold mb-2">Welcome!</div>
                  <div className="font-roboto text-2xl font-normal">What do you want to do first?</div>
                </div>
                
                <div className="flex gap-4">
                  <button className="bg-[#1814F3] text-white px-8 py-3 rounded-[10px] font-roboto text-base font-medium">
                    Exam
                  </button>
                  <button className="bg-white text-[#595C5F] px-8 py-3 rounded-[10px] font-roboto text-base font-medium shadow-lg">
                    Practice
                  </button>
                </div>
              </div>
            </div>

            {/* My Progress Section */}
            <div className="bg-white rounded-[10px] shadow-lg p-6">
              <h2 className="text-pinterin-dark-blue font-roboto text-base font-medium mb-6">My progress</h2>
              
              <div className="flex items-center">
                {/* Pie Chart Placeholder */}
                <div className="w-[401px] h-[369px] relative">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/37829b83c6e5eb651d6c4a0d69be62a1df57e799?width=802" 
                    alt="Progress Chart" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Legend */}
                <div className="ml-8 space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-5 bg-[#343C6A] mr-3"></div>
                    <span className="text-[#595C5F] font-inter text-sm">Math</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-5 bg-[#FC7900] mr-3"></div>
                    <span className="text-[#595C5F] font-inter text-sm">Reading</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-5 bg-[#1814F3] mr-3"></div>
                    <span className="text-[#595C5F] font-inter text-sm">Reading</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-5 bg-[#FA00FF] mr-3"></div>
                    <span className="text-[#595C5F] font-inter text-sm">Reading</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - My Schedule */}
          <div className="w-[356px] bg-white rounded-[5px] shadow-lg p-6 h-fit">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-pinterin-dark-blue font-roboto text-xl font-medium">My Schedule</h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="#10284B"/>
              </svg>
            </div>

            {/* Schedule Items */}
            <div className="space-y-4">
              {/* Schedule Item 1 */}
              <div className="bg-white rounded-[7px] shadow-lg p-4">
                <div className="w-[78px] h-[17px] bg-[#FC7900] rounded-[3px] mb-3"></div>
                <div className="text-[#7F8183] font-roboto text-sm">Practice on Math</div>
              </div>

              {/* Schedule Item 2 */}
              <div className="bg-white rounded-[7px] shadow-lg p-4">
                <div className="w-[78px] h-[17px] bg-[#FC7900] rounded-[3px] mb-3"></div>
                <div className="text-[#7F8183] font-roboto text-sm">Practice on Math</div>
              </div>

              {/* Schedule Item 3 */}
              <div className="bg-white rounded-[7px] shadow-lg p-4">
                <div className="w-[78px] h-[17px] bg-[#FA00FF] rounded-[3px] mb-3"></div>
                <div className="text-[#7F8183] font-roboto text-sm">Test SAT 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
