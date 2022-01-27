// db connection function
import dbConnect from "../../../utils/dbConnect";

// model
import Note from '../../../models/Note';

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const notes = await Note.find({});
                res.status(200).json({
                    "isSuccess": true,
                    "data": notes
                })
            } catch (error) {
                res.status(400).json({ isSuccess: false })
            }
            break;

        case "POST":
            const result = await Note.findOne({title: req.body.title});
            if(result === null){
                const newNote = await Note.create(req.body);
                if(newNote){
                    res.status(201).json({
                        isSuccess: true,
                        message: "New note created.",
                        data: newNote
                    })
                }
            } else {
                res.status(400).json({ isSuccess: false, loc: "note already exist" })
            }
            break;
    
        default:
            res.status(400).json({ isSuccess: false, loc: "default" })
            break;
    }
}