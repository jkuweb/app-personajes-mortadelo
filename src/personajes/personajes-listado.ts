import {
  API_URL,
  obtenerPersonajes,
  obtenerPersonajesFiltrado,
} from "./personajes-listado.api";
import { Personaje } from "./personajes-listado.model";

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  parrafo.classList.add("info-text");

  return parrafo;
};

const crearElementoImagen = (fileName: string, altText: string) => {
  const imagen = document.createElement("img");
  imagen.src = `${API_URL}/${fileName}`;
  imagen.alt = altText;
  imagen.classList.add("imagen");

  return imagen;
};

const crearElementoLista = (lista: string[]) => {
  const listaContenedor = document.createElement("ul");
  lista.forEach((texto) => {
    const listItem = document.createElement("li");
    listItem.textContent = texto;
    listaContenedor.appendChild(listItem);
  });
  return listaContenedor;
};

const crearElementoSpan = (categoria: string): HTMLSpanElement => {
  const elementoSpan = document.createElement("span");
  elementoSpan.textContent = categoria;
  elementoSpan.classList.add("categoria");

  return elementoSpan;
};

const crearContenedorPersonaje = (personaje: Personaje): HTMLElement => {
  const contenedorPersonajes = document.createElement("article");

  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
  contenedorPersonajes.appendChild(imagen);

  const nombre = crearElementoParrafo(personaje.nombre);
  const nombreCategoria = crearElementoSpan("Nombre");
  nombre.insertBefore(nombreCategoria, nombre.firstChild);
  contenedorPersonajes.appendChild(nombre);

  const nombreEspecialidad = crearElementoSpan("Especialidad");
  const especialidad = crearElementoParrafo(personaje.especialidad);
  especialidad.insertBefore(nombreEspecialidad, especialidad.firstChild);
  contenedorPersonajes.appendChild(especialidad);

  const nombreHabilidad = crearElementoSpan("Habilidades");
  const habilidades = crearElementoLista(personaje.habilidades);
  habilidades.insertBefore(nombreHabilidad, habilidades.firstChild);
  contenedorPersonajes.appendChild(habilidades);

  return contenedorPersonajes;
};

const mostrarListadoDePersonajes = async () => {
  const contenedorListado = document.getElementById("listado-personajes");
  const nombreDelPersonaje = obtenerNombreDelPersonaje();
  const personajes = Boolean(nombreDelPersonaje)
    ? await obtenerPersonajesFiltrado(nombreDelPersonaje)
    : await obtenerPersonajes();

  vaciarListadoPersonajes();
  vaciarCajaBusqueda();

  personajes.forEach((personaje) => {
    const contenedorPersonajes = crearContenedorPersonaje(personaje);
    if (contenedorListado !== null) {
      contenedorListado.appendChild(contenedorPersonajes);
    }
  });
};

// Filtrado de personaje x el campo nombre del personaje

const vaciarListadoPersonajes = () => {
  const contenedorListado = document.getElementById("listado-personajes");
  if (contenedorListado && contenedorListado instanceof HTMLElement) {
    contenedorListado.innerHTML = "";
  }
};

const vaciarCajaBusqueda = () => {
  const elementoInputBusqueda = document.getElementById("busqueda");
  if (
    elementoInputBusqueda &&
    elementoInputBusqueda instanceof HTMLInputElement
  ) {
    elementoInputBusqueda.value = "";
  }
};

const obtenerNombreDelPersonaje = (): string => {
  const elementoInputBusqueda = document.getElementById("busqueda");
  let nombrePersonaje;
  if (
    elementoInputBusqueda &&
    elementoInputBusqueda instanceof HTMLInputElement
  ) {
    nombrePersonaje = elementoInputBusqueda.value;
  }
  return nombrePersonaje || "";
};

const inicializarFormulario = () => {
  const formulario = document.querySelector("#formulario");
  if (formulario && formulario instanceof HTMLElement) {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      // mostrarListadoDePersonajesFiltrados();
      mostrarListadoDePersonajes();
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarListadoDePersonajes();
  inicializarFormulario();
});
