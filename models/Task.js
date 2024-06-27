const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    title:{
       type:String,
       required:true,
    },
    description:{
       type:String,
       required:true,
    },
    dueDate:{
       type:Date,
       required:true,
    },
   
    status:{
       type:String,
       enum:["completed","pending"],
       default:"pending",
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
    }
   });
   const Task=mongoose.model("Task",taskSchema);
   module.exports=Task;
