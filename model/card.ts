import mongoose, { Schema } from "mongoose";


const CardSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },

    account_number: {
        type: Number,
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);

export default Card;
