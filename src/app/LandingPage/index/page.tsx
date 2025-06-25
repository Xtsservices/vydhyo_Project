"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  ArrowRight,
  Zap,
  Target,
  Users,
  Calendar,
  Truck,
  Droplets,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HealthcareCarousel: React.FC<HeroSectionProps> = ({
  scrollToSection,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      id: 1,
      title: "Book Appointments",
      subtitle: "Schedule with Ease",
      description:
        "Connect with top-rated Indian doctors and specialists instantly. Book appointments 24/7 with our smart scheduling system and get confirmed slots within minutes.",
      features: [
        "Instant Booking",
        "Top Doctors",
        "24/7 Availability",
        "Smart Scheduling",
      ],
      image:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=500&h=500&fit=crop&crop=face",
      icon: <Calendar className="w-8 h-8" />,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)",
    },
    {
      id: 2,
      title: "Verified Ambulance Services",
      subtitle: "Immediate Medical Attention",
      description:
        "Fast, reliable emergency medical services with certified Indian doctors. Our emergency network ensures you get immediate medical attention when every second counts.",
      features: [
        "24/7 Emergency",
        "Certified Doctors",
        "Quick Response",
        "Advanced Care",
      ],
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&crop=face",
      icon: <Truck className="w-8 h-8" />,
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #ef4444 0%, #fca5a5 100%)",
    },
    {
      id: 3,
      title: "Live Blood Bank Updates",
      subtitle: "Life-Saving Resources",
      description:
        "Real-time blood availability updates from certified blood banks across India. Find the right blood type when you need it most with our comprehensive network.",
      features: [
        "Real-time Updates",
        "Multiple Blood Banks",
        "Emergency Access",
        "Verified Sources",
      ],
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=500&fit=crop&crop=face",
      icon: <Droplets className="w-8 h-8" />,
      color: "#dc2626",
      gradient: "linear-gradient(135deg, #dc2626 0%, #f87171 100%)",
    },
    {
      id: 4,
      title: "Certified Home Healthcare",
      subtitle: "Care at Your Doorstep",
      description:
        "Professional healthcare services delivered to your home by certified medical professionals. Get quality care without leaving the comfort of your home.",
      features: [
        "Home Visits",
        "Certified Staff",
        "Convenient Care",
        "Professional Service",
      ],
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=500&fit=crop&crop=face",
      icon: <Home className="w-8 h-8" />,
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #6ee7b7 100%)",
    },
  ];

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          background-color: #00203f;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hero-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(59, 130, 246, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(16, 185, 129, 0.08) 0%,
              transparent 50%
            ),
            linear-gradient(
              45deg,
              transparent 49%,
              rgba(255, 255, 255, 0.02) 50%,
              transparent 51%
            );
          background-size: 100px 100px, 150px 150px, 20px 20px;
          animation: patternMove 20s linear infinite;
        }

        @keyframes patternMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(20px, 20px);
          }
        }

        .medical-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(
              rgba(59, 130, 246, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(59, 130, 246, 0.03) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
          animation: gridPulse 4s ease-in-out infinite alternate;
        }

        @keyframes gridPulse {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.1;
          }
        }

        .hero-container {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .doctor-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: slideUp 1s ease-out 0.4s both;
        }

        .doctor-image {
          width: 400px;
          height: 500px;
          border-radius: 24px;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .doctor-image:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        .carousel-container {
          position: relative;
          animation: slideUp 1s ease-out 0.6s both;
        }

        .carousel-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 2rem;
          color: white;
          transition: all 0.5s ease;
          opacity: 0;
          transform: translateX(100px);
          position: absolute;
          width: 100%;
          box-sizing: border-box;
        }

        .carousel-card.active {
          opacity: 1;
          transform: translateX(0);
          position: relative;
        }

        .carousel-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .carousel-icon {
          padding: 0.75rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
        }

        .carousel-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .carousel-subtitle {
          font-size: 0.875rem;
          color: #e2e8f0;
        }

        .carousel-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }

        .carousel-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .carousel-feature {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .carousel-feature:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .carousel-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .carousel-nav-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
        }

        .carousel-nav-btn:hover {
          background: rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.5);
          transform: scale(1.1);
        }

        .carousel-dots {
          display: flex;
          gap: 0.75rem;
        }

        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background: #3b82f6;
          transform: scale(1.2);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .doctor-image {
            width: 300px;
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 1rem;
          }

          .doctor-image {
            width: 250px;
            height: 320px;
          }

          .carousel-features {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .doctor-image {
            width: 200px;
            height: 280px;
          }

          .carousel-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <section id="home" className="hero-section">
        <div className="hero-bg-pattern"></div>
        <div className="medical-grid"></div>

        <div className="hero-container">
          <div className="doctor-image-container">
            <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=800&fit=crop&crop=face"
              alt="Indian Doctor"
              className="doctor-image"
            />
          </div>

          <div className="carousel-container">
            {carouselData.map((card, index) => (
              <div
                key={card.id}
                className={`carousel-card ${
                  index === currentSlide ? "active" : ""
                }`}
                style={{ minHeight: index === currentSlide ? "auto" : "400px" }}
              >
                <div className="carousel-card-header">
                  <div
                    className="carousel-icon"
                    style={{ background: card.gradient }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="carousel-title">{card.title}</h3>
                    <p className="carousel-subtitle">{card.subtitle}</p>
                  </div>
                </div>

                <p className="carousel-description">{card.description}</p>

                <div className="carousel-features">
                  {card.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="carousel-feature">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="carousel-navigation">
              <button className="carousel-nav-btn" onClick={prevSlide}>
                <ChevronLeft size={20} />
              </button>

              <div className="carousel-dots">
                {carouselData.map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-dot ${
                      index === currentSlide ? "active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>

              <button className="carousel-nav-btn" onClick={nextSlide}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HealthcareCarousel;
