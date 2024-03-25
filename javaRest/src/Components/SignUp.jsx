import React from 'react'
import { useState } from 'react';

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function register(event){
        event.preventDefault();
        console.log(username);
        console.log(password);
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Content-Type','application/json');
        // console.log(headers);
        let body = {  
            "username":username,
            "password":password
        };
        console.log(body);
        let url = "http://localhost:8080/api/newuser";
        fetch(url, {method:'POST',
            headers: headers,
            body: body
        })
        .then(response => {
            console.log(response.status);
        })
    }

  return (
    <div className="container">
        <h1 className='header'>Sign Up</h1>
        <hr className='my-4'></hr>
        <form action='http://localhost:8080/api/newuser' method='post'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={e => setUsername(e.target.value)} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type='submit' className="btn btn-primary">Submit</button>
        </form>
      </div>
  )
}

export default SignUp
