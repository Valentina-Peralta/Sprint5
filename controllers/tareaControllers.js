const knex = require("../config/knexFile");

exports.holaMundo = (req, res) => {
    res.send('Hola mundo')
}

exports.mostrarTareas = async (req, res) => {
    try {
        const tareas = await knex.select('*').from('tarea');
        res.status(200).json({ tareas: tareas })
    }
    catch (error) {
        res.status(400).json({ error: error.message })

    }
}


exports.agregarTarea = async (req, res) => {
    try {
        const { titulo, prioridad_id, usuario_id, completado } = req.body;
        await knex('tarea')
            .insert({
                titulo: titulo,
                prioridad_id: prioridad_id,
                usuario_id: usuario_id,
                completado: completado
            })
        res.status(200).json(`se agregó la tarea ${titulo} con prioridad ${prioridad_id}`)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.editarTarea = async (req, res) => {
    try {
        const { id, titulo, prioridad_id, usuario_id, completado } = req.body;
        await knex('tarea')
            .where({ id: id })
            .update({
                titulo, prioridad_id, usuario_id, completado
            }, [])

        const nuevaTarea = { titulo: titulo, prioridad_id: prioridad_id, usuario_id: usuario_id, completado: completado };
        res.status(200).json(`Se ha editado la tarea con id ${id}. titulo: ${nuevaTarea.titulo}, prioridad_id: ${nuevaTarea.prioridad_id}, usuario_id: ${nuevaTarea.usuario_id}, completado: ${nuevaTarea.completado}`)

    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.mostrarTareasId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultado = await knex.select("*").from("tarea").where({ usuario_id: id });
        if (resultado.length === 0) {
            res.status(200).json(`No se han encontrado tareas ingresadas por el usuario con id ${id}`)

        }
        res.status(200).json(resultado)

    } catch (error) { res.status(400).json({ error: error.message }) }

}
exports.eliminarTarea = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultado = await knex("tarea").where({ id: id }).delete();
        if (resultado === 0) {
            return res.status(200).json(`No se han encontrado tareas con id ${id}`)

        }
        res.status(200).json(`Se elimino la tarea con id ${id}`)

    } catch (error) { res.status(400).json({ error: error.message }) }

}

exports.mostrarTareasPrioridad = async (req, res) => {
    //?prioridad=1  
    try {
        const prioridad = Number((req.query.prioridad));

        const resultado = await knex.select("*").from("tarea").where({ prioridad_id: prioridad })
        if (resultado.length === 0) {
            res.status(200).json(`No se han encontrado tareas con prioridad ${prioridad}`)
        } else {
            res.status(200).json(resultado)
        }

    } catch (error) { res.status(400).json({ error: error.message }) }


}
exports.mostrarTareasCompletadas = async (req, res) => {
    //?completada=true  
    try {
        const completada = (req.query.completada);

        const resultado = await knex.select("*").from("tarea").where({ completado: completada })
        if (resultado.length === 0) {
            res.status(200).json(`No se han encontrado tareas`)
        } else {
            res.status(200).json(resultado)
        }

    } catch (error) { res.status(400).json({ error: error.message }) }


}