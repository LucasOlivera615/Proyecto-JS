//Constantes que apuntan a HTML

const botonAgendar = document.getElementById("botonAgendar")
const formularioAgenda = document.getElementById("formularioAgenda")
const enviarFormulario = document.getElementById("enviarFormulario")
const mensajeValidacion = document.getElementById("mensajeValidacion")
const cedulaValidacion = document.getElementById("cedulaValidacion")
const horaValidacion = document.getElementById("horaValidacion")
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

//DOM y Eventos:

botonAgendar.onclick = () => {
    formularioAgenda.classList.remove("formularioOculto")
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

agendados.forEach(persona => {
    insertarEnTabla(persona)
})