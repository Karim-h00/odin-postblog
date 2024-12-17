import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function Profile() {

    const[data, setData] = useState('')

    const getData = async () => {
        const x = await (await fetch("http://localhost:3000/profile")).json();
        setData(x.message);
       }

       useEffect(() => {
        getData();
      }, []);

    return (
      <div>
        <h1>Hello from profile page!</h1>
        <p>So, how are you?</p>
        <p>{data}</p>
        <Link to="/">Click Here to go back</Link>
        
      </div>
    );
  };
  
  export default Profile;