// db connection function
import dbConnect from "../../../utils/dbConnect";

// model
import Note from '../../../models/Note';

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const { 
        query: { id } ,
        method
    } = req;

    switch (method) {
        case "GET":
            try {
                const note = await Note.findById(id);
                if(note){
                    return res.json({
                        isSuccess: true,
                        data: note
                    })
                }
            } catch (error) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "We can't find the note, wrong id param"
                })
            }
            break;

        case "PUT":
            try {
                const note = await Note.findById(id);
                if(note){
                    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });

                    if(!updatedNote){
                        return res.status(400).json({
                            isSuccess: false,
                            message: "There's an error w/ updating the note"
                        })
                    }

                    return res.status(200).json({ 
                        isSuccess: true, 
                        data: updatedNote 
                    });
                } 
            } catch (error) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "We can't find the note, wrong id param"
                })
            }
            break;
            
            case "DELETE" :
                try {
                    const deletedNote = await Note.findByIdAndDelete(id);
                    if(!deletedNote){
                        return res.status(400).json({
                            isSuccess: false,
                            message: "An error occured."
                        })
                    }
                    return res.status(200).json({
                        isSuccess:true,
                        message: `Successfully deleted the "${deletedNote.title}" note`
                    })
                } catch (error) {
                    return res.status(400).json({
                        isSuccess: false,
                        message: "We can't find the note, wrong id param"
                    })
                }
                break;
    
        default:
            return res.status(400).json({ isSuccess: false, loc: "default" })
            break;
    }
}