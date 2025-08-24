import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



app.use("/api", chatRoutes);

const connectDB = async() => {
   try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Successfully Connected to Phoenix Database.....");
   }catch(err){

     console.log(`Connection faild with Phoenix Database! Error: ${err}`);
   }
}   
connectDB();




// Groq client (OpenAI-compatible)
// const client = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1", // 👈 point to Groq, not OpenAI
// });

// Route for chatting
// app.post("/chat", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await client.chat.completions.create({
//       model: "llama3-70b-8192", // Groq supports Llama3 + Mixtral + Gemma
//       messages:[{role: "user" , content:prompt}]
//     });

//     res.json({ reply: response.choices[0].message.content });
//     // console.log(response.choices[0].message.content);
//   } catch (err) {
//     console.error("Groq API error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


// app.post("/talk", async (req,res)=>{
//   const options = {
//     method: "POST",
//     headers:{
//        "Content-Type": "application/json",
//     "Authorization":`Bearer ${process.env.GROQ_API_KEY}`
//     },
//    body: JSON.stringify({
//     model: "llama3-70b-8192",
//     messages:[{role: "user" , content:"Hey"}]
//    })
//   }

//   try{
//    const response = await fetch("https://api.groq.com/openai/v1" , options);
//    const data = await response.json();
//    console.log(data)
//    res.send(data);
//   }catch(err){
//     console.log(err)

//   }
// })




app.listen(3000, () => {
  console.log("Phoenix server running on http://localhost:3000");
});
