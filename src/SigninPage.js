import React, {useState, useEffect} from "react";
import "./SigninPage.css";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [inputValue, setInputValue] = useState("");
  let Navigate = useNavigate();

  useEffect(() => {
    window.onload = function(){
      let obj = Object.keys(localStorage).reduce(function(obj, key) {
        obj[key] = localStorage.getItem(key);
        return obj
      }, {});
      Object.keys(obj).map((object) => {
        Navigate(`/${object}`);
        return;
      })
    }
   
  }, []);

  const handleSubmit = () => {
    if(inputValue !== ""){
      let obj = Object.keys(localStorage).reduce(function(obj, key) {
        obj[key] = localStorage.getItem(key);
        return obj
      }, {});
      let userExists = false;
      Object.keys(obj).map((object) => {
        let input = inputValue;
        let regExp = new RegExp(`\\b${input}\\b`, 'gi');
        if(object.match(regExp)){
          userExists = true;
          return;
        }
      })
      if(!userExists){
        localStorage.setItem(inputValue, `${inputValue}+60`);
        Navigate(`/${inputValue}`);
      }
    }
  };
  return (
    <div className="form-control">
      <label htmlFor="username">Enter your Username:</label>
      <input type="text" placeholder="Enter your username" onChange={(event) => setInputValue(event.target.value)} />
      <button onClick={handleSubmit}>Sign in</button>
    </div>
  );
};

export default SigninPage;
