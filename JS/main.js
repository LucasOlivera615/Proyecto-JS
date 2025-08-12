//Constantes que apuntan a HTML

    //Botones

    const botonAgendar = document.getElementById("botonAgendar")
    const enviarFormulario = document.getElementById("enviarFormulario")
    const botonBorrarAgenda = document.getElementById("botonBorrarAgenda")
    const borrarTurno = document.getElementById ("borrarTurno")

    //Constantes de formulario

    const formularioAgenda = document.getElementById("formularioAgenda")
    const formularioBorrarAgenda = document.getElementById("formularioBorrarAgenda")

    //Constantes de mensajes

    const mensajeValidacion = document.getElementById("mensajeValidacion")
    const cedulaValidacion = document.getElementById("cedulaValidacion")
    const horaValidacion = document.getElementById("horaValidacion")
    const cedulaABorrarValidacion = document.getElementById("cedulaABorrarValidacion")

    //Constantes de

const tbody = document.querySelector("table tbody")

//Variables y constantes globales

const agendados = JSON.parse(localStorage.getItem("agendados")) || []

//Funciones

function crearPersona () {
    const nombrePersona = document.getElementById("nombre").value
    const cedulaPersona = document.getElementById("cedulaIdentidad").value
    const fechaPersona = document.getElementById("fecha").value
    const horaPersona = document.getElementById("hora").value

    const persona = {
        nombre: nombrePersona,
        cedula: cedulaPersona,
        fecha: fechaPersona,
        hora: horaPersona
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

    validacion = true

    return validacion

}

function limpiarCampos() {
    document.getElementById("nombre").value = ""
    document.getElementById("cedulaIdentidad").value = ""
    document.getElementById("fecha").value = ""
    document.getElementById("hora").selectedIndex = 0
}

function agendarPersona(persona){
    agendados.push(persona)
    localStorage.setItem("agendados", JSON.stringify(agendados))
}

function insertarEnTabla(persona) {

    const fila = document.createElement("tr")
    fila.id = persona.cedula

    const tdNombre = document.createElement("td")
    tdNombre.textContent = persona.nombre
    tdNombre.classList.add("PanTabla")

    const tdFecha = document.createElement("td")
    tdFecha.textContent = persona.fecha
    tdFecha.classList.add("PanTabla")
    
    const tdHora = document.createElement("td")
    tdHora.textContent = persona.hora
    tdHora.classList.add("PanTabla")

    fila.appendChild(tdNombre)
    fila.appendChild(tdFecha)
    fila.appendChild(tdHora)

    tbody.appendChild(fila)
}

function buscarPersona (){

    cedulaABorrarValidacion.textContent = ""
    
    const cedulaPersona = document.getElementById("cedulaABorrar").value

    if (cedulaPersona.length > 8) {
        cedulaABorrarValidacion.textContent = "La cédula es inválida, debe tener 8 dígitos o menos"
        return
    }
    
    const busqueda = agendados.findIndex(agendado => agendado.cedula === cedulaPersona)

    if (busqueda === -1) {
        cedulaABorrarValidacion.textContent = "El usuario que estás buscando no está agendado."
        return
    }

    return busqueda
}

function borrarPersona(indice) {
    agendados.splice(indice,1)
    localStorage.setItem("agendados", JSON.stringify(agendados))
}

function retirarDeTabla(indice){
    
    const cedula = agendados[indice].cedula
    document.getElementById(cedula).remove()
}

//DOM y Eventos

//Evento de agendar

botonAgendar.onclick = () => {
    formularioAgenda.classList.remove("formularioOculto")
    formularioBorrarAgenda.classList.add("formularioOculto")
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
}

borrarTurno.onclick = () => {

    const persona = buscarPersona()

    if (persona !== -1) {
        retirarDeTabla(persona)
        borrarPersona(persona)
    }
}

agendados.forEach(persona => {
    insertarEnTabla(persona)
})