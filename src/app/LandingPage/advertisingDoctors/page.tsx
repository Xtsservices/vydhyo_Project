'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/Admin/components/header";

const AdvertisingDoctorsPage = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    router.push('/LandingPage/login');
  };

  const handleJoinNow = () => {
    setShowDropdown(!showDropdown);
  };

  const handleGetStarted = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
    {/* <AppHeader/> */}
    <div className="bg-[#F8FCFA] min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center space-x-2">
            <img
              src="/images/vydh_logo.png"
              alt="Vydhyo Logo"
              className="w-35 h-25 object-contain mr-2"
            />
          
          </div>
          <button
            className="bg-[#1A3B34] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#17412d] transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#F8FCFA] py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A3B34] mb-4">
              Deliver Exceptional <br /> Patient Experience <br />
              with <span className="text-[#6EDC8C]">Vydhyo</span>
            </h1>
            <p className="text-[#4B5C58] mb-6 max-w-lg">
              Connect with vetted doctors instantly. Private consultations, safe data, and results that care for your health.
            </p>
            <div className="relative">
              <button
                className="bg-[#1A3B34] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#17412d] transition"
                onClick={handleJoinNow}
              >
                Join Now - It's Free
              </button>
              
              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border p-6 w-96 z-10">
                  <div className="text-center">
                    <div className="bg-[#4A90E2] text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      GET THE APP
                    </div>
                    <h3 className="text-xl font-bold text-[#1A3B34] mb-2">
                      Coming soon Vydhyo - India's Trusted Doctors App!
                    </h3>
                    <p className="text-[#4B5C58] text-sm mb-6 leading-relaxed">
                      Connect with 10,000+ verified doctors across India. Book instant video consultations, 
                      order medicines, get lab tests done, and access your health records - all in one app. 
                      Available in Hindi, English, and 8 other Indian languages.
                    </p>
                    
                    {/* App Store Buttons */}
                    <div className="flex gap-3 justify-center mb-6">
                      <a
                        href="https://play.google.com/store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        <div className="text-left">
                          <div className="text-xs text-gray-300">GET IT ON</div>
                          <div className="text-sm font-semibold text-white">Google Play</div>
                        </div>
                      </a>
                      <a
                        href="https://apps.apple.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.19 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                        </svg>
                        <div className="text-left">
                          <div className="text-xs text-gray-300">Download on the</div>
                          <div className="text-sm font-semibold text-white">App Store</div>
                        </div>
                      </a>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-center gap-6 text-sm text-[#4B5C58]">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-[#6EDC8C] flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                            <circle cx="12" cy="12" r="10"/>
                          </svg>
                        </div>
                        <span>24x7 Doctor Support</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-[#6EDC8C] flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <span>₹0 Consultation Fee*</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <img
              src="https://image.freepik.com/free-psd/doctor-management-dashboard-ui-kit_279329-4.jpg"
              alt="Vydhyo Devices"
              className="w-[340px] md:w-[420px] drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="bg-[#EAFBF2] rounded-full p-3 mb-3">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#6EDC8C"/>
              <path d="M12 7v5l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-[#1A3B34] mb-2">Instant Appointment</h3>
          <p className="text-[#4B5C58] text-center text-sm">Book appointments instantly with available doctors, anytime.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="bg-[#EAFBF2] rounded-full p-3 mb-3">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#6EDC8C"/>
              <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="#fff" strokeWidth="2"/>
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-[#1A3B34] mb-2">Vetted Doctors</h3>
          <p className="text-[#4B5C58] text-center text-sm">Consult with experienced and verified healthcare professionals.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="bg-[#EAFBF2] rounded-full p-3 mb-3">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#6EDC8C"/>
              <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-[#1A3B34] mb-2">Private Consultations</h3>
          <p className="text-[#4B5C58] text-center text-sm">Your health data and conversations are always confidential.</p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-[#EAFBF2] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-[#1A3B34] mb-8">Why Choose Vydhyo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">24x7</span>
              <span className="text-sm text-[#4B5C58] text-center">Online Support</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">No Waiting</span>
              <span className="text-sm text-[#4B5C58] text-center">Book Instantly</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">100%</span>
              <span className="text-sm text-[#4B5C58] text-center">Privacy & Security</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">Zero</span>
              <span className="text-sm text-[#4B5C58] text-center">Tech Fee</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">Digital Prescriptions</span>
              <span className="text-sm text-[#4B5C58] text-center">Get your prescription online</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">Video Calls</span>
              <span className="text-sm text-[#4B5C58] text-center">Consult from anywhere</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">EMR</span>
              <span className="text-sm text-[#4B5C58] text-center">Complete medical history</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#1A3B34] mb-1">Secure</span>
              <span className="text-sm text-[#4B5C58] text-center">End-to-end encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-[#1A3B34] mb-8">Simple 3-Step Process</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-[#6EDC8C] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-2">1</div>
              <span className="font-semibold text-[#1A3B34] mb-1">Book Appointment</span>
              <span className="text-sm text-[#4B5C58] text-center">Choose your doctor and time slot in a few clicks.</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#6EDC8C] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-2">2</div>
              <span className="font-semibold text-[#1A3B34] mb-1">Consultation</span>
              <span className="text-sm text-[#4B5C58] text-center">Connect via call or video instantly.</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#6EDC8C] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-2">3</div>
              <span className="font-semibold text-[#1A3B34] mb-1">Follow-up Care</span>
              <span className="text-sm text-[#4B5C58] text-center">Digital prescriptions and follow-ups as needed.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Money & Tech Fee */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A3B34] mb-3">Vydhyo Money & Zero Tech Fee</h3>
            <ul className="list-disc pl-5 text-[#4B5C58] space-y-2">
              <li>No hidden charges or tech fees</li>
              <li>Pay only for consultations</li>
              <li>Flexible payment for future add-ons</li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdKkoCDPMlfsKENl0y0G_tBH2TR7xbEiWQqFtBC1UoDJ1tbWcXCBJUJQ&s"
              alt="Money Illustration"
              className="w-[220px] md:w-[280px]"
            />
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVcNUpd4yTuokX7RQz_RzrLZwsnrHVAzeyP6kWkZwLFf4atDiJbzmylc&s"
              alt="Security Illustration"
              className="w-[220px] md:w-[280px]"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A3B34] mb-3">Your Data is Safe & Secure</h3>
            <ul className="list-disc pl-5 text-[#4B5C58] space-y-2">
              <li>End-to-End Encryption</li>
              <li>HIPAA Compliant</li>
              <li>Multi-layered security with regular audits</li>
              <li>Data stored in secure, certified servers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-b from-[#F8FCFA] to-[#EAFBF2]">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-[#1A3B34] mb-4">Ready to Experience Better Healthcare?</h2>
          <p className="text-[#4B5C58] mb-6">
            Join thousands of patients who trust Vydhyo for their healthcare needs.
          </p>
          <div className="relative inline-block">
            <button 
              className="bg-[#1A3B34] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#17412d] transition"
              onClick={handleGetStarted}
            >
              Get Started Today
            </button>
            
            {/* Dropdown for Get Started button */}
            {showDropdown && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border p-6 w-96 z-10">
                <div className="text-center">
                  <div className="bg-[#4A90E2] text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    GET THE APP
                  </div>
                  <h3 className="text-xl font-bold text-[#1A3B34] mb-2">
                    Coming soon Vydhyo - India's Trusted Doctors App!
                  </h3>
                  <p className="text-[#4B5C58] text-sm mb-6 leading-relaxed">
                    Connect with 10,000+ verified doctors across India. Book instant video consultations, 
                    order medicines, get lab tests done, and access your health records - all in one app. 
                    Available in Hindi, English, and 8 other Indian languages.
                  </p>
                  
                  {/* App Store Buttons */}
                  <div className="flex gap-3 justify-center mb-6">
                    <a
                      href="https://play.google.com/store"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-300">GET IT ON</div>
                        <div className="text-sm font-semibold text-white">Google Play</div>
                      </div>
                    </a>
                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.19 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-300">Download on the</div>
                        <div className="text-sm font-semibold text-white">App Store</div>
                      </div>
                    </a>
                  </div>

                  {/* Features */}
                  <div className="flex items-center justify-center gap-6 text-sm text-[#4B5C58]">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-[#6EDC8C] flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </div>
                      <span>24x7 Doctor Support</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-[#6EDC8C] flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <span>₹0 Consultation Fee*</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3B34] text-[#EAFBF2] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">Vydhyo</span>
            <span className="block text-xs text-[#A7E8C1]">for Healthcare</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Support</h4>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <ul className="text-sm space-y-1">
                <li>support@vydhyo.com</li>
                <li>+1 234 567 890</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div></>
    
  );
};

export default AdvertisingDoctorsPage;