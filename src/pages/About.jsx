import { Link } from "react-router-dom"
import "./About.css"

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="container1">
          <h1 className="section-title2">About RhythmEvents</h1>
          <p className="about-intro">
            Creating unforgettable music experiences since 2010. Learn more about our journey, mission, and the team
            behind RhythmEvents.
          </p>
        </div>
      </section>

      <section className="section about-story-section">
        <div className="container1">
          <div className="about-story">
            <div className="about-story-content">
              <h2>Our Story</h2>
              <p>
                RhythmEvents was founded in 2010 by a group of music enthusiasts who shared a passion for creating
                exceptional live music experiences. What started as a small team organizing local concerts has grown
                into a leading music event planning company with a nationwide presence.
              </p>
              <p>
                Over the years, we've had the privilege of working with talented artists, iconic venues, and most
                importantly, thousands of music lovers who have attended our events. Our journey has been defined by a
                commitment to quality, innovation, and the belief that music has the power to bring people together.
              </p>
              <p>
                Today, RhythmEvents organizes over 200 events annually, ranging from intimate jazz nights to massive
                music festivals. We continue to grow and evolve, but our core mission remains the same: to create
                memorable music experiences that resonate with audiences long after the last note has played.
              </p>
            </div>
            <div className="about-story-image">
              <img src="/src/Assests/back 3.jpg" alt="RhythmEvents Story" />
            </div>
          </div>
        </div>
      </section>

      <section className="section about-mission-section">
        <div className="container1">
          <div className="about-mission">
            <div className="about-mission-image">
              <img src="/src/Assests/back 3.jpg" alt="RhythmEvents Mission" />
            </div>
            <div className="about-mission-content">
              <h2>Our Mission</h2>
              <p>
                At RhythmEvents, our mission is to create extraordinary music experiences that inspire, connect, and
                elevate. We believe in the transformative power of live music and its ability to create moments of joy,
                reflection, and unity.
              </p>
              <div className="mission-values">
                <div className="mission-value">
                  <i className="fas fa-star"></i>
                  <h3>Excellence</h3>
                  <p>
                    We strive for excellence in every aspect of our events, from artist selection to venue management.
                  </p>
                </div>
                <div className="mission-value">
                  <i className="fas fa-users"></i>
                  <h3>Community</h3>
                  <p>
                    We build communities around shared musical interests and create spaces where everyone feels welcome.
                  </p>
                </div>
                <div className="mission-value">
                  <i className="fas fa-lightbulb"></i>
                  <h3>Innovation</h3>
                  <p>
                    We constantly seek new ways to enhance the event experience through technology and creative
                    approaches.
                  </p>
                </div>
                <div className="mission-value">
                  <i className="fas fa-heart"></i>
                  <h3>Passion</h3>
                  <p>We are driven by our passion for music and its ability to create meaningful connections.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-achievements-section">
        <div className="container1">
          <h2 className="section-title">Our Achievements</h2>
          <div className="achievements-container">
            <div className="achievement">
              <div className="achievement-number">500+</div>
              <div className="achievement-text">Events Organized</div>
            </div>
            <div className="achievement">
              <div className="achievement-number">1M+</div>
              <div className="achievement-text">Happy Attendees</div>
            </div>
            <div className="achievement">
              <div className="achievement-number">50+</div>
              <div className="achievement-text">Venue Partnerships</div>
            </div>
            <div className="achievement">
              <div className="achievement-number">200+</div>
              <div className="achievement-text">Artist Collaborations</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-team-section">
        <div className="container">
          <h2 className="section-title">Leadership Team</h2>
          <div className="about-team-grid">
            <div className="about-team-member1">
              <div className="team-member-image">
                <img src="/src/Assests/back 3.jpg" alt="John Smith" />
              </div>
              <h3>John Smith</h3>
              <p className="team-member-title">CEO & Founder</p>
              <p className="team-member-bio">
                With over 15 years of experience in the music industry, John leads our company with vision and passion.
              </p>
            </div>
            <div className="about-team-member">
              <div className="team-member-image">
                <img src="/src/Assests/back 3.jpg" alt="Sarah Johnson" />
              </div>
              <h3>Sarah Johnson</h3>
              <p className="team-member-title">Creative Director</p>
              <p className="team-member-bio">
                Sarah brings creative excellence to every event, ensuring unique and memorable experiences.
              </p>
            </div>
            <div className="about-team-member">
              <div className="team-member-image">
                <img src="/src/Assests/back 3.jpg" alt="Michael Chen" />
              </div>
              <h3>Michael Chen</h3>
              <p className="team-member-title">Operations Manager</p>
              <p className="team-member-bio">
                Michael ensures flawless execution of every event, from planning to production.
              </p>
            </div>
            <div className="about-team-member">
              <div className="team-member-image">
                <img src="/src/Assests/back 3.jpg" alt="Emily Rodriguez" />
              </div>
              <h3>Emily Rodriguez</h3>
              <p className="team-member-title">Marketing Director</p>
              <p className="team-member-bio">
                Emily leads our marketing efforts, connecting music lovers with their perfect events.
              </p>
            </div>
          </div>
          <div className="team-cta">
            <p>Want to meet our entire team of event planners?</p>
            <Link to="/meet-the-team" className="btn">
              Meet The Team
            </Link>
          </div>
        </div>
      </section>

      <section className="section about-testimonials-section">
        <div className="container1">
          <h2 className="section-title">What People Say About Us</h2>
          <div className="about-testimonials">
            <div className="about-testimonial">
              <div className="testimonial-content">
                <p>
                  "RhythmEvents organized our company's annual celebration, and it was beyond our expectations. The
                  attention to detail and professionalism were outstanding."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/src/Assests/back 3.jpg" alt="Robert Johnson" />
                <div>
                  <h4>Robert Johnson</h4>
                  <p>CEO, Tech Innovations</p>
                </div>
              </div>
            </div>
            <div className="about-testimonial">
              <div className="testimonial-content">
                <p>
                  "As an artist who has performed at multiple RhythmEvents productions, I can attest to their
                  exceptional organization and genuine care for both performers and audiences."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/src/Assests/back 3.jpg" alt="Alicia Keys" />
                <div>
                  <h4>Alicia Keys</h4>
                  <p>Recording Artist</p>
                </div>
              </div>
            </div>
            <div className="about-testimonial">
              <div className="testimonial-content">
                <p>
                  "The Summer Music Festival organized by RhythmEvents has become a highlight of our city's cultural
                  calendar. They consistently deliver world-class experiences."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/src/Assests/back 3.jpg" alt="Mayor Thompson" />
                <div>
                  <h4>Mayor Thompson</h4>
                  <p>City of Harmony</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-cta-section">
        <div className="container1">
          <div className="about-cta">
            <h2>Ready to Create Your Next Music Event?</h2>
            <p>Let our team of experienced event planners help you bring your vision to life.</p>
            <div className="about-cta-buttons">
              <Link to="/contact" className="btn">
                Contact Us
              </Link>
              <Link to="/events" className="btn btn-secondary">
                Explore Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

