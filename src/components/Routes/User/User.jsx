import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../Home/Navbar/Navbar';
import './user.css';
import AuthContext from '../../../context/authcontext';
import Button2 from '../../Genral/Button2';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Dashboard from './Dashboard/Dashboard';

function User() {
    const user = useContext(AuthContext);
    const user_id = user.user.userID;

    const showdata = {
        'data1' : 'User'
    }

    // State to store the fetched data
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://eticketconnect.onrender.com/ticket/user/${user_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                // console.log(response.json());
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
                console.log(data);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();

        // Clean up function
        return () => {
            // Any cleanup code if needed
        };
    }, [user_id]); // useEffect will re-run if user_id changes

    return (
        <div>
            <Navbar flag={false} />
            <div >
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div>
                    <Dashboard data={data} showdata={showdata}/>
                    </div>
                )}
            </div>


        </div>
    );
}

export default User;
