import {Schema,models,model} from 'mongoose';

const AccountSchema = new Schema(
    {

        UserId:{type:Schema.Types.ObjectId,ref:'User'},
        provider:String,
        providerAccountId:String,
       
    }
)
const Account = models.Account || model('Account',AccountSchema);
export default Account;