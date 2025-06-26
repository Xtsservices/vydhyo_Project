// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface headerProps {
//   showSearch?: boolean;
//   setShowSearch?: (show: boolean) => void;
//   searchQuery?: string;
//   setSearchQuery?: (query: string) => void;
// }

// const Header: React.FC<headerProps> = (props) => {
//   const router = useRouter();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const handleRedirect = (path: string) => {
//     router.push(path);
//     setDropdownOpen(false);
//   };

//   return (
//     <header
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "12px 48px",
//         background: "#fff",
//         boxShadow: "0 2px 8px #f0f1f2",
//         position: "sticky",
//         top: 0,
//         zIndex: 100,
//         height: "100px",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <div
//           style={{
//             width: 120,
//             height: 120,
//             borderRadius: "16px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <img
//             src={"/images/vy_logo.png"}
//             alt="Vydhyo Logo"
//             style={{
//               width: 450,
//               height: 450,
//               objectFit: "contain",
//               borderRadius: 12,
//             }}
//           />
//         </div>
//       </div>

//       <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
//         <button
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             background: "linear-gradient(135deg, #ff6b35, #f7931e)",
//             color: "#fff",
//             border: "none",
//             borderRadius: 20,
//             padding: "8px 16px",
//             fontWeight: 600,
//             fontSize: 14,
//             cursor: "pointer",
//             boxShadow: "0 3px 10px rgba(255,107,53,0.2)",
//             transition: "transform 0.2s ease",
//           }}
//           onMouseEnter={(e) => {
//             (e.target as HTMLButtonElement).style.transform =
//               "translateY(-2px)";
//           }}
//           onMouseLeave={(e) => {
//             (e.target as HTMLButtonElement).style.transform = "translateY(0)";
//           }}
//         >
//           <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24">
//             <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM19 7V9H15V23H13V16H11V23H9V9H5V7H19Z" />
//           </svg>
//           ABHA
//         </button>

//         <button
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             background: "transparent",
//             color: "#0a2540",
//             border: "2px solid #e0e0e0",
//             borderRadius: 20,
//             padding: "6px 14px",
//             fontWeight: 500,
//             fontSize: 14,
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//           }}
//           onMouseEnter={(e) => {
//             const target = e.target as HTMLButtonElement;
//             target.style.borderColor = "#2196f3";
//             target.style.color = "#2196f3";
//           }}
//           onMouseLeave={(e) => {
//             const target = e.target as HTMLButtonElement;
//             target.style.borderColor = "#e0e0e0";
//             target.style.color = "#0a2540";
//           }}
//         >
//           <svg
//             width="14"
//             height="14"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//             <circle cx="9" cy="7" r="4" />
//             <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//             <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//           </svg>
//           For Partners
//         </button>

//         <button
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             background: "transparent",
//             color: "#0a2540",
//             border: "2px solid #e0e0e0",
//             borderRadius: 20,
//             padding: "6px 14px",
//             fontWeight: 500,
//             fontSize: 14,
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//           }}
//           onMouseEnter={(e) => {
//             const target = e.target as HTMLButtonElement;
//             target.style.borderColor = "#2196f3";
//             target.style.color = "#2196f3";
//           }}
//           onMouseLeave={(e) => {
//             const target = e.target as HTMLButtonElement;
//             target.style.borderColor = "#e0e0e0";
//             target.style.color = "#0a2540";
//           }}
//         >
//           <svg
//             width="14"
//             height="14"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//             <polyline points="7 10 12 15 17 10" />
//             <line x1="12" y1="15" x2="12" y2="3" />
//           </svg>
//           Download the App
//         </button>

//         {/* LOGIN WITH DROPDOWN */}
//         <div
//           ref={dropdownRef}
//           style={{
//             position: "relative",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-end",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//               padding: "6px 12px",
//               background: "#f8f9fa",
//               borderRadius: 24,
//               border: "1px solid #e9ecef",
//               cursor: "pointer",
//             }}
//             onClick={toggleDropdown}
//           >
//             <div
//               style={{
//                 width: 32,
//                 height: 32,
//                 background: "linear-gradient(135deg, #667eea, #764ba2)",
//                 borderRadius: "50%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
//                 <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
//               </svg>
//             </div>
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <span
//                 style={{
//                   fontSize: 14,
//                   fontWeight: 600,
//                   color: "#0a2540",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 Login
//               </span>
//             </div>
//             <svg
//               width="12"
//               height="12"
//               fill="none"
//               stroke="#6c757d"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               style={{ cursor: "pointer" }}
//             >
//               <polyline points="6 9 8 11 10 9" />
//             </svg>
//           </div>

//           {dropdownOpen && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "100%",
//                 right: 0,
//                 marginTop: 6,
//                 background: "#fff",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                 borderRadius: 8,
//                 zIndex: 999,
//                 minWidth: 160,
//                 padding: "8px 0",
//               }}
//             >
//               <div
//                 style={{
//                   padding: "8px 16px",
//                   cursor: "pointer",
//                   fontSize: 14,
//                   fontWeight: 500,
//                   color: "#0a2540",
//                 }}
//                 onClick={() => handleRedirect("Admin/app/login")}
//                 onMouseEnter={(e) =>
//                   ((e.target as HTMLDivElement).style.backgroundColor =
//                     "#f2f2f2")
//                 }
//                 onMouseLeave={(e) =>
//                   ((e.target as HTMLDivElement).style.backgroundColor = "#fff")
//                 }
//               >
//                 For Doctors
//               </div>
//               <div
//                 style={{
//                   padding: "8px 16px",
//                   cursor: "pointer",
//                   fontSize: 14,
//                   fontWeight: 500,
//                   color: "#0a2540",
//                 }}
//                 onClick={() => handleRedirect("Admin/app/login")}
//                 onMouseEnter={(e) =>
//                   ((e.target as HTMLDivElement).style.backgroundColor =
//                     "#f2f2f2")
//                 }
//                 onMouseLeave={(e) =>
//                   ((e.target as HTMLDivElement).style.backgroundColor = "#fff")
//                 }
//               >
//                 For Patients
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface headerProps {
  showSearch?: boolean;
  setShowSearch?: (show: boolean) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const Header: React.FC<headerProps> = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);

  // Handle responsive check
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRedirect = (path: string) => {
    router.push(path);
    setLoginDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        padding: "0px 24px",
        background: "#fff",
        boxShadow: "0 2px 8px #f0f1f2",
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src="/images/vydh_logo.png"
          alt="Logo"
          style={{
            width: isMobile ? 80 : 120,
            height: isMobile ? 80 : 120,
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      </div>

      {/* Hamburger for Mobile */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{
            background: "transparent",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#333",
          }}
        >
          ☰
        </button>
      )}

      {/* Desktop & Mobile Nav */}
      {(menuOpen || !isMobile) && (
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 12 : 16,
            alignItems: isMobile ? "flex-start" : "center",
            marginTop: isMobile ? 12 : 0,
            width: isMobile ? "100%" : "auto",
          }}
        >
          {/* ABHA */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #ff6b35, #f7931e)",
              color: "#fff",
              border: "none",
              borderRadius: 20,
              padding: "8px 16px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(255,107,53,0.2)",
            }}
          >
            <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM19 7V9H15V23H13V16H11V23H9V9H5V7H19Z" />
            </svg>
            ABHA
          </button>

          {/* For Partners */}
          <button
            style={{
              background: "transparent",
              color: "#0a2540",
              border: "2px solid #e0e0e0",
              borderRadius: 20,
              padding: "6px 14px",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            For Partners
          </button>

          {/* Download App */}
          <button
            style={{
              background: "transparent",
              color: "#0a2540",
              border: "2px solid #e0e0e0",
              borderRadius: 20,
              padding: "6px 14px",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Download the App
          </button>

          {/* Login Dropdown */}
          <div ref={loginRef} style={{ position: "relative" }}>
            <div
              onClick={() => setLoginDropdownOpen((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px",
                background: "#f8f9fa",
                borderRadius: 24,
                border: "1px solid #e9ecef",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0a2540",
                }}
              >
                Login
              </span>
              <svg
                width="12"
                height="12"
                fill="none"
                stroke="#6c757d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 8 11 10 9" />
              </svg>
            </div>

            {loginDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 6,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 8,
                  zIndex: 999,
                  minWidth: 160,
                  padding: "8px 0",
                }}
              >
                <div
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#0a2540",
                  }}
                  onClick={() => handleRedirect("LandingPage/advertisingDoctors")}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLDivElement).style.backgroundColor =
                      "#f2f2f2")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLDivElement).style.backgroundColor =
                      "#fff")
                  }
                >
                  For Doctors
                </div>
                <div
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#0a2540",
                  }}
                  onClick={() => handleRedirect("Admin/app/login/")}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLDivElement).style.backgroundColor =
                      "#f2f2f2")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLDivElement).style.backgroundColor =
                      "#fff")
                  }
                >
                  For Patients
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
