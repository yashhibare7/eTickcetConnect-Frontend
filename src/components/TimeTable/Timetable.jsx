import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
import "./Timetable.css";

const Timetable = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const response = await axios.get(
          "https://eticketconnect.onrender.com/bus/"
        );
        setTimetableData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };
    fetchTimetableData();
  }, []);

  const showTimetable = (route) => {
    setSelectedRoute(route);
  };

  const closeModal = () => {
    setSelectedRoute(null);
  };

  return (
    <div className="timetable-fullbox">
      <Navbar />
      <div className="timetable-container">
        <h1 style={{color:'white'}}>City Timetable</h1>
        <div className="timetable">
          {loading ? (
            <p>Loading...</p>
          ) : (
            timetableData.map((route, index) => (
              <div
                key={index}
                className="t-card"
                onClick={() => showTimetable(route)}
              >
                <h3>{route.busRoute}</h3>
              </div>
            ))
          )}
        </div>
        {selectedRoute && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="timetable-container">
                <h2>Route: {selectedRoute.busRoute}</h2>
                <h3>Departure Times:</h3>
                <div className="departure-times center-align">
                  <p>{selectedRoute.timetable.join(", ")}</p>
                </div>
                <h3>Prices:</h3>
                <div className="prices-container">
                  {selectedRoute.prices.map((price, index) => (
                    <div key={index} className="price-item">
                      <img src="https://www.freeiconspng.com/uploads/blue-location-icon-png-19.png" alt="" style={{height:'30px'}}/>
                      <p className="routepara">
                        {price.route} 
                      </p>
                      <p style={{fontWeight:'bold'}}>₹ {price.price}</p>
                      {/* <div className="sline"></div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timetable;
