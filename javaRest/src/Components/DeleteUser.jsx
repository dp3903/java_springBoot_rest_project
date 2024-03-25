import React, { useState } from 'react'
import { redirect } from 'react-router-dom';

export default function DeleteUser(props) {
    const [message,setMessage] = useState("");
    const [response,setResponse] = useState("");

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', 'Basic ' + btoa(props.username + ":" + props.password));
    headers.append('Content-Type','application/json');
    // headers.append('Accept','application/json');

    function removeuser(event){
        event.preventDefault();

        fetch("http://localhost:8080/api/deleteUser",{
            method:'DELETE',
            headers: headers,
            body: message
            
        })
        .then(res => {
            console.log(res.status);
            if(res.status > 400){
                setResponse("User cannot be deleted.");
                // return res.statusText;
                
            }
            return res.text();
        })
        .then(res => {
            if(res){
                setResponse(res);
                console.log(res);
                console.log(res == "User deleted successfuly");
                if(res == "User deleted successfuly")
                    window.location.href = 'http://localhost:5173/signin';
            }
        })
        .catch(err => {
            setResponse("User cannot be deleted.");
            console.log(err)
        })
    }

  return (
    <div>
      <h1><u><strong>User</strong></u> will be <u><strong>Deleted</strong></u></h1>
      <u><h6>- Enter 'confirm' in the below box and press confirm button to permanently delete this user.</h6></u>
      <u><h6>- Only do this if you are sure as this will delete all the user data including any and all diaries.</h6></u>
      Message:
      <input type="text" className="form-control" placeholder='confirm here by typing "confirm" .' value={message} onChange={e => setMessage(e.target.value)}/>
      <button onClick={removeuser} className='btn btn-primary my-3'>Confirm</button>
      <h3>{response}</h3>
    </div>
  )
}
