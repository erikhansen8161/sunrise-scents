import React, { useState, useEffect, useRef } from 'react';
import FullscreenLanding from '../components/FullscreenLanding';
import FeaturedCollections from '../components/FeaturedCollections';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';

const LandingPage: React.FC = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const featuredCollectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem('sunrise-has-visited');
    
    if (hasVisitedBefore) {
      setIsFirstVisit(false);
      // On return visits, scroll to Featured Collections after a brief delay
      setTimeout(() => {
        if (featuredCollectionsRef.current) {
          featuredCollectionsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // Mark as visited for future visits
      localStorage.setItem('sunrise-has-visited', 'true');
    }
  }, []);

  return (
    <div className="landing-page">
      <FullscreenLanding />
      <div ref={featuredCollectionsRef} data-section="featured-collections">
        <FeaturedCollections />
      </div>
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
};

export default LandingPage;
