const mongoose=require('mongoose');
const bcrypt=require("bcrypt");     
const Task = require("./Task")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        minLength: 5,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//middleware to hash the password
userSchema.pre('save',async function(next) {
  const user= this;

  if(user.isModified('password')){
    const saltRounds=10;
    user.password=await bcrypt.hash(user.password,saltRounds);
  }

  next();//push the request,new schema will be saved.
});



const User=mongoose.model("User",userSchema);
module.exports=User;