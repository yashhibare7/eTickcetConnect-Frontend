// VerifyTicket.jsx
import React, { useEffect, useState } from 'react';
import './VerifyTicket.css'; // Import CSS file
import { useParams } from "react-router-dom";
import link from '../../../backendlink'


const VerifyTicket = () => {


  const { ticketId } = useParams();


  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }


  const [ticket, setTicket] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${link}/ticket/${ticketId}`);
        const data = await response.json();
        setTicket(data);
        const nameofuser = await fetch(`${link}/auth/getusercode/${data.userID}`);
        const namedata=await nameofuser.json();
        setUsername(namedata);
        } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once



  return (
    <div>
      {!ticket ? 'Ticket Not Found' :
        <div className="ticket-container">
          <div className="ticket basic">
            <p>Admit One</p>
          </div>

          <div className="ticket airline">
            <div className="top">
              <h1>E-Ticket Connect</h1>
              <div className="big">
                {/* <i className="fa fa-plane"></i> */}
                <p className="from">{ticket.source}</p>
                <img src="https://static.vecteezy.com/system/resources/previews/015/337/678/original/right-arrow-icon-free-png.png" alt="" />
                <p className="to">{ticket.destination}</p>
              </div>
              <div className="top--side">

                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=${ticket.verifyID}`} alt="" />
              </div>
            </div>
            <div className="c1"></div>
            <div className="c2"></div>
            <div className="bottom">
              <div className="column">
              <p className="row--center"><span>Ticket Id</span>{ticket._id}</p>
              <div className="line"></div>

                <div className="row row-1">
                  <p><span>Source</span>{ticket.source}</p>
                  <p className="row--center"><span>Destination</span>{ticket.destination}</p>
                  <p className="row--right"><span>Ticket Count</span>{ticket.ticketCount.$numberDecimal }</p>
                </div>
                
                {ticket.userID != '----' &&   <div className="row row-2">
                  {username && <p><span>Name</span>{username.name}</p>}
                  
                  <p className="row--right"><span>User ID</span>{ticket.userID}</p>
                </div>}

               
                <div className="row row-2">
                  <p><span>Date</span>{formatDate(ticket.date)}</p>
                  <p className="row--center"><span>Price</span> ₹ {ticket.price}</p>
                  <p className="row--right"><span>Time</span>{formatTime(ticket.date)}</p>
                </div>
                <div className="line"></div>
                <div className="row row-3">
                  <p><span>Bus Number</span>{ticket.ticketBusNumber}</p>
                  {/* <p className="row--center"><span>Ticket Id</span>{ticket.verifyID}</p> */}
                  <p className="row--right"><span>Bus Route</span>{ticket.ticketBusRoute}</p>
                </div>
              </div>
            </div>
          </div>


        </div>}
    </div>
  );
};

export default VerifyTicket;
