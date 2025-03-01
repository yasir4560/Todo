
class ErrorHandler extends Error {
 constructor(message, statusCode){
     super(message);
      this.statusCode = statusCode;
 }

}
export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal Server Error"
    res.status(404).json({
        success:false,
        message:err.message
    })
}

export default ErrorHandler