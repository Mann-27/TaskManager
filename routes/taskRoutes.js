const express= require("express");
const app=express.Router();
const bcrypt=require('bcrypt');
const userMiddleware = require("../middleware/userMiddleware")
const Task = require('../models/Task');
const User=require('../models/User');

//to check api/test api
app.get('/test',userMiddleware,(req,res)=>{
     res.json('task routes are working.');
});
app.get("/", userMiddleware, async (req, res) => {
    try {
      // Populate the tasks field to get the actual task documents
      const user = await User.findById(req.user._id).populate('tasks', 'title description dueDate status');// 'tbname' ,'fields'
      
      res.status(200).json({
        id: user._id,
        email: user.email,
        tasks: user.tasks
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).send({ error: "Failed to fetch tasks" });
    }
  });
  
  app.get("/:id", userMiddleware, async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).send({ error: "Failed to fetch task" });
    }
  });

app.post("/", userMiddleware, async (req, res) => {
    try {
        // Extract task data from the request body
        const { title, description, dueDate } = req.body;

        // Create a new task object
        const task = new Task({
            title: title,
            description: description,
            dueDate: dueDate,
            owner: req.user._id 
        });

        // Save the task to the database
        await task.save();

        // Add the task ID to the user's tasks array
        req.user.tasks.push(task);
        await req.user.save();

        // Respond with the newly created task
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).send({ error: 'Failed to create task' });
    }
});

app.put("/:id",userMiddleware, async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body;
        const options = { new: true }; // Return the updated task
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, options);
        if (!updatedTask) {                  
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(400).send({ error: 'Failed to update task' });
    }
});


app.delete("/:id",userMiddleware, async(req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findOneAndDelete({_id: taskId});
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send({ error: 'Failed to delete task' });
    }
});



module.exports=app;
