import React, { useState } from 'react'

function MakeDiary(props) {
    const [type,setType] = useState("public");
    const [content,setContent] = useState("");
    const [message,setMessage] = useState("");

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', 'Basic ' + btoa(props.username + ":" + props.password));
    headers.append('Content-Type','application/json');
    // headers.append('Accept','application/json');
    

    function makediary(event) {
        event.preventDefault();

        let data = {
            "id":"0",
            "date":"",
            "type":type,
            "owner":props.username,
            "content":content
        }

        fetch("http://localhost:8080/api/diary",{
            method:'POST',
            headers: headers,
            body: JSON.stringify(data)
            
        })
        .then(response => {
            console.log(response);
            return response.text();
        })
        .then(response => {
            setMessage(response)    ;
            console.log(response);
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div>
        <h1><strong><u>Create</u></strong> a diary</h1>
        <u><h6>(Date is taken as current day.)</h6></u>
      <form>
        <select className="form-select" onChange={e => {setType(e.target.value)}} name='type' aria-label="Default select example">
            <option value="public">Public</option>
            <option value="private">Private</option>
        </select>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Content</label>
            <textarea className="form-control" onChange={e => {setContent(e.target.value)}} value={content} name='content' rows="3"></textarea>
        </div>
        <input type="hidden" name='date' value="" />
        <input type="hidden" name='owner' value="" />
        <button onClick={makediary} className='btn btn-primary'>Make diary</button>
      </form>
      {message}
    </div>
  )
}

export default MakeDiary
