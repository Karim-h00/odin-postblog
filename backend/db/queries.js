const pool = require("./pool");

async function getMessage(){
    try{
        const { rows } = await pool.query("SELECT * FROM messages ORDER BY id asc;");
        const messages = rows;
        return messages
    }catch(err){
        return console.log(err);
    }
}

async function addMessage(title, content){
    try{
        await pool.query("INSERT INTO messages (title, content) VALUES ($1, $2)", [title, content]);
    }catch(err){    
        return console.log(err);
    }
}

async function updateMessage(title, content, id){
    try{
        await pool.query("UPDATE messages SET title = $1, content = $2 WHERE id = $3", [title, content, id])
    }catch(err){
        return console.log(err)
    }
}

async function deleteMessage(id){
    try{
        await pool.query("DELETE FROM messages WHERE id = $1", [id])
    }catch{
        return console.log(err);
    }
}

module.exports = {
    getMessage,
    addMessage,
    updateMessage,
    deleteMessage
}