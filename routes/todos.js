const express = require("express");
const requiresAuth = require("../middleware/permissions");
const router = express.Router();
const ToDo = require("../models/ToDo");
const validateToDoInput = require("../validation/toDoValidation");

// @route GET /api/rodos/test
// @desc  Test the todos route
// @access Public
router.get("/test", (req, res) => {
  res.send("Todo's route working");
});

// @route POST /api/rodos/test
// @desc  Test the todos route
// @access Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validateToDoInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    // create a new todo
    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    //save the new todo
    await newToDo.save();

    return res.status(200).json(newToDo);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// @route POST /api/rodos/test
// @desc  Test the todos route
// @access Private
router.get("/current", requiresAuth, async (req, res) => {
  try {
    // GET THE COMPLETED TODOS
    const completeToDos = await ToDo.find({
      user: req.user._id,
      complete: true,
    }).sort({ completedAt: -1 });

    // GETS THE INCOMPLETED TODOS
    const incompleteToDos = await ToDo.find({
      user: req.user._id,
      complete: false,
    }).sort({ createdAt: -1 });

    return res.json({ incomplete: incompleteToDos, complete: completeToDos });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});
module.exports = router;
