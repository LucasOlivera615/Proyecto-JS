//Funciones

async function obtenerProcedimientos() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        renderProcedimientos(data, procedimiento)
        renderProcedimientos(data, cambioProcedimiento)
    } catch(error) {
        console.error("Error en la petición:", error)
    }
}

function renderProcedimientos (listaProcedimientos, seleccionarElemento) {
    seleccionarElemento.innerHTML = listaProcedimientos
        .map(procedimiento => `<option value="${procedimiento}">${procedimiento}</option>`)
        .join("")
    }

function formatearFechaAEuropea(fechaISO) {
    const añoMesDia = fechaISO.split("-")
    return `${añoMesDia[2]}/${añoMesDia[1]}/${añoMesDia[0]}`
}

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

function camposObligatorios() {
    Swal.fire({
            icon: "error",
            text: "¡Todos los campos son obligatorios!"
        })
}

function cedulaInvalida() {
    Swal.fire({
            icon: "error",
            text: "La cédula es inválida, debe tener 8 digitos o menos."
        })
}

function nuevaCedulaInvalida() {
    Swal.fire({
            icon: "error",
            text: "La nueva cédula es inválida, debe tener 8 digitos o menos."
        })
}

function cedulaYaEnUso() {
    Swal.fire({
            icon: "error",
            text: "La cédula ya está en uso."
        })
}

function nuevaCedulaYaEnUso() {
    Swal.fire({
            icon: "error",
            text: "La nueva cédula ya está en uso."
        })
}

function cedulaNoAgendada() {
    Swal.fire({
            icon: "error",
            text: "La cédula no está agendada."
        })
}

function horarioYaEnUso() {
    Swal.fire({
            icon: "error",
            text: "El horario que seleccionaste ya está en uso."
        })
}

function fechaVacia() {
    Swal.fire({
            icon: "error",
            text: "Debes seleccionar una fecha."
        })
}

function personaReagendada(persona) {
    Swal.fire({
            icon: "success",
            text: `El usuario ${persona.nombre} quedó reagendado para el día ${formatearFechaAEuropea(persona.fecha)} a las ${persona.hora}, que tenga un buen día.`
        })
}

function procedimientoActualizado(persona) {
    Swal.fire({
            icon: "success",
            text: `El procedimiento del usuario ${persona.nombre} ahora es de "${persona.procedimiento}", que tenga un buen día.`
        })
}

function detalleActualizado(persona) {
    Swal.fire({
            icon: "success",
            text: `La información de ${persona.nombre} ha sido actualizada.`
        })
}

function validacionPersona(persona) {
    
    let validacion = false

    if (!persona.nombre || !persona.cedula || !persona.fecha){
        camposObligatorios()
        return validacion
    }

    if (persona.cedula.length > 8){
        cedulaInvalida()
        return validacion
    }

    for (const agendado of agendados) {
        if (agendado.cedula === persona.cedula) {
            cedulaYaEnUso()
            return validacion
        }
        if (agendado.fecha === persona.fecha && agendado.hora === persona.hora){
            horarioYaEnUso()
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
    document.getElementById("detalles").value = ""
    document.getElementById("cedulaNuevaCedula").value = ""
    document.getElementById("nuevaCedula").value = ""
    document.getElementById("cedulaNuevoNombre").value = ""
    document.getElementById("nuevoNombre").value = ""
    document.getElementById("cedulaNuevoDetalle").value = ""
    document.getElementById("detalleAActualizar").value = ""
    document.getElementById("cedulaAReagendar").value = ""
    document.getElementById("fechaAReagendar").value = ""
    document.getElementById("horaAReagendar").selectedIndex = 0
    document.getElementById("cedulaNuevoProcedimiento").value = ""
    document.getElementById("cambioProcedimiento").selectedIndex = 0
    document.getElementById("cedulaABorrar").value = ""
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
            <td class="PanTabla">${formatearFechaAEuropea(persona.fecha)}</td>
            <td class="PanTabla">${persona.hora}</td>
            <td class="PanTabla">${persona.procedimiento}</td>
            <td class="PanTabla">${persona.detalles}</td>
        </tr>
    `
}

function buscarPersona (campoID){
    
    const cedulaPersona = document.getElementById(campoID).value

    if (cedulaPersona.length > 8) {
        cedulaInvalida()
        return
    }
    
    const busqueda = agendados.find(agendado => agendado.cedula === cedulaPersona)

    if (!busqueda) {
        cedulaNoAgendada()
        return
    }

    return busqueda
}

function cambioDeNombre(persona) {

    const nuevoNombre = document.getElementById("nuevoNombre").value

    let esValido = false

    if (!nuevoNombre) {
        camposObligatorios()
        return esValido
    } else {
        esValido = true
        persona.nombre = nuevoNombre
        localStorage.setItem("agendados", JSON.stringify(agendados))
        return esValido
    }
}

function cambiarCedula(persona) {
    const nuevaCedula = document.getElementById("nuevaCedula").value
    let esValida = false

    if (!nuevaCedula){
        camposObligatorios()
        return esValida
    }

    if (nuevaCedula.length > 8) {
        nuevaCedulaInvalida()
        return esValida
    }

    for (const agendado of agendados) {
        if (agendado.cedula === nuevaCedula) {
            nuevaCedulaYaEnUso()
            return esValida
        }
    }

    esValida = true

    if (esValida) {
        persona.cedula = nuevaCedula
        localStorage.setItem("agendados", JSON.stringify(agendados))
        return esValida
    }
    
}

function confirmarBorrado (persona) {
    return Swal.fire({
            icon: "info",
            title: `¿Seguro que deseas eliminar la agenda de ${persona.nombre}?`,
            text: "Una vez eliminada una agenda, no se puede recuperar y es necesario volver a agendar al usuario.",
            showDenyButton: true,
            confirmButtonText: "Borrar",
            denyButtonText: "No borrar",
        })
}

function confirmacionNombreCambiado(persona, viejoNombre) {
    Swal.fire ({
        icon: "success",
        text: `El usuario cuya cédula es ${persona.cedula} a cambiado su nombre de "${viejoNombre}" a "${persona.nombre}"`
    })
}

function confirmacionCedulaCambiada(persona) {
    Swal.fire ({
        icon: "success",
        text: `El usuario cuyo nombre es ${persona.nombre} ahora tiene la cédula "${persona.cedula}".`
    })
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
    
    const nuevaFecha = document.getElementById("fechaAReagendar").value
    const nuevaHora = document.getElementById("horaAReagendar").value

    if (!nuevaFecha) {
        fechaVacia()
        return validacion
    }

    for (const agendado of agendados) {
        if (agendado.fecha === nuevaFecha && agendado.hora === nuevaHora){
                horarioYaEnUso()
                return validacion
            }
    }

    validacion = true
    
    return validacion
    
}

function actualizarFechaYHoraTabla(persona) {

    const fila = document.getElementById(persona.cedula)
    fila.children[2].textContent = formatearFechaAEuropea(persona.fecha)
    fila.children[3].textContent = persona.hora

}

function actualizarProcedimiento (persona) {
    const nuevoProcedimiento = document.getElementById("cambioProcedimiento").value
    persona.procedimiento = nuevoProcedimiento
    localStorage.setItem("agendados", JSON.stringify(agendados))
}

function actualizarProcedimientoTabla (persona) {
    const fila = document.getElementById (persona.cedula)
    fila.children[4].textContent = persona.procedimiento
}

function guardarNuevoDetalle (persona) {
    const nuevoDetalle = document.getElementById("detalleAActualizar").value
    if (!nuevoDetalle) {
        persona.detalles = "Sin detalles."
        localStorage.setItem("agendados", JSON.stringify(agendados))
        return
    }
    persona.detalles = nuevoDetalle
    localStorage.setItem("agendados", JSON.stringify(agendados))
}

function actualizarDetallesTabla (persona){
    const fila = document.getElementById(persona.cedula)
    fila.children[5].textContent = persona.detalles
}

function actualizarNombreTabla(persona) {
    const fila = document.getElementById(persona.cedula)
    fila.children[0].textContent = persona.nombre
}

function actualizarCedulaTabla(persona, viejaCedula) {
    const fila = document.getElementById (viejaCedula)
    fila.id = persona.cedula
    fila.children[1].textContent = persona.cedula
}