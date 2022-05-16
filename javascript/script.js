// Lista de tareas
// VARIABLES LISTA TAREAS
const lista = document.getElementById("lista");
const input = document.getElementById("input");
const botonEnter = document.getElementById("enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LIST;

// VARIABLES RELOJ
const time = document.getElementById('time')
const fecha = document.getElementById('fecha')

// ============AGREGADO DE TAREAS===================

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const elemento = `
                    <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}"> ${tarea} </p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}" ></i>
                    </li>
    `;

  lista.insertAdjacentHTML("afterbegin", elemento);
}

// TAREA REALIZADA

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

// TAREA ELIMINADA

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}

botonEnter.addEventListener("click", () => {
  let tarea = input.value;

  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));

  input.value = "";
  id++;
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    let tarea = input.value;

    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));

    input.value = "";
    id++;
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// LOCALSTORAGE GET ITEM

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  console.log(LIST);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(array) {
  array.forEach(function (item) {
    agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
  });
}


// ===========RELOJ================


const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Nobiembre", "Diciembre"]

const interval = setInterval (() => {
    const local = new Date(); 

    let day = local.getDate(),
    month = local.getMonth(),
    year = local.getFullYear(); 

    time.innerHTML = local.toLocaleTimeString();
    fecha.innerHTML = `${day} ${monthNames[month]} ${year}`;

})

// RELOJ