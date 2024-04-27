import React, { useContext, useState } from 'react';
import AuthContext from '../../context/authcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import link from '../../backendlink';
import './auth.css';
import logo1 from '../../logos/logo1.png'
import logo2 from '../../logos/logo2.png'

function Login() {
  const navigate = useNavigate();
  const { getLoggedin} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function login(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post(`${link}/auth/login`, loginData, { withCredentials: true });
      await getLoggedin();

      navigate('/main')

     
    } catch (error) {
      setEmail('');
      setPassword('');
      alert("Wrong Email or Password. Please try again !");
    }
  }

  return (
    <div>
      {/* <Navbar flag={true}/> */}
      <div className="logo-login">
      <a href="/">
          <img src={logo2} alt="" />
          <img src={logo1} alt="" />
          </a>
    </div>
    <div className="form login">
    
      <div className="form-content">
        <header>Login</header>
        <form onSubmit={login}>
          <div className="field input-field">
            <input required type="email" placeholder="E-mail" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field input-field">
            <input required type="password" placeholder="Password" value={password} className="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-link">
            <a href="/page-not-found" className="forgot-pass">Forgot password?</a>
          </div>
          <div className="field button-field">
            <button
              disabled={loading}
              className={`loading-button ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Logging You in....' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="form-link">
          <span>Don't have an account? <a href="/register" className="link signup-link">Signup</a></span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
