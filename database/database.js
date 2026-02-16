import mongoose from "mongoose";

let isConnected=false;

export const connectToDb=async()=>{
    if(isConnected){
        console.log('Mongoose already connected and will shutdown ');
        return
    }else{
        try{
            mongoose.set('strictQuery',true)
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName:'Addressing_System'
            })
            isConnected=true
        }catch(error){
            console.log(error.message);
            
        }
    }
}