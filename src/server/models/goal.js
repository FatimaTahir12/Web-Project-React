const mongoose = require ("mongoose");

const GoalSchema = new mongoose.Schema({
    username: { type:String, required: true },
    goal_category: { type: String, required: true },
    amount: { type: Number, required: true },
    goal_date: { type:Date, required: true }
});


const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;