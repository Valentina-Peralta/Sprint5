const express = require("express");
const routes = express.Router();
const { holaMundo,
    mostrarTareas,
    agregarTarea,
    editarTarea,
    mostrarTareasId,
    mostrarTareasPrioridad,
    mostrarTareasCompletadas,
    eliminarTarea } = require("../controllers/tareaControllers");
const { idValidator, runValidation } = require("../middlewares/Tareas/tareaMiddlewares");
const { verifyToken } = require("../middlewares/usuario/usuarioMiddlewares");


//rutas y recursos

routes.get("/holamundo", holaMundo); //hola mundo

routes.get("/tareas/prioridad", mostrarTareasPrioridad)//mostrar todas las tareas con prioridad alta  (?prioridad=1)
routes.get("/tareas/completada", mostrarTareasCompletadas)//mostrar todas las tareas completadas o no  (?completada=t)

routes.get("/tareas", verifyToken, mostrarTareas); //mostrar todas las tareas

routes.get("/tareas/:id", idValidator, runValidation, mostrarTareasId) //mostrar tarea según id de usuario

routes.post("/tareas", agregarTarea); //agregar tarea

routes.put("/tareas", editarTarea) //editar tarea

routes.delete("/tareas/:id", idValidator, runValidation, eliminarTarea) //eliminar tarea por id






module.exports = routes;


