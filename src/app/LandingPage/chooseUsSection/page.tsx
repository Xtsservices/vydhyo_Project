"use client";

import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  CalendarOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: <CalendarOutlined />,
    title: "Real-time bookings & instant confirmation",
    description:
      "Schedule appointments with verified healthcare providers and receive immediate confirmation, saving precious time.",
    iconBgColor: "#8b5cf6",
    iconColor: "white",
  },
  {
    icon: <MedicineBoxOutlined />,
    title: "Local verified doctors & providers you can trust",
    description:
      "Every healthcare professional on our platform undergoes thorough verification for your peace of mind.",
    iconBgColor: "#10b981",
    iconColor: "white",
  },
  {
    icon: <TeamOutlined />,
    title: "Vernacular language support",
    description:
      "Navigate healthcare in your preferred language, making quality care accessible to everyone.",
    iconBgColor: "#22d3ee",
    iconColor: "white",
  },
  {
    icon: <LineChartOutlined />,
    title: "Integrated services & seamless payments",
    description:
      "Access multiple healthcare needs through one platform with hassle-free payment options.",
    iconBgColor: "#f97316",
    iconColor: "white",
  },
];

const ChooseUsSection: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [currentFlipIndex, setCurrentFlipIndex] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counterValues, setCounterValues] = useState({
    hospitals: 0,
    doctors: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentFlipIndex((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView, features.length]);

  useEffect(() => {
    if (!isInView) {
      setCounterValues({ hospitals: 0, doctors: 0 });
      return;
    }

    const targetValues = {
      hospitals: 50,
      doctors: 100,
    };

    const startCounters = () => {
      setCountersStarted(true);

      const duration = 3000;
      const startTime = Date.now();
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setCounterValues({
          hospitals: Math.floor(easedProgress * targetValues.hospitals),
          doctors: Math.floor(easedProgress * targetValues.doctors),
        });

        if (now < endTime) {
          requestAnimationFrame(animate);
        } else {
          setCounterValues(targetValues);
          setTimeout(() => {
            setCounterValues({ hospitals: 0, doctors: 0 });
            setTimeout(startCounters, 500);
          }, 3000);
        }
      };

      requestAnimationFrame(animate);
    };

    startCounters();

    return () => {
      setCountersStarted(false);
    };
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
      },
    },
  };

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    back: {
      rotateY: 180,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    front: { opacity: 1 },
    back: { opacity: 0 },
  };

  const backContentVariants = {
    front: { opacity: 0 },
    back: { opacity: 1 },
  };

  return (
    <motion.div
      style={sectionStyle}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
    >
      <div
        style={{
          ...containerStyle,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Left side */}
        <motion.div
          style={{ ...leftContentStyle, width: isMobile ? "100%" : "auto" }}
        >
          <motion.div style={pillStyle} variants={itemVariants}>
            <div style={pillIconStyle}>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span style={pillTextStyle}>Why Choose Vydhyo</span>
          </motion.div>

          <motion.h2
            style={{ ...headerStyle, fontSize: isMobile ? "2rem" : "2.5rem" }}
            variants={itemVariants}
          >
            Trusted By Healthcare Providers
          </motion.h2>

          <motion.p
            style={{ ...subHeaderStyle, maxWidth: isMobile ? "100%" : "440px" }}
            variants={itemVariants}
          >
            Vydhyo is a comprehensive doctor appointment and clinic management
            platform designed to streamline your practice, enhance patient
            experience, and boost operational efficiency.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Row
              gutter={[16, 16]}
              style={{ marginTop: 32 }}
              justify={isMobile ? "center" : "start"}
            >
              <Col
                xs={24}
                sm={8}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <motion.div
                  style={statBoxStyle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={statNumberStyle}>
                    {counterValues.hospitals}
                    <span style={plusStyle}>+</span>
                  </span>
                  <p style={statLabelStyle}>Partner Hospitals</p>
                  <p style={statSubLabelStyle}>
                    Leading healthcare institutions across multiple cities
                  </p>
                </motion.div>
              </Col>
              <Col
                xs={24}
                sm={8}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <motion.div
                  style={statBoxStyle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={statNumberStyle}>
                    {counterValues.doctors}
                    <span style={plusStyle}>+</span>
                  </span>
                  <p style={statLabelStyle}>Verified Doctors</p>
                  <p style={statSubLabelStyle}>
                    Specialists across numerous medical fields
                  </p>
                </motion.div>
              </Col>
              <Col
                xs={24}
                sm={8}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <motion.div
                  style={statBoxStyle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={statNumberStyle}>24/7</span>
                  <p style={statLabelStyle}>Support Available</p>
                  <p style={statSubLabelStyle}>
                    Round-the-clock assistance for all users
                  </p>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </motion.div>

        {/* Right side */}
        <div
          style={{
            ...rightContentStyle,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            width: "100%",
            marginTop: isMobile ? "2rem" : 0,
          }}
        >
          {features.map((feature, index) => {
            const isHovered = hoverIndex === index;
            const isFlipping = currentFlipIndex === index && isInView;

            return (
              <motion.div
                key={index}
                style={{
                  position: "relative",
                  overflow: "visible", // Changed from "hidden" to "visible" to prevent content cutting off
                  borderRadius: 12,
                  perspective: "1000px",
                  width: "100%",
                  height: "240px", // Fixed height to prevent dimension changes during flip
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                variants={itemVariants}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.8,
                  ease: [0.16, 0.77, 0.47, 0.97],
                }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: isHovered ? "100%" : 0,
                    background:
                      "linear-gradient(to top, #0ea5e9 0%, #3b82f6 100%)",
                    transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 1,
                    borderRadius: 12, // Added to match parent's borderRadius
                  }}
                  animate={{
                    height: isHovered ? "100%" : 0,
                  }}
                />

                <motion.div
                  style={{
                    ...cardStyle,
                    position: "absolute", // Changed to absolute positioning
                    zIndex: 2,
                    background: "#0f172a",
                    color: isHovered ? "white" : "#cbd5e1",
                    border: "none",
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "100%", // Takes full height of parent
                    borderRadius: 12,
                  }}
                  animate={isFlipping ? "back" : "front"}
                  variants={flipVariants}
                >
                  {/* Front Content */}
                  <motion.div
                    style={{
                      padding: "24px",
                      textAlign: "left",
                      backfaceVisibility: "hidden",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 12,
                      overflow: "hidden", // Contain content within the card
                    }}
                    variants={contentVariants}
                    animate={isFlipping ? "back" : "front"}
                  >
                    <div>
                      <motion.div
                        style={{
                          ...iconWrapperStyle,
                          backgroundColor: isHovered
                            ? "white"
                            : feature.iconBgColor,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        animate={{
                          backgroundColor: isHovered
                            ? "white"
                            : feature.iconBgColor,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {React.cloneElement(
                          feature.icon as React.ReactElement<{
                            style?: React.CSSProperties;
                          }>,
                          {
                            style: {
                              ...(
                                feature.icon as React.ReactElement<{
                                  style?: React.CSSProperties;
                                }>
                              ).props.style,
                              color: isHovered ? "#3b82f6" : feature.iconColor,
                              fontSize: 24,
                            },
                          }
                        )}
                      </motion.div>
                      <h3
                        style={{
                          ...cardTitleStyle,
                          color: isHovered ? "white" : "#cbd5e1",
                        }}
                      >
                        {feature.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        ...cardDescStyle,
                        color: isHovered ? "white" : "#94a3b8",
                        marginBottom: 0,
                      }}
                    >
                      {feature.description}
                    </p>
                  </motion.div>

                  {/* Back Content */}
                  <motion.div
                    style={{
                      padding: "24px",
                      textAlign: "center",
                      backfaceVisibility: "hidden",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "#1e293b",
                      transform: "rotateY(180deg)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 12,
                      overflow: "hidden", // Contain content within the card
                    }}
                    variants={backContentVariants}
                    animate={isFlipping ? "back" : "front"}
                  >
                    <motion.div
                      style={{
                        ...iconWrapperStyle,
                        backgroundColor: "#3b82f6",
                        marginBottom: 20,
                      }}
                    >
                      {React.cloneElement(
                        feature.icon as React.ReactElement<{
                          style?: React.CSSProperties;
                        }>,
                        {
                          style: {
                            ...(
                              feature.icon as React.ReactElement<{
                                style?: React.CSSProperties;
                              }>
                            ).props.style,
                            color: "white",
                            fontSize: 24,
                          },
                        }
                      )}
                    </motion.div>
                    <h3 style={{ ...cardTitleStyle, color: "white" }}>
                      {feature.title}
                    </h3>
                    <p style={{ ...cardDescStyle, color: "#e2e8f0" }}>
                      Learn more about this feature
                    </p>
                    <motion.button
                      style={{
                        marginTop: 16,
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        background:
                          "linear-gradient(to right, #3b82f6, #1d4ed8)",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: "#0a132d",
  padding: "6rem 1rem",
  color: "white",
  fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
  backgroundImage:
    "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
  overflow: "hidden",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "flex",
  gap: 40,
  padding: "0 1rem",
  width: "100%",
  boxSizing: "border-box",
};

const leftContentStyle: React.CSSProperties = {
  flex: "1 1 400px",
  maxWidth: 480,
};

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 9999,
  padding: "8px 20px",
  border: "2px solid #8b5cf6",
  backgroundColor: "white",
  width: "fit-content",
  fontWeight: 600,
  fontSize: 14,
  color: "#4b5563",
  marginBottom: 16,
  userSelect: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const pillIconStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#8b5cf6",
  width: 20,
  height: 20,
};

const pillTextStyle: React.CSSProperties = {
  color: "#4b5563",
  fontWeight: 600,
};

const headerStyle: React.CSSProperties = {
  fontWeight: 800,
  margin: "16px 0 24px",
  color: "white",
  lineHeight: 1.2,
  background: "linear-gradient(90deg, #ffffff, #cbd5e1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const subHeaderStyle: React.CSSProperties = {
  fontSize: "1.125rem",
  color: "#a1a9bb",
  lineHeight: 1.6,
  marginBottom: "1.5rem",
};

const statBoxStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "rgba(30, 58, 138, 0.2)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  width: "100%",
  maxWidth: "300px",
  minHeight: "160px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const statNumberStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 700,
  color: "white",
  userSelect: "none",
  background: "linear-gradient(90deg, #3b82f6, #93c5fd)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const plusStyle: React.CSSProperties = {
  color: "#f43f5e",
  fontWeight: 700,
  marginLeft: 4,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#cbd5e1",
  marginTop: 8,
  fontWeight: 500,
};

const statSubLabelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#94a3b8",
  marginTop: 4,
  fontWeight: 400,
  lineHeight: 1.4,
};

const rightContentStyle: React.CSSProperties = {
  display: "grid",
  gap: 24,
  flex: "1 1 400px",
  width: "100%",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  borderRadius: 12,
  cursor: "pointer",
  transition: "all 0.3s ease",
  transformStyle: "preserve-3d",
};

const iconWrapperStyle: React.CSSProperties = {
  borderRadius: 12,
  width: 48,
  height: 48,
  marginBottom: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s ease",
};

const cardTitleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 12,
  color: "#cbd5e1",
  transition: "all 0.3s ease",
};

const cardDescStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "#94a3b8",
  transition: "all 0.3s ease",
};

export default ChooseUsSection;
