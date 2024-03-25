import React,{useState} from 'react'

export default function MyDiaries(props) {
    const [status,setStatus] = useState(400);
    const [result,setResult] = useState([]);

    function getmydiaries(event){
        event.preventDefault();

        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Authorization', 'Basic ' + btoa(props.username + ":" + props.password));

        let url = "http://localhost:8080/api/mydiaries";
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
        <h1>Get all your diaries till now.</h1>
        <button onClick={getmydiaries} className='btn btn-primary'>Click to get all your diaries</button>
        {result.map(element => {
            console.log(element.date);
            return <div>
                <hr></hr>
                <h4>{element.date}</h4>
                <h6>{element.type}</h6>
                <p>{element.content}</p>
            </div>
        })}
    </div>
  )
}
