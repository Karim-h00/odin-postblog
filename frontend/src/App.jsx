import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const [data, setData] = useState(null);

  const getData = async () => {
   const x = await (await fetch("http://localhost:3000")).json();
   setData(x.status);
  }

  const postData = () => {
    fetch("http://localhost:3000/message", {
      method: "post",
       body: JSON.stringify({ name: "kareem" }), 
       headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  useEffect(() => {
    // fetch("http://localhost:3000", {mode: "no-cors"})
    // .then((response)=>{
    //   console.log({response})
    //   return response.json
    // })
    // .then((response)=>setData(response[0]));
    getData()
  }, []);

  return (
    <>
      <h1>hi</h1>
      <h1>{data}</h1>
      <button onClick={postData}>send req</button>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/message">Message</Link></li>
      </ul>
    </>
  )
}

export default App
