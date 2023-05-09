const knex = require("../config/knexFile");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.mostrarUsuarios = async (req, res) => {
    try {
        const usuarios = await knex.select('*').from('usuario');
        res.status(200).json({ usuarios: usuarios })
    }
    catch (error) {
        res.status(400).json({ error: error.message })

    }
}

exports.agregarUsuario = async (req, res) => {
    try {
        const { email, activo } = req.body;
        await knex('usuario')
            .insert({
                email: email,
                activo: activo
            })
        res.status(200).json(`se agregó el usuario ${email}`)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.editarUsuario = async (req, res) => {
    try {
        const { id, email, activo } = req.body;
        await knex('usuario')
            .where({ id: id })
            .update({
                email, activo
            }, [])

        const nuevoUsuario = { email: email, activo: activo };
        res.status(200).json(`Se ha editado el usuario con id ${id}. email: ${nuevoUsuario.email}, activo: ${activo}`)

    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/* exports.registrarUsuario = async (req, res) => {
    const { email, password, nombre, activo } = req.body;
    //encriptamos la password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //corroborar que el usuario no existe, si no existe agregarlo
    knex("usuario").where({ email: email }).then((resultado) => {
        if (resultado.length) {
            return res.status(400).json({ error: "El usuario ya se encuentra registrado" });
        }

        knex('usuario')
            .insert({
                email: email,
                nombre: nombre,
                activo: activo,
                password: hash
            }).then(() => {
                res.status(200).json(`se agregó el usuario ${email}`)
            })
    }).catch((error) => {
        res.status(400).json({ error: error.message })
    })
}
 */
exports.registrarUsuario = async (req, res) => {
    try {
        const { email, password, nombre, activo } = req.body;
        //encriptamos la password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //corroborar que el usuario no existe, si no existe agregarlo
        const resultado = await knex("usuario").where({ email: email });
        if (resultado.length) {
            return res.status(400).json({ error: "El usuario ya se encuentra registrado" });
        }

        await knex('usuario').insert({
            email: email,
            nombre: nombre,
            activo: activo,
            password: hash
        });

        res.status(200).json(`se agregó el usuario ${email}`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/* exports.ingresoUsuario = async (req, res) => {
    const { email, password } = req.body;
    knex("usuario").where({ email: email }).then(async (resultado) => {
        if (!resultado.length) {
            return res.status(404).json({ error: "el usuario no se encuentra registrado" })
        }
        const validPassword = await bcrypt.compare(password, resultado[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Email y/o contraseña incorrectos" })
        }
        //crear JWT token y dárselo al cliente
        const payload = {
            name: resultado[0].name,
            email: resultado[0].email
        }
        const secret = process.env.TOKEN_SECRET
        const token = jwt.sign(payload, secret)
        res.status(200).json({ mensaje: "el usuario ha ingresado correctamente", token: token })

    }).catch((error) => {
        res.status(400).json({ error: error.message })
    }
    )
} */
exports.ingresoUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const resultado = await knex("usuario").where({ email: email })
        if (!resultado.length) {
            return res.status(404).json({ error: "el usuario no se encuentra registrado" })
        }
        const validPassword = await bcrypt.compare(password, resultado[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Email y/o contraseña incorrectos" })
        }
        //crear JWT token y dárselo al cliente
        const payload = {
            name: resultado[0].name,
            email: resultado[0].email
        }
        const secret = process.env.TOKEN_SECRET
        const token = jwt.sign(payload, secret)
        res.status(200).json({ mensaje: "el usuario ha ingresado correctamente", token: token })
    }

    catch (error) {
        res.status(400).json({ error: error.message })
    }

}