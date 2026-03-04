//un arreglo, no le he metido localstorage
let usuario = "";
let participantes = [];


//todo los elementos del html

const btnContinuar = document.getElementById("btnContinuar");
const btnAgregar = document.getElementById("btnAgregar");
const btnTerminar = document.getElementById("btnTerminar");

const pantallaUsuario = document.getElementById("pantallaUsuario"); //lo de dentro del card al introducir el usuario principal
const pantallaParticipantes = document.getElementById("pantallaParticipantes");// '     '   '     '    '    ' los participantes

const inputUsuario = document.getElementById("nombreUsuario");
const inputParticipante = document.getElementById("nombreParticipante");

const lista = document.getElementById("listaParticipantes");


//events
btnContinuar.addEventListener("click", guardarUsuario);
btnAgregar.addEventListener("click", agregarParticipante);
btnTerminar.addEventListener("click", terminarRegistro);


//funcionalidades
function guardarUsuario(){

    const nombre = inputUsuario.value.trim();

    if(nombre === ""){
        alert("Ingresa tu nombre");
        return;
    }

    usuario = nombre;

    pantallaUsuario.style.display = "none"; //oculta ingresar usuario
    pantallaParticipantes.style.display = "block"; //hblitia agregar participantes
}


function agregarParticipante(){

    const nombre = inputParticipante.value.trim();

    if(nombre === ""){
        alert("Escribe un nombre");
        return;
    }

    participantes.push(nombre); //push x 

    actualizarLista();

    inputParticipante.value = "";
}

//Actualizar limpia toda la lista de la pantalla, recorre lista, crea una etiqueta li, ponemostextcontext y se hace append a la lista
//si, se limpia y se borra toda la lista cada cambio. perdoname we 
function actualizarLista(){

    lista.innerHTML = "";

    participantes.forEach((persona, index)=>{

        const item = document.createElement("li");

        item.className = "list-group-item";
        item.textContent = `${index + 1}. ${persona}`;

        lista.appendChild(item);
    });
}

//no se, ya tengo sue
function terminarRegistro(){
    console.log("Wa")
    console.log("Usuario ", usuario);
    console.log("Paricipantes ", participantes);

    alert("Participantes registrados, fuga");
}