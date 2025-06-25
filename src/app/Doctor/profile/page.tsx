"use client";
import React from "react";
import AppHeader from "@/app/Admin/components/header";

const DoctorProfilePage = () => {
    return (
        <>
        <AppHeader />
        <div style={{ background: "#F6F8FB", minHeight: "100vh", fontFamily: "Inter, sans-serif", padding: 32 }}>
            {/* Header */}
            <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 4 }}>Doctor Profile</div>
            <div style={{ color: "#7D8597", fontSize: 14, marginBottom: 32 }}>
                View and manage your professional details
            </div>

            {/* Profile Card */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    padding: 32,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 32,
                }}
            >
                {/* Profile Image */}
                <div
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        overflow: "hidden",
                        marginRight: 24,
                        background: "#E6EAF3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="/images/doctor.jpg"
                        alt="Doctor"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                {/* Profile Info */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 22 }}>Dr. Karthik</span>
                        <span
                            style={{
                                background: "#E6F6EC",
                                color: "#2DB77A",
                                fontWeight: 600,
                                fontSize: 12,
                                borderRadius: 6,
                                padding: "2px 8px",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><circle cx="7" cy="7" r="7" fill="#2DB77A"/><path d="M10.2 5.2l-3.15 3.15-1.25-1.25" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Verified
                        </span>
                    </div>
                    <div style={{ color: "#7D8597", fontSize: 15, margin: "4px 0" }}>
                        Cardio Therapist <span style={{ margin: "0 8px" }}>•</span> City Heart Hospital <span style={{ margin: "0 8px" }}>•</span> New York, NY
                    </div>
                    <div style={{ color: "#7D8597", fontSize: 14, margin: "8px 0" }}>
                        Experienced Cardiologist with 12+ years in diagnosing and treating cardiovascular diseases. Passionate about patient care and medical research.
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                        <button
                            style={{
                                background: "#2563EB",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                padding: "8px 20px",
                                fontWeight: 600,
                                fontSize: 15,
                                cursor: "pointer",
                            }}
                        >
                            Edit Profile
                        </button>
                        <button
                            style={{
                                background: "#F6F8FB",
                                color: "#2563EB",
                                border: "1px solid #2563EB",
                                borderRadius: 8,
                                padding: "8px 20px",
                                fontWeight: 600,
                                fontSize: 15,
                                cursor: "pointer",
                            }}
                        >
                            View Public Profile
                        </button>
                    </div>
                </div>
                {/* Stats */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 140, alignItems: "flex-end" }}>
                    <div style={{ background: "#F6F8FB", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
                        <div style={{ fontWeight: 700, fontSize: 22, color: "#FFB800" }}>
                            4.9
                            <svg style={{ marginLeft: 4, verticalAlign: "middle" }} width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M9 1.5l2.09 5.26h5.53l-4.47 3.64 1.7 5.35L9 12.01l-4.85 3.74 1.7-5.35-4.47-3.64h5.53L9 1.5z" fill="#FFB800"/></svg>
                        </div>
                        <div style={{ color: "#7D8597", fontSize: 13 }}>Patient Rating</div>
                    </div>
                    <div style={{ background: "#F6F8FB", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
                        <div style={{ fontWeight: 700, fontSize: 22, color: "#2563EB" }}>320+</div>
                        <div style={{ color: "#7D8597", fontSize: 13 }}>Patients Treated</div>
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                {/* Contact */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: "#2563EB" }}>Contact information</div>
                    <div style={{ color: "#7D8597", fontSize: 15, marginBottom: 4 }}>jonathan.reed@medipro.com</div>
                    <div style={{ color: "#7D8597", fontSize: 15, marginBottom: 4 }}>+1 555 323 1123</div>
                    <div style={{ color: "#2563EB", fontSize: 15 }}>www.drjonreed.com</div>
                </div>
                {/* Education */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: "#2563EB" }}>Education</div>
                    <div style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>MD, Cardiology</div>
                        <div style={{ color: "#7D8597", fontSize: 14 }}>Harvard Medical School • 2009 - 2013</div>
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>BS, Medicine</div>
                        <div style={{ color: "#7D8597", fontSize: 14 }}>Columbia University • 2005 - 2009</div>
                    </div>
                </div>
                {/* Specializations */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: "#2563EB" }}>Specializations</div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {["Cardiology", "Echocardiography", "Hypertension", "Heart Failure"].map((spec) => (
                            <span
                                key={spec}
                                style={{
                                    background: "#F6F8FB",
                                    color: "#2563EB",
                                    borderRadius: 8,
                                    padding: "4px 12px",
                                    fontWeight: 500,
                                    fontSize: 14,
                                }}
                            >
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Work Experience */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: "#2563EB" }}>Work Experience</div>
                    <div style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>Senior Cardiologist</div>
                        <div style={{ color: "#7D8597", fontSize: 14 }}>City Heart Hospital • 2017 - Present</div>
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>Cardiology Fellow</div>
                        <div style={{ color: "#7D8597", fontSize: 14 }}>New York General Hospital • 2013 - 2017</div>
                    </div>
                </div>
                {/* Languages */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: "#2563EB" }}>Languages</div>
                    <div style={{ display: "flex", gap: 10 }}>
                        {["English", "Telugu"].map((lang) => (
                            <span
                                key={lang}
                                style={{
                                    background: "#F6F8FB",
                                    color: "#2563EB",
                                    borderRadius: 8,
                                    padding: "4px 12px",
                                    fontWeight: 500,
                                    fontSize: 14,
                                }}
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Licenses & Certifications */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: "#2563EB" }}>
                        Licenses & Certifications
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#2DB77A"/><path d="M13.2 7.2l-3.15 3.15-1.25-1.25" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ color: "#7D8597", fontSize: 15 }}>American Board of Internal Medicine</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#2DB77A"/><path d="M13.2 7.2l-3.15 3.15-1.25-1.25" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ color: "#7D8597", fontSize: 15 }}>NY State Medical License</span>
                    </div>
                </div>
            </div>

            {/* Patient Reviews */}
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 1.667l2.326 5.857h6.157l-4.97 4.05 1.892 5.976L10 13.333l-5.405 4.217 1.892-5.976-4.97-4.05h6.157L10 1.667z" fill="#2563EB"/></svg>
                Patient Reviews
                <span style={{ color: "#2563EB", fontWeight: 500, fontSize: 14, marginLeft: "auto", cursor: "pointer" }}>See all</span>
            </div>
            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
                {/* Review 1 */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 20, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontWeight: 600 }}>Bala</span>
                        <span style={{ color: "#7D8597", fontSize: 13 }}>Apr 2024</span>
                        <span style={{ color: "#FFB800" }}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M7 1l1.63 4.11h4.37l-3.53 2.88 1.34 4.01L7 9.34l-3.81 2.66 1.34-4.01-3.53-2.88h4.37L7 1z" fill="#FFB800"/></svg>
                            ))}
                        </span>
                    </div>
                    <div style={{ color: "#7D8597", fontSize: 15 }}>
                        Dr. Reed is very compassionate and knowledgeable. He explained everything clearly and made me feel at ease.
                    </div>
                </div>
                {/* Review 2 */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 20, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontWeight: 600 }}>Amara</span>
                        <span style={{ color: "#7D8597", fontSize: 13 }}>Apr 2024</span>
                        <span style={{ color: "#FFB800" }}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M7 1l1.63 4.11h4.37l-3.53 2.88 1.34 4.01L7 9.34l-3.81 2.66 1.34-4.01-3.53-2.88h4.37L7 1z" fill="#FFB800"/></svg>
                            ))}
                        </span>
                    </div>
                    <div style={{ color: "#7D8597", fontSize: 15 }}>
                        Excellent care and attention to detail. I highly recommend Dr. Reed to anyone in need of cardiac concerns.
                    </div>
                </div>
                {/* Review 3 */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 20, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontWeight: 600 }}>Gowri</span>
                        <span style={{ color: "#7D8597", fontSize: 13 }}>Apr 2024</span>
                        <span style={{ color: "#FFB800" }}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M7 1l1.63 4.11h4.37l-3.53 2.88 1.34 4.01L7 9.34l-3.81 2.66 1.34-4.01-3.53-2.88h4.37L7 1z" fill="#FFB800"/></svg>
                            ))}
                        </span>
                    </div>
                    <div style={{ color: "#7D8597", fontSize: 15 }}>
                        Very experienced doctor. The staff was helpful. Kindly, would visit again if needed.
                    </div>
                </div>
            </div>

            {/* Availability */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Availability</div>
                    <div style={{ color: "#7D8597", fontSize: 15 }}>
                        <span style={{ fontWeight: 600, color: "#222" }}>Monday - Friday</span> &nbsp; 9:00 AM – 5:00 PM<br />
                        <span style={{ fontWeight: 600, color: "#222" }}>Saturday</span> &nbsp; 10:00 AM – 2:00 PM<br />
                        <span style={{ fontWeight: 600, color: "#222" }}>Sunday</span> &nbsp; Not Available
                    </div>
                </div>
                <button
                    style={{
                        background: "#2563EB",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 32px",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer",
                    }}
                >
                    Edit Availability
                </button>
            </div>
        </div></>
        
    );
};

export default DoctorProfilePage;