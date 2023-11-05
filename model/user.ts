import mongoose, { Schema } from "mongoose";
import Card from "./card";
import Transaction from "./transactions";
// import Transaction from "./transactions";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    id_card_type: {
        type: String,
        required: true,
    },
    id_card_number: {
        type: Number,
        required: true,
    },
    mothers_maiden_name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    account_Number: {
        type: Number,
        required: true,
        unique: true
    },
    account_type: {
        type: String,
        required: true,
    },
    out: [
        {
            type: Schema.Types.ObjectId,
            ref: Transaction
        }
    ],
    in: [
        {
            type: Schema.Types.ObjectId,
            ref: Transaction
        }
    ],
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: Card
        }
    ],
    password: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    first_address: {
        type: String,
        required: true,
    },
    second_address: {
        type: String
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zip_code: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: Number,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'processing',
        enum: [
            'processing',
            'blocked',
            'no Transfer',
            'confirmed',
            'suspened'
        ]
    },
    securityQuestion: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Number,
        required: true,
        default: Date.now()
    }

})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;