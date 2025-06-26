'use client';
import React from "react";
import { useRouter } from "next/navigation";

const AdvertisingDoctorsPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/LandingPage/login');
  };

  const handleJoinNow = () => {
    // Add your join now logic here
    console.log('Join Now clicked');
  };

  const handleGetStarted = () => {
    // Add your get started logic here
    console.log('Get Started clicked');
  };

  return (
    <div className="bg-[#F8FCFA] min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-[#1A3B34] rounded-full w-8 h-8 flex items-center justify-center">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2z" fill="#A7E8C1"/>
                <path d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1112 5.5a6.5 6.5 0 010 13z" fill="#1A3B34"/>
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-[#1A3B34]">Vydhyo</span>
              <span className="block text-xs text-[#A7E8C1] -mt-1">for Healthcare</span>
            </div>
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
            <button
              className="bg-[#1A3B34] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#17412d] transition"
              onClick={() => {
              const popup = document.getElementById('join-now-popup');
                if (popup) {
                popup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                popup.classList.remove('hidden');
              }
              }}
            >
              Join Now - It's Free
            </button>
            {/* Popup Message */}
            <div
              id="join-now-popup"
              className="hidden mt-6 bg-white rounded-lg shadow-lg p-3 max-w-xs mx-auto flex flex-col items-center"
            >
              {/* <p className="text-[#1A3B34] font-semibold mb-2 text-sm"> */}
              {/* Go to Play Store to download the Vydhyo app! */}
              {/* </p> */}
              <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#6EDC8C] text-[#1A3B34] px-4 py-1.5 rounded-md font-semibold text-sm hover:bg-[#4fd17a] transition"
              >
              Go to Play Store
              </a>
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
          <button 
            className="bg-[#1A3B34] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#17412d] transition"
            onClick={handleGetStarted}
          >
            Get Started Today
          </button>
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
    </div>
  );
};

export default AdvertisingDoctorsPage;