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
                  onClick={() => handleRedirect("Admin/app/login")}
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
