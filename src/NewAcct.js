import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewAcct.css";


const NewAcct = () => {
  let Navigate = useNavigate();
  const [sessions, setSessions] = useState({});
  let obj = Object.keys(localStorage).reduce(function(obj, key) {
    obj[key] = localStorage.getItem(key);
    return obj
  }, {});

  useEffect(() => {
    async function setSessionData() {
      await setSessions(obj);
      let userExists = false;
      Object.keys(obj).map((object) => {
        let input = window.location.pathname.split("/")[1];
        let regExp = new RegExp(`\\b${input}\\b`, 'gi');
        if(object.match(regExp)){
          userExists = true;
          return;
        }
      })
      if(!userExists){
        Navigate(`/`);
        return;
      }
    }
    setSessionData();

    /* check if tab is active */
    var vis = (function(){
      var stateKey, eventKey, keys = {
          hidden: "visibilitychange",
          webkitHidden: "webkitvisibilitychange",
          mozHidden: "mozvisibilitychange",
          msHidden: "msvisibilitychange"
      };
      for (stateKey in keys) {
          if (stateKey in document) {
              eventKey = keys[stateKey];
              break;
          }
      }
      return function(c) {
          if (c) document.addEventListener(eventKey, c);
          return !document[stateKey];
      }
    })();

    vis(function(){
      let timer = null;
      let pathName = window.location.pathname.split("/")[1];
      if(pathName !== ""){
        if(vis()){
          let userExists = false;
          Object.keys(obj).map((object) => {
            let input = window.location.pathname.split("/")[1];
            let regExp = new RegExp(`\\b${input}\\b`, 'gi');
            if(object.match(regExp)){
              userExists = true;
              return;
            }
          })
          if(!userExists){
            localStorage.setItem(pathName, `${pathName}+60`);
            return;
          }
          
          clearTimeout(timer)
        }
        else{
          timer = setTimeout(() => {
            let userExists = false;
            Object.keys(obj).map((object) => {
              let input = window.location.pathname.split("/")[1];
              let regExp = new RegExp(`\\b${input}\\b`, 'gi');
              if(object.match(regExp)){
                userExists = true;
                return;
              }
            })
            if(!userExists){
              localStorage.setItem(pathName, `${pathName}+60`);
              return;
            }
          }, 60000)
        }
      }
      
    });
    
  }, [obj])

  const logout = () => {
    localStorage.removeItem(window.location.pathname.split("/")[1]);
    Navigate(`/`);
  }

  const logUserOut = (value) => {
    localStorage.removeItem(value);
  }
 
  return (
    <div className="logged-in-form">
      <h2 className="logged-in-title">Welcome {window.location.pathname.split("/")[1]}!</h2>
      <div className="signed-in">
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div className="active-sessions">
        <table>
          <thead>
            <tr>
              <th>Session name</th>
              <th>Session status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(obj).map((object, key) => {
                return(
                  <tr key={key}>
                    <td> {object} </td>
                    <td>
                      {
                        (obj[object].split("+")[1] !== "0") ? 'Active' : 'Idle'
                      }
                    </td>
                    <td>
                      <button onClick={() =>{
                        (object === window.location.pathname.split("/")[1]) ? logout() : logUserOut(object)
                      }}>Logout</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default NewAcct;
