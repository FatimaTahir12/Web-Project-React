const { ObjectId } = require("mongodb");
const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense', default: null }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal', default: null }],
    token: { type: String }
});

const User = mongoose.model("User", UserSchema);


module.exports = User;