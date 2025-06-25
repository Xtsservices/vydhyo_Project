// "use client";

// import React from "react";

// const menuItems = [
//     { label: "Dashboard", icon: "fa-solid fa-house", active: true },
//     { label: "Requests", icon: "fa-solid fa-envelope" },
//     { label: "Appointments", icon: "fa-solid fa-calendar-check" },
//     { label: "Available Timings", icon: "fa-solid fa-clock" },
//     { label: "My Patients", icon: "fa-solid fa-user-injured" },
//     { label: "Specialists & Services", icon: "fa-solid fa-stethoscope" },
//     { label: "Reviews", icon: "fa-solid fa-star" },
//     { label: "Accounts", icon: "fa-solid fa-wallet" },
//     { label: "Invoices", icon: "fa-solid fa-file-invoice" },
//     { label: "Payout Settings", icon: "fa-solid fa-money-check-alt" },
//     { label: "Message", icon: "fa-solid fa-comments", badge: true },
//     { label: "Profile Settings", icon: "fa-solid fa-user-cog" },
//     { label: "Social Media", icon: "fa-brands fa-facebook" },
//     { label: "Change Password", icon: "fa-solid fa-key" },
//     { label: "Logout", icon: "fa-solid fa-sign-out-alt" },
// ];

// const SideHeader: React.FC = () => {
//     return (
//         <aside
//             style={{
//                 width: 270,
//                 background: "#fff",
//                 borderRadius: 8,
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
//                 padding: 16,
//                 fontFamily: "Inter, Arial, sans-serif",
//                 marginTop:60,
//             }}
//         >
//             {/* Profile Section */}
//             <div
//                 style={{
//                     background: "#0d6efd",
//                     borderRadius: 8,
//                     padding: "24px 0 40px 0",
//                     textAlign: "center",
//                     position: "relative",
//                 }}
//             >
//                 <img
//                     src="https://randomuser.me/api/portraits/men/32.jpg"
//                     alt="Dr Edalin Hendry"
//                     style={{
//                         width: 80,
//                         height: 80,
//                         borderRadius: "50%",
//                         border: "4px solid #fff",
//                         objectFit: "cover",
//                         position: "absolute",
//                         left: "50%",
//                         top: 60,
//                         transform: "translate(-50%, -50%)",
//                         boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
//                     }}
//                 />
//             </div>
//             <div style={{ marginTop: 56, textAlign: "center" }}>
//                 <div style={{ fontWeight: 600, fontSize: 18, color: "#222" }}>
//                     Dr Edalin Hendry
//                 </div>
//                 <div style={{ fontSize: 13, color: "#888", margin: "4px 0" }}>
//                     BDS, MDS - Oral & Maxillofacial Surgery
//                 </div>
//                 <button
//                     style={{
//                         background: "#eaf1ff",
//                         color: "#0d6efd",
//                         border: "none",
//                         borderRadius: 4,
//                         padding: "2px 12px",
//                         fontSize: 12,
//                         marginTop: 4,
//                         cursor: "pointer",
//                     }}
//                 >
//                     Dentist
//                 </button>
//             </div>
//             {/* Availability */}
//             <div style={{ margin: "24px 0 12px 0" }}>
//                 <label
//                     htmlFor="availability"
//                     style={{
//                         fontSize: 13,
//                         color: "#444",
//                         fontWeight: 500,
//                         marginBottom: 4,
//                         display: "block",
//                     }}
//                 >
//                     Availability <span style={{ color: "red" }}>*</span>
//                 </label>
//                 <select
//                     id="availability"
//                     style={{
//                         width: "100%",
//                         padding: "6px 8px",
//                         borderRadius: 4,
//                         border: "1px solid #e0e0e0",
//                         fontSize: 13,
//                         marginTop: 4,
//                     }}
//                     defaultValue="I am Available Now"
//                 >
//                     <option>I am Available Now</option>
//                     <option>I am Not Available</option>
//                 </select>
//             </div>
//             {/* Menu */}
//             <nav style={{ marginTop: 12 }}>
//                 <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//                     {menuItems.map((item, idx) => (
//                         <li
//                             key={item.label}
//                             style={{
//                                 marginBottom: 2,
//                             }}
//                         >
//                             <a
//                                 href="#"
//                                 style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     padding: "8px 12px",
//                                     borderRadius: 4,
//                                     background: item.active ? "#0d6efd" : "transparent",
//                                     color: item.active ? "#fff" : "#222",
//                                     fontWeight: item.active ? 600 : 500,
//                                     fontSize: 14,
//                                     textDecoration: "none",
//                                     position: "relative",
//                                     transition: "background 0.2s",
//                                 }}
//                             >
//                                 <i
//                                     className={item.icon}
//                                     style={{
//                                         marginRight: 10,
//                                         fontSize: 15,
//                                         color: item.active ? "#fff" : "#0d6efd",
//                                     }}
//                                 />
//                                 {item.label}
//                                 {item.badge && (
//                                     <span
//                                         style={{
//                                             background: "#ffe066",
//                                             color: "#b8860b",
//                                             borderRadius: "50%",
//                                             width: 8,
//                                             height: 8,
//                                             display: "inline-block",
//                                             marginLeft: 8,
//                                         }}
//                                     />
//                                 )}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </aside>
//     );
// };

// export default SideHeader;