export const MessageService = (function(){
    const getData = async () => {
        const response = await (await fetch("http://localhost:3000/message")).json();
        return response.messages
      }

    const update = async (updateData) =>{
        try {
            await fetch("http://localhost:3000/message", {
              method: "put",
              body: JSON.stringify({ id: updateData.id, title: updateData.title, content: updateData.content }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } catch (err) {
           console.log(err);
          }
    }

    const add = async ({title, content}) =>{
        await fetch("http://localhost:3000/message", {
            method: "post",
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
        
    }

    const remove = async (id) =>{
        await fetch("http://localhost:3000/message", {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
    return{getData, update, add, remove}
  })();