require('dotenv').config()
// stored the invoked object of process.env in PORT variable
const PORT=process.env.PORT;

const express=require('express')
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');

require('./db');
//express app
const app=express()
app.use(express.json());

app.get('/',(req,res)=>{
    res.json(
        {   
            message:'Task Manager api is working!'
        }
    )

});

app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);





//listen for request
app.listen(PORT,()=>{
    console.log("Listening on port 3000.");
})


