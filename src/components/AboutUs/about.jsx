import './about.css'
import aboutimg from "./About-img/aboutimg.avif"
import Navbar from '../Home/Navbar/Navbar';
//import Navbar from '../Home/Navbar/Navbar';



function About(){
    return(
        <div>
            <Navbar />
        <div className='AboutUs'>


            <div className='AboutUs-Container'>
                <div className='AboutUS-Container-left'>
                    <h2>Welcome to E-Connect, your ultimate destination for seamless event ticketing. 
                        We pride ourselves on being a dynamic and innovative platform that brings people together 
                        through the power of live experiences</h2>
                </div>
                <div className='AboutUS-Container-right'>
                    <img src={aboutimg} alt="About Us Image"/> 
                </div>
            </div>

            
            <div>
                 <div class="card-container">
                 <div class="card">
                    <h1>4+</h1>
                    <h2>Team Member</h2>
                 </div>
                 <div class="card">
                    <h1>1</h1>
                    <h2>offices in India</h2>
                 </div>
                 <div class="card">
                    <h1>100+</h1>
                    <h2>customers and partners</h2>
                 </div>
                 <div class="card">
                    <h1>1L ₹</h1>
                    <h2>facilitated revenue</h2>
                 </div>
                 </div>
            </div>


            <div>
                <div className="about-us-container">
                  <h1>About ETicket Connect</h1>
            
                  <div className="section">
                    <h2>Our Journey</h2>

                    <div className='section-container'>
                    <div className='section-leftside'>
                    <div className="sub-section-1">
                      <h3>Inception and Inspiration (2023)</h3>
                      <p>
                      E-Ticket Connect was conceived with a mission to revolutionize the bus ticketing experience. In 2023, our journey began, inspired by the vision to simplify the process of booking bus tickets online and provide a seamless platform for travelers to explore and book bus journeys conveniently. Our commitment from the outset has been to enhance the overall bus travel experience.
                      </p>
                    </div>
            
                    <div className="sub-section-2">
                      <h3>Empowering Bus Travelers</h3>
                      <p>
                      From the very beginning, our focus has been on empowering bus travelers by making ticket booking a hassle-free process. We believe in providing a platform that not only offers convenience but also enhances the overall journey for passengers.
                      </p>
                    </div>
                    </div>


                    <div className='section-rightside'>
                    <div className="sub-section">
                      <h3>Technological Advancements (2023)</h3>
                      <p>
                      Our journey has been marked by continuous technological advancements. We've embraced cutting-edge technologies to provide features like instant booking confirmations, and user-friendly interfaces, ensuring a modern and seamless bus ticketing experience for our users.
                      </p>
                    </div>
                    </div>
                  </div>
                  </div>
            

                  <div className="section">
                    <h2>Our Values</h2>
                    <div className='section-container'>
                    <div className='section-rightside'>
                    <div className="sub-section-11">
                      <h3>Customer-Centric Approach</h3>
                      <p>
                      E-Ticket Bus Connect is built on a customer-centric approach. We prioritize the needs and preferences of our users, aiming to make their bus travel experience not just convenient but enjoyable.
                      </p>
                    </div>
                    </div>

                    <div className='section-leftside'>
                    <div className="sub-section">
                      <h3>Security and Privacy</h3>
                      <p>
                        Your security is our priority. We've implemented robust security measures to ensure that your transactions are safe, and your personal information is protected.
                      </p>
                    </div>
                    </div>
                  </div>
                  </div>

                </div>

            </div>
        </div></div>
    
    )
}

export default About;
