"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer
      style={{ background: "#f7fafd", position: "relative", marginTop: "40px" }}
    >
      <div
        style={{
          background: "linear-gradient(90deg, #00203f 0%, #00203f 100%)",
          borderRadius: "32px",
          margin: "0 auto",
          marginTop: "-40px",
          maxWidth: "1320px",
          padding: "48px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(10,142,253,0.08)",
        }}
      >
        <div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, margin: 0 }}>
            Working for Your{" "}
            <span style={{ color: "#fff" }}>Better Health.</span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                background: "#fff",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00203f",
                fontSize: "1.5rem",
              }}
            >
              <FontAwesomeIcon icon={faHeadphones} />
            </span>
            <div>
              <div style={{ fontWeight: 500 }}>Customer Support</div>
              <div style={{ fontWeight: 700 }}>+92 97612 34789</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                background: "#fff",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00203f",
                fontSize: "1.5rem",
              }}
            >
              <FontAwesomeIcon icon={faComment} />
            </span>
            <div>
              <div style={{ fontWeight: 500 }}>Drop Us an Email</div>
              <div style={{ fontWeight: 700 }}>info1256@example.com</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "64px 32px 32px 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          color: "#222",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, marginBottom: "16px" }}>Company</div>
          <div style={{ marginBottom: "8px" }}>About</div>
          <div style={{ marginBottom: "8px" }}>Features</div>
          <div style={{ marginBottom: "8px" }}>Works</div>
          <div style={{ marginBottom: "8px" }}>Careers</div>
          <div>Locations</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: "16px" }}>
            Treatments
          </div>
          <div style={{ marginBottom: "8px" }}>Dental</div>
          <div style={{ marginBottom: "8px" }}>Cardiac</div>
          <div style={{ marginBottom: "8px" }}>Spinal Cord</div>
          <div style={{ marginBottom: "8px" }}>Hair Growth</div>
          <div>Anemia &amp; Disorder</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: "16px" }}>
            Specialities
          </div>
          <div style={{ marginBottom: "8px" }}>Transplant</div>
          <div style={{ marginBottom: "8px" }}>Cardiologist</div>
          <div style={{ marginBottom: "8px" }}>Oncology</div>
          <div style={{ marginBottom: "8px" }}>Pediatrics</div>
          <div>Gynacology</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: "16px" }}>Utilities</div>
          <div style={{ marginBottom: "8px" }}>Pricing</div>
          <div style={{ marginBottom: "8px" }}>Contact</div>
          <div style={{ marginBottom: "8px" }}>Request A Quote</div>
          <div style={{ marginBottom: "8px" }}>Premium Membership</div>
          <div>Integrations</div>
        </div>
        <div style={{ minWidth: "320px" }}>
          <div style={{ fontWeight: 700, marginBottom: "16px" }}>
            Newsletter
          </div>
          <div style={{ fontSize: "15px", marginBottom: "12px" }}>
            Subscribe &amp; Stay Updated from the Doccure
          </div>
          <form style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="email"
              placeholder="Enter Email Address"
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "15px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#00203f",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Send
            </button>
          </form>
          <div style={{ marginTop: "32px" }}>
            <div style={{ fontWeight: 700, marginBottom: "12px" }}>
              Connect With Us
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="#" style={iconStyle}>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" style={iconStyle}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" style={iconStyle}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" style={iconStyle}>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" style={iconStyle}>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          padding: "16px 0",
          background: "#eaf3fb",
          fontSize: "15px",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
          }}
        >
          <div>Copyright © 2025 Doccure. All Rights Reserved</div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a href="#" style={linkStyle}>
              Legal Notice
            </a>
            <span>•</span>
            <a href="#" style={linkStyle}>
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" style={linkStyle}>
              Refund Policy
            </a>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <img
              src="https://img.icons8.com/color/32/000000/visa.png"
              alt="Visa"
            />
            <img
              src="https://img.icons8.com/color/32/000000/amex.png"
              alt="Amex"
            />
            <img
              src="https://img.icons8.com/color/32/000000/discover.png"
              alt="Discover"
            />
            <img
              src="https://img.icons8.com/color/32/000000/stripe.png"
              alt="Stripe"
            />
            <img
              src="https://img.icons8.com/color/32/000000/paypal.png"
              alt="Paypal"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

const iconStyle: React.CSSProperties = {
  background: "#f7fafd",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#00203f",
  fontSize: "1.25rem",
  textDecoration: "none",
};

const linkStyle: React.CSSProperties = {
  color: "#00203f",
  textDecoration: "none",
  fontWeight: 500,
};

export default Footer;
