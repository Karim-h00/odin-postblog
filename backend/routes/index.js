const { Router } = require("express");
const router = Router();
const pool = require("pg");
const db = require("../db/queries");



router.get("/", (req, res)=>{
    res.status(200).json({status: 'sucess'})
})

router.get("/message", async(req, res)=>{
    const messages = await db.getMessage();
    res.status(200).json({messages})
})

router.get("/profile", (req, res)=>{
    res.status(200).json({message: "you found the profile route!"})
})

router.get("/add-message", (req, res)=>{
    res.status(200).json({message: "add messages here"})
})

router.post("/message", async (req, res)=>{
    console.log(req.body.title);
    await db.addMessage(req.body.title, req.body.content);
    res.status(200).json(req.body);
})

router.put("/message", async(req, res) =>{
    await db.updateMessage(req.body.title, req.body.content, req.body.id)
    res.status(200).json(req.body);
})

router.delete("/message", async (req, res) =>{
    console.log(req.body.id)

    await db.deleteMessage(req.body.id)
    res.status(200).json(req.body);
})

module.exports = router;