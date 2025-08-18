import express from "express";
import Thread from "../models/Thread.js"
const router = express.Router();


// test 
router.post("/test", async(req,res)=>{
    try{
    const thread = new Thread({
        threadId: "xyz",
        title: "testing thread",
    })

    const response = await thread.save();
    res.send(response);
    }catch(err){
        console.log(`Error: ${err}`)
        res.status(500).json({error:"Faild to save in DB"});
    }
})


export default router;