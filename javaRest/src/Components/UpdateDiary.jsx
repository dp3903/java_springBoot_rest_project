import React,{useState} from 'react'

export default function UpdateDiary(props) {
    const [type,setType] = useState("public");
    const [content,setContent] = useState("");
    const [date,setDate] = useState(new Date(Date.now()));
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
            "date":date,
            "type":type,
            "owner":props.username,
            "content":content
        }

        fetch("http://localhost:8080/api/diary",{
            method:'PUT',
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
        <h1><strong><u>Update</u></strong> your diary</h1>
        <u><h6>(If Date is not selected than by default the current day will be taken.)</h6></u>
      <form>
        Type
        <select className="form-select" onChange={e => {setType(e.target.value)}} name='type' aria-label="Default select example">
            <option value="public">Public</option>
            <option value="private">Private</option>
        </select>
        <div className="my-2">
            Date
            <input type='date' value={date.getFullYear()+"-"+(date.getMonth()>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():"0"+date.getDate())} onChange={e => {setDate(new Date(e.target.value))}} className='form-control'/>
        </div>
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
