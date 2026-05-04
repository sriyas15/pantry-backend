import mongoose from "mongoose";

const pantrySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
},{timestamps:true}
);

const Things = mongoose.model("Things",pantrySchema);
export default Things;  