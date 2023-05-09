const express = require("express");
const routes = express.Router();
const { mostrarUsuarios,
    agregarUsuario,
    editarUsuario,
    registrarUsuario,
    ingresoUsuario }
    = require("../controllers/usuarioControllers");
const { userDataValidator } = require("../middlewares/usuario/usuarioMiddlewares");
const { runValidation } = require("../middlewares/Tareas/tareaMiddlewares");


//rutas y recursos

routes.get("/usuarios", mostrarUsuarios); //mostrar todos los usuarios
routes.post("/usuarios", agregarUsuario) //agregar usuario
routes.put("/usuarios", editarUsuario) //editar usuario

routes.post("/usuarios/registro", userDataValidator, runValidation, registrarUsuario)
routes.post("/usuarios/ingreso", ingresoUsuario)

module.exports = routes;


