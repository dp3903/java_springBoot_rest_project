import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './App.css'
import GetDiary from './Components/GetDiary'
import MakeDiary from './Components/MakeDiary'
import DeleteDiary from './Components/DeleteDiary'
import UpdateDiary from './Components/UpdateDiary'
import DeleteUser from './Components/DeleteUser';
import MyDiaries from './Components/MyDiaries';
import PublicDiaries from './Components/PublicDiaries';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [enable, setEnable] = useState(false);

  function handleClick(event){
    event.preventDefault();
    console.log(username);
    console.log(password);
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
    console.log(headers);
    let url = "http://localhost:8080/api/test";
    fetch(url, {method:'GET',
        headers: headers,
      })
      .then(response => {
        console.log(response.status);
        let status = response.status;
        if(status >= 400){
          setUserStatus("No such User found.");
          setEnable(false);
        }
        else{
          setUserStatus("you have successfully logged in.");
          setEnable(true);
        }
      })
    
  }


  return (
    <>
      <div className="container">
        <h1 className='header'>Sign In</h1>
        <hr className='my-4'></hr>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <button onClick={handleClick} className="btn btn-primary">Submit</button>
  
        </form>
        <h1 className='header'>{userStatus}</h1>

        {enable && <div>

          <hr className='my-4'/>
        
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/signin/getdiary">Find</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin/makediary">Make</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin/deletediary">Delete</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin/updatediary">Change</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin/deleteuser">Delete-user</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin/mydiaries">My Diaries</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin/publicdiaries">Public Diaries</Link>
            </li>
          </ul>
          <hr></hr>
          <Routes>
            <Route path="/getdiary" element={<GetDiary username={username} password={password}/>}/>
            <Route path="/makediary" element={<MakeDiary username={username} password={password}/>}/>
            <Route path="/deletediary" element={<DeleteDiary username={username} password={password}/>}/>
            <Route path="/updatediary" element={<UpdateDiary username={username} password={password}/>}/>
            <Route path="/deleteuser" element={<DeleteUser username={username} password={password}/>}/>
            <Route path="/mydiaries" element={<MyDiaries username={username} password={password}/>}/>
            <Route path="/publicdiaries" element={<PublicDiaries username={username} password={password}/>}/>
          </Routes>
        
        </div>}
          
        {/* {enable && <GetDiary username={username} password={password}/>}
        {enable && <div className='my-4'><hr></hr><MakeDiary username={username} password={password}/></div>}
        {enable && <div className='my-4'><hr></hr><DeleteDiary username={username} password={password}/></div>}
        {enable && <div className='my-4'><hr></hr><UpdateDiary username={username} password={password}/></div>}
         */}
      </div>
    </>
  )
}

export default App
