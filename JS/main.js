const agendados = []

function datos () {
    let nombre = prompt("Escribe tu nombre completo.").toLowerCase()
    let ci = parseInt(prompt("Escribe tu cedula de identidad. (sin puntos ni guiones."))
    let dia = parseInt(prompt("Escribe el día del calendario en el que quieras venir (en número de 2 dígitos)"))
    let mes = parseInt(prompt("Escribe el mes del calendario en el que quieras venir (en número de 2 dígitos)"))
    let año = parseInt(prompt("Escribe el año del calendario en el que quieras venir (en número de 4 dígitos)"))
    let fecha = dia + "/" + mes + "/" + año

    const persona = {nombre, ci, fecha}

    return persona
}

let pregunta = prompt("¿Quieres agendar a alguien para una visita? si/no").toLowerCase()

while (pregunta !== "no") {
    switch (pregunta) {
        case "si":
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
        default:
            alert("Respuesta inválida.")
            break
    }

    pregunta = prompt("¿Quieres agendar a alguien para una visita? si/no").toLowerCase()
}

alert("¡Que tengas un buen día!")

console.log(agendados)