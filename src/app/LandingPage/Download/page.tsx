import React from "react";

const Download: React.FC = () => {
  return (
    <div
      style={{
        background: "linear-gradient(90deg,rgb(0, 32, 63) 0%, #00203f 100%)",
        borderRadius: "40px",
        padding: "10px 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0px auto",
        maxWidth: "1400px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Decorative shapes */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 400,
          height: 400,
          zIndex: 0,
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M100 100C100 44.7715 144.771 0 200 0C255.229 0 300 44.7715 300 100C300 155.229 255.229 200 200 200C144.771 200 100 155.229 100 100Z"
          fill="#fff"
          fillOpacity="0.12"
        />
      </svg>
      <svg
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 350,
          height: 350,
          zIndex: 0,
        }}
        viewBox="0 0 350 350"
        fill="none"
      >
        <ellipse
          cx="175"
          cy="175"
          rx="175"
          ry="100"
          fill="#fff"
          fillOpacity="0.09"
        />
      </svg>

      {/* Left Content */}
      <div
        style={{
          flex: 1,
          zIndex: 1,
          paddingLeft: 60,
          minWidth: 400,
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            color: "#0E82FD",
            borderRadius: 16,
            padding: "7px 20px",
            fontWeight: 600,
            fontSize: 14,
            display: "inline-block",
            marginBottom: 15,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          GET THE APP
        </div>
        <h1
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 34,
            marginBottom: 20,
            lineHeight: 1.1,
          }}
        >
          Coming soon Vydhyo - India's
          <br />
          Trusted Doctors App!
        </h1>
        <p
          style={{
            color: "#e6f7ff",
            fontSize: 18,
            marginBottom: 32,
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          Connect with 10,000+ verified doctors across India. Book instant video
          consultations, order medicines, get lab tests done, and access your
          health records - all in one app. Available in Hindi, English, and 8
          other Indian languages.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.vydhyo.patient"
            target="_blank"
            rel="noopener noreferrer"
            style={{ transition: "transform 0.3s ease" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              style={{ height: 48, borderRadius: 8 }}
            />
          </a>
          <a
            href="https://apps.apple.com/in/app/vydhyo-doctors/id123456789"
            target="_blank"
            rel="noopener noreferrer"
            style={{ transition: "transform 0.3s ease" }}
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              style={{ height: 48, borderRadius: 8 }}
            />
          </a>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 24,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: 8 }}
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12L15 15"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            24x7 Doctor Support
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: 8 }}
            >
              <path
                d="M22 12H18L15 21L9 3L6 12H2"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ₹0 Consultation Fee*
          </div>
        </div>
      </div>

      {/* Right Content: App Screenshots */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 24,
          zIndex: 1,
          minWidth: 400,
          paddingRight: 60,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80"
          alt="Vydhyo App Screenshot"
          style={{
            height: 420,
            borderRadius: 32,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            marginRight: -40,
            background: "#fff",
            border: "8px solid #fff",
            transform: "rotate(-5deg)",
            transition: "transform 0.3s ease",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1584634731339-252c58ab6554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80"
          alt="Vydhyo App Screenshot"
          style={{
            height: 340,
            borderRadius: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            background: "#fff",
            border: "8px solid #fff",
            transform: "rotate(5deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default Download;
