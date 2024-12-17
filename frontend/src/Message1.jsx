import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"

function Message() {

  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [selected, setSelected] = useState('');
  const [addMessage, setAddMessage] = useState([]);
  const [displayForm, setDisplayForm] = useState(false)


  const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const getData = async () => {
    const response = await (await fetch("http://localhost:3000/message")).json();
    return response.messages
  }

  useEffect(() => {
    (async () => {
      const messages = await getData();
      setData(messages);
    })();
  }, []);


  const handleUpdate = (value, key, i) => {
    const editData = deepClone(updateData);
    editData[i] = { ...editData[i], [key]: value };
    setUpdateData(editData);
  }

  const submitUpdate = async (e, i) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/message", {
        method: "put",
        body: JSON.stringify({ id: updateData[i].id, title: updateData[i].title, content: updateData[i].content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(deepClone(updateData))
    } catch (err) {
      setData(deepClone(oldData));
      console.log(err);
    }

    setSelected(null)
  }

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/message", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const HandleChange = (e, key) => {
    setAddMessage({ ...addMessage, [key]: e.target.value })
  }

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/message", {
      method: "post",
      body: JSON.stringify({ title: addMessage.title, content: addMessage.content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    setDisplayForm(false);
    setAddMessage({id:'', title: '', content:''});
  }

  const addMessageForm = () => {

    
    return (
      <form action="" onSubmit={handleSubmitMessage} method="post">
        <label htmlFor="title">Title</label>
        <input type="text" onChange={(e) => {
          HandleChange(e, "title");
        }}
          value={addMessage.title} name="title" />

        <label htmlFor="content">Content</label>
        <input type="text" onChange={(e) => {
          HandleChange(e, "content");
        }}
          value={addMessage.content} name="content" />
        <div>
          <button type="submit">Submit</button>
          <button onClick={()=>{setDisplayForm(false)
            setAddMessage({id:'', title:'', content:''})
          }}>Cancel</button>
        </div>
      </form>
    )
  }

  const renderContent = (v, i) => {
    return (
      <div key={i}>
        {selected === i ? (
          <form method="post" onSubmit={((e) => { submitUpdate(e, i) })}>
            <input type="text" value={updateData[i].title} name="title" onChange={(e) => {
              handleUpdate(e.target.value, 'title', i)
            }} />
            <input type="text" value={updateData[i].content} name="title" onChange={(e) => {
              handleUpdate(e.target.value, 'content', i)
            }} />
            <button type="submit">submit</button>
            <button onClick={(e) => setSelected(null)}>cancel</button>
          </form>
        ) : (
          <>
            <p>{v.title}</p>
            <p>{v.content}</p>
            <button onClick={() => {
              setSelected(i);
              setUpdateData(deepClone(data));
              setData(deepClone(data));
              setOldData(deepClone(data));
            }}>update</button>
            <button onClick={() => handleDelete(v.id)}>delete</button>
          </>
        )}
      </div>
    );
  }


  const checkIfTrue=()=>{
    if(displayForm === true){
      return addMessageForm();
    }else{
      return <button onClick={() => setDisplayForm(true)}>Add new Message</button>
    }
  }
  return (
    <div>

      <h1>meow meow</h1>
      
      {/* <button onClick={() => setDisplayForm(true)}>Add new Message</button>
       {displayForm && addMessageForm()} */}

      {checkIfTrue()}

      {data.map(renderContent)}

      <Link to="/">Click Here to go back</Link>

      <div>
        <Link to="/add-message">add msg</Link>
      </div>
    </div>
  );
};

export default Message;