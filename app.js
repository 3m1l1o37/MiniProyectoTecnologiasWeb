//un arreglo, no le he metido localstorage
let usuario = "";
let participantes = [];
let exclusiones = {};

//todo los elementos del html

const btnContinuar = document.getElementById("btnContinuar");
const btnAgregar = document.getElementById("btnAgregar");
const btnTerminar = document.getElementById("btnTerminar");
const btnExcluir = document.getElementById("btnExcluir");
const btnOmitir = document.getElementById("btnOmitir");


const pantallaUsuario = document.getElementById("pantallaUsuario"); //lo de dentro del card al introducir el usuario principal
const pantallaParticipantes = document.getElementById("pantallaParticipantes");// '     '   '     '    '    ' los participantes
const pantallaPreguntaExclusiones = document.getElementById("pantallaPreguntaExclusiones");// ' '   '   '   '   '   '   '   ' Exclusiones de participantes
const pantallaExclusiones = document.getElementById("pantallaExclusiones");// ' '   '   '   '   '   '   '   ' Exclusiones de participantes

const inputUsuario = document.getElementById("nombreUsuario");
const inputParticipante = document.getElementById("nombreParticipante");

const lista = document.getElementById("listaParticipantes");


//events
btnContinuar.addEventListener("click", guardarUsuario);
btnAgregar.addEventListener("click", agregarParticipante);
btnTerminar.addEventListener("click", terminarRegistro);
btnExcluir.addEventListener("click", mostrarPantallaExclusiones);
btnOmitir.addEventListener("click", omitirExclusiones);


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

function terminarRegistro(){
    console.log("Wa")
    console.log("Usuario ", usuario);
    console.log("Paricipantes ", participantes);

    // alert("Participantes registrados, fuga");
        pantallaParticipantes.style.display = "none"; //deshabilita agregar participantes
        pantallaPreguntaExclusiones.style.display = "block"; //habilita pantalla pregunta de exclusiones



}

//funcionalidad de exclusiones
function mostrarPantallaExclusiones(){

    pantallaPreguntaExclusiones.style.display = "none";
    pantallaExclusiones.style.display = "block";

    

    participantes.forEach(persona => {

        exclusiones[persona] = [];

        const contenedor = document.createElement("div");
        contenedor.className = "mb-2";

        const titulo = document.createElement("h5");
        titulo.textContent = persona;
        titulo.className = "text-secondary";

        // Dropdown
        const dropdown = document.createElement("div");
        dropdown.className = "dropdown";

        const boton = document.createElement("button");
        boton.className = "btn btn-outline-primary dropdown-toggle w-100";
        boton.type = "button";
        boton.setAttribute("data-bs-toggle","dropdown");
        boton.textContent = "Seleccionar exclusiones";

        const menu = document.createElement("ul");
        menu.className = "dropdown-menu w-100 p-3";

        participantes.forEach(otro => {

            if(persona === otro) return;

            const li = document.createElement("li");

            const divCheck = document.createElement("div");
            divCheck.className = "form-check";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input";

            checkbox.addEventListener("change", () => {

                if(checkbox.checked){
                    exclusiones[persona].push(otro);
                }else{
                    exclusiones[persona] =
                        exclusiones[persona].filter(p => p !== otro);
                }

                console.log(exclusiones);
            });

            const label = document.createElement("label");
            label.className = "form-check-label";
            label.textContent = otro;

            divCheck.appendChild(checkbox);
            divCheck.appendChild(label);
            li.appendChild(divCheck);

            menu.appendChild(li);
        });

        dropdown.appendChild(boton);
        dropdown.appendChild(menu);

        contenedor.appendChild(titulo);
        contenedor.appendChild(dropdown);

        pantallaExclusiones.appendChild(contenedor);
    });
}

//en caso de querer omitir exclusiones
function omitirExclusiones(){

    participantes.forEach(p => {
        exclusiones[p] = [];
    });

    console.log("Sin exclusiones");
    console.log(exclusiones);
}

