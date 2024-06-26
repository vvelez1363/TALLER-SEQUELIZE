const router = require("express").Router();
const Todo = require("../src/models/todoModel");

// OBTENER TODOS LOS REGISTROS
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.findAll();
        const { message } = req.query;
        res.render('todos/index', { todos, message });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// CREAR UNA NUEVA TAREA
router.post("/", async (req, res) => {
    try {
        const {title, completed} = req.body;
        await Todo.create({ title, completed: completed == 'on' ? true : false });
        res.redirect('/todospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ACTUALIZAR UNA TAREA
router.post("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await Todo.findByPk(id);
        if (todo) {
            todo.title = title;
            todo.completed = completed == 'on' ? true : false;
            await todo.save();
            res.redirect('/todospanel?message= Tarea actualizada correctamente');
        } else {
            res.redirect('/todospanel?message= Tarea no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ELIMINAR UNA TAREA
router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (todo) {
            await todo.destroy();
            res.redirect('/todospanel?message= Tarea eliminada correctamente');
        } else {
            res.redirect('/todospanel?message= Tarea no encontrada');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;