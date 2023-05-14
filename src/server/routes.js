const User  = require("./models/user");
const Expense = require("./models/expense");
const Goal = require("./models/goal");

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
    encryptedPassword = await bcrypt.hash(password, 10);

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
  const { username, password, name, new_password } = req.body;

  // Validate user input
  if (!(username && password && name && new_password)) {
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

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    

    encryptedPassword = await bcrypt.hash(new_password, 10);

    // Create user in our database
    const updateduser = await User.updateOne({email: email},{
      name,
      username: username.toLowerCase(), // sanitize: convert email to lowercase
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
          res.status(201).send(temp);
          
          return;
        }
        

        const expense = await Expense.create({
            username,
            expense_category: category,
            amount, // sanitize: convert email to lowercase
        });

        const user = await User.findOneAndUpdate({username}, {$push: {expenses: expense}});
        
        if(user){
          // return new item
          res.status(200).json(expense);
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

        const update = {amount: amount}
        await temp.updateOne(update)
        res.status(201).send(temp);
        
        return;
      }
      
      // goaldate.setMonth(goaldate.getMonth + 1);
      // goaldate.setDate(1);

      const goal = await Goal.create({
          username,
          goal_category: category,
          goal_date:goaldate,
          amount, 
      });

      const user = await User.findOneAndUpdate({username}, {$push: {goals: goal}});
      
      if(user){
        // return new item
        res.status(200).json(goal);
      }
      else {
        res.status(400).send("Invalid user")
      }
  
  } catch (err) {
      console.log(err);
  }
});

// app.post("/get-allblogs", async (req, res) => {
//   try {
//     const {author_id} = req.body;
//     const filter = {author_id: author_id};
//     const blogs = await Blog.find(filter);
//     res.status(200).json(blogs);
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("get-blog", async (req, res) => {
//   try {
//     const {_id, author_id} = req.body;
//     const filter = {_id:_id, author_id: author_id};
//     const blog = await Blog.find(filter);
    
//     if (blog)
//       res.status(200).json(blog);
//     else
//       res.status(400).send("Blog not found");
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/update-blog", async(req, res)=> {
//     try {
//         const {_id, author_id, title, content} = req.body;

//         const blog = await Blog.updateOne({_id:_id, author_id: author_id}, 
//             {
//                 title: title,
//                 content: content
//             });

//         if(blog.modifiedCount == 1)
//             res.status(200).send("BLog updated successfully");
//         else {
//             res.status(400).send("Blog could not be updated");
//         }
        
//     }catch(err) {
//         console.log(err);
//     }
// });

// app.post("/delete-blog", async (req, res) => {
//     try {
//         const {_id, author_id} = req.body;

//         await Blog.deleteOne({_id: _id, author_id: author_id});
//         const user = await User.findOneAndUpdate({_id : author_id}, {$pullAll: {blogs: [_id]}}, {new: true});
//         res.status(200).send("Item deleted successfully");
        
//     }catch (err) {
//         console.log(err);
//     }
// });

// app.post("/comment", async (req, res) => {

//   try {
//     const {blog_id, commentor_id, comment} = req.body;
//     var today = new Date();

//     const newcomment = await Comment.create({
//         blog_id,
//         commentor_id,
//         comment_date: today,
//         comment
//     })
//     const user = await User.findOneAndUpdate({_id : commentor_id}, {$push: {comments: newcomment}});
//     const blog = await Blog.findOneAndUpdate({_id : blog_id}, {$push: {comments: newcomment}});
//     if(user)
//       res.status(200).json(user);
//     else
//     res.status(400).send("Invalid commentor");
//   } catch(err) {
//     console.log(err);
//   }

// });
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

app.post("/update-goal", async (req, res) => {
  try {
    const {username, category, amount} = req.body;

    const goal = await Goal.findOne({username:username, goal_category: category});
    const today = new Date();

    const update = {goal_date: today, amount: amount};
    await goal.updateOne(update);
    
    const expense = await Expense.findOne({username:username, expense_category: category});

    const expenseUpdate = {amount: 0};
    await expense.updateOne(expenseUpdate);
    res.status(200).send("Goal Updated");
  }
  catch (err) {
    console.log(err);
  }
});

app.get("/goals", async (req, res) => {
  try {
    const {username} = req.body;
    const filter = {username}
    const goals = await Goal.find(filter);
    res.status(200).json(goals);
  } catch (err) {
    console.log(err);
  }
});

app.get("/expenses", async (req, res) => {
  try {
    const {username} = req.body;
    const filter = {username}
    const expenses = await Expense.find(filter);
    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
  }
});



app.get("/users", async (req, res) => {
  try {
    const filter = {}
    const users = await User.find(filter).populate("expenses").populate("goals");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;