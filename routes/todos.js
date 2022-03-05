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

// @route PUT /api/Todos/:toId/complete
// @desc  Mark a todo as complete
// @access Private
router.put("/:toDoId/complete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "Could not find ToDo" });
    }

    if (toDo.complete) {
      return res.status(400).json({ error: "ToDo is already complete" });
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        complete: true,
        completedAt: new Date(),
      },
      {
        new: true,
      }
    );

    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

// @route PUT /api/Todos/:toId/incomplete
// @desc  Mark a todo as Incomplete
// @access Private
router.put("/:toDoId/incomplete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "Could not find ToDo" });
    }

    if (!toDo.complete) {
      return res.status(400).json({ error: "ToDo is not complete" });
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        complete: false,
        completedAt: null,
      },
      {
        new: true,
      }
    );

    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

// @route UPDATE /api/Todos/:toDoId
// @desc  Update todo
// @access Private
router.put("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "Could not find ToDo" });
    }

    const { isValid, errors } = validateToDoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const updatedTodo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    return res.json(updatedTodo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
});

// @route DELETE /api/Todos/:toDoId
// @desc  Delete todo
// @access Private
router.delete("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      res.status(404).json({ error: "Could not find Todo" });
    }

    await ToDo.findOneAndRemove({
      user: req.user._id,
      _iid: req.params.toDoId,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
