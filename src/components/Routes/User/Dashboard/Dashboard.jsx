import React, { useContext } from 'react';
import './dash.css'
import Navbar from '../../../Home/Navbar/Navbar';
import AuthContext from '../../../../context/authcontext';
import { useNavigate } from 'react-router-dom';
import link from '../../../../backendlink';
import axios from 'axios';


const Dashboard = (props) => {


  const {getLoggedin , user} = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("USER , ",user);
  async function logout()
  {
      await axios.get(`${link}/auth/logout`);
      await getLoggedin();
      navigate('/login');
  }

  let totalspend = 0;
  props.data.forEach(i => {
    totalspend += parseInt(i.price);
  })

  return (
    <div className="user-dashboard">


      <div className="main-dash">
        <nav className="dashboard-nav tpad30">
          <div className="menu-items">
            <ul className="nav-links">
            <li>
                <a href="#">
                  <i className="uil uil-user"></i>
                  <span className="link-name">User Details</span>
                </a>
              </li>
              <li>
                <a href="#dashboard">
                  <i className="uil uil-estate"></i>
                  <span className="link-name">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#userticket">
                  <i className="uil uil-ticket"></i>
                  <span className="link-name">User Tickets</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="uil uil-chart"></i>
                  <span className="link-name">Analytics</span>
                </a>
              </li>
              <li>
                <a href="/feedback">
                  <i className="uil uil-feedback"></i>
                  <span className="link-name">Feedback</span>
                </a>
              </li>
              <li>
                <a href="/timetable">
                  <i className="uil uil-schedule"></i>
                  <span className="link-name">Timetable</span>
                </a>
              </li>
             
            </ul>

            <ul className="logout-mode">
              <li onClick={logout}>
                <a href="#" >
                  <i className="uil uil-signout"></i>
                  <span className="link-name">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <section className="dashboard">
          <div className="dash-content">

          <div className="dash-title">
                <i className="uil uil-user"></i>
                <span className="text">User Details</span>
              </div>

              <div className="user-details-box">
      <div className="user-details">
        <div className="detail">
          
          <label className='user-label' style={{fontSize:'30px'}}>{user.name}</label>
        </div>
        <div className="detail">
           <i className="uil uil-at"></i>
          <label className='user-label'>Email:</label>
          <span className='user-span'>{user.email}</span>
        </div>
        <div className="detail">
           <i className="uil uil-mobile-android"></i>
          <label className='user-label'>Mobile:</label>
          <span className='user-span'>{user.mobile}</span>
        </div>
        <div className="detail">
           <i className="uil uil-credit-card"></i>
          <label className='user-label'>User ID:</label>
          <span className='user-span'>{user.userID}</span>
        </div>
      </div>
    </div>





            
            <div className="overview" id='dashboard'>
              <div className="dash-title">
                <i className="uil uil-tachometer-fast-alt"></i>
                <span className="text">Dashboard</span>
              </div>

              <div className="boxes">
                <div className="box box1">
                  <i className="uil uil-user"></i>
                  <span className="text">User ID</span>
                  <span className="number">{props.data[0].userID}</span>
                </div>
                <div className="box box2">
                  <i className="uil uil-rupee-sign"></i>
                  <span className="text">Total Spend</span>
                  <span className="number">{totalspend}</span>
                </div>
                <div className="box box3">
                  <i className="uil uil-bus"></i>
                  <span className="text">Total Trips</span>
                  <span className="number">{props.data.length}</span>
                </div>
              </div>
            </div>

             
              
            <div className="activity">
              <div className="dash-title">
                <i className="uil uil-ticket"></i>
                <span className="text">User Tickets</span>
              </div>

              <table className="dashtable" id='userticket'>
                <thead className="dashtable-header">
                  <tr>
                    <th className="dashtable-header-cell">Source</th>
                    <th className="dashtable-header-cell">Destination</th>
                    <th className="dashtable-header-cell">Price</th>
                    <th className="dashtable-header-cell speacialrow">Date & Time</th>
                    <th className="dashtable-header-cell">Ticket Bus Route</th>
                    <th className="dashtable-header-cell ">Ticket Count</th>
                    <th className="dashtable-header-cell">View Ticket</th>
                  </tr>
                </thead>
                <div style={{height:'5px'}}></div>

                <tbody>
                  {props.data.map((ticket, index) => (
                    
<>
                    <tr key={index} className="dashtable-row">
                      <td className="dashtable-cell">{ticket.source}</td>
                      <td className="dashtable-cell">{ticket.destination}</td>
                      <td className="dashtable-cell">{ticket.price}</td>
                      <td className="dashtable-cell speacialrow">{new Date(ticket.date).toLocaleString()}</td>
                      <td className="dashtable-cell ">{ticket.ticketBusRoute}</td>
                      <td className="dashtable-cell ">{ticket.ticketCount.$numberDecimal}</td>
                      <td className="dashtable-cell">
                        <a href={`https://eticket-connect.web.app/ticket/${ticket.verifyID}`}>
                        <button class="button-10">VIEW</button>
                        </a>
                        </td>
                      

                    </tr>
                   
                   {/* <div style={{height:'3px'}}></div> */}
</>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div> </div>
  );
};

export default Dashboard;
