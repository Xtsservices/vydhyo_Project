"use client";

import React, { useRef, useState } from "react";

const specialities = [
  {
    name: "General Physician",
    doctors: 254,
    icon: "👩‍⚕️",
    bg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Sexologist",
    doctors: 89,
    icon: "❤️",
    bg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Paediatrician",
    doctors: 176,
    icon: "👶",
    bg: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Gynecologist",
    doctors: 124,
    icon: "👩‍⚕️",
    bg: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Orthopedics",
    doctors: 151,
    icon: "🦴",
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Pulmonologist",
    doctors: 83,
    icon: "🫁",
    bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Dermatologist",
    doctors: 112,
    icon: "🌟",
    bg: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Psychiatrist",
    doctors: 67,
    icon: "🧘",
    bg: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "ENT",
    doctors: 95,
    icon: "👂",
    bg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Ophthalmologist",
    doctors: 78,
    icon: "👁️",
    bg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Dental",
    doctors: 134,
    icon: "🦷",
    bg: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Physiotherapy",
    doctors: 89,
    icon: "🏃‍♀️",
    bg: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Nutritionist",
    doctors: 56,
    icon: "🥗",
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Veterinary",
    doctors: 43,
    icon: "🐕",
    bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Ayurveda",
    doctors: 87,
    icon: "🌿",
    bg: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Homeopathy",
    doctors: 72,
    icon: "💊",
    bg: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Cardiologist",
    doctors: 156,
    icon: "❤️",
    bg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Neurologist",
    doctors: 98,
    icon: "🧠",
    bg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Nephrologist",
    doctors: 65,
    icon: "🏥",
    bg: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Urologist",
    doctors: 84,
    icon: "🩺",
    bg: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Oncologist",
    doctors: 73,
    icon: "🎗️",
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Rheumatologist",
    doctors: 47,
    icon: "🦴",
    bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Vascular Surgeon",
    doctors: 39,
    icon: "⚕️",
    bg: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Gastroenterologist",
    doctors: 91,
    icon: "🏥",
    bg: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "General Surgery",
    doctors: 127,
    icon: "🔪",
    bg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "CTVS",
    doctors: 24,
    icon: "❤️‍🩹",
    bg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Neurosurgeon",
    doctors: 31,
    icon: "🧠",
    bg: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Ortho Surgeon",
    doctors: 68,
    icon: "🦴",
    bg: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "ENT Surgeries",
    doctors: 52,
    icon: "👂",
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Eye Surgeries",
    doctors: 45,
    icon: "👁️",
    bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Dental Surgeries",
    doctors: 73,
    icon: "🦷",
    bg: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Plastic Surgery",
    doctors: 41,
    icon: "💫",
    bg: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Cancer Surgeries",
    doctors: 35,
    icon: "🎗️",
    bg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Bariatric Surgery",
    doctors: 28,
    icon: "⚖️",
    bg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Gyn & Obs",
    doctors: 102,
    icon: "👩‍⚕️",
    bg: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Physical Medicine & Rehabilitation",
    doctors: 37,
    icon: "🏥",
    bg: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Sports Medicine",
    doctors: 29,
    icon: "⚽",
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Transfusion Medicine",
    doctors: 18,
    icon: "🩸",
    bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
  {
    name: "Psychologist",
    doctors: 64,
    icon: "🧠",
    bg: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
  },
];

type Specialty = {
  name: string;
  doctors: number;
  icon: string;
  bg: string;
};

const SpecialtyCard = ({ spec, index }: { spec: Specialty; index: number }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFlipping, setIsFlipping] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsFlipping(true);

    // Stop the flip animation after one complete rotation
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "150px",
        height: "180px",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0,0,0,0.3)"
          : "0 8px 25px rgba(0,0,0,0.15)",
        flexShrink: 0,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image - No blur on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${spec.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 0.4s ease",
          filter: "brightness(0.8)",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered
            ? "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
          transition: "all 0.4s ease",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          zIndex: 2,
        }}
      >
        {/* Icon with Coin Flip Animation */}
        <div
          style={{
            position: "relative",
            width: "50px",
            height: "50px",
            marginBottom: "12px",
            background: "rgba(255,255,255,0.95)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFlipping ? "rotateY(360deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {spec.icon}
        </div>

        {/* Text Content */}
        <div style={{ textAlign: "center" }}>
          <h4
            style={{
              color: "white",
              fontWeight: 500,
              fontSize: "18px",
              margin: "0 0 6px 0",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            {spec.name}
          </h4>
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
              fontSize: "13px",
              margin: 0,
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {spec.doctors} Doctors
          </p>
        </div>

        {/* Hover Indicator */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(66, 133, 244, 0.9)",
              color: "white",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              animation: "fadeInUp 0.3s ease forwards",
            }}
          >
            View Doctors
          </div>
        )}
      </div>
    </div>
  );
};

const MedicalSpecialtiesCards = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 220 + 30; // reduced card width + gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < specialities.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        minHeight: "60vh",
        overflow: "hidden",
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Animated Background Elements */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Floating blur elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            background:
              "linear-gradient(45deg, rgba(66, 133, 244, 0.1), rgba(156, 39, 176, 0.1))",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float1 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "150px",
            height: "150px",
            background:
              "linear-gradient(45deg, rgba(255, 87, 34, 0.1), rgba(255, 193, 7, 0.1))",
            borderRadius: "50%",
            filter: "blur(30px)",
            animation: "float2 6s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "30%",
            width: "100px",
            height: "100px",
            background:
              "linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(0, 188, 212, 0.1))",
            borderRadius: "50%",
            filter: "blur(25px)",
            animation: "float3 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: "120px",
            height: "120px",
            background:
              "linear-gradient(45deg, rgba(233, 30, 99, 0.1), rgba(103, 58, 183, 0.1))",
            borderRadius: "50%",
            filter: "blur(35px)",
            animation: "float4 7s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "80%",
            left: "60%",
            width: "80px",
            height: "80px",
            background:
              "linear-gradient(45deg, rgba(255, 152, 0, 0.1), rgba(255, 87, 34, 0.1))",
            borderRadius: "50%",
            filter: "blur(20px)",
            animation: "float5 9s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Header Section */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <div>
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
            • Top Specialties •
          </span>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          marginBottom: "20px",
        }}
      >
        {/* Specialties Carousel */}
        <div
          ref={carouselRef}
          style={
            {
              display: "flex",
              gap: "30px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              padding: "10px 0",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties
          }
        >
          {specialities.map((spec, index) => (
            <div key={spec.name} style={{ scrollSnapAlign: "start" }}>
              <SpecialtyCard spec={spec} index={index} />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: "20px",
          }}
        >
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              background:
                currentIndex === 0
                  ? "rgba(226, 232, 240, 0.7)"
                  : "rgba(66, 133, 244, 0.9)",
              backdropFilter: "blur(10px)",
              color: currentIndex === 0 ? "#4a5568" : "#fff",
              fontSize: 18,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              opacity: currentIndex === 0 ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.background = "rgba(1, 35, 95, 0.9)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex > 0) {
                e.currentTarget.style.background = "rgba(66, 133, 244, 0.9)";
              }
            }}
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === specialities.length - 1}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              background:
                currentIndex === specialities.length - 1
                  ? "rgba(226, 232, 240, 0.7)"
                  : "rgba(66, 133, 244, 0.9)",
              backdropFilter: "blur(10px)",
              color:
                currentIndex === specialities.length - 1 ? "#4a5568" : "#fff",
              fontSize: 18,
              cursor:
                currentIndex === specialities.length - 1
                  ? "not-allowed"
                  : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              opacity: currentIndex === specialities.length - 1 ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentIndex < specialities.length - 1) {
                e.currentTarget.style.background = "rgba(42, 117, 243, 0.9)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex < specialities.length - 1) {
                e.currentTarget.style.background = "rgba(66, 133, 244, 0.9)";
              }
            }}
          >
            →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -20px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, -40px) rotate(180deg);
          }
          75% {
            transform: translate(-40px, 20px) rotate(270deg);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-25px, 15px) scale(1.1);
          }
          66% {
            transform: translate(20px, -30px) scale(0.9);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          20% {
            transform: translate(15px, -25px) rotate(72deg) scale(1.2);
          }
          40% {
            transform: translate(-30px, -10px) rotate(144deg) scale(0.8);
          }
          60% {
            transform: translate(-15px, 25px) rotate(216deg) scale(1.1);
          }
          80% {
            transform: translate(25px, 10px) rotate(288deg) scale(0.9);
          }
        }

        @keyframes float4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(35px, -35px) rotate(180deg);
          }
        }

        @keyframes float5 {
          0%,
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(-20px, 15px) scale(1.3) rotate(90deg);
          }
          50% {
            transform: translate(25px, -20px) scale(0.7) rotate(180deg);
          }
          75% {
            transform: translate(-15px, -25px) scale(1.1) rotate(270deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MedicalSpecialtiesCards;
