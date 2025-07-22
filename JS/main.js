const agendados = []

function pedirFecha (mensaje, mensaje2, condicion1, condicion2, condicion3) { //Funcion para simplificar la funcion datos y no repetir codigo
    let fecha = prompt(mensaje)
    while (fecha.length !== condicion1 || parseInt(fecha) != fecha || parseInt(fecha) < condicion2 || parseInt(fecha) > condicion3) {
        alert (mensaje2)
        fecha = prompt(mensaje)
    }

    return fecha
}

function datos () { //Función que crea una persona a partir de los datos que el usuario envía
    let nombre = prompt("Escribe tu nombre completo. (nombre y apellido)").toLowerCase()
    let ci = prompt("Escribe tu cedula de identidad. (sin puntos ni guiones.)")
    while (ci.length > 8) {
        alert ("Cédula de identidad inválida, recuerda que la cédula debe tener máximo 8 digitos")
        ci = prompt("Escribe tu cedula de identidad. (sin puntos ni guiones.)")
    }
    let dia = pedirFecha("Escribe el día del calendario en el que quieras venir (en número de 2 dígitos)", "El día es inválido, debe tener 2 digitos y estar entre 01 y 31", 2, 1, 31)
    let mes = pedirFecha("Escribe el mes del calendario en el que quieras venir (en número de 2 dígitos)", "El mes es inválido, debe tener 2 digitos y estar entre 01 y 12", 2, 1, 12)
    let año = pedirFecha("Escribe el año del calendario en el que quieras venir (en número de 4 dígitos)", "El año es inválido, debe tener 4 digitos y ser mayor o igual a 2025", 4, 2025)
    let fecha = dia + "/" + mes + "/" + año
    let hora = parseInt(prompt("Escribe la hora en la que quieres agendarte, debe ser entre 1pm y 5pm"))
    while (parseInt(hora) != hora || hora < 1 || hora > 5) {
        alert ("El horario que intentas ingresar es inválido.")
        hora = parseInt(prompt("Escribe la hora en la que quieres agendarte, debe ser entre 1pm y 5pm"))
    }

    const persona = {nombre, ci, fecha, hora}

    return persona
}

function buscarAgendado (ci) { //Funcion que busca si un usuario en particular está agendado para una visita en cierto día
    let busqueda = false
    for (const agendado of agendados) {
        if (agendado.ci == ci) {
            busqueda = true
            alert("El usuario con la cédula de identidad " + ci + " está agendado para el " + agendado.fecha + " a las " + agendado.hora + "pm.")
        }
    }
    if (!busqueda) {
        alert ("Este usuario aún no está agendado.")
    }
}

function fechasOcupadas () { //Funcion que muestra mediante alertas, las fechas que ya han sido ocupadas.
    if (agendados.length == 0) {
        alert("Aún no hay fechas ni horarios ocupados.")
        return
    }

    let mensaje = "Las fechas y horarios ya ocupados son los siguientes:\n\n"
    for (const agendado of agendados) {
        mensaje = mensaje + agendado.fecha + " - " + agendado.hora + "pm.\n"
    }
    alert(mensaje)
}

function eliminarAgenda() {
    let ci = prompt ("Escribe la cédula de la persona a la que quieres eliminar la agenda.")
    let index = -1
    for (const agendado of agendados) {
        if (agendado.ci == ci) {
            index = agendados.indexOf(agendado)
            if (confirm("¿Estas seguro de querer eliminar esta agenda? una vez eliminada, es necesario volver a agendarse.")) {
                agendados.splice(index,1)
                alert("La agenda del usuario con ci: " + ci + " fue eliminada exitosamente.")
                return
            } else {
                alert ("La agenda no ha sido eliminada.")
                return
            }
        }
    }
    
    if (index === -1) {
        alert ("El usuario con la cédula: " + ci + " no está agendado.")
    }
}

let pregunta = prompt("¡Bienvenido al menú del consultorio odontológico Jardines!\n\n Pulsa el número correspondiente para navegar entre las distintas opciones: \n1 - Agendar a un usuario. \n2 - Consultar en qué fecha está agendado un usuario. \n3 - Consultar qué fechas ya están ocupadas. \n4 - Eliminar mi agenda. \n5 - Salir.")

while (pregunta !== "5") {
    switch (pregunta) {
        case "1":
            let nuevaPersona = datos()
            let busqueda = false
            for (const agendado of agendados) {
                if (agendado.ci === nuevaPersona.ci) {
                    busqueda = true
                    alert ("La persona que intentas agendar ya tiene una fecha, su fecha es: "+ agendado.fecha)
                }
                if (agendado.fecha === nuevaPersona.fecha) {
                    if (agendado.hora === nuevaPersona.hora) {
                        busqueda = true
                        alert("Esta hora ya está ocupada, selecciona otro horario u otra fecha.")
                    }
                }
            }
            if (!busqueda) {
                agendados.push (nuevaPersona)
                alert ("Felicidades, la fecha es tuya, puedes venir el: " + nuevaPersona.fecha + " en el horario de " + nuevaPersona.hora + "pm a " + nuevaPersona.hora + ":30pm.")
            }

            break
        case "2":
            let ci = prompt("Escribe la cédula de la persona sobre la que quieres consultar.")
            buscarAgendado(ci)

            break
        case "3":
            fechasOcupadas()

            break
        case "4":
            eliminarAgenda()

            break
        default:
            alert("Respuesta inválida.")
            break
    }

    pregunta = prompt("¡Bienvenido al menú del consultorio odontológico Jardines!\n\n Pulsa el número correspondiente para navegar entre las distintas opciones: \n1 - Agendar a un usuario. \n2 - Consultar en qué fecha está agendado un usuario. \n3 - Consultar qué fechas ya están ocupadas. \n4 - Eliminar mi agenda. \n5 - Salir.")
}

alert("¡Que tengas un buen día!")

console.log(agendados)