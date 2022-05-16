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


// RELOJ

var Clock = (function(){

	var exports = function(element) {
		this._element = element;
		var html = '';
		for (var i=0;i<6;i++) {
			html += '<span>&nbsp;</span>';
		}
		this._element.innerHTML = html;
		this._slots = this._element.getElementsByTagName('span');
		this._tick();
	};

	exports.prototype = {

		_tick:function() {
			var time = new Date();
			this._update(this._pad(time.getHours()) + this._pad(time.getMinutes()) + this._pad(time.getSeconds()));
			var self = this;
			setTimeout(function(){
				self._tick();
			},1000);
		},

		_pad:function(value) {
			return ('0' + value).slice(-2);
		},

		_update:function(timeString) {

			var i=0,l=this._slots.length,value,slot,now;
			for (;i<l;i++) {

				value = timeString.charAt(i);
				slot = this._slots[i];
				now = slot.dataset.now;

				if (!now) {
					slot.dataset.now = value;
					slot.dataset.old = value;
					continue;
				}

				if (now !== value) {
					this._flip(slot,value);
				}
			}
		},

		_flip:function(slot,value) {

			// setup new state
			slot.classList.remove('flip');
			slot.dataset.old = slot.dataset.now;
			slot.dataset.now = value;

			// force dom reflow
			slot.offsetLeft;

			// start flippin
			slot.classList.add('flip');

		}

	};

	return exports;
}());

var i=0,clocks = document.querySelectorAll('.clock'),l=clocks.length;
for (;i<l;i++) {
	new Clock(clocks[i]);
}


// RELOJ