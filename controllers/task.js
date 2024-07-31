import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


 export const  newTask = async(req, res, next) =>{
 try {
    const {title, description} = req.body;

    await Task.create({title, description, user:req.user});
  
  res.status(201).json({
      success:true,
      message:"task added successfully"
  })
 } catch (error) {
    next(error)
 }
}

export const  myTask = async(req, res, next) =>{
try {
    const {_id}= req.user
    const tasks = await Task.find({user:_id});
   if(!tasks) return next(new ErrorHandler("Invalid Id",404));
   res.status(201).json({
       success:true,
       tasks,
   })
   
} catch (error) {
    next(error)
}
  }

  export const deleteTask = async(req, res, next)=>{

   try {
    const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Invalid Id", 404))
    
   await task.deleteOne();

    res.status(200).json({
        success:true,
        message:"Task Deleted Successfully"
    })

   } catch (error) {
    next(error)
   }
  }

  export const updateTask = async(req, res, next)=>{
  
    try {
        const task = await Task.findById(req.params.id);

        if(!task) return next(new ErrorHandler("Invalid Id",404));
    
        task.isCompleted = !task.isCompleted;
        task.save();
    
        res.status(200).json({
            success:true,
            message:"Task updated Successfully"
        })
    } catch (error) {
        next(error)
    }
  }