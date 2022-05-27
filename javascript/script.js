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
const time = document.getElementById("time");
const fecha = document.getElementById("fecha");


// NOTIFICACION PARA PEDIR EL NOMBRE

setTimeout(() => {
  (async () => {
    const { value: nombre } = await Swal.fire({
      icon: "question",
      title: "Ingrese su nombre",
      input: "text",
      showCloseButton: true,
      confirmButtonColor: "#FD6585",
      inputValidator: (value) => {
        if (!value) {
          return "Porfavor pone tu nombre 😫!";
        }
      },
    });

    if (nombre) {
      Swal.fire({
        icon: "success",
        title: `Bienvenido ${nombre}`,
        confirmButtonColor: "#FD6585",
        showCloseButton: true,
      });
    }

    let divUsuario = document.getElementById("divUsuario");

    divUsuario.innerHTML += `
     <h1 class="divUsuario">${nombre}, estas son tus tareas pendientes </h1>
     `;
    console.log(nombre);
  })();
}, 100);

// NOTIFICACION PARA PEDIR EL NOMBRE

// ============AGREGADO DE TAREAS===================

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const elemento = `
                    <li id="elemento" class="tarea">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}"> ${tarea} </p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}" ></i>
                    </li>
    `;

  Toastify({
    text: "Agregaste la tarea. HACELA🤬",
    duration: 1300,
    //   close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #FBAB7E, #F7CE68  )",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

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

// NOTIFICACION DE TAREA AGREGADA CORRECTAMENTE

botonEnter.addEventListener("click", () => {
  Toastify({
    text: "Agregaste la tarea. HACELA🤬",
    duration: 1300,
    //   close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #FBAB7E, #F7CE68  )",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
});

// ===========RELOJ================

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Nobiembre",
  "Diciembre",
];

const interval = setInterval(() => {
  const local = new Date();

  let day = local.getDate(),
    month = local.getMonth(),
    year = local.getFullYear();

  time.innerHTML = local.toLocaleTimeString();
  fecha.innerHTML = `${day} ${monthNames[month]} ${year}`;
});

// RELOJ

// DRAG Y DROP

Sortable.create(lista, {
  animation: 250,
  chosenClass: "seleccionado",
  dragClass: "drag",

  onEnd: () => {
    console.log("elemento");
  },

  group: "lista-perosnas",
  store: {
    // guardar orden de la lista
    set: (sortable) => {
      const orden = sortable.toArray();
      localStorage.setItem(sortable.options.group.names, orden.join("-"));
    },

    // obtener orden de lista
    get: (sortable) => {
      const orden = localStorage.getItem(sortable.options.group.names);
      return orden ? orden.split("-") : [];
    },
  },
});

// DRAG Y DROP

// CLIMA

// obtengo ubicacion del usuario
window.addEventListener('load', () => {
  
  let lat
  let lon

  let temperaturaValor = document.getElementById('temperatura-valor')
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

  let ubicacion = document.getElementById('ubicacion')
  let iconoAnimado = document.getElementById('iconoAnimado')
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(posicion => {
      lat = posicion.coords.latitude
      lon = posicion.coords.longitude

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lang=es&units=metric&lon=${lon}&appid=495e29ffe2618a1c71e17084c4e8ee1f`


      // peticiones a la api

      fetch(url)
      .then(response => {return response.json()})
      .then (data => {

        let temp = Math.round(data.main.temp)
        temperaturaValor.textContent = `${temp} ºC `
        
        let desc = data.weather[0].description
        temperaturaDescripcion.textContent = desc

        ubicacion.textContent = data.name
        

        // ICONOS ANIMADOS


        console.log(data.weather[0].main)
        switch (data.weather[0].main) {

            case 'Thunderstorm':
              iconoAnimado.src='assets/animated/thunder.svg'
              break;

            case 'Drizzle':
              iconoAnimado.src=' assets/animated/rainy-2.svg'
              break;

            case 'Rain':
              iconoAnimado.src='assets/animated/rainy-7.svg'
              break;

            case 'Snow':
              iconoAnimado.src='assets/animated/snowy-6.svg'
              break;   

            case 'Clear':
                iconoAnimado.src='assets/animated/day.svg'
              break;

            case 'Atmosphere':
              iconoAnimado.src='assets/animated/weather.svg'
                break;  

            case 'Clouds':
                iconoAnimado.src='assets/animated/cloudy-day-1.svg'
                break;  

            default:
              iconoAnimado.src='assets/animated/cloudy-day-1.svg'
          }


      })
        .catch(error => {
          console.log(error)
        })

      })

  }

})



// FIN CLIMA