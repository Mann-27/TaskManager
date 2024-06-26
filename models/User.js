const mongoose=require('mongoose');
const bcrypt=require("bcrypt");     
const Task = require("./Task")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        minLength: 5,
        minLength: 9,
        lowercase:true,
        match: /^[a-z0-9._]+@[a-z]+\.[a-z]{2,4}$/,
        required: true,//email cannot be empty
        unique: true,//email id must be unique ,as there cant be 2 same ids.
    },
    password: {
        type: String,
        minLength: 8,
        match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#&])[A-Za-z\d@$#&]{8,}$/,
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
