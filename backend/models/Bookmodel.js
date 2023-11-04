import mongoose from 'mongoose';

const BookSchema = mongoose.Schema({
    Title : {
        type : String,
        required : true
    },
    Author : {
        type : String,
        required : true
    },
    Yearofpublish : {
        type : Number,
        required : true
    }

},{
    timestamps:true
})


export const Book = mongoose.model('Book', BookSchema);