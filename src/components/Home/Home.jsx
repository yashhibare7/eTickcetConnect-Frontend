import React, { useContext  } from 'react';
import AuthContext from '../../context/authcontext';
import './home.css'
import Navbar from './Navbar/Navbar';
import Button2 from '../Genral/Button2';
function Home()
{
    const {loggedIn} = useContext(AuthContext);

    const gotolink = loggedIn ? 'main': 'login';
   
    return(
        <div className='home'>
             <Navbar flag={false}/>
            
            <div className="home-content">
                <div className='home-title'>
                    <p>STOP LOOKING.</p>
                    <p id='redp'>START BOOKING!</p>
                    <h2>Travel Smarter, Travel Digital<br/> E-ticket Connect Redefines Your Journey.</h2>
                    <Button2 name="GET STARTED" link={gotolink}/>
                </div>
            </div>

        </div>
    );
}
export default Home;