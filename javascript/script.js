// (function () {
//   let actualizarHora = function () {
//     let fecha = new Date(),
//       horas = fecha.getHours(),
//       ampm,
//       minutos = fecha.getMinutes(),
//       segundos = fecha.getSeconds(),
//       diaSemana = fecha.getDay(),
//       dia = fecha.getDate(),
//       mes = fecha.getMonth(),
//       year = fecha.getFullYear();

//     let pHoras = document.getElementById("horas");
//     let pAMPM = document.getElementById("ampm");
//     let pMinutos = document.getElementById("minutos");
//     let pSegundos = document.getElementById("segundos");
//     let pDiaSemana = document.getElementById("diaSemana");
//     let pDia = document.getElementById("dia");
//     let pMes = document.getElementById("mes");
//     let pYear = document.getElementById("year");

//     let semana = [
//       "Domingo",
//       "Lunes",
//       "Martes",
//       "Miercoles",
//       "Jueves",
//       "Viernes",
//       "Sabado",
//     ];
//     pDiaSemana.textContent = semana[diaSemana];

//     pDia.textContent = dia;

//     let meses = [
//       "Enero",
//       "Febrero",
//       "Marzo",
//       "Abril",
//       "Mayo",
//       "Junio",
//       "Julio",
//       "Agosto",
//       "Septiembre",
//       "Octubre",
//       "Nobiembre",
//       "Diciembre",
//     ];
//     pMes.textContent = meses[mes];

//     pYear.textContent = year;

//     // reloj

//     if (horas >= 12) {
//       horas = horas - 12;
//       ampm = "PM";
//     } else {
//       ampm = "AM";
//     }

//     if (horas == 0) {
//       horas = 12;
//     }

//     if (minutos < 10) {
//       minutos = "0" + minutos;
//     }
//     if (segundos < 10) {
//       segundos = "0" + segundos;
//     }

//     pHoras.textContent = horas;
//     pAMPM.textContent = ampm;

//     pMinutos.textContent = minutos;
//     pSegundos.textContent = segundos;

//     // reloj
//   };

//   actualizarHora();
//   let intervalo = setInterval(actualizarHora, 1000);
// })();

// Lista de tareas

const lista = document.getElementById("lista");
const input = document.getElementById("input");
const botonEnter = document.getElementById("enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LIST;

// agregado de tareas

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

// tarea reliaxada NO ANDA

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

// tarea eliminada

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

// localstorage getitem

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach((i) => {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
