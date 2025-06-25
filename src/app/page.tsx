"use client";
import Index from './LandingPage/index/page'
import TopSpecialities from './LandingPage/TopSpecialities/page';
import FeaturedDocs from './LandingPage/FeaturedDocs/page';
import WhyChooseUs from './LandingPage/whyChooseUs/page';
import ChooseUsSection from './LandingPage/chooseUsSection/page';
import FAQs from './LandingPage/FAQs/page';
import Download from './LandingPage/Download/page';
import Blogs from './LandingPage/blogs/page';
import Footer from './LandingPage/footer/page';
import MedicalSpecialtiesCards from './LandingPage/new/page';
import ScrollingCarousel from './LandingPage/scrolling/page';
import Header from './LandingPage/header/page';
// import App from "./routing"

import React, { useState } from 'react';

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main>
      <Index scrollToSection={(sectionId) => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })} />
      <TopSpecialities />
      <ScrollingCarousel/>
      <MedicalSpecialtiesCards />
      <FeaturedDocs />
      <WhyChooseUs />
      <ChooseUsSection />
      <FAQs />
      <Download />
      <Blogs />
      <Footer />

      
      </main>
      
    </>
  );
}
