const url = 'http://192.168.8.40:3000/api/peliculas';

class Pelicula {
  constructor(nombre, director, clasificacion, id) {
    this.nombre = nombre;
    this.director = director;
    this.clasificacion = clasificacion;
    this.id = id;
    this.dibujarPelicula = function () {
      //añadir la pelicula en el documento HTML al final de la lista de peliculas.
      let li = document.createElement('li');
      li.id = this.id;
      li.innerText = `${this.nombre}, director: ${this.director}, clasificacion: ${this.clasificacion}`;
      // Falta añadir boton borrar
      let botonBorrar = document.createElement('button');
      botonBorrar.innerText = 'Borrar Pelicula';
      li.appendChild(botonBorrar);
      botonBorrar.addEventListener('click', this.borrarPelicula);
      document.getElementById('listaPeliculas').appendChild(li);
      //Falta boton modificar pelicula
    };
    this.buscarPelicula = function () {
      //buscamos la pelicula en el servidor a partir del nombre
    };
    this.modificarPelicula = function () {};
    this.borrarPelicula = function () {
      //borrar la pelicula del servidor y del HTML????
    };
    this.guardarPelicula = function () {
      // guarda una pelicula nueva en el servidor.
    };
  }
}

document.addEventListener('DOMContentLoaded', inicio);
function inicio() {
  pedirPeliculas();
  document
    .getElementById('añadirPelicula')
    .addEventListener(
      'click',
      () =>
        (document.getElementById('datosPelicula').style.visibility = 'visible')
    );
  document
    .getElementById('guardarPelicula')
    .addEventListener('click', subirPelicula);
}

function pedirPeliculas() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      const peliculas = JSON.parse(this.responseText);
      peliculas.forEach(function (pelicula) {
        const peli = new Pelicula(
          pelicula.nombre,
          pelicula.director,
          pelicula.clasificacion,
          pelicula.id
        );
        peli.dibujarPelicula();
      });
    }
  });
  xhr.open('GET', `${url}`);
  xhr.send();
}

function pedirCategorias() {
  // meter las categorias en el select
}

function subirPelicula(e) {
  e.preventDefault();
  const form = e.target.parentNode;
  console.log(form.clasificacion.selectedOptions[0].innerText);
  const pelicula = new Pelicula(
    form[0].value,
    form[1].value,
    form.clasificacion.selectedOptions[0].innerText
  );
  pelicula.guardarPelicula(); // seria buena idea comprobar antes que no esta
}
