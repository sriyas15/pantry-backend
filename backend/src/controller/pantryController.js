import Things from "../model/pantrySchema.js";

export const getThings = async(req,res)=>{

    try {
        
        const notes = await  Things.find();
        res.status(200).json(notes);

    } catch (error) {
        console.error("Cannot get things",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const uploadThings = async(req,res)=>{
    
    try {
        
        const { title } = req.body;
        if(!title)
            return res.status(400).json({message:"Title required"});
        
        const exist = await Things.findOne({title});
        if(exist)
            return res.status(400).json({message:"Already Exist"});
    
        const newNotes = new Things({ title });
        await newNotes.save();        
        res.status(201).json({message:"Uploaded Successfully"});

    } catch (error) {
        console.error("Cannot upload Things",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateThings = async(req,res)=>{

    try {
        
        const { title } = req.body;
        const update = await Things.findByIdAndUpdate(req.params.id,{ title });

        if(!update) return res.status(404).json({message:"Things not found"});

        res.status(200).json({message:"Updated successfully"});

    } catch (error) {
        
        console.error("Cannot update Things",error);
        res.status(500).json({message:"Internal Server Error"});

    }

}

export const deleteThings = async(req,res)=>{
    
    try {
        
        const deleteNotes = await Things.findByIdAndDelete(req.params.id);

        if(!deleteNotes) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"deleted successfully"});
    } catch (error) {
        
        console.error("Cannot delete",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

