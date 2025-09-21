import React, { useState, useEffect } from 'react';
import './TestimonialsSection.css';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    text: "The Sunrise Collection has become my signature scent. Every time I wear it, I receive compliments. It's elegant, sophisticated, and lasts all day.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily Chen",
    location: "Los Angeles, CA",
    text: "I've tried many luxury perfumes, but nothing compares to the quality and uniqueness of Sunrise Scents. The Floral Elegance line is absolutely divine.",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Miami, FL",
    text: "As someone with sensitive skin, I was amazed that these fragrances don't irritate me at all. The natural ingredients really make a difference.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials-section section">
        <div className="section-header fade-in">
          <h2>What Our Customers Say</h2>
          <p>Discover why thousands of fragrance lovers choose Sunrise Scents</p>
        </div>

        <div className="testimonials-carousel">
          <div className="testimonial-container">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${
                  index === currentTestimonial ? 'active' : ''
                } ${
                  index === (currentTestimonial + 1) % testimonials.length ? 'next' : ''
                } ${
                  index === (currentTestimonial - 1 + testimonials.length) % testimonials.length ? 'prev' : ''
                }`}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <div className="testimonial-author">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-controls">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`control-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
    </section>
  );
};

export default TestimonialsSection;
