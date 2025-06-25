"use client";
import React from "react";



const actions = [
    {
        label: "Book Appointment",
        icon: "📅",
        color: "#7B2FF2",
    },
    {
        label: "Talk to Doctors",
        icon: "👥",
        color: "#2196F3",
    },
    {
        label: "Hospitals & Clinics",
        icon: "🏥",
        color: "#E040FB",
    },
    {
        label: "Healthcare",
        icon: "💊",
        color: "#00BCD4",
    },
    {
        label: "Medicine & Supplies",
        icon: "🩺",
        color: "#7C4DFF",
    },
    {
        label: "Lab Testing",
        icon: "🧪",
        color: "#FF5722",
    },
    {
        label: "Home Care",
        icon: "🏠",
        color: "#009688",
    },
];

const TopSpecialities: React.FC = () => {
    return (
        <div
            style={{
                marginTop: "-5rem",
                position: 'relative',
                minHeight: "100vh",
                fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
                padding: "40px 20px",
                overflow: 'hidden',
                marginBottom: "-20rem",
            }}
        >
            {/* Blurred Background Layer */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)",
                    filter: 'blur(8px)',
                    zIndex: -1,
                    transform: 'scale(1.02)',
                }}
            />
            
            {/* Semi-transparent overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: -1,
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Top Actions */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: 24,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                        padding: "32px 40px",
                        margin: "0 auto",
                        maxWidth: 1200,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "20px",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    {actions.map((action) => (
                        <div
                            key={action.label}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flex: "1",
                                minWidth: "120px",
                                cursor: "pointer",
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <div
                                style={{
                                    background: action.color,
                                    borderRadius: "50%",
                                    width: 64,
                                    height: 64,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 12,
                                    boxShadow: `0 4px 16px ${action.color}40`,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "24px",
                                        filter: "brightness(0) invert(1)",
                                    }}
                                >
                                    {action.icon}
                                </span>
                            </div>
                            <span
                                style={{
                                    color: "#1A2C47",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    textAlign: "center",
                                    lineHeight: 1.3,
                                }}
                            >
                                {action.label}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TopSpecialities;