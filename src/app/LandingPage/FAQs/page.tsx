"use client";

import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus, FiCheck, FiShield, FiLock } from "react-icons/fi";

const privacyPolicySections = [
  {
    question: "1. Information We Collect",
    answer: `We collect the following types of information:

A. Personal Information
• Name, gender, date of birth
• Phone number, email address, postal address
• Government-issued IDs (as required for verification)

B. Health Information
• Medical history, reports, prescriptions
• Appointment records
• Diagnostic and consultation data

C. Device & Usage Information
• IP address, browser type, device identifiers
• App usage data and interaction logs

D. Location Information
• Real-time location (for ambulance services, nearest providers, etc.)`,
  },
  {
    question: "2. How We Use Your Information",
    answer: `We use your data to:
• Enable doctor and diagnostic bookings
• Provide ambulance and blood bank access
• Coordinate home healthcare services
• Maintain medical history for continuity of care
• Improve user experience and offer personalized services
• Process payments and issue invoices
• Ensure regulatory compliance and audit readiness`,
  },
  {
    question: "3. Data Sharing and Disclosure",
    answer: `We do not sell or rent your personal data. Your information may only be shared with:
• Verified hospitals, doctors, diagnostic labs, and ambulances for service fulfillment
• Our internal support and tech teams (bound by strict confidentiality)
• Government authorities if mandated by law or in emergency situations`,
  },
  {
    question: "4. Your Rights",
    answer: `You have full control over your data. You can:
• Access and review your data anytime
• Request corrections or deletions
• Withdraw consent and deactivate your account
• Download your data in portable format

To exercise these rights, email us at privacy@vydyo.in`,
  },
  {
    question: "5. Data Retention",
    answer: `We retain your information only as long as necessary for:
• Legal, regulatory, or operational reasons
• Providing uninterrupted healthcare continuity

Inactive user data is securely deleted after [X years] or upon formal request.`,
  },
  {
    question: "6. Security Measures",
    answer: `We use bank-grade encryption, secure cloud infrastructure, and industry-standard protocols:
• End-to-end encryption (TLS 1.3)
• Role-based access control and audit logs
• ISO/IEC 27001 certified systems
• HIPAA-compliant data handling`,
  },
  {
    question: "7. Cookies and Tracking",
    answer: `We use minimal cookies for:
• Analytics and performance improvement
• Remembering user preferences

You can disable cookies via your browser without affecting core functionality.`,
  },
  {
    question: "8. Third-Party Services",
    answer:
      "Some services may be integrated via trusted third parties (e.g., payment gateways). We ensure these partners meet equivalent data privacy and security standards.",
  },
  {
    question: "9. Children's Privacy",
    answer:
      "VYDYO is not intended for users under the age of 18 without parental/guardian consent. We do not knowingly collect data from minors.",
  },
  {
    question: "10. Grievance Officer",
    answer: `Name: 
Email: grievance@vydyo.in
Contact: +91-XXXXXXXXXX
Address: VYDYO HealthTech Pvt Ltd, Hall Mark Sunny Side, Manchirevula, Hyderabad, Telangana, India`,
  },
  {
    question: "11. Policy Updates",
    answer:
      "We may revise this Privacy Policy to reflect legal or business changes. Users will be notified via app/website or email. Continued use of VYDYO implies consent to the updated policy.",
  },
];

const PrivacyPolicy: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <div style={{ marginBottom: 12 }}>
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
              PRIVACY POLICY
            </span>
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Your Data Privacy Matters
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: 16,
              lineHeight: 1.5,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            At VYDYO, we are committed to protecting your personal and health
            information with the highest security standards. This policy
            explains how we collect, use, and safeguard your data.
          </p>
        </div>

        {/* Privacy Policy Sections */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: 40,
          }}
        >
          {privacyPolicySections.map((section, idx) => (
            <div
              key={idx}
              style={{
                borderBottom:
                  idx !== privacyPolicySections.length - 1
                    ? "1px solid #e2e8f0"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  padding: "20px 24px",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#3b82f6",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#1e293b",
                    }}
                  >
                    {section.question}
                  </span>
                </div>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: openIndex === idx ? "#3b82f6" : "#f1f5f9",
                    color: openIndex === idx ? "#fff" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                >
                  {openIndex === idx ? (
                    <FiMinus size={14} />
                  ) : (
                    <FiPlus size={14} />
                  )}
                </div>
              </div>
              {openIndex === idx && section.answer && (
                <div
                  style={{
                    color: "#475569",
                    fontSize: 15,
                    lineHeight: 1.6,
                    padding: "0 24px 24px 64px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: 32,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "#3b82f6",
            }}
          >
            <FiShield size={24} />
          </div>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 12,
            }}
          >
            🔒 Built for Trust. Powered by Compliance.
          </h3>
          <p
            style={{
              color: "#64748b",
              fontSize: 16,
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            We stand for transparency, security, and patient rights.
            <br />
            Thank you for trusting VYDYO with your healthcare journey.
          </p>

          {/* Compliance Badges */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: "#dcfce7",
                borderRadius: 20,
                border: "1px solid #bbf7d0",
              }}
            >
              <FiCheck size={16} color="#16a34a" />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#16a34a",
                }}
              >
                ISO 27001 Certified
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: "#dbeafe",
                borderRadius: 20,
                border: "1px solid #93c5fd",
              }}
            >
              <FiShield size={16} color="#2563eb" />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#2563eb",
                }}
              >
                HIPAA Compliant
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: "#fef3c7",
                borderRadius: 20,
                border: "1px solid #fcd34d",
              }}
            >
              <FiLock size={16} color="#d97706" />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#d97706",
                }}
              >
                256-bit Encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
