import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'; // Import the CSS for styling

import AuthContext from '../../../context/authcontext';
import logo1 from '../../../logos/logo1.png'
import logo2 from '../../../logos/logo2.png'
import Button1 from '../../Genral/Button1';
// import main1 from '../../../logos/main1.png'
// import main2 from '../../../logos/main2.png'
function Navbar(props) {


  const [username , setusernmae] = useState("");

  const { loggedIn, user , isConductor} = useContext(AuthContext);

    useEffect(() => {
        if (loggedIn) {
          setusernmae(user.name);
        }
      }, [loggedIn, user.name]);


      var nameuser = username || ""

  // console.log("LoggedIN in navbar ==> ",loggedIn);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const changeStyle = {
    color: props.flag ? "#4c0448" : "white", // Apply the style if isSpecial is true, else use the initial value
  };
  
  const Backcolor = 
  {
    // background : props.flag ? 'rgb(0,0,0,0.8) linear-gradient(90deg, rgba(14,0,36,1) 0%, rgba(9,9,121,1) 40%, rgba(119,0,255,1) 100%)' : "transparent"

  }

  return (

    <nav className={`navbar ${isOpen ? 'active' : ''}`} style={Backcolor}>
    <div className="logo">
      <a href="/">
          <img src={logo2} alt="" />
          <img src={logo1} alt="" />
          </a>
    </div>
    <div className="menu ">
      <div className="menu-toggle" onClick={toggleNavbar}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`nav-items ${isOpen ? 'open' : ''}`}>
        <li><a style={changeStyle} href="/">Home</a></li>
        <li><a style={changeStyle} href="/timetable">Timetable</a></li>
        {isConductor &&  <li><a style={changeStyle} href="/verify">Verify</a></li>}
        <li><a style={changeStyle} href="/services">Services</a></li>
        <li><a style={changeStyle} href="/about">About Us</a></li>
        <li><a style={changeStyle} href="/feedback">FeedBack</a></li>
        {loggedIn===false &&<li><Button1 name="Login" link="/login"/></li>}
        {loggedIn===true && isConductor&&<li><Button1 name={nameuser.split(" ")[0]} link="/profile"/></li>}
        {loggedIn===true && !isConductor &&<li><Button1 name={nameuser.split(" ")[0]} link="/main"/></li>}
        {loggedIn===undefined && <li><Button1 name = "Loading..."/></li>}
       
      
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;
