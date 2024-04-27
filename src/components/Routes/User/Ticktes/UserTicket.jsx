import React, { useEffect, useState } from 'react';
import link from '../../../../backendlink';
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
                    (

                       <div>Hello                        </div>
                    )
                }
                {console.log("DATA -->" , ticketData)}

        </div>
    );
}
export default Verification;