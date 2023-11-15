import mongoose, { Schema } from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: String,
    date: {
        type: Date,
        default: Date.now()
    },
    title: String,
    amount: Number,
    to : Number,
    from : Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    destination : String,
    out: Boolean,
    trx_id: String,
    approved: {
        type: Boolean,
        default: false
    },
})

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;