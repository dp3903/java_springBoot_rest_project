import React,{useState} from 'react'

export default function DeleteDiary(props) {
    const [type,setType] = useState("public");
    const [date,setDate] = useState(new Date(Date.now()));
    const [message,setMessage] = useState("");

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', 'Basic ' + btoa(props.username + ":" + props.password));
    headers.append('Content-Type','application/json');
    // headers.append('Accept','application/json');

    function removediary(event){
        event.preventDefault();
        let data = {
            "date":date,
            "type":type,
            "owner":props.username,
            "content":""
        }

        fetch("http://localhost:8080/api/diary",{
            method:'DELETE',
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
      <h1>Enter the details of Diary you want to <strong><u>Delete</u></strong></h1>
        <u><h6>(If Date is not selected than by default the current day will be taken.)</h6></u>
        <form>
            <select className="form-select" onClick={e => {setType(e.target.value)}} aria-label="Default select example">
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <input type='date' value={date.getFullYear()+"-"+(date.getMonth()>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():"0"+date.getDate())} onChange={e => {setDate(new Date(e.target.value))}} className='form-control my-2'/>
            <button onClick={removediary} className='btn btn-primary'>Delete Diary</button>
        </form>
        {message}
    </div>
  )
}
