"use client";
import React, { useRef, useEffect } from "react";

const items = [
  "Multi Speciality Treatments & Doctors",
  "Lab Testing Services",
  "Medicines & Supplies",
  "Hospitals & Clinics",
  "Health Care Services",
  "Talk to Doctor",
];

const separator = (
  <span
    style={{
      display: "inline-block",
      width: 40,
      height: 2,
      background: "rgba(255,255,255,0.4)",
      borderRadius: 1,
      margin: "0 12px",
      verticalAlign: "middle",
    }}
  />
);

export default function ScrollingMenu() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;
    let scrollAmount = 0;

    const scrollSpeed = 0.8; // px per frame

    function animate() {
      if (!scrollContainer) return;
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate items for seamless infinite scroll
  const menuContent = (
    <>
      {items.map((item, idx) => (
        <React.Fragment key={item + idx}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#ffffff",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
          >
            {item}
          </span>
          {idx !== items.length - 1 && separator}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #00203f 0%, #00203f 100%)",
        padding: "10px 0",
        overflow: "hidden",
        width: "100%",
        position: "relative",
        height: "40px",
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          {menuContent}
        </div>
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          {menuContent}
        </div>
      </div>
    </div>
  );
}
