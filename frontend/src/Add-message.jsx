import { useState } from "react";
import {Link} from "react-router-dom";

function AddMessage(){

    const [data, setData] = useState({title: '', content: ''});

    const handleSubmit=(e)=>{
        e.preventDefault();

        fetch("http://localhost:3000/message", {
            method: "post",
             body: JSON.stringify({ title: data.title, content: data.content }), 
             headers: {
              'Content-Type': 'application/json',
            },
          });
    }

    const HandleChange = (e, key) =>{
        setData({ ...data, [key]: e.target.value})
    }

    return(
        <>
            <form action="" onSubmit={handleSubmit} method="post">
                <label htmlFor="title">Title</label>
                <input type="text" onChange={(e) =>{
                        HandleChange(e, "title");
                    }} 
                    value={data.title} name="title"/>

                <label htmlFor="content">Content</label>
                <input type="text" onChange={(e) =>{
                        HandleChange(e, "content");
                    }} 
                    value={data.content} name="content"/>

                <div>
                    <button type="submit">Submit</button>
                </div>

                <div>
                    <Link to="/message">go to messages</Link>
                </div>
            </form>

            <h1>{data.title}</h1>
            <h1>{data.content}</h1>
        </>
    )
}

export default AddMessage
