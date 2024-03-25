import React, { useState } from 'react'

export default function GetDiary(props) {
    const [type,setType] = useState("public");
    const [date,setDate] = useState(new Date(Date.now()));
    const [status,setStatus] = useState(400);
    const [result,setResult] = useState({});

    // setDate(date.toISOString().substring(0, 10));
    // console.log(date);

    function getdiary(event){
        event.preventDefault();
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Authorization', 'Basic ' + btoa(props.username + ":" + props.password));
        // console.log(headers);
        let time = new Date(date);
        let body = {
            "type":type,
            "date":time.getFullYear()+"-"+(time.getMonth()>9?(time.getMonth()+1):"0"+(time.getMonth()+1))+"-"+(time.getDate()>9?time.getDate():"0"+time.getDate())
        }
        console.log(body)
        let url = "http://localhost:8080/api/diary?date="+body.date+"&type="+body.type;
        fetch(url, {method:'GET',
            headers: headers,
        })
        .then(response => {
            console.log(response.status);
            setStatus(response.status);
            return response.json();
        })
        .then(response => {
            console.log(response);
            setResult(response);
        })
        .catch(err => {
            setStatus(400);
            console.log(err.message)
        })
    }

  return (
    <div>
        <h1>Enter the details of Diary you want to <strong><u>See</u></strong></h1>
        <u><h6>(If Date is not selected than by default the current day will be taken.)</h6></u>
        <form>
            <select className="form-select" onClick={e => {setType(e.target.value)}} aria-label="Default select example">
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <input type='date' value={date.getFullYear()+"-"+(date.getMonth()>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():"0"+date.getDate())} onChange={e => {setDate(new Date(e.target.value))}} className='form-control my-2'/>
            <button onClick={getdiary} className='btn btn-primary'>Get Diary</button>
        </form>
        {status<400 ? <><div className='my-2'>Content:</div><div style={{border: "1px solid #c0c0c0", padding: "5px", paddingInline: "10px", marginTop: "10px", borderRadius: "4px"}}>{result.content}</div></> : <div>No Entry for the above data.</div>}
    </div>
  )
}
