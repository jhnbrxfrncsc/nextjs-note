import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        unique: true,
        maxlength: [40, "Title cannot be more than 40 characters"]
    },
    desc: {
        type: String,
        required: [true, "Please enter a description"],
        maxlength: [200, "Description cannot be more than 40 characters"]
    }
});


export default mongoose.models.Notes || mongoose.model("Notes", NoteSchema);