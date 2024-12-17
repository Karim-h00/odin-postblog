const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/index")
// const messageRouter = require("./routes/index")

app.use("/", routes)
// app.use("/message", indexRouter)

app.post("/message", (req, res)=>{
    console.log(req.body);
    
    res.status(200).json(req.body);
})


app.listen(3000, () => console.log("listening on port 3000!"));