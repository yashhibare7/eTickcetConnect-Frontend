import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import Verification from './Verification';
import Navbar from '../Home/Navbar/Navbar';
import './check.css'
import qr from './qr.png'
const Check = () => {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState('No result');
  const [flag, setFlag] = useState(true)
  const handleScan = (data) => {
    console.log(data);
    if (data != null) {
      setResult(data.text);
      setFlag(false);

    }
  }


  const handleError = (err) => {
    console.error(err);
  }

  function scan() {
    window.location.reload();
    window.location.reload();
  }
  const previewStyle = {
    height: 400,
    width: 360,
  }

  return (
    <div className='CNDT'>
<Navbar />
      {flag ? (<div >
        
        <div className="scanner">

          <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            constraints={{
              audio: false,
              video: { facingMode: "environment" }
            }}
          />


        </div>
      </div>) : (


        <div className="scanner">
          <div>

            <Verification inp={result} />
          </div>
        </div>
      )}


      <div className='scan'>
        <div className="scanbtn" onClick={scan}>
          <img src={qr} alt="" />
          Scan QR Here
        </div>
      </div>


    </div>
  );
}

export default Check;
