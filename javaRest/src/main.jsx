import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUp from './Components/SignUp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/signin">Sign-in</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign-up</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin/*" element={<App/>}>

        </Route>
        
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>,
)
