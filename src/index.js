import dotenv from "dotenv";
import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR: ",error);
        throw error;
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running chill karo PORT : ${process.env.PORT}`);
    })
})
.catch((error)=>{
console.log("MONGO DB connection failed !!!");

})