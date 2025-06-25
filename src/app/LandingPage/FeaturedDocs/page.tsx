"use client";
import React, { useRef, useEffect, useState } from "react";

const doctors = [
  {
    name: "Dr. Rajesh Sharma",
    specialty: "Psychologist",
    location: "Delhi, India",
    duration: "30 Min",
    rating: 5.0,
    fee: 1500,
    available: true,
    image: "/images/doc1.jpeg",
  },
  {
    name: "Dr. Priya Patel",
    specialty: "Pediatrician",
    location: "Mumbai, India",
    duration: "60 Min",
    rating: 4.6,
    fee: 1200,
    available: true,
    image: "/images/doc3.jpeg",
  },
  {
    name: "Dr. Amit Kumar",
    specialty: "Neurologist",
    location: "Bangalore, India",
    duration: "30 Min",
    rating: 4.8,
    fee: 2000,
    available: true,
    image: "/images/doctor.jpg",
  },
  {
    name: "Dr. Ananya Gupta",
    specialty: "Cardiologist",
    location: "Hyderabad, India",
    duration: "30 Min",
    rating: 4.8,
    fee: 1800,
    available: true,
    image: "/images/doc3.jpeg",
  },
  {
    name: "Dr. Sanjay Verma",
    specialty: "Dermatologist",
    location: "Chennai, India",
    duration: "45 Min",
    rating: 4.7,
    fee: 1600,
    available: true,
    image: "/images/doc1.jpeg",
  },
  {
    name: "Dr. Neha Singh",
    specialty: "Gynecologist",
    location: "Kolkata, India",
    duration: "60 Min",
    rating: 4.9,
    fee: 1900,
    available: true,
    image: "/images/doc3.jpeg",
  },
  {
    name: "Dr. Vikram Joshi",
    specialty: "Orthopedic Surgeon",
    location: "Pune, India",
    duration: "45 Min",
    rating: 4.8,
    fee: 2200,
    available: true,
    image: "/images/doc1.jpeg",
  },
  {
    name: "Dr. Meera Nair",
    specialty: "ENT Specialist",
    location: "Ahmedabad, India",
    duration: "30 Min",
    rating: 4.5,
    fee: 1400,
    available: true,
    image: "/images/doc2.jpeg",
  },
];

const FeaturedDocs: React.FC = () => {
  const doctorsContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(300); // 280px card + 20px gap

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
        setCardWidth(300);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
        setCardWidth(300);
      } else if (window.innerWidth < 1280) {
        setVisibleCards(3);
        setCardWidth(300);
      } else {
        setVisibleCards(4);
        setCardWidth(300);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < doctors.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      style={{
        background: "#f8fafd",
        minHeight: "100vh",
        paddingBottom: 60,
        fontFamily: "'Inter', sans-serif",

        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginTop: 24,
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <span
          style={{
            background: "#00203f",
            backdropFilter: "blur(10px)",
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 20,
            padding: "8px 20px",
            display: "inline-block",
            marginBottom: 20,
            boxShadow: "0 4px 15px rgba(66, 133, 244, 0.3)",
          }}
        >
          • Accessibility •
        </span>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            color: "#0a2540",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Our Doctors
        </h1>
      </div>

      {/* Carousel Container */}
      <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 32,
          marginBottom: 32,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          ref={doctorsContainerRef}
          style={{
            display: "flex",
            gap: 20,
            transform: `translateX(-${currentIndex * cardWidth}px)`,
            transition: "transform 0.5s ease-in-out",
            width: `${doctors.length * cardWidth}px`,
          }}
        >
          {doctors.map((doc, idx) => (
            <div
              key={`${doc.name}-${idx}`}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                width: 280,
                minWidth: 280,
                overflow: "hidden",
                border: "1px solid #e3e8ee",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: 180,
                  background: "#f3f6fa",
                }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "#ff5722",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontWeight: 600,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="#fff"
                    style={{ marginRight: 2 }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  {doc.rating}
                </span>
                <button
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="#e53e3e"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              <div
                style={{
                  padding: 20,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      color: "#1976d2",
                      fontWeight: 500,
                      fontSize: 14,
                      borderLeft: "3px solid #1976d2",
                      paddingLeft: 8,
                    }}
                  >
                    {doc.specialty}
                  </span>
                  {doc.available && (
                    <span
                      style={{
                        color: "#22c55e",
                        background: "#e7fbe9",
                        borderRadius: 6,
                        fontSize: 12,
                        padding: "4px 8px",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#22c55e",
                          animation: "pulse 2s infinite",
                        }}
                      ></div>
                      Available
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 8,
                    color: "#1a365d",
                    lineHeight: 1.2,
                  }}
                >
                  {doc.name}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 14,
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="#64748b"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {doc.location}
                  <span style={{ fontSize: 16, color: "#bdbdbd" }}>•</span>
                  {doc.duration}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 14,
                        marginBottom: 4,
                      }}
                    >
                      Consultation Fees
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 20,
                        color: "#ff5722",
                      }}
                    >
                      Rs{doc.fee}
                    </div>
                  </div>
                  <button
                    style={{
                      background: "#1a365d",
                      color: "#fff",
                      border: "none",
                      borderRadius: 24,
                      padding: "8px 15px",
                      fontWeight: 500,
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2d3748";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(26, 54, 93, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#1a365d";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      style={{ display: "block" }}
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="16"
                        rx="4"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 3v4M8 3v4M3 9h18"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="13" r="1.5" fill="#fff" />
                      <circle cx="12" cy="13" r="1.5" fill="#fff" />
                      <circle cx="16" cy="13" r="1.5" fill="#fff" />
                    </svg>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          style={{
            background: currentIndex === 0 ? "#e2e8f0" : "#1a365d",
            color: currentIndex === 0 ? "#64748b" : "#fff",
            border: "none",
            borderRadius: "50%",
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            transform: currentIndex === 0 ? "scale(0.9)" : "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (currentIndex !== 0) {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(26, 54, 93, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (currentIndex !== 0) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }
          }}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= doctors.length - visibleCards}
          style={{
            background:
              currentIndex >= doctors.length - visibleCards
                ? "#e2e8f0"
                : "#1a365d",
            color:
              currentIndex >= doctors.length - visibleCards
                ? "#64748b"
                : "#fff",
            border: "none",
            borderRadius: "50%",
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor:
              currentIndex >= doctors.length - visibleCards
                ? "not-allowed"
                : "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            transform:
              currentIndex >= doctors.length - visibleCards
                ? "scale(0.9)"
                : "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (currentIndex < doctors.length - visibleCards) {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(26, 54, 93, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (currentIndex < doctors.length - visibleCards) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }
          }}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      </div>

      {/* Progress Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        {Array.from({ length: doctors.length - visibleCards + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: currentIndex === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              background: currentIndex === i ? "#1a365d" : "#e2e8f0",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedDocs;
