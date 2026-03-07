// datos principales
let usuario = "";
let participantes = [];
let exclusiones = {};
let nombreSorteo = "";
let fechaSorteo = "";

// nombres por defecto
const nombresSorteoDefault = [
"Intercambio Navideño",
"Amigo Secreto",
"Intercambio de Regalos",
"Sorteo de Cumpleaños",
"Intercambio de Oficina",
"Sorteo Familiar",
"Intercambio Escolar",
"Sorteo Especial"
];

let presupuestoSorteo = "";

const presupuestosDefault = [
"$100",
"$200",
"$300",
"$500",
"$1000",
"$1500"
];

// botones
const btnContinuar = document.getElementById("btnContinuar");
const btnAgregar = document.getElementById("btnAgregar");
const btnTerminar = document.getElementById("btnTerminar");
const btnBackToUsuario = document.getElementById("btnBackToUsuario");
const btnContinuarExclusiones = document.getElementById("btnContinuarExclusiones");
const btnGenerarSorteo = document.getElementById("btnGenerarSorteo");
const btnBackFromPreguntaExclusiones = document.getElementById("btnBackFromPreguntaExclusiones");
const btnBackFromExclusiones = document.getElementById("btnBackFromExclusiones");
const btnBackFromSorteo = document.getElementById("btnBackFromSorteo");

// pantallas
const pantallaUsuario = document.getElementById("pantallaUsuario");
const pantallaParticipantes = document.getElementById("pantallaParticipantes");
const pantallaPreguntaExclusiones = document.getElementById("pantallaPreguntaExclusiones");
const pantallaExclusiones = document.getElementById("pantallaExclusiones");
const pantallaSorteo = document.getElementById("pantallaSorteo");
const pantallaNombreSorteo = document.getElementById("pantallaNombreSorteo");
const pantallaPresupuestoSorteo = document.getElementById("pantallaPresupuestoSorteo");
const pantallaFechaSorteo = document.getElementById("pantallaFechaSorteo");

// inputs
const inputUsuario = document.getElementById("nombreUsuario");
const inputParticipante = document.getElementById("nombreParticipante");

// elementos visuales
const lista = document.getElementById("listaParticipantes");
const resultadoSorteo = document.getElementById("resultadoSorteo");
const alertaParticipantes = document.getElementById("alertaParticipantes");

const incluirOrganizador = document.getElementById("incluirOrganizador");

const noExclusiones = document.getElementById("noExclusiones");
const siExclusiones = document.getElementById("siExclusiones");

// pantalla nombre sorteo
const opcionesNombreSorteo = document.getElementById("opcionesNombreSorteo");
const inputNombrePersonalizado = document.getElementById("inputNombrePersonalizado");
const btnContinuarNombreSorteo = document.getElementById("btnContinuarNombreSorteo");
const btnBackFromNombreSorteo = document.getElementById("btnBackFromNombreSorteo");

// pantalla presupuesto sorteo
const opcionesPresupuestoSorteo = document.getElementById("opcionesPresupuestoSorteo");
const inputPresupuestoPersonalizado = document.getElementById("inputPresupuestoPersonalizado");
const btnContinuarPresupuestoSorteo = document.getElementById("btnContinuarPresupuestoSorteo");
const btnBackFromPresupuestoSorteo = document.getElementById("btnBackFromPresupuestoSorteo");

// pantalla fecha sorteo
const opcionesFechaSorteo = document.getElementById("opcionesFechaSorteo");
const contenedorCalendario = document.getElementById("contenedorCalendario");
const inputFechaPersonalizada = document.getElementById("inputFechaPersonalizada");
const btnContinuarFechaSorteo = document.getElementById("btnContinuarFechaSorteo");
const btnBackFromFechaSorteo = document.getElementById("btnBackFromFechaSorteo");

//pantallaSorteo
const infoSorteo = document.getElementById("infoSorteo");


// eventos
btnContinuar.addEventListener("click", guardarUsuario);
btnAgregar.addEventListener("click", agregarParticipante);
btnTerminar.addEventListener("click", terminarRegistro);
btnBackToUsuario.addEventListener("click", volverUsuario);
btnContinuarExclusiones.addEventListener("click", decidirExclusiones);
btnGenerarSorteo.addEventListener("click", ejecutarSorteo);
btnBackFromPreguntaExclusiones.addEventListener("click", volverDePreguntaExclusiones);
btnBackFromExclusiones.addEventListener("click", volverDeExclusiones);
btnBackFromSorteo.addEventListener("click", volverDeSorteo);


// guardar usuario
function guardarUsuario(){

    const nombre = inputUsuario.value.trim();

    if(nombre === ""){
        alert("Ingresa tu nombre");
        return;
    }

    usuario = nombre;

    if(incluirOrganizador.checked){
        participantes.push(usuario);
    }

    pantallaUsuario.style.display = "none";
    pantallaParticipantes.style.display = "block";

    actualizarLista();
}


// volver a pantalla usuario
function volverUsuario(){

    pantallaParticipantes.style.display = "none";
    pantallaUsuario.style.display = "block";

    participantes = [];
    lista.innerHTML = "";
}


// volver de pregunta exclusiones
function volverDePreguntaExclusiones(){

    pantallaPreguntaExclusiones.style.display = "none";
    pantallaParticipantes.style.display = "block";

    // Reiniciar opciones de exclusiones
    noExclusiones.checked = true;
    siExclusiones.checked = false;
}


// volver de pantalla exclusiones
function volverDeExclusiones(){

    pantallaExclusiones.style.display = "none";
    pantallaPreguntaExclusiones.style.display = "block";

    // Limpiar exclusiones
    exclusiones = {};
    participantes.forEach(p => {
        exclusiones[p] = [];
    });
}


// volver de pantalla sorteo
function volverDeSorteo(){

    pantallaSorteo.style.display = "none";
    pantallaParticipantes.style.display = "block";

    // Limpiar exclusiones y reiniciar
    exclusiones = {};
    participantes.forEach(p => {
        exclusiones[p] = [];
    });
}


// agregar participante
function agregarParticipante(){

    const nombre = inputParticipante.value.trim();

    if(nombre === ""){
        alert("Escribe un nombre");
        return;
    }

    if(participantes.some(p => p.toLowerCase() === nombre.toLowerCase())){

        alertaParticipantes.innerHTML = `
        <div class="alert alert-danger">
        ${nombre} ya fue agregado
        </div>
        `;

        return;
    }

    participantes.push(nombre);

    actualizarLista();

    inputParticipante.value = "";
}


// actualizar lista visual
function actualizarLista(){

    lista.innerHTML = "";
    alertaParticipantes.innerHTML = "";

    participantes.forEach((persona,index)=>{

        const item = document.createElement("li");

        item.className =
        "list-group-item d-flex justify-content-between align-items-center";

        item.innerHTML = `${index+1}. ${persona}`;

        if(persona !== usuario){

            const btnEliminar = document.createElement("button");

            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "btn btn-danger btn-sm";

            btnEliminar.onclick = ()=>{

                participantes.splice(index,1);

                actualizarLista();
            };

            item.appendChild(btnEliminar);
        }

        lista.appendChild(item);

    });

}


// terminar registro
function terminarRegistro(){

    if(participantes.length < 3){

        alertaParticipantes.innerHTML = `
        <div class="alert alert-warning">
        Debe haber al menos 3 participantes
        </div>
        `;

        return;
    }

    pantallaParticipantes.style.display = "none";

    if(participantes.length < 4){

        omitirExclusiones();

        pantallaSorteo.style.display = "block";

        return;
    }

    pantallaPreguntaExclusiones.style.display = "block";

}


// decidir exclusiones
function decidirExclusiones(){

    if(noExclusiones.checked){

        omitirExclusiones();

        pantallaPreguntaExclusiones.style.display = "none";
        // pantallaSorteo.style.display = "block";
        pantallaNombreSorteo.style.display = "block";
        mostrarOpcionesNombreSorteo();
    }

    if(siExclusiones.checked){

        mostrarPantallaExclusiones();
    }

}


// omitir exclusiones
function omitirExclusiones(){

    participantes.forEach(p=>{
        exclusiones[p] = [];
    });

}


// validar si las exclusiones permitirán un sorteo válido
function validarExclusiones(){

    // Verificar porcentaje de exclusiones por persona
    const porcentajeMaximo = 0.4; // 40%
    const optionesDisponiblesPorPersona = {};
    let hayErrorPorcentaje = false;
    
    for(let persona in exclusiones){
        const totalPersonas = participantes.length - 1; // Menos a sí mismo
        const excluidas = exclusiones[persona].length;
        const disponibles = totalPersonas - excluidas;
        optionesDisponiblesPorPersona[persona] = disponibles;
        
        // Si una persona tiene menos del 60% de opciones, hay problema
        if(disponibles / totalPersonas < (1 - porcentajeMaximo)){
            hayErrorPorcentaje = true;
        }
    }
    
    // Detectar si hay personas con solo 1 opción disponible que es la misma
    const personasConUnaOpcion = [];
    for(let persona in optionesDisponiblesPorPersona){
        if(optionesDisponiblesPorPersona[persona] === 1){
            const disponible = participantes.find(p => p !== persona && !exclusiones[persona].includes(p));
            personasConUnaOpcion.push({persona, disponible});
        }
    }
    
    // Verificar si 2 o más personas solo pueden intercambiar con la misma persona
    let hayConflictoIntercambio = false;
    for(let i = 0; i < personasConUnaOpcion.length; i++){
        for(let j = i + 1; j < personasConUnaOpcion.length; j++){
            if(personasConUnaOpcion[i].disponible === personasConUnaOpcion[j].disponible){
                hayConflictoIntercambio = true;
                break;
            }
        }
    }
    
    // Intentar generar un sorteo válido como verificación final
    let puedeGenerarSorteo = false;
    const maxIntentos = 100;
    for(let i = 0; i < maxIntentos; i++){
        const mezclado = mezclarArray(participantes);
        let asignaciones = {};
        participantes.forEach((persona, index) => {
            asignaciones[persona] = mezclado[index];
        });
        if(sorteoValido(asignaciones)){
            puedeGenerarSorteo = true;
            break;
        }
    }
    
    return {
        valido: !hayErrorPorcentaje && !hayConflictoIntercambio && puedeGenerarSorteo,
        hayErrorPorcentaje,
        hayConflictoIntercambio,
        puedeGenerarSorteo
    };
}

// pantalla exclusiones
function mostrarPantallaExclusiones(){
    

    pantallaPreguntaExclusiones.style.display = "none";
    pantallaExclusiones.style.display = "block";

    // Limpiar contenido previo
    const contenidoExclusiones = document.getElementById("contenidoExclusiones");
    contenidoExclusiones.innerHTML = `
    <h3 class="text-center text-primary mb-4">
    Selecciona exclusiones
    </h3>
    `;

    // Contenedor para exclusiones
    let contenedorExclusiones = document.createElement("div");
    contenedorExclusiones.id = "contenedorExclusiones";

    // Crear seccion de exclusiones para cada participante
    participantes.forEach(persona=>{

        // Inicializar exclusiones para cada persona
        exclusiones[persona] = [];

        // Contenedor para cada persona
        const contenedor = document.createElement("div");
        contenedor.className = "mb-3";

        // Titulo con el nombre de la persona
        const titulo = document.createElement("h5");
        titulo.textContent = persona;

        contenedor.appendChild(titulo);

        // Crear checkbox para cada posible exclusión
        participantes.forEach(otro=>{

            if(persona === otro) return;

            const div = document.createElement("div");
            div.className = "form-check";

            const check = document.createElement("input");
            check.type = "checkbox";
            check.className = "form-check-input me-2";

            // Evento al cambiar el checkbox
            check.onchange = ()=>{

                // Agregar o quitar exclusion según el estado del checkbox
                if(check.checked){
                    exclusiones[persona].push(otro);
                }else{
                    exclusiones[persona] =
                    exclusiones[persona].filter(p=>p!==otro);
                }
                
                // Validar y actualizar en tiempo real
                actualizarValidacionExclusiones();

            };

            const label = document.createElement("label");
            label.textContent = otro;

            div.appendChild(check);
            div.appendChild(label);
    
            contenedor.appendChild(div);

        });

        contenedorExclusiones.appendChild(contenedor);

    });

    contenidoExclusiones.appendChild(contenedorExclusiones);
    
    // Contenedor para mensaje de error
    let mensajeError = document.createElement("div");
    mensajeError.id = "mensajeErrorExclusiones";
    mensajeError.className = "mb-3";
    contenidoExclusiones.appendChild(mensajeError);

    const btn = document.createElement("button");
    btn.id = "btnContinuarExclusionesValidado";
    btn.textContent = "Continuar";
    btn.className = "btn btn-primary w-100 mt-4";
    btn.disabled = true;

    btn.onclick = ()=>{

        reiniciarPantallaSorteo();

        pantallaExclusiones.style.display = "none";
        // pantallaSorteo.style.display = "block";
        pantallaNombreSorteo.style.display = "block";
        mostrarOpcionesNombreSorteo();

    };

    contenidoExclusiones.appendChild(btn);
    
    // Validar inicial
    actualizarValidacionExclusiones();
}

// actualizar validación de exclusiones en tiempo real
function actualizarValidacionExclusiones(){
    
    const validacion = validarExclusiones();
    const btn = document.getElementById("btnContinuarExclusionesValidado");
    const mensajeError = document.getElementById("mensajeErrorExclusiones");
    
    if(!validacion.valido){
        
        let mensajeTexto = `
        <div class="alert alert-danger mb-3">
        <strong>⚠️ No se puede realizar el intercambio</strong><br>
        `;
        
        if(validacion.hayErrorPorcentaje){
            mensajeTexto += "Se han agregado demasiadas exclusiones. Por favor, modifica tus selecciones.<br>";
        }       
        if(validacion.hayConflictoIntercambio){
            mensajeTexto += "Dos o más personas solo pueden intercambiar con la misma persona. Por favor, modifica tus selecciones.<br>";
        }    
        if(!validacion.puedeGenerarSorteo && !validacion.hayErrorPorcentaje && !validacion.hayConflictoIntercambio){
            mensajeTexto += "Las exclusiones actuales no permiten un intercambio válido. Por favor, modifica tus selecciones.<br>";
        }
        mensajeTexto += `</div>`;
        mensajeError.innerHTML = mensajeTexto;
        btn.disabled = true;
    } else {
        mensajeError.innerHTML = "";
        btn.disabled = false;
    }
}


// reiniciar pantalla sorteo
function reiniciarPantallaSorteo(){

    resultadoSorteo.innerHTML = "";
    btnGenerarSorteo.style.display = "block";
    btnGenerarSorteo.textContent = "Generar Sorteo";
}


//seleccionarNombre del sorteo
function mostrarOpcionesNombreSorteo(){

    opcionesNombreSorteo.innerHTML = "";
    nombresSorteoDefault.forEach(nombre=>{
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary w-100 mb-2";
        btn.textContent = nombre;
        btn.onclick = ()=>{

            nombreSorteo = nombre;

            inputNombrePersonalizado.value = nombre;

            // marcar visualmente
            document.querySelectorAll("#opcionesNombreSorteo button")
            .forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");
        };

        opcionesNombreSorteo.appendChild(btn);

    });

}

btnContinuarNombreSorteo.addEventListener("click", guardarNombreSorteo);
function guardarNombreSorteo(){

    const personalizado = inputNombrePersonalizado.value.trim();

    if(personalizado !== ""){
        nombreSorteo = personalizado;
    }
    if(nombreSorteo === ""){
        alert("Selecciona o escribe un nombre para el sorteo");
        return;
    }
    pantallaNombreSorteo.style.display = "none";
    pantallaPresupuestoSorteo.style.display = "block";
    mostrarOpcionesPresupuesto();
}

btnBackFromNombreSorteo.addEventListener("click", ()=>{

    pantallaNombreSorteo.style.display = "none";
    pantallaPreguntaExclusiones.style.display = "block";

});

// btnBackFromNombreSorteo.addEventListener("click", ()=>{

//     pantallaNombreSorteo.style.display = "none";
//     pantallaPreguntaExclusiones.style.display = "block";

// });

//SeleccionarPresupuestoDelSorteo
function mostrarOpcionesPresupuesto(){

    opcionesPresupuestoSorteo.innerHTML = "";
    presupuestosDefault.forEach(valor=>{
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary w-100 mb-2";
        btn.textContent = valor;
        btn.onclick = ()=>{

            presupuestoSorteo = valor;

            inputPresupuestoPersonalizado.value = valor;

            document.querySelectorAll("#opcionesPresupuestoSorteo button")
            .forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

        };

        opcionesPresupuestoSorteo.appendChild(btn);

    });

}

//guardarPresupuesto
btnContinuarPresupuestoSorteo.addEventListener("click", guardarPresupuesto);

function guardarPresupuesto(){

    const personalizado = inputPresupuestoPersonalizado.value.trim();
    if(personalizado !== ""){
        presupuestoSorteo = personalizado;
    }
    if(presupuestoSorteo === ""){
        alert("Selecciona o escribe un presupuesto");
        return;
    }
    pantallaPresupuestoSorteo.style.display = "none";
    pantallaFechaSorteo.style.display = "block";
    mostrarOpcionesFecha();

}

//boton para volver
btnBackFromPresupuestoSorteo.addEventListener("click", ()=>{

    pantallaPresupuestoSorteo.style.display = "none";
    pantallaNombreSorteo.style.display = "block";

});

//funciones para obtener fecha today y tomorrow
function obtenerFechaHoy(){

    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
}

function obtenerFechaManana(){

    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    return manana.toISOString().split("T")[0];
}

//funcion mostrar opciones de fecha
function mostrarOpcionesFecha(){

    opcionesFechaSorteo.innerHTML = "";

    const hoy = obtenerFechaHoy();
    const manana = obtenerFechaManana();

    const opciones = [
        {texto: "Hoy", valor: hoy},
        {texto: "Mañana", valor: manana},
        {texto: "Elegir otra fecha", valor: "personalizada"}
    ];

    opciones.forEach(opcion=>{

        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary w-100 mb-2";
        btn.textContent = opcion.texto;
        btn.onclick = ()=>{

            document.querySelectorAll("#opcionesFechaSorteo button")
            .forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            if(opcion.valor === "personalizada"){

                contenedorCalendario.style.display = "block";

                fechaSorteo = "";

            }else{

                contenedorCalendario.style.display = "none";

                fechaSorteo = opcion.valor;

                inputFechaPersonalizada.value = "";
            }

        };

        opcionesFechaSorteo.appendChild(btn);

    });

    // limitar calendario a fechas futuras
    inputFechaPersonalizada.min = hoy;

}

//guardar fecha
btnContinuarFechaSorteo.addEventListener("click", guardarFechaSorteo);
function guardarFechaSorteo(){
    if(inputFechaPersonalizada.value !== ""){
        fechaSorteo = inputFechaPersonalizada.value;
    }
    if(fechaSorteo === ""){
        alert("Selecciona una fecha para el sorteo");
        return;
    }

    pantallaFechaSorteo.style.display = "none";
    mostrarInfoSorteo();

    pantallaSorteo.style.display = "block";
}

//boton volver
btnBackFromFechaSorteo.addEventListener("click", ()=>{

    pantallaFechaSorteo.style.display = "none";
    pantallaPresupuestoSorteo.style.display = "block";

});


// mezclar array
function mezclarArray(array){

    let copia = [...array];

    for(let i=copia.length-1;i>0;i--){

        let j = Math.floor(Math.random()*(i+1));

        [copia[i],copia[j]] = [copia[j],copia[i]];
    }

    return copia;
}


// validar sorteo
function sorteoValido(asignaciones){

    for(let persona in asignaciones){

        let asignado = asignaciones[persona];

        if(persona === asignado) return false;

        if(exclusiones[persona].includes(asignado)) return false;

    }

    return true;
}

//funncion para mostrar info del sorteo
function mostrarInfoSorteo(){

    let fechaFormateada = fechaSorteo;

    if(fechaSorteo){
        const fecha = new Date(fechaSorteo);
        fechaFormateada = fecha.toLocaleDateString();
    }

    infoSorteo.innerHTML = `
    <div class="card bg-light border-0">
        <div class="card-body text-center">

        <div class="fw-bold text-primary mb-1">
        🎁 ${nombreSorteo}
        </div>

        <div>
        💰 Presupuesto: <strong>${presupuestoSorteo}</strong>
        </div>

        <div>
        📅 Fecha: <strong>${fechaFormateada}</strong>
        </div>

        </div>
    </div>
    `;
}

// generar sorteo
function generarSorteo(){

    const maxIntentos = 1000;

    for(let i=0;i<maxIntentos;i++){

        const mezclado = mezclarArray(participantes);

        let asignaciones = {};

        participantes.forEach((persona,index)=>{
            asignaciones[persona] = mezclado[index];
        });

        if(sorteoValido(asignaciones)){
            return asignaciones;
        }

    }

    return null;
}


// ejecutar sorteo
function ejecutarSorteo(){

    resultadoSorteo.innerHTML = "";

    const resultado = generarSorteo();

    if(!resultado){

        resultadoSorteo.innerHTML = `
        <div class="alert alert-danger mb-3">
        No se pudo generar el sorteo con las exclusiones actuales.
        </div>

        <button id="btnVolverExclusiones"
        class="btn btn-warning w-100">
        Volver a exclusiones
        </button>
        `;

        btnGenerarSorteo.style.display = "none";

        const btnVolverExclusiones =
        document.getElementById("btnVolverExclusiones");

        btnVolverExclusiones.onclick = ()=>{

            reiniciarPantallaSorteo();

            pantallaSorteo.style.display = "none";
            pantallaExclusiones.style.display = "block";

        };

        return;
    }

    for(let persona in resultado){

        const asignado = resultado[persona];

        const item = document.createElement("div");

        item.className =
        "list-group-item d-flex justify-content-between align-items-center";

        item.innerHTML = `
        <strong>${persona}</strong>
        <span>→ ${asignado}</span>
        `;

        resultadoSorteo.appendChild(item);
    }

    btnGenerarSorteo.textContent = "Generar nuevamente";
}