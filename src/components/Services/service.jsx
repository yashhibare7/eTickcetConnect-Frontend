import React from 'react';
import './service.css';
import { FiCircle, FiCheckSquare, FiHeart, FiAward, FiCode } from 'react-icons/fi'; // Import icons from react-icons
import serviceimg from "./serviceimg/serviceimg.jpg";
import Navbar from '../Home/Navbar/Navbar';

const Services = () => {
  return (
    <div>
      <Navbar />

    <div className='servicesectionmain'>
    <div className='servicesection'>
      <h1>Our Services</h1>
    <div className="section-container">
      <div className="section-leftside">
        <div className="sub-section-11">
          <h2>Online Booking System</h2>
          <p>Provide a user-friendly platform for passengers to easily search for bus routes, select seats, and book tickets online.</p>
        </div>
        <div className="sub-section-11">
          <h2>Mobile Ticketing</h2>
          <p>Enable passengers to receive and display their tickets on their mobile devices for a seamless boarding process.</p>
        </div>
        <div className="sub-section-11">
          <h2>Secure Payment Options</h2>
          <p>Integrate secure payment gateways to facilitate online transactions, ensuring the safety of passengers' financial information.</p>
        </div>
      </div>

      <div className="section-rightside">
      <img src={serviceimg} alt="About Us Image"/>
      </div>
    </div>
    </div>

<div className='feature-section'>
  <h1>Our Salient Feature</h1>
    <div className="feature-container">
      <div className="feature">
        <div className="icon">
          <FiCircle />
        </div>
        <h3>Online Payment</h3>
      </div>

      <div className="feature">
        <div className="icon">
          <FiCheckSquare />
        </div>
        <h3>QR Code Tickets</h3>
      </div>

      <div className="feature">
        <div className="icon">
          <FiHeart />
        </div>
        <h3>Payment security</h3>
      </div>

      <div className="feature">
        <div className="icon">
          <FiAward/>
        </div>
        <h3>Online Ticket</h3>
      </div>


      <div className="feature">
        <div className="icon">
          <FiCode/>
        </div>
        <h3>Easy To Use</h3>
      </div>

    </div>
    </div>

    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>

      <div className="faq-item">
        <h3 className="question">How do I book a bus ticket on E-Connect?</h3>
        <p className="answer">To book a bus ticket on E-Connect, follow these steps: Enter your departure and arrival locations, travel dates, and preferred time...</p>
      </div>

      <div className="faq-item">
        <h3 className="question">What payment methods are accepted on E-Connect?</h3>
        <p className="answer">E-Connect accepts QR Code payment method</p>
      </div>

      <div className="faq-item">
        <h3 className="question">Is it safe to make online payments on E-Connect?</h3>
        <p className="answer">Yes, E-Connect prioritizes the security of your online payments. We use SSL encryption and comply with industry standards to protect your sensitive information during transactions.</p>
      </div>

      <div className="faq-item">
        <h3 className="question">How do I retrieve my booked ticket?</h3>
        <p className="answer">After booking, you will receive a confirmation with your e-ticket, details, view and download your booked tickets. Alternatively, use the QR code provided for easy access during boarding.</p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Services;
