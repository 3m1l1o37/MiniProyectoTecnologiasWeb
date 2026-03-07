// datos principales
let usuario = "";
let participantes = [];
let exclusiones = {};

// botones
const btnContinuar = document.getElementById("btnContinuar");
const btnAgregar = document.getElementById("btnAgregar");
const btnTerminar = document.getElementById("btnTerminar");
const btnBackToUsuario = document.getElementById("btnBackToUsuario");
const btnContinuarExclusiones = document.getElementById("btnContinuarExclusiones");
const btnGenerarSorteo = document.getElementById("btnGenerarSorteo");

// pantallas
const pantallaUsuario = document.getElementById("pantallaUsuario");
const pantallaParticipantes = document.getElementById("pantallaParticipantes");
const pantallaPreguntaExclusiones = document.getElementById("pantallaPreguntaExclusiones");
const pantallaExclusiones = document.getElementById("pantallaExclusiones");
const pantallaSorteo = document.getElementById("pantallaSorteo");

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


// eventos
btnContinuar.addEventListener("click", guardarUsuario);
btnAgregar.addEventListener("click", agregarParticipante);
btnTerminar.addEventListener("click", terminarRegistro);
btnBackToUsuario.addEventListener("click", volverUsuario);
btnContinuarExclusiones.addEventListener("click", decidirExclusiones);
btnGenerarSorteo.addEventListener("click", ejecutarSorteo);


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
        pantallaSorteo.style.display = "block";
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


// pantalla exclusiones
function mostrarPantallaExclusiones(){

    pantallaPreguntaExclusiones.style.display = "none";
    pantallaExclusiones.style.display = "block";

    pantallaExclusiones.innerHTML = `
    <h3 class="text-center text-primary mb-4">
    Selecciona exclusiones
    </h3>
    `;

    participantes.forEach(persona=>{

        exclusiones[persona] = [];

        const contenedor = document.createElement("div");

        const titulo = document.createElement("h5");
        titulo.textContent = persona;

        contenedor.appendChild(titulo);

        participantes.forEach(otro=>{

            if(persona === otro) return;

            const div = document.createElement("div");
            div.className = "form-check";

            const check = document.createElement("input");
            check.type = "checkbox";
            check.className = "form-check-input me-2";

            check.onchange = ()=>{

                if(check.checked){
                    exclusiones[persona].push(otro);
                }else{
                    exclusiones[persona] =
                    exclusiones[persona].filter(p=>p!==otro);
                }

            };

            const label = document.createElement("label");
            label.textContent = otro;

            div.appendChild(check);
            div.appendChild(label);

            contenedor.appendChild(div);

        });

        pantallaExclusiones.appendChild(contenedor);

    });

    const btn = document.createElement("button");

    btn.textContent = "Continuar";
    btn.className = "btn btn-primary w-100 mt-4";

    btn.onclick = ()=>{

        reiniciarPantallaSorteo();

        pantallaExclusiones.style.display = "none";
        pantallaSorteo.style.display = "block";

    };

    pantallaExclusiones.appendChild(btn);
}


// reiniciar pantalla sorteo
function reiniciarPantallaSorteo(){

    resultadoSorteo.innerHTML = "";

    btnGenerarSorteo.style.display = "block";

    btnGenerarSorteo.textContent = "Generar Sorteo";
}


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