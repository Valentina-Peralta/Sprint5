

//Validaciones utilizando express-validator
const knex = require("../../config/knexFile");
const { validationResult, param } = require("express-validator");
const tareas = knex.select('*').from('tarea');


exports.idValidator = [
    param("id")
        .not().isEmpty().withMessage("formato de id incorrecto")
        .isNumeric().withMessage("formato incorrecto de id"),
];

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }
    next();
};

/* exports.findId = (req, res, next) => {
    const id = Number(req.params.id);
    const resultado = tareas.find((tarea) => {
        return tarea.usuario_id === id;
    });
    if (resultado) {
        next();
    } else {
        res
            .status(404)
            .json({ mensaje: "No se ha encontrado tareas de ese usuario" });
    }
};
 */