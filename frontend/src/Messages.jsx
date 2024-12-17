import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import MessageForm from "./components/MessageForm"
import MessageCard from "./components/MessageCard";
import { MessageService } from "./services/message";
import {useOnlineStatus}  from "./hooks/Example";


function Testing() {
  const [data, setData] = useState([]);
  const [adding, setAdding] = useState(false)
  const isOnline = useOnlineStatus()

  const renderNewMessage = () => {

    if (adding === false) {
      return (
        <button onClick={() => setAdding(true)}>add new Message</button>
      )
    } else {
      return (
        <MessageForm onSubmitMessage={async ({ title, content }) => {
          await MessageService.add({ title, content })
          setAdding(false)
          getData()
        }} onCancel={() => {
          setAdding(false)
        }} />
      )
    }
  }

  const getData = async () => {
    if (!isOnline) { 
      return
    }
    const response = await MessageService.getData()
    setData(response);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>

    {isOnline ? 'your are online now': 'you are offline now'}
      {renderNewMessage()}

      {data.map((v, i) => {
        return (
          <div key={v.id}>
            <MessageCard id={v.id} title={v.title} content={v.content}
              onUpdate={async (id, title, content) => {
                if (!isOnline) { 
                  return
                }

                await MessageService.update({ id, title, content });
                getData();

              }}
              onRemove={async (id) => {
                if (!isOnline) { 
                  return
                }
                await MessageService.remove(id);
                getData();
              }}
            />
          </div>)
      })}
    </>
  )
};


export default Testing;