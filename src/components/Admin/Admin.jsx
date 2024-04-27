import React, { useState } from 'react';
import logo1 from '../../logos/logo1.png'
import logo2 from '../../logos/logo2.png'
import './admin.css'
import Swal from 'sweetalert2';

import key from './key.png'
import axios from 'axios';
import link from '../../backendlink';
function Admin() {

    const initialFormData = {
        name: '',
        email: '',
        password: '',
        mobile: '',
        passwordVerify: '',
        isConductor: true, // Set to true by default
        busRoute: '',
        busNumber: ''
    };


    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };




    async function creation(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
      
            await axios.post(`${link}/auth`, formData, { withCredentials: true });
            await axios.get(`${link}/auth/logout`);
            Swal.fire({
                title: "Done !",
                text: "Conductor created successfully !!",
                icon: "success"
            });
           
          } catch (error) {
            console.log("error---> " , error);
            alert("something went wrong . Please try again !");
          }

        setFormData(initialFormData);

    }

    const [val, setVal] = useState('');
    const [flag, setFlag] = useState(false);
    const handleChange = (event) => {
        setVal(event.target.value);
    };


    const btnClicked = () => {
        if (val === 'yash') {
            setFlag(true);
        }
        else {
            Swal.fire({
                title: "Wrong Key !!",
                text: "Please try again !",
                icon: "error"
            });
            setVal('');
        }
    }

    return (

        <div className='admin'>
            <div className="admin-icon">
                <a href="/" style={{ zoom: '0.75' }}>

                    <img src={logo2} alt="" />
                    <img src={logo1} alt="" />
                </a>
            </div>
            {flag ? (
                <div>

                    <h2>Create a Conductor</h2>
                    <br />
                    <form action="#" >
                        <div className="admin-sec-2">
                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                            <input required type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                            <input required type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile" />
                            <input required type="password" name="passwordVerify" value={formData.passwordVerify} onChange={handleInputChange} placeholder="Verify Password" />
                            <input required type="text" name="busRoute" value={formData.busRoute} onChange={handleInputChange} placeholder="Bus Route" />
                            <input required type="text" name="busNumber" value={formData.busNumber} onChange={handleInputChange} placeholder="Bus Number" />
                            <button onClick={creation}>Create Conductor</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>

                    <div className="admin-sec">

                        <h2>ADMIN ACCESS</h2>
                        <img src={key} alt="" className='adminkey' />
                        <input type="password" placeholder='ENTER A SECURITY KEY T0 ACCESS ADMIN' value={val} onChange={handleChange} />
                        <button onClick={btnClicked}>GET ACCESS</button>

                    </div>
                </div>
            )}


        </div>
    );
}
export default Admin;


