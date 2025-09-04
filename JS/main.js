//Constantes que apuntan a HTML

    //Botones

    const botonAgendar = document.getElementById("botonAgendar")
    const enviarFormulario = document.getElementById("enviarFormulario")
    const botonBorrarAgenda = document.getElementById("botonBorrarAgenda")
    const borrarTurno = document.getElementById ("borrarTurno")
    const botonReagenda = document.getElementById("botonReagenda")
    const reagendarTurno = document.getElementById("reagendarTurno")
    const botonCambioProcedimiento = document.getElementById("botonCambioProcedimiento")
    const cambiarProcedimiento = document.getElementById("cambiarProcedimiento")
    const botonCambioDetalles = document.getElementById("botonCambioDetalles")
    const actualizarDetalles = document.getElementById("actualizarDetalles")
    const botonCambiarNombre = document.getElementById("botonCambiarNombre")
    const actualizarNombre = document.getElementById("actualizarNombre")
    const botonCambiarCedula = document.getElementById("botonCambiarCedula")
    const actualizarCedula = document.getElementById("actualizarCedula")

    //Constantes de formulario

    const formularioAgenda = document.getElementById("formularioAgenda")
    const formularioBorrarAgenda = document.getElementById("formularioBorrarAgenda")
    const formularioReagenda = document.getElementById("formularioReagenda")
    const formularioCambiarProcedimiento = document.getElementById("formularioCambiarProcedimiento")
    const formularioCambiarDetalles = document.getElementById ("formularioCambiarDetalles")
    const formularioCambiarNombre = document.getElementById("formularioCambiarNombre")
    const formularioCambiarCedula = document.getElementById("formularioCambiarCedula")

    //Constantes de tabla

    const tbody = document.querySelector("table tbody")

//Variables y constantes globales

const agendados = JSON.parse(localStorage.getItem("agendados")) || []

let procedimiento = document.getElementById("procedimiento")
let cambioProcedimiento = document.getElementById("cambioProcedimiento")
const URL = "./db/data.json"

//DOM y Eventos

//Llamado a procedimientos

obtenerProcedimientos()

agendados.forEach(persona => insertarEnTabla(persona))

//Bloqueo de fechas pasadas.

const diaActual = new Date().toISOString().split("T")[0]
document.getElementById("fecha").setAttribute("min", diaActual)
document.getElementById("fechaAReagendar").setAttribute("min", diaActual)


//Evento de agendar

botonAgendar.onclick = () => {
    formularioAgenda.classList.remove("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
    formularioCambiarDetalles.classList.add("formularioOculto")
    formularioCambiarNombre.classList.add("formularioOculto")
    formularioCambiarCedula.classList.add("formularioOculto")
}

enviarFormulario.onclick = () => {

    const nuevaPersona = crearPersona()

    const esValido = validacionPersona(nuevaPersona)

    if (!esValido) {
        return
    } else {
        agendarPersona(nuevaPersona)
        insertarEnTabla(nuevaPersona)
        Swal.fire({
            icon: "success",
            text: `El usuario ${nuevaPersona.nombre} quedó agendado para el día ${formatearFechaAEuropea(nuevaPersona.fecha)} a las ${nuevaPersona.hora}, que tenga un buen día.`
            })
        limpiarCampos()
        formularioAgenda.classList.add("formularioOculto")
    }
}

//Evento de cambio de nombre

botonCambiarNombre.onclick = () => {
    formularioCambiarNombre.classList.remove("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
    formularioCambiarDetalles.classList.add("formularioOculto")
    formularioCambiarCedula.classList.add("formularioOculto")
}

actualizarNombre.onclick = () => {
    
    const campoID = "cedulaNuevoNombre"

    const persona = buscarPersona(campoID)

    if (persona) {
        const viejoNombre = persona.nombre
        const esValido = cambioDeNombre(persona)
        if (esValido){
            actualizarNombreTabla(persona)
            confirmacionNombreCambiado(persona, viejoNombre)
            limpiarCampos()
            formularioCambiarNombre.classList.add("formularioOculto")
        }
    }
}

//Evento de cambio de cédula

botonCambiarCedula.onclick = () => {
    formularioCambiarCedula.classList.remove("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
    formularioCambiarDetalles.classList.add("formularioOculto")
    formularioCambiarNombre.classList.add("formularioOculto")
}

actualizarCedula.onclick = () => {
    const campoID = "cedulaNuevaCedula"

    const persona = buscarPersona(campoID)

    const viejaCedula = document.getElementById("cedulaNuevaCedula").value

    if (persona) {
        const esValida = cambiarCedula(persona)
        if (esValida) {
            actualizarCedulaTabla(persona, viejaCedula)
            confirmacionCedulaCambiada(persona)
            limpiarCampos()
            formularioCambiarCedula.classList.add("formularioOculto")
        }
    }
}

//Evento de borrar agenda

botonBorrarAgenda.onclick = () => {
    formularioBorrarAgenda.classList.remove("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
    formularioCambiarDetalles.classList.add("formularioOculto")
    formularioCambiarNombre.classList.add("formularioOculto")
    formularioCambiarCedula.classList.add("formularioOculto")
}



borrarTurno.onclick = () => {

    const campoID = "cedulaABorrar"

    const persona = buscarPersona(campoID)

    if (persona) {
        confirmarBorrado(persona).then((result) => {
            if (result.isConfirmed){
                retirarDeTabla(persona)
                borrarPersona(persona)
                Swal.fire("El usuario ha sido eliminado.", "", "success")
            } else if (result.isDenied) {
                Swal.fire("El usuario sigue agendado.", "", "info")
            }
        })
        limpiarCampos()
        formularioBorrarAgenda.classList.add("formularioOculto")
    }
}

//Evento de reagendar

botonReagenda.onclick = () => {
    formularioReagenda.classList.remove("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
    formularioCambiarDetalles.classList.add("formularioOculto")
    formularioCambiarNombre.classList.add("formularioOculto")
    formularioCambiarCedula.classList.add("formularioOculto")
}

reagendarTurno.onclick = () => {

    const campoID = "cedulaAReagendar"

    const persona = buscarPersona(campoID)

    if (persona && verificarNuevaFecha()) {

        reagendarPersona(persona)
        actualizarFechaYHoraTabla(persona)
        personaReagendada(persona)
        limpiarCampos()
        formularioReagenda.classList.add("formularioOculto")
    }

}

//Evento de cambiar procedimiento.

botonCambioProcedimiento.onclick = () => {
    formularioCambiarProcedimiento.classList.remove("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioCambiarDetalles.classList.add("formularioOculto")
    formularioCambiarNombre.classList.add("formularioOculto")
    formularioCambiarCedula.classList.add("formularioOculto")
}

cambiarProcedimiento.onclick = () => {

    const campoID = "cedulaNuevoProcedimiento"

    const persona = buscarPersona(campoID)

    if (persona) {
        actualizarProcedimiento(persona)
        actualizarProcedimientoTabla(persona)
        procedimientoActualizado(persona)
        limpiarCampos()
        formularioCambiarProcedimiento.classList.add("formularioOculto")
    }


}

//Evento de cambiar detalles.

botonCambioDetalles.onclick = () => {
    formularioCambiarDetalles.classList.remove("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioCambiarNombre.classList.add("formularioOculto")
    formularioCambiarCedula.classList.add("formularioOculto")
}

actualizarDetalles.onclick = () => {

    const campoID = "cedulaNuevoDetalle"

    const persona = buscarPersona(campoID)

    if (persona) {
        guardarNuevoDetalle (persona)
        actualizarDetallesTabla(persona)
        detalleActualizado(persona)
        limpiarCampos()
        formularioCambiarDetalles.classList.add("formularioOculto")
    }
}