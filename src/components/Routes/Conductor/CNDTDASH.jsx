import React, { useContext } from 'react';
import '../User/Dashboard/dash.css'
import AuthContext from '../../../context/authcontext';
import { useNavigate } from 'react-router-dom';
import link from '../../../backendlink';
import axios from 'axios';


const CNDTDASH = (props) => {


  const {getLoggedin , user} = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("USER , ",user);
  async function logout()
  {
      await axios.get(`${link}/auth/logout`);
      await getLoggedin();
      navigate('/login');
  }



  return (
    <div className="user-dashboard">


      <div className="main-dash">
        <nav className="dashboard-nav tpad30">
          <div className="menu-items">
            <ul className="nav-links">
            <li>
                <a href="#">
                  <i className="uil uil-user"></i>
                  <span className="link-name">Conductor Details</span>
                </a>
              </li>
              <li>
                <a href="#dashboard">
                  <i className="uil uil-estate"></i>
                  <span className="link-name">Dashboard</span>
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
                <span className="text">Conductor Details</span>
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
           <i className="uil uil-bus"></i>
          <label className='user-label'>Bus Route</label>
          <span className='user-span'>{user.busRoute}</span>
        </div>
        <div className="detail">
           <i className="uil uil-list-ol"></i>
          <label className='user-label'>Bus Number</label>
          <span className='user-span'>{user.busNumber}</span>
        </div>
      </div>
    </div>





            
            <div className="overview" id='dashboard'>
              <div className="dash-title">
                <i className="uil uil-tachometer-fast-alt"></i>
                <span className="text">Routes</span>
              </div>

              <div className="boxes">
                <a href="/main">

                <div className="box box1">
                  <i className="uil uil-ticket"></i>
                  <span className="text">Book Tickets</span>
                  <span className="number"> </span>
                </div>
                </a>
                <a href="/bookings">

                <div className="box box2">
                  <i className="uil uil-subject"></i>
                  <span className="text">View Entries</span>
                  <span className="number"></span>
                </div>
                </a>
                <a href="/">

                <div className="box box3">
                  <i className="uil uil-home"></i>
                  <span className="text">Home</span>
                  <span className="number"></span>
                </div>
                </a>
              </div>
            </div>

             
              
           


          </div>
        </section>
      </div> </div>
  );
};

export default CNDTDASH;
