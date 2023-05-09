const jwt = require("jsonwebtoken")
const knex = require("../../config/knexFile");
const { validationResult, check } = require("express-validator");

//middlewares de autorización
exports.verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ error: "Acceso al recurso denegado" })
    }
    try {
        const secret = process.env.TOKEN_SECRET;
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).json({ error: "El token es inválido", mensaje: error })
    }
}

//Validaciones utilizando express-validator

exports.userDataValidator = [
    check("email")
        .not().isEmpty().withMessage("El email es requerido")
        .isEmail().withMessage("formato incorrecto de email"),
    check('nombre')
        .not().isEmpty().withMessage("El nombre es requerido"),
    check('password').isLength({ min: 8 })
];

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }
    next();
};
