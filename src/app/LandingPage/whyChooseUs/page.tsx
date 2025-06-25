import React, { useEffect, useState } from "react";

const reasons = [
  {
    icon: (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          background: "#FEE4DB",
          borderRadius: "50%",
          marginRight: 12,
        }}
      >
        <svg width="16" height="16" fill="none">
          <rect width="16" height="16" rx="8" fill="#F97316" />
          <path
            d="M8 4.5V8M8 11H8.007M12 8A4 4 0 1 1 4 8a4 4 0 0 1 8 0Z"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ),
    title: "Follow-Up Care",
    description:
      "We ensure continuity of care through regular follow-ups and communication, helping you stay on track with health goals.",
  },
  {
    icon: (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          background: "#E9E7FD",
          borderRadius: "50%",
          marginRight: 12,
        }}
      >
        <svg width="16" height="16" fill="none">
          <rect width="16" height="16" rx="8" fill="#7C3AED" />
          <circle cx="8" cy="8" r="3" stroke="#fff" strokeWidth="1.2" />
        </svg>
      </span>
    ),
    title: "Patient-Centered Approach",
    description:
      "We prioritize your comfort and preferences, tailoring our services to meet your individual needs and care from our experts.",
  },
  {
    icon: (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          background: "#D1F5F9",
          borderRadius: "50%",
          marginRight: 12,
        }}
      >
        <svg width="16" height="16" fill="none">
          <rect width="16" height="16" rx="8" fill="#06B6D4" />
          <path
            d="M8 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 8c0 2.5-4 5-4 5s-4-2.5-4-5a4 4 0 1 1 8 0Z"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ),
    title: "Convenient Access",
    description:
      "Easily book appointments online or through our customer service team, with flexible hours to fit your schedule.",
  },
];

const WhyChooseUs: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;

  // Layout styles
  const getLayoutStyle = () => {
    if (isMobile) {
      return { flexDirection: "column", gap: 24 };
    } else if (isTablet) {
      return {
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: 24,
        columnGap: 32,
      };
    } else {
      return {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 32,
      };
    }
  };

  const getItemStyle = (idx: number) => {
    let style: React.CSSProperties = {
      flex: isMobile ? "1 1 100%" : isTablet ? "1 1 45%" : "1",
      textAlign: "left",
      padding: "0 16px",
      minHeight: 180,
    };

    if (!isMobile && idx !== 0) {
      style.borderLeft = "1px dashed #E5E7EB";
    }

    return style;
  };

  return (
    <section
      style={{
        background: "#fff",
        padding: "64px 0 0 0",
        borderBottom: "8px solid #0A2240",
        marginTop: -8,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 32px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <button
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
            • Why Book With Us •
          </button>
        </div>
        <h2
          style={{
            fontSize: isMobile ? 28 : 40,
            fontWeight: 700,
            color: "#0A2240",
            marginBottom: 48,
            letterSpacing: "-1px",
          }}
        >
          Compelling Reasons to Choose
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            maxWidth: 1200,
          }}
        >
          {reasons.map((reason, idx) => (
            <div key={reason.title} style={getItemStyle(idx)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                {reason.icon}
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#0A2240",
                  }}
                >
                  {reason.title}
                </span>
              </div>
              <p
                style={{
                  color: "#334155",
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
