const agendados = []

function datos () { //Función que crea una persona a partir de los datos que el usuario envía
    let nombre = prompt("Escribe tu nombre completo. (nombre y apellido)").toLowerCase()
    let ci = prompt("Escribe tu cedula de identidad. (sin puntos ni guiones.)")
    while (ci.length > 8) {
        alert ("Cédula de identidad inválida, recuerda que la cédula debe tener máximo 8 digitos")
        ci = prompt("Escribe tu cedula de identidad. (sin puntos ni guiones.)")
    }
    parseInt(ci)
    let dia = prompt("Escribe el día del calendario en el que quieras venir (en número de 2 dígitos)")
    while (dia.length !== 2) {
        alert ("El día es inválido, debe tener 2 digitos")
        dia = prompt("Escribe el día del calendario en el que quieras venir (en número de 2 dígitos)")
    }
    parseInt(dia)
    let mes = prompt("Escribe el mes del calendario en el que quieras venir (en número de 2 dígitos)")
    while (mes.length !== 2) {
        alert ("El mes es inválido, debe tener 2 digitos")
        mes = prompt("Escribe el mes del calendario en el que quieras venir (en número de 2 dígitos)")
    }
    parseInt(mes)
    let año = prompt("Escribe el año del calendario en el que quieras venir (en número de 4 dígitos)")
    while (año.length !== 4) {
        alert ("El año es inválido, debe tener 4 digitos")
        año = prompt("Escribe el año del calendario en el que quieras venir (en número de 4 dígitos)")
    }
    parseInt(año)
    let fecha = dia + "/" + mes + "/" + año

    const persona = {nombre, ci, fecha}

    return persona
}

function buscarAgendado (ci) { //Funcion que busca si un usuario en particular está agendado para una visita en cierto día
    let busqueda = false
    for (const agendado of agendados) {
        if (agendado.ci == ci) {
            busqueda = true
            alert("El usuario con la cédula de identidad " + ci + " está agendado para el " + agendado.fecha)
        }
    }
    if (!busqueda) {
        alert ("Este usuario aún no está agendado.")
    }
}

function fechasOcupadas () { //Funcion que muestra mediante alertas, las fechas que ya han sido ocupadas.
    alert ("Las fechas ya ocupadas son las siguientes:\n")
    for (const agendado of agendados) {
        alert(agendado.fecha)
    }
}

let pregunta = prompt("Pulsa el número correspondiente para navegar entre las distintas opciones: \n1 - Agendar a un usuario. \n2 - Consultar en qué fecha está agendado un usuario. \n3 - Consultar qué fechas ya están ocupadas. \n4 - Salir.").toLowerCase()

while (pregunta !== "4") {
    switch (pregunta) {
        case "1":
            let nuevaPersona = datos()
            let busqueda = false
            for (const agendado of agendados) {
                if (agendado.ci === nuevaPersona.ci) {
                    busqueda = true
                    alert ("La persona que intentas agendar ya tiene una fecha, su fuecha es: "+ agendado.fecha)
                } else if (agendado.fecha === nuevaPersona.fecha) {
                    busqueda = true
                    alert ("Esa fecha ya está ocupada, elige otra fecha.")
                }
            }
            if (!busqueda) {
                agendados.push (nuevaPersona)
                alert ("Felicidades, la fecha es tuya, puedes venir el: " + nuevaPersona.fecha)
            }

            break
        case "2":
            let ci = parseInt(prompt("Escribe la cédula de la persona sobre la que quieres consultar."))
            buscarAgendado(ci)

            break
        case "3":
            fechasOcupadas()

            break
        default:
            alert("Respuesta inválida.")
            break
    }

    pregunta = prompt("Pulsa el número correspondiente para navegar entre las distintas opciones: \n1 - Agendar a un usuario. \n2 - Consultar en qué fecha está agendado un usuario. \n3 - Consultar qué fechas ya están ocupadas. \n4 - Salir.").toLowerCase()
}

alert("¡Que tengas un buen día!")

console.log(agendados)