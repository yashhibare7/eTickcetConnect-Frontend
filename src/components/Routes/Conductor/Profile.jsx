import React, { useContext } from 'react';
import Navbar from '../../Home/Navbar/Navbar';
import './Conductor.css'
import Button2 from '../../Genral/Button2';
import LogoutBTN from '../../auth/logoutBTN';
import AuthContext from '../../../context/authcontext';
import CNDTDASH from './CNDTDASH';

function CProfile() {
    const user = useContext(AuthContext);
    // const user = { "name": " Krushna Nagare" , "busNumber" : "MH 12 BP 6614" , "busRoute" :"Pune - Surat" }
    return (
        <div >
            <Navbar />

            {/* <div className="CProfile tpad30">
                <div className="c-photo">
                    <img src="https://cdn-icons-png.flaticon.com/512/560/560199.png" alt="" />

                </div>
                <div className='CNDT-content'>

                <div className="c-info ">
                    <div className="CNDT-Message">
                        <h2>Welcome on Board </h2>
                        <h2>{user.user.name}</h2>
                    </div>
                    
                    <div className="CNDT-Message">
                        <h2>Email </h2>
                        <h2>{user.user.email}</h2>
                    </div>
                    <div className="CNDT-Message">
                        <h2>Mobile </h2>
                        <h2>{user.user.mobile}</h2>
                    </div>
                    <div className="CNDT-Message">
                        <h2>Bus Number </h2>
                        <h2>{user.user.busNumber}</h2>
                    </div>
                    <div className="CNDT-Message">
                        <h2>Bus Route </h2>
                        <h2>{user.user.busRoute}</h2>
                    </div><br /><br />

                <div className="c-buttons">

                    <Button2 name="BOOK TICKETS" link="/main"/>
                    <Button2 name="VIEW RECORDS" bgcolor="#e3e600" color="black" link="conductor/bookings" />
                    <Button2 name="VERIFY TICKETS" link="verify " />
                    <LogoutBTN />
                </div>
                </div>
                </div>
            </div> */}
    <CNDTDASH  />
        </div>
    );
}
export default CProfile;