const mongoose= require("mongoose");

const DocSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    date:{
        type: Number,
        required: true
    }
},
{
    timestamps:true
});



module.exports = mongoose.model("Document", DocSchema);