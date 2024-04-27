import React, { useEffect, useState } from 'react';
import link from '../../backendlink';
import Swal from 'sweetalert2';
function Verification(props) {
    const [flag, setFlag] = useState(true);
    const [ticketData, setData] = useState(null);

    var currentDate = new Date();

    // Get the current date components
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    var year = currentDate.getFullYear();
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

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



    // Format the date as desired (e.g., YYYY-MM-DD)

    console.log(formattedDate); // Output: YYYY-MM-DD

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${link}/ticket/${props.inp}`);
                const data = await response.json();
                setData(data);
                setFlag(false);
                if (data.date.slice(0, 10) != formattedDate) {
                    console.log("Report ==> ", data.date);
                    Swal.fire({
                        title: "Expired!",
                        text: `This Ticket is within Database but of date ${data.date.slice(0, 10)}`,
                        icon: "warning"
                    });
                }
                else {

                    Swal.fire({
                        title: "Verified !",
                        text: "This Ticket is within Database !!",
                        icon: "success"
                    });
                }
                console.log("41 -- > ", data);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    title: "NOT Verified !",
                    text: "This Ticket is NOT within Database !!",
                    icon: "error"
                });
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            {
                flag ? (<div>Loading....</div>) :
                    (<div>

                        <div className="ticket-container" style={{ background: 'none', zoom: '0.70', color: 'black' , marginTop:'50px'}}>


                            <div className="ticket airline">
                                <div className="top">
                                    <h1>E-Ticket Connect</h1>
                                    <div className="big">
                                        {/* <i className="fa fa-plane"></i> */}
                                        <p className="from">{ticketData.source}</p>
                                        <img src="https://static.vecteezy.com/system/resources/previews/015/337/678/original/right-arrow-icon-free-png.png" alt="" />
                                        <p className="to">{ticketData.destination}</p>
                                    </div>
                                    <div className="top--side">

                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=${ticketData.verifyID}`} alt="" />
                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className="column">
                                        <div className="row row-1">
                                            <p><span>Source</span>{ticketData.source}</p>
                                            <p className="row--center"><span>Destination</span>{ticketData.destination}</p>
                                            <p className="row--right"><span>Ticket Count</span>{ticketData.ticketCount.$numberDecimal}</p>
                                        </div>
                                        <div className="row row-2">
                                            <p><span>Date</span>{formatDate(ticketData.date)}</p>
                                            <p className="row--center"><span>Price</span> ₹ {ticketData.price}</p>
                                            <p className="row--right"><span>Time</span>{formatTime(ticketData.date)}</p>
                                        </div>
                                        <div className="row row-3">
                                            <p><span>Bus Number</span>{ticketData.ticketBusNumber}</p>
                                            <p className="row--center"><span>Ticket Id</span>{ticketData.verifyID}</p>
                                            <p className="row--right"><span>Bus Route</span>{ticketData.ticketBusRoute}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        </div>)
            }

        </div>
    );
}
export default Verification;