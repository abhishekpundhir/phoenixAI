import express from "express";
import Thread from "../models/Thread.js"
import getOpenAIApiResponse from "../utils/finityai.js";
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


// Get all threads
router.get("/thread", async(req,res) =>{
     try{
      const threads = await Thread.find({}).sort({upddatedAt: -1});  //   decanding order of UpdatedAt , most recents threads
      res.json(threads);
   console.log(await Thread.find({}).sort({ updatedAt: -1 }));

     }catch(err){
        console.log(`Error: ${err}`);
        res.status(500).json({Error: "Faild to fetech Threads"})
     }
})

// Get a Chat
router.get("/thread/:threadId", async(req,res) =>{
     const {threadId} = req.params;
     try{
      const thread = await Thread.findOne({threadId});  
      if (!thread) {
        res.status(404).json({Error: "Chat Not found"});
      }
      res.json(thread.messages);
   console.log(await Thread.find({}).sort({ updatedAt: -1 }));

     }catch(err){
        console.log(`Error: ${err}`);
        res.status(500).json({Error: "Faild to fetech Chat"});
     }
})


// Deletion of Chat
router.delete("/thread/:threadId", async(req,res) =>{
     const {threadId} = req.params;
     try{
      const deletedThread = await Thread.findOneAndDelete({threadId});  
      if (!deletedThread) {
        res.status(404).json({Error: "Chat Not Found"});
      }
      res.status(200).json({sucess: "Chat Deleted Successfully"})
     }catch(err){
        console.log(`Error: ${err}`);
        res.status(500).json({Error: "Faild to delete Chat"});
     }
})









// Deletion of Chat
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ Error: "Missing Required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    // ✅ Await AI response
    const assistantReply = await getOpenAIApiResponse(message);

    // ✅ Use correct role spelling "assistant"
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();

    return res.json({ reply: assistantReply });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({ Error: "Something went wrong" });
  }
});



export default router;