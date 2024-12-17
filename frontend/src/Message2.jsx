import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import { deepClone } from "./utils/object";
import { MessageService } from "./services/message";

function ReMessages() {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [selected, setSelected] = useState('');
  const [addMessage, setAddMessage] = useState([]);
  const [displayForm, setDisplayForm] = useState(false)

  useEffect(() => {
   handlers.getData()
  }, []);


  const handlers = (function(){
    const getData = async () => {
      const messages = await MessageService.getData();
      setData(messages);
    }
    const update = (value, key, i) => {
        const editData = deepClone(updateData);
        editData[i] = { ...editData[i], [key]: value };
        setUpdateData(editData);
    }

    const add = (value, key) =>{
        setAddMessage({ ...addMessage, [key]: value })
    }

    return{update, add, getData}
  })();

  const submitters = (function(){
    const update = async (e, i) => {
        e.preventDefault();
        await MessageService.update(updateData[i]);
        setSelected(null);
        handlers.getData()
    }

    const add = async (e) => {
        e.preventDefault();
        await MessageService.add(addMessage);
        setDisplayForm(false);
        setAddMessage({id:'', title: '', content:''});
        handlers.getData()
    }

    const remove = async (id) => {
        await MessageService.remove(id);
        handlers.getData()
    }
    return {update, add, remove}
  })();

  const addMessageForm = () => {
    
    return (
      <form action="" onSubmit={submitters.add} method="post">
        <label htmlFor="title">Title</label>
        <input type="text" onChange={(e) => {
          handlers.add(e.target.value, "title");
        }}
          value={addMessage.title} name="title" />

        <label htmlFor="content">Content</label>
        <input type="text" onChange={(e) => {
          handlers.add(e.target.value, "content");
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
          <form method="post" onSubmit={((e) => { submitters.update(e, i) })}>
            <input type="text" value={updateData[i].title} name="title" onChange={(e) => {
              handlers.update(e.target.value, 'title', i)
            }} />
            <input type="text" value={updateData[i].content} name="title" onChange={(e) => {
              handlers.update(e.target.value, 'content', i)
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
              setOldData(deepClone(data));
            }}>update</button>
            <button onClick={() => submitters.remove(v.id)}>delete</button>
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

      {checkIfTrue()}

      {data.map(renderContent)}

      <Link to="/">Click Here to go back</Link>

      <div>
        <Link to="/add-message">add msg</Link>
      </div>
    </div>
  );
};

export default ReMessages;