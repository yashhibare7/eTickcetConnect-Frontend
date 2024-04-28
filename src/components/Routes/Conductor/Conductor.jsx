import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/authcontext";
import axios from "axios";
import link from "../../../backendlink";
import Navbar from "../../Home/Navbar/Navbar";
import "../../Genral/Genral.css";
import "./Conductor.css";
import Button2 from "../../Genral/Button2";
import Dropdown from "../../Genral/InputWIthSearch";
import switchlogo from '../../../logos/switch.png';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import 'reactjs-popup/dist/index.css';
import TicketCNF from "./TicketCNF";
import OtpInput from 'react-otp-input';

function Conductor() {
  const user = useContext(AuthContext);
  // const [source , setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState(100);
  const [source, setSource] = useState("");
  // const [timer , setTimer] = useState(10);
  // console.log("CNDT ==> ", user);
  const createdBy = user.user._id;
  const ticketBusRoute = user.user.busRoute;
  const ticketBusNumber = user.user.busNumber;
  const [srcarray, setsrcarray] = useState([]);
  const [destarray, setdestarray] = useState([]);
  const [ticketCount , setTCount]= useState(1);
  const [btnclass , changeclass] = useState("hide");
  const [cnfclass , changecnf] = useState("show cnfmtct");
  const [userID, setUserID] = useState('----');

  // fetching bus data


  // const fetchroute = ticketBusRoute

  const [busData, setBusData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${link}/bus/${ticketBusRoute}`);
        const data = await response.json();
        setBusData(data);
        setsrcarray(data.stops);
        console.log("41 -- > ", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const verifyID = generateRandomString(8);
console.log("Random --> " , verifyID);

  function incCount()
  {
    setTCount(ticketCount+0.5);
    changecnf("show cnfmtct");
    changeclass('hide')    
    
    
  }
  
  function dcrCount()
  {
    setTCount(ticketCount-0.5);
    changecnf("show cnfmtct");
    changeclass('hide')    
  }

  const handleDropdownChange = (event) => {
    setSource(event.target.value);
    setdestarray(srcarray);


    let index = srcarray.indexOf(event.target.value);
    let result = index !== -1 ? srcarray.slice(index + 1) : [];

    setdestarray(result);
  };
  const handeldestination = (event) => {
    setDestination(event.target.value);
  };


  function cnfmtct()
  {

    const route = source + '-' + destination;
    const priceObject = busData.prices.find((price) => price.route === route);
    console.log("Route is ==>" , priceObject);
    if(priceObject)
    {
      setPrice(priceObject.price * ticketCount);
      console.log(priceObject.price);
changeclass('show')    
changecnf('hide')
}
    else if(priceObject === undefined)
    {
        alert("Wrog Route");
    }


    // setPrice(202);

  }

  function swap() {
    const tempsouce = source;
    const tempdest = destination;
    setDestination(tempsouce);
    setSource(tempdest);
  }
  async function createTicket(e) {
    e.preventDefault();
    const newEntry = {
      source,
      destination,
      price,
      createdBy,
      ticketBusNumber,
      ticketBusRoute,
      ticketCount,
      verifyID,
      userID
    };
    setPrice("");
    let timerInterval;

    Swal.fire({
      title: `Scan The QR`,
      html: `Ticket will genrated from ${source} to ${destination}  Price ${price} = (${price/ticketCount} * ${ticketCount}) <br />This Window Will close in <b></b>`,
      imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=upi%3A%2F%2Fpay%3Fpa%3Dyashhibare7%40oksbi%26am%3D${price}%26tn%3Dhttps%3A%2F%2Feticket-connect.web.app%2Fticket%2F${verifyID}%26cu%3DINR`,
      imageHeight: 300,
      imageAlt: "A tall image",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Payment Recived",
      timer: 120000,
      timerProgressBar: true,
      didOpen: () => {
        const timer = Swal.getPopup().querySelector("b");
        timer.style.color = "red";
        var mm = 1;
        var ss = 59;
        timerInterval = setInterval(() => {
          timer.textContent = `${mm} min : ${ss} sec`;
          ss--;
          if (ss === -1) {
            mm = 0;
            ss = 59;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Recived ₹ ${price}`,
          text: `Ticket Created Successfully from ${source} to ${destination}`,
          icon: 'success',
          confirmButtonText: 'OK',
          showCancelButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false
        })
      }
    });


    try {
      await axios.post(`${link}/ticket`, newEntry);
     
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="CNDT">
      <Navbar flag={false} />
      <div className="CNDT-content tpad30">
        <div>
          <div className="CNDT-Message">
            <h2>Welcome on Board </h2>
            <h2>{user.user.name}</h2>
          </div>
          <div className="CNDT-Message">
            <h2>Bus Number </h2>
            <h2>{user.user.busNumber}</h2>
          </div>
          <div className="CNDT-Message">
            <h2>Bus Route </h2>
            <h2>{user.user.busRoute}</h2>
          </div>
          <div className="CNDT-create-ticket">
            <form onSubmit={createTicket} autocomplete="off">
              <div className="inpselect">
                <div className="srcinp">
                  <img
                    src="https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png"
                    alt=""
                  />
                  <div>
                    <select id="dropdown" value={source} onChange={handleDropdownChange}>
                      <option value="">Select</option>
                      {busData && busData.stops.map((stop, index) => (
                        <option key={index} value={stop}>
                          {stop}
                        </option>
                      ))}
                    </select>

                  </div>
                  <p>Source</p>
                </div>
                <div
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >


                  <img onClick={swap} src={switchlogo} alt="" style={{ height: "50px", rotate: "90deg", filter: "greyscale(100%)", width: "50px", cursor: "pointer" }} />{" "}

                </div>

                <div className="srcinp">
                  <img
                    src="https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png"
                    alt=""
                  />
                  <div>
                    <select id="dropdown" value={destination} onChange={handeldestination}>
                      <option value="">Select</option>
                      {busData && destarray.map((stop, index) => (
                        <option key={index} value={stop}>
                          {stop}
                        </option>
                      ))}
                    </select>

                  </div>

                  <p>Destination</p>
                </div>

              </div>
              <div className="flexr" style={{ margin: "20px" }}>
                <div className="flexc nooft">
                  <strong>Number of Tickets</strong>
                  <div className="flexr btns">
                    <h2 onClick={dcrCount}>-</h2>
                    <h1>{ticketCount}</h1>
                    <h2 onClick={incCount}>+</h2>
                  </div>
                  {/* <input type="text" className="input-code" placeholder="User ID"/> */}
                  <OtpInput
      value={userID}
      inputStyle={{ fontSize: '20px' , padding:'6px'  , margin:'20px 5px' }}
      onChange={setUserID}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
                </div>
                <h4 className={cnfclass} onClick={cnfmtct}>Done</h4>
                <div className={btnclass}>
                <Button2 name="Create Ticket"  />
                </div>
              </div>
            </form>
          </div>
          <h2 style={{marginTop:'-10px'}}>
            View my entries &nbsp;&nbsp;&nbsp; <Button2 name="VIEW" bgcolor="#e3e600" color="black" link="conductor/bookings" />{" "}
          </h2>
        </div>

        <div className="CNDT-right"></div>
      </div>
    </div>
  );
}
export default Conductor;
