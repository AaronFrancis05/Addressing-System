
import { Schema,models,model } from "mongoose";

const UserSchema = new Schema(
    {
        username:String,
        email:{type:String,unique:true},
        password:String,
        image:String
    }
)

const User = models.User || model('User',UserSchema)
export default User