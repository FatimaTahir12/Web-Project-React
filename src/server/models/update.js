const mongoose = require ("mongoose");

const UpdateSchema = new mongoose.Schema({
    username: { type:String, required: true },
    category: { type: String, required: true },
    expense_amount: { type: Number, required: true },
    goal_amount: { type: Number, required: true }
});


const Update = mongoose.model("Update", UpdateSchema);

module.exports = Update;