const mongoose= require("mongoose");

const encDocSchema = new mongoose.Schema({
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
    },
    key:{
        type: String,
        required: true
    }
},
{
    timestamps:true
});



module.exports = mongoose.model("EncryDocument", encDocSchema);