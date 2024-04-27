import { useState } from "react";
import './inputSearch.css';

function Dropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = [  "Source",   "Pune","Shrirampur","Mumbai","Satara","Nashik","Solapur","Kolhapur" 
];
const [narray , setnArray] = useState([]);
const [query , setQuery] = useState("");


 function querychnage(e) {
    setQuery(e.target.value)
    setnArray(options.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase())))
    if(e.target.value === "")
    {
      setnArray([]);
      
    }
    console.log("Current status =>",typeof e.target.value ," with value = " ,e.target.value);
    console.log("==>" ,narray);
    setIsActive(!isActive)
  }
  return (
    <div className="dropdown">
      <input required type="text" placeholder="Select" className="input-source" onChange={querychnage} value={query} onClick={(e) => setIsActive(!isActive)} />                  
      <div className="dropdown-btn" >
      </div>
      {isActive && (
        <div className="dropdown-content">
          {narray.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setQuery(option)
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;



// {
//   {Source : "pune" ; destination : "Mumbai" ; price : "120";};
//   {Source : "pune" ; destination : "Shrirampur" ; price : "280";};
//   {Source : "Mumbai" ; destination : "Satara" ; price : "520";},

// }