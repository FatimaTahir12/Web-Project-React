const User  = require("./models/user");
const Expense = require("./models/expense");
const Goal = require("./models/goal");
const Update = require("./models/update");
const express = require("express");
const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});


app.post("/register", async (req, res) => {
    // Our register logic starts here
  try {
    // Get user input
    const { name, username, password } = req.body;

    // Validate user input
    if (!(username && password && name)) {
      res.status(400).send("All inputs required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      username: username.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      "ghdspahgiqshpiohqwe4hrwyerhrwey346358465t4wegshrteujryjewqg",
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
    // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        "ghdspahgiqshpiohqwe4hrwyerhrwey346358465t4wegshrteujryjewqg",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.post("/update-profile", async (req, res) => {
  // Our login logic starts here
try {
  // Get user input
  const { username, new_name, new_password } = req.body;

  // Validate user input
  if (!(username && new_name && new_password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await User.findOne({ username });
  const token = jwt.sign(
    { user_id: user._id, username },
    "ghdspahgiqshpiohqwe4hrwyerhrwey346358465t4wegshrteujryjewqg",
    {
      expiresIn: "2h",
    }
  );

  // save user token
  user.token = token;

  if (user) {
    // Create token
    

    const encryptedPassword = await bcrypt.hash(new_password, 10);

    // Create user in our database
    const updateduser = await User.updateOne({username: username},{
      name: new_name,
      username, // sanitize: convert email to lowercase
      password: encryptedPassword,
    });


    // user
    res.status(200).json(updateduser);
  }
  res.status(400).send("Invalid Credentials");
} catch (err) {
  console.log(err);
}
});

app.post("/add-expense", async (req, res) => {
    try {
        const {username, category, amount} = req.body;

        if (!(username && category && amount)) {
          res.status(400).send("All input is required");
        }

        const temp = await Expense.findOne({username: username, expense_category: category})
        
        if(temp ) {
          var newAmount = Number(temp.amount);
          newAmount += Number(amount);
          const update = {amount: newAmount}
          await temp.updateOne(update)

          const tempupdate = await Update.findOne({username: username, category: category})
          if (tempupdate) {
            var newExpense = Number(tempupdate.expense_amount);
            newExpense += Number(amount);
            const update = {expense_amount: newExpense}
            await tempupdate.updateOne(update)
          }
          res.status(200).send(temp);
          
          return;
        }
        

        const expense = await Expense.create({
            username,
            expense_category: category,
            amount: Number(amount), // sanitize: convert email to lowercase
        });

        const user = await User.findOneAndUpdate({username}, {$push: {expenses: expense}});

        const update = await Update.create({
          username,
          category,
          expense_amount: Number(amount),
          goal_amount: 0,
        })
        // const tempgoal = await Goal.findOne({username: username, goal_category: category})

        // if(tempgoal === null) {
        //   const today = new Date()
        //    const goal = await Goal.create({
        //     username,
        //     goal_category:category,
        //     amount: 50000,
        //     goal_date: today
        //    });
        //    const user = await User.findOneAndUpdate({username}, {$push: {goals: goal}});
        // }
        
        
        if(user){
          res.status(200).send(expense);
        }
        else {
          res.status(400).send("Invalid user")
        }
    
    } catch (err) {
        console.log(err);
    }
});

app.post("/add-goal", async (req, res) => {
  try {
      const {username, category, amount} = req.body;

      if (!(username && category && amount)) {
        res.status(400).send("All input is required");
      }
      const goaldate = new Date();
      // const temp = Goal.findOneAndUpdate({username, category}, {amount: amount, goal_date: goaldate});
      const temp = await Goal.findOne({username: username, goal_category: category})
      if(temp ) {
        const today = new Date();
        const update = {amount: amount, goal_date: today}
        await temp.updateOne(update)

        const tempupdate = await Update.findOne({username: username, category: category})
          if (tempupdate) {
            const update = {goal_amount: Number(amount)}
            await tempupdate.updateOne(update)
          }
        res.status(201).send(temp);
        
        return;
      }


      const goal = await Goal.create({
          username,
          goal_category: category,
          goal_date:goaldate,
          amount: Number(amount), 
      });

      const user = await User.findOneAndUpdate({username}, {$push: {goals: goal}});
      
      const tempupdate = await Update.findOne({username: username, category: category})
          if (tempupdate) {
            const update = {goal_amount: Number(amount)}
            await tempupdate.updateOne(update)
          }
      if(user){
        // return new item
        res.status(200).send(goal);
      }
      else {
        res.status(400).send("Invalid user")
      }
  
  } catch (err) {
      console.log(err);
  }
});

// app.post("/update-goal", async (req, res) => {
//   try {
//     const {username, category, amount} = req.body;

//     const goal = await Goal.findOne({username:username, goal_category: category});
//     const today = new Date();

//     const update = {goal_date: today, amount: amount};
//     await goal.updateOne(update);
    
//     const expense = await Expense.findOne({username:username, expense_category: category});

//     const expenseUpdate = {amount: 0};
//     await expense.updateOne(expenseUpdate);
//     res.status(200).send("Goal Updated");
//   }
//   catch (err) {
//     console.log(err);
//   }
// });

app.post("/updates", async (req, res) => {
  try {
    const {username} = req.body;
    const filter = {username: username}
    const updates = await Update.find(filter);
    res.status(200).json(updates);
  } catch (err) {
    console.log(err);
  }
});


app.post("/refresh-goal", async (req, res) => {
  try {
    const {username, category} = req.body;

    const goal = await Goal.findOne({username:username, goal_category: category});
    const today = new Date();
    const goaldate = new Date(goal.goal_date);
    var months = (today.getFullYear()- goaldate.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    
    if (months > 0) {
      const update = {goal_date: today};
      await goal.updateOne(update);
      const expense = await Expense.findOne({username:username, expense_category: category});
      const expenseUpdate = {amount: 0};
      await expense.updateOne(expenseUpdate);
      res.status(200).send("Goal Updated");
    }
    res.status(400).send("Goal not refreshed as a month has not yet passed");
  }
  catch (err) {
    console.log(err);
  }
});



app.post("/goals", async (req, res) => {
  try {
    const {username} = req.body;
    const filter = {username: username}
    const goals = await Goal.find(filter);
    res.status(200).send(goals);
  } catch (err) {
    console.log(err);
  }
});

app.post("/expenses", async (req, res) => {
  try {
    const {username} = req.body;
    const filter = {username: username}
    const expenses = await Expense.find(filter);
    res.status(200).send(expenses);
  } catch (err) {
    console.log(err);
  }
});



app.get("/users", async (req, res) => {
  try {
    const filter = {}
    const users = await User.find(filter).populate("expenses").populate("goals");
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const {username} = req.body;
    const filter = {username: username}
    const user = await User.findOne(filter).populate("expenses").populate("goals");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;