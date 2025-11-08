import { Link } from "react-router-dom";

export default function ExamStart() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Left Sidebar - Branding */}
      <div className="w-[879px] bg-white shadow-lg flex-shrink-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-pinterin-dark-blue font-dm-sans text-6xl font-bold leading-tight mb-4">
            Pinterin
          </h1>
          <div className="flex items-center justify-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 9H11V7H13M13 17H11V11H13M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
                fill="#381FD1"
              />
            </svg>
            <span className="text-[#595C5F] font-inter text-xl font-medium">
              Exam Guidelines
            </span>
            <svg
              width="12"
              height="24"
              viewBox="0 0 12 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.1569 12.7111L4.49994 18.3681L3.08594 16.9541L8.03594 12.0041L3.08594 7.05414L4.49994 5.64014L10.1569 11.2971C10.3444 11.4847 10.4497 11.739 10.4497 12.0041C10.4497 12.2693 10.3444 12.5236 10.1569 12.7111Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="flex gap-8 mb-16 justify-center">
          {/* Total Questions */}
          <div className="w-[227px] h-[101px] border-[3px] border-pinterin-purple rounded-lg bg-white flex flex-col items-center justify-center">
            <span className="text-[#595C5F] font-inter text-xl font-medium mb-2">
              Total Questions
            </span>
            <span className="text-pinterin-purple font-inter text-2xl font-bold">
              32
            </span>
          </div>

          {/* Total Time */}
          <div className="w-[227px] h-[101px] border-[3px] border-pinterin-purple rounded-lg bg-white flex flex-col items-center justify-center">
            <span className="text-[#595C5F] font-inter text-xl font-medium mb-2 text-center">
              Total Time
            </span>
            <span className="text-pinterin-purple font-inter text-2xl font-bold text-center">
              58:00
            </span>
          </div>

          {/* Break Time */}
          <div className="w-[227px] h-[101px] border-[3px] border-pinterin-purple rounded-lg bg-white flex flex-col items-center justify-center">
            <span className="text-[#595C5F] font-inter text-xl font-medium mb-2 text-center">
              Break Time
            </span>
            <span className="text-pinterin-purple font-inter text-2xl font-bold text-center">
              0 MIN
            </span>
          </div>
        </div>

        {/* Exam Sections */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white border-[3px] border-[#B1B1B1] rounded-lg p-8">
            <h3 className="text-[#595C5F] font-inter text-xl font-medium mb-6">
              Include
            </h3>
            
            <div className="space-y-4">
              {/* Section 1 */}
              <div className="flex items-center justify-between">
                <span className="text-[#595C5F] font-inter text-xl font-medium">
                  Section - 1
                </span>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <svg
                      width="19"
                      height="22"
                      viewBox="0 0 19 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_8478_2248"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="19"
                        height="22"
                      >
                        <path
                          d="M9.5 21C14.1945 21 18 17.1945 18 12.5C18 7.8055 14.1945 4 9.5 4C4.8055 4 1 7.8055 1 12.5C1 17.1945 4.8055 21 9.5 21Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 1H6M16.5 4L15 5.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 8V12.5"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask0_8478_2248)">
                        <path d="M-2.5 -1H21.5V23H-2.5V-1Z" fill="#10284B" />
                      </g>
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      13.0 MIN
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 19.0002C10.6318 18.2103 9.07983 17.7944 7.5 17.7944C5.92017 17.7944 4.36817 18.2103 3 19.0002V6.00021C4.36817 5.21029 5.92017 4.79443 7.5 4.79443C9.07983 4.79443 10.6318 5.21029 12 6.00021M12 19.0002C13.3682 18.2103 14.9202 17.7944 16.5 17.7944C18.0798 17.7944 19.6318 18.2103 21 19.0002V6.00021C19.6318 5.21029 18.0798 4.79443 16.5 4.79443C14.9202 4.79443 13.3682 5.21029 12 6.00021M12 19.0002V6.00021"
                        stroke="#10284B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      8 Qs
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="flex items-center justify-between">
                <span className="text-[#595C5F] font-inter text-xl font-medium">
                  Section - 2
                </span>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <svg
                      width="19"
                      height="22"
                      viewBox="0 0 19 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_8478_2256"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="19"
                        height="22"
                      >
                        <path
                          d="M9.5 21C14.1945 21 18 17.1945 18 12.5C18 7.8055 14.1945 4 9.5 4C4.8055 4 1 7.8055 1 12.5C1 17.1945 4.8055 21 9.5 21Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 1H6M16.5 4L15 5.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 8V12.5"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask0_8478_2256)">
                        <path d="M-2.5 -1H21.5V23H-2.5V-1Z" fill="#10284B" />
                      </g>
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      13.0 MIN
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 19.0002C10.6318 18.2103 9.07983 17.7944 7.5 17.7944C5.92017 17.7944 4.36817 18.2103 3 19.0002V6.00021C4.36817 5.21029 5.92017 4.79443 7.5 4.79443C9.07983 4.79443 10.6318 5.21029 12 6.00021M12 19.0002C13.3682 18.2103 14.9202 17.7944 16.5 17.7944C18.0798 17.7944 19.6318 18.2103 21 19.0002V6.00021C19.6318 5.21029 18.0798 4.79443 16.5 4.79443C14.9202 4.79443 13.3682 5.21029 12 6.00021M12 19.0002V6.00021"
                        stroke="#10284B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      8 Qs
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="flex items-center justify-between">
                <span className="text-[#595C5F] font-inter text-xl font-medium">
                  Section - 3
                </span>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <svg
                      width="19"
                      height="22"
                      viewBox="0 0 19 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_8478_2264"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="19"
                        height="22"
                      >
                        <path
                          d="M9.5 21C14.1945 21 18 17.1945 18 12.5C18 7.8055 14.1945 4 9.5 4C4.8055 4 1 7.8055 1 12.5C1 17.1945 4.8055 21 9.5 21Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 1H6M16.5 4L15 5.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 8V12.5"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask0_8478_2264)">
                        <path d="M-2.5 -1H21.5V23H-2.5V-1Z" fill="#10284B" />
                      </g>
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      13.0 MIN
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 19.0002C10.6318 18.2103 9.07983 17.7944 7.5 17.7944C5.92017 17.7944 4.36817 18.2103 3 19.0002V6.00021C4.36817 5.21029 5.92017 4.79443 7.5 4.79443C9.07983 4.79443 10.6318 5.21029 12 6.00021M12 19.0002C13.3682 18.2103 14.9202 17.7944 16.5 17.7944C18.0798 17.7944 19.6318 18.2103 21 19.0002V6.00021C19.6318 5.21029 18.0798 4.79443 16.5 4.79443C14.9202 4.79443 13.3682 5.21029 12 6.00021M12 19.0002V6.00021"
                        stroke="#10284B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      8 Qs
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="flex items-center justify-between">
                <span className="text-[#595C5F] font-inter text-xl font-medium">
                  Section - 4
                </span>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <svg
                      width="19"
                      height="22"
                      viewBox="0 0 19 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_8478_2272"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="19"
                        height="22"
                      >
                        <path
                          d="M9.5 21C14.1945 21 18 17.1945 18 12.5C18 7.8055 14.1945 4 9.5 4C4.8055 4 1 7.8055 1 12.5C1 17.1945 4.8055 21 9.5 21Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 1H6M16.5 4L15 5.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 8V12.5"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask0_8478_2272)">
                        <path d="M-2.5 -1H21.5V23H-2.5V-1Z" fill="#10284B" />
                      </g>
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      13.0 MIN
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 19.0002C10.6318 18.2103 9.07983 17.7944 7.5 17.7944C5.92017 17.7944 4.36817 18.2103 3 19.0002V6.00021C4.36817 5.21029 5.92017 4.79443 7.5 4.79443C9.07983 4.79443 10.6318 5.21029 12 6.00021M12 19.0002C13.3682 18.2103 14.9202 17.7944 16.5 17.7944C18.0798 17.7944 19.6318 18.2103 21 19.0002V6.00021C19.6318 5.21029 18.0798 4.79443 16.5 4.79443C14.9202 4.79443 13.3682 5.21029 12 6.00021M12 19.0002V6.00021"
                        stroke="#10284B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#595C5F] font-inter text-xl font-medium">
                      8 Qs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Entrance Info */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-[#595C5F] font-inter text-xl font-medium mb-6">
            Exam Entrance Info:
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke="#381FD1" strokeWidth="2" />
              </svg>
              <span className="text-[#595C5F] font-inter text-xl font-medium">
                apa aja yang penting kesisi disini
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke="#381FD1" strokeWidth="2" />
              </svg>
              <span className="text-[#595C5F] font-inter text-xl font-medium">
                apa aja yang penting kesisi disini
              </span>
            </div>
            <div className="flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke="#381FD1" strokeWidth="2" />
              </svg>
              <span className="text-[#595C5F] font-inter text-xl font-medium">
                apa aja yang penting kesisi disini
              </span>
            </div>
          </div>
        </div>

        {/* Accept & Start Button */}
        <div className="flex justify-center">
          <button className="bg-pinterin-purple text-white px-20 py-4 rounded-full font-roboto text-2xl font-normal shadow-lg hover:bg-pinterin-purple/90 transition-colors">
            Accept & Start
          </button>
        </div>
      </div>
    </div>
  );
}
