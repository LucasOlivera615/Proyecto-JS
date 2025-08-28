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

    //Constantes de formulario

    const formularioAgenda = document.getElementById("formularioAgenda")
    const formularioBorrarAgenda = document.getElementById("formularioBorrarAgenda")
    const formularioReagenda = document.getElementById("formularioReagenda")
    const formularioCambiarProcedimiento = document.getElementById("formularioCambiarProcedimiento")

    //Constantes de mensajes

    const mensajeValidacion = document.getElementById("mensajeValidacion")
    const cedulaValidacion = document.getElementById("cedulaValidacion")
    const horaValidacion = document.getElementById("horaValidacion")
    const cedulaABorrarValidacion = document.getElementById("cedulaABorrarValidacion")
    const horaReagendaValidacion = document.getElementById("horaReagendaValidacion")

    //Constantes de tabla

    const tbody = document.querySelector("table tbody")

//Variables y constantes globales

const agendados = JSON.parse(localStorage.getItem("agendados")) || []

//Funciones

function crearPersona () {
    const nombrePersona = document.getElementById("nombre").value
    const cedulaPersona = document.getElementById("cedulaIdentidad").value
    const fechaPersona = document.getElementById("fecha").value
    const horaPersona = document.getElementById("hora").value
    const procedimientoPersona = document.getElementById("procedimiento").value
    const detallesPersona = document.getElementById("detalles").value

    const persona = {
        nombre: nombrePersona,
        cedula: cedulaPersona,
        fecha: fechaPersona,
        hora: horaPersona,
        procedimiento: procedimientoPersona,
        detalles: detallesPersona
    }

    return persona

}

function validacionPersona(persona) {

    mensajeValidacion.textContent = ""
    cedulaValidacion.textContent = ""
    horaValidacion.textContent = ""
    
    let validacion = false

    if (!persona.nombre || !persona.cedula || !persona.fecha){
        mensajeValidacion.textContent = "Todos los campos son obligatorios."
        return validacion
    }

    if (persona.cedula.length > 8){
            cedulaValidacion.textContent = "La cédula es inválida, debe tener 8 digitos o menos"
            return validacion
        }

    for (const agendado of agendados) {
        if (agendado.cedula === persona.cedula) {
            cedulaValidacion.textContent = "La cédula ya está en uso."
            return validacion
        }
        if (agendado.fecha === persona.fecha && agendado.hora === persona.hora){
                horaValidacion.textContent = "El horario que seleccionaste ya está en uso."
                return validacion
            }
        }
    
    if (!persona.detalles) {
        persona.detalles = "Sin detalles."
    }

    validacion = true

    return validacion

}

function limpiarCampos() {
    document.getElementById("nombre").value = ""
    document.getElementById("cedulaIdentidad").value = ""
    document.getElementById("fecha").value = ""
    document.getElementById("hora").selectedIndex = 0
    document.getElementById("procedimiento").selectedIndex = 0
    document.getElementsById("detalles").value = ""
}

function agendarPersona(persona){
    agendados.push(persona)
    localStorage.setItem("agendados", JSON.stringify(agendados))
}

function insertarEnTabla(persona) {
    tbody.innerHTML += `
        <tr id="${persona.cedula}">
            <td class="PanTabla">${persona.nombre}</td>
            <td class="PanTabla">${persona.cedula}</td>
            <td class="PanTabla">${persona.fecha}</td>
            <td class="PanTabla">${persona.hora}</td>
            <td class="PanTabla">${persona.procedimiento}</td>
            <td class="PanTabla">${persona.detalles}</td>
        </tr>
    `
}

function buscarPersona (campoID, mensajeID){
    
    const mensaje = document.getElementById(mensajeID)

    mensaje.textContent = ""
    
    const cedulaPersona = document.getElementById(campoID).value

    if (cedulaPersona.length > 8) {
        mensaje.textContent = "La cédula es inválida, debe tener 8 dígitos o menos"
        return
    }
    
    const busqueda = agendados.find(agendado => agendado.cedula === cedulaPersona)

    if (!busqueda) {
        mensaje.textContent = "El usuario que estás buscando no está agendado."
        return
    }

    return busqueda
}

function borrarPersona(persona) {
    const nuevaAgenda = agendados.filter (agendado => agendado.cedula !== persona.cedula )
    agendados.length = 0
    agendados.push(...nuevaAgenda)
    localStorage.setItem("agendados", JSON.stringify(agendados))
}

function retirarDeTabla(persona){
    
    const cedula = persona.cedula
    document.getElementById(cedula).remove()
}

function reagendarPersona(persona) {
    
    const nuevaFecha = document.getElementById("fechaAReagendar").value
    const nuevaHora = document.getElementById("horaAReagendar").value
    
    persona.fecha = nuevaFecha
    persona.hora = nuevaHora

    localStorage.setItem("agendados", JSON.stringify(agendados))
}

function verificarNuevaFecha () {

    let validacion = false

    horaReagendaValidacion.textContent = ""
    
    const nuevaFecha = document.getElementById("fechaAReagendar").value
    const nuevaHora = document.getElementById("horaAReagendar").value

    if (!nuevaFecha) {
        horaReagendaValidacion.textContent = "Tienes que seleccionar una fecha."
        return validacion
    }

    for (const agendado of agendados) {
        if (agendado.fecha === nuevaFecha && agendado.hora === nuevaHora){
                horaReagendaValidacion.textContent = "El horario que seleccionaste ya está en uso."
                return validacion
            }
    }

    validacion = true
    
    return validacion
    
}

function actualizarFilaTabla(persona) {

    const fila = document.getElementById(persona.cedula)
    fila.children[2].textContent = persona.fecha
    fila.children[3].textContent = persona.hora

}

function actualizarProcedimiento (persona) {
    
}

//DOM y Eventos

//Evento de agendar

botonAgendar.onclick = () => {
    formularioAgenda.classList.remove("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
}

enviarFormulario.onclick = () => {

    const nuevaPersona = crearPersona()

    const esValido = validacionPersona(nuevaPersona)

    if (!esValido) {
        return
    } else {
        agendarPersona(nuevaPersona)
        insertarEnTabla(nuevaPersona)
        limpiarCampos()
        formularioAgenda.classList.add("formularioOculto")
    }
}

//Evento de borrar agenda

botonBorrarAgenda.onclick = () => {
    formularioBorrarAgenda.classList.remove("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
}

borrarTurno.onclick = () => {

    const mensajeID = "cedulaABorrarValidacion"

    const campoID = "cedulaABorrar"

    const persona = buscarPersona(campoID, mensajeID)

    if (persona) {
        retirarDeTabla(persona)
        borrarPersona(persona)
    }
}

agendados.forEach(persona => {
    insertarEnTabla(persona)
})

//Evento de reagendar

botonReagenda.onclick = () => {
    formularioReagenda.classList.remove("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
    formularioCambiarProcedimiento.classList.add("formularioOculto")
}

reagendarTurno.onclick = () => {

    const mensajeID = "mensajeCedulaAReagendar"

    const campoID = "cedulaAReagendar"

    const persona = buscarPersona(campoID, mensajeID)

    if (persona && verificarNuevaFecha()) {

        reagendarPersona(persona)
        actualizarFilaTabla(persona)

    }

}

//Evento de cambiar procedimiento.

botonCambioProcedimiento.onclick = () => {
    formularioCambiarProcedimiento.classList.remove("formularioOculto")
    formularioReagenda.classList.add("formularioOculto")
    formularioAgenda.classList.add("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
}

cambiarProcedimiento.onclick = () => {

    const mensajeID = "cedulaNuevoProcedimientoValidacion"

    const campoID = "cedulaNuevoProcedimiento"

    const persona = buscarPersona(campoID, mensajeID)

    if (persona) {

    }


}