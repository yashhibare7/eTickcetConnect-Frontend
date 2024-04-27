import React, { useState, useEffect, useContext } from "react";
import "./Booking.css";
import link from "../../../backendlink";
import AuthContext from "../../../context/authcontext";
import Navbar from "../../Home/Navbar/Navbar";
import ReactPaginate from "react-paginate";
import leftlogo from '../../../logos/icons8-chevron-left-16.png'
import rightlogo from '../../../logos/right.png'
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Button2 from "../../Genral/Button2";
import ExportBTN from "./ExportBTN";


function Bookings() {
  const { user } = useContext(AuthContext);

  
  const [inpdate, setDate] = useState(new Date());
  const [ticket, setTicket] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // react-paginate uses zero-based indexing
  const [entriesPerPage] = useState(10);

  const convertToIST = (utcDate) => {
    const date = new Date(utcDate);
    return {
      date: date.toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      time: date.toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
  };

  const fetchUserTicket = () => {
    fetch(`${link}/ticket/`)
      .then((response) => response.json())
      .then((ticket) => {
        setTicket(ticket);
      });
  };

  useEffect(() => {
    fetchUserTicket();
  }, []);

  if(inpdate === null)
  {
    setDate(new Date());
  }

  // function showallchnage(value)
  // {
  //   setshowall((value) => !value)
  //   console.log("Hello ");
  //   if(showall){
  //     console.log("Hello threr");
  //     // fetchUserTicket();
  //   }
  // }

  function datechanged(value)
  {
    setDate(value);
    console.log(inpdate);
    fetchUserTicket();
    // for (let i = ticket.length - 1; i >= 0; i--) {
    //   const day = inpdate.getDate();
    //   const month = inpdate.getMonth() + 1; 
    //   const year = inpdate.getFullYear();
      
    //   const formattedDate = `${day}/${month}/${year}`;
    //   console.log("Condition ==> " , convertToIST(ticket[i].date));
    //   console.log("formated date --> ",formattedDate , "  ==",convertToIST(ticket[i].date));
    //   if (ticket[i].createdBy !== user._id || convertToIST(ticket[i].date).date !== formattedDate) {
    //     // Remove items that do not match the criteria
    //     ticket.splice(i, 1);
    //   }
    // }
  }


  for (let i = ticket.length - 1; i >= 0; i--) {
    
    const day = inpdate.getDate();
    const month = inpdate.getMonth() + 1; 
    const year = inpdate.getFullYear();
    const formattedDay = (day < 10) ? `0${day}` : `${day}`;


    let formattedDate = (month < 10) ? `${formattedDay}/0${month}/${year}` : `${formattedDay}/${month}/${year}`;
    
    
    console.log(convertToIST(ticket[i].date).date);
    // console.log("------------------");
    // console.log("I ==",i,  " \nInp1" , convertToIST(ticket[i].date).date , "\nformateddate == > " , formattedDate);
    // console.log("------------------");
    // // const formattedDate = `${day}/${month}/${year}`;
    
    
    if (ticket[i].createdBy !== user._id || convertToIST(ticket[i].date).date !== formattedDate) {
      // Remove items that do not match the criteria
      // console.log("formated date ----> ",formattedDate , "   & --> ", convertToIST(ticket[i].date).date);
      // console.log("comparison " ,convertToIST(ticket[i].date).date );
      ticket.splice(i, 1);
    }
   
  }

  // Calculate the index of the last entry on the current page
  const indexOfLastEntry = (currentPage + 1) * entriesPerPage;
  // Calculate the index of the first entry on the current page
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  // Get the current entries to display
  const currentEntries = ticket.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    // console.log("####-->", data.selected);
  };

  return (
    <div className="CNDT">
      <Navbar />

      <div className="CNDT-content tpad30">
        <div className="CNDT-left" style={{marginRight:'15px'}}>
          <div className="CNDT-Message">
            <h2>Welcome on Board </h2>
            <h2>{user.name}</h2>
          </div>
          <div className="CNDT-Message">
            <h2>Bus Number </h2>
            <h2>{user.busNumber}</h2>
          </div>
          <div className="CNDT-Message">
            <h2>Bus Route </h2>
            <h2>{user.busRoute}</h2>
          </div>
          <br />
          
         
            
            <Button2 name="Book Tickets" link="/main"/>
            <ExportBTN data = {ticket}/>
         
          <div className="select-date">
          <h3>Select Date</h3>
          <DatePicker onChange={datechanged} value={inpdate} />
          </div>
          
        </div>

        <div className="booking-content">
          <div className="tablediv">

          
          <table className="styled-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Destination</th>
                <th>Price</th>
                <th>Ticket Count</th>
                <th>Date</th>
                <th>Time</th>
                <th>Ticket ID</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((item) => (
                <tr className="active-row" key={item._id}>
                  <th>{item.source}</th>
                  <th>{item.destination}</th>
                  <th>{item.price}</th>
                  <th>{item.ticketCount ? item.ticketCount.$numberDecimal : 1}</th>
                  <th>{convertToIST(item.date).date}</th>
                  <th>{convertToIST(item.date).time}</th>
                  {/* <th>{item._id.slice(-5)}</th> */}
                  <th>{item.verifyID}</th>
                  <th>{item.userID}</th>
                  {console.log("String " , item.ticketCount)}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {/* Pagination Component */}
          <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        // width: '100%',
        // height: '100%',
      }}>
          <ReactPaginate
            previousLabel={<img src={leftlogo} alt="" />}
            nextLabel={<img src={rightlogo} alt="" />}
            breakLabel={"..."}
            pageCount={Math.ceil(ticket.length / entriesPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}

            activeClassName={'item active '}
            breakClassName={'item break-me '}
            containerClassName={'pagination'}
            disabledClassName={'disabled-page'}
            nextClassName={"item next "}
            // nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
            pageClassName={'item pagination-page '}
            previousClassName={"item previous"}
            // previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 150 }} />}
            
            />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
