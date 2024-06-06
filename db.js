require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to database. ");
  }).catch((err) => {
    console.log(err);
  });

// const userSchema=new mongoose.Schema({
//     firstName:{
//         type:String,
//         required:false,
//     },
//     lastName:{
//         type:String,
//         required:false,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     encryptedPassword:{
//         type:String,
//         required:true,
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now,
//     },
// });
// const taskSchema=new mongoose.Schema({
//  title:{
//     type:String,
//     required:true,
//  },
//  description:{
//     type:String,
//     required:true,
//  },
//  dueDate:{
//     type:Date,
//     required:true,
//  },

//  status:{
//     type:String,
//     enum:["completed","pending"],
//     default:"pending",
//  },
// });
// const User=mongoose.model("User",userSchema);
// const Task=mongoose.model("Task",taskSchema);
// module.exports=Task;
