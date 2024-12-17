import { useState } from "react";

function MessageForm({onSubmitMessage, onCancel, content = '', title = ''}){

    const [data, setData] = useState({content, title})

    const addData = (value, key) =>{
        setData({ ...data, [key]: value })
    }

    const submitter = (e) =>{
            e.preventDefault()
        onSubmitMessage(data)
    }
    
    return (
      <form action="" onSubmit={submitter} method="post">
        <label htmlFor="title">Title</label>
        <input type="text" onChange={(e) => {
          addData(e.target.value, "title");
        }}
          value={data.title} name="title" />

        <label htmlFor="content">Content</label>
        <input type="text" onChange={(e) => {
            addData(e.target.value, "content");
        }}
          value={data.content} name="content" />
        <div>
          <button type="submit">Submit</button>
          <button onClick={()=>{
            setData({id:'', title:'', content:''})
            onCancel()
          }}>Cancel</button>
        </div>
      </form>
    )
  }

  export default MessageForm