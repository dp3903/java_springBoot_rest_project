import React,{useState} from 'react'

export default function PublicDiaries(props) {
    const [status,setStatus] = useState(400);
    const [result,setResult] = useState([]);
    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = result.filter((item) =>
            item.owner.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filteredItems);
    }

    function getpublicdiaries(event){
        event.preventDefault();

        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Authorization', 'Basic ' + btoa(props.username + ":" + props.password));

        let url = "http://localhost:8080/api/allpublicdiaries";
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
            setFilteredUsers(response);
        })
        .catch(err => {
            setStatus(400);
            console.log(err.message)
        })
    }

  return (
    <div>
        <h1>Get all Public diaries of all users till now.</h1>
        <button onClick={getpublicdiaries} className='btn btn-primary'>Click to get all Public diaries</button>
        <input
            type="text"
            className='form-control my-2'
            value={searchItem}
            onChange={handleInputChange}
            placeholder='Type to filter publisher.'
        />
        {filteredUsers.map(element => {
            console.log(element.date);
            return <div>
                <hr></hr>
                <h3>Publisher: {element.owner}</h3>
                <h4>{element.date}</h4>
                <h6>{element.type}</h6>
                <p>{element.content}</p>
            </div>
        })}
    </div>
  )
}
