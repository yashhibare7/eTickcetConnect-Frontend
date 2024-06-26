import React, { useContext   , useState} from 'react';
import AuthContext from '../../context/authcontext';
import { useNavigate } from 'react-router-dom';
import link from '../../backendlink';
import logo1 from '../../logos/logo1.png'
import logo2 from '../../logos/logo2.png'

import axios from 'axios';
function Register()
{
    const {getLoggedin} = useContext(AuthContext);
    const [email , setEmail] = useState("");
    const [mobile , setMobile] = useState("");
    const [name , setName] = useState("");
    const [password , setpassword] = useState("");
    const [passwordVerify , setVerifyPassword] = useState("");
    const navigate = useNavigate();

    async function register(e)
    {
        e.preventDefault();

        try {

          const userID = Math.floor(Math.random() * 9000) + 1000;

          
            
            const registerData = 
            {
               name,  mobile,email , password , passwordVerify,userID
            };

            await axios.post(`${link}/auth` , registerData);
            await getLoggedin();
            navigate("/main")


        } catch (error) {
            console.log(error);
            
        }
    }



    const togglePasswordVisibility = (e) => {
      e.preventDefault();
      const passwordFields = document.querySelectorAll(".password");
  
      passwordFields.forEach((password) => {
        if (password.type === "password") {
          password.type = "text";
        } else {
          password.type = "password";
        }
      });
    };
  
  
    return(
      <div>
        <div className="logo-login">
      <a href="/">
          <img src={logo2} alt="" />
          <img src={logo1} alt="" />
          </a>
   
      </div>
        <div className="form signup">
        <div className="form-content">
          <header>Signup</header>
          <form onSubmit={register} autocomplete="off">
          <input autoComplete="new-password" name="hidden" type="text" style={{display:"none"}} />

            <div className="field input-field">
              <input required type="text" placeholder="Name" className="input" onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className="field input-field">
              <input required type="text" placeholder="Mobile" className="input" onChange={(e)=> setMobile(e.target.value)}/>
            </div>
            <div className="field input-field">
              <input required type="email" placeholder="Email" className="input" onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="field input-field">
              <input autocomplete="off" required type="password" placeholder="Password" className="password" onChange={(e)=> setpassword(e.target.value)} />
            </div>
            <div className="field input-field">
              <input required type="password" placeholder="Confirm password" className="password" onChange={(e)=> setVerifyPassword(e.target.value)}/>
              <i className='bx bx-hide eye-icon' onClick={togglePasswordVisibility}></i>
            </div>
            <div className="field button-field">
              <button>Signup</button>
            </div>
          </form>
          <div className="form-link">
            <span>Already have an account? <a href="/login" className="link login-link" >Login</a></span>
          </div>
        </div>
        </div>
        
        
      </div>
    );
}
export default Register;