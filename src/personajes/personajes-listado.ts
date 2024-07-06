import { API_URL, obtenerImagenDelPersonaje, obtenerPersonajes } from "./personajes-listado.api";
import { Personaje } from "./personajes-listado.model";



const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  parrafo.classList.add("info-text");

  return parrafo;
}

const crearElementoImagen = (fileName: string, altText: string) => {
  const imagen = document.createElement("img");
  imagen.src = `${API_URL}/${fileName}`
  imagen.alt = altText;
  imagen.classList.add("imagen");

  return imagen;
}

const crearElementoLista = (lista: string[]) => {
  const listaContenedor = document.createElement("ul")
  lista.forEach((texto) => {
    const listItem = document.createElement("li");
    listItem.textContent = texto;
    listaContenedor.appendChild(listItem);
  })
  return listaContenedor
}

const crearElementoSpan = (categoria: string): HTMLSpanElement => {
  const elementoSpan = document.createElement("span")
  elementoSpan.textContent = categoria;
  elementoSpan.classList.add("categoria")

  return elementoSpan
}

const crearContenedorPersonajes = (personaje: Personaje): HTMLDivElement => {
  const contenedorPersonajes = document.createElement("div");

  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre)
  contenedorPersonajes.appendChild(imagen);

  const nombre = crearElementoParrafo(personaje.nombre);
  const nombreCategoria = crearElementoSpan("nombre");
  nombre.insertBefore(nombreCategoria, nombre.firstChild)
  contenedorPersonajes.appendChild(nombre);

  const nombreEspecialidad = crearElementoSpan("especialidad");
  const especialidad = crearElementoParrafo(personaje.especialidad);
  especialidad.insertBefore(nombreEspecialidad, especialidad.firstChild)
  contenedorPersonajes.appendChild(especialidad);

  const nombreHabilidad = crearElementoSpan("habilidades");
  const habilidades = crearElementoLista(personaje.habilidades);
  habilidades.insertBefore(nombreHabilidad, habilidades.firstChild)
  contenedorPersonajes.appendChild(habilidades)

  return contenedorPersonajes
}


const mostrarListadoDePersonajes = async () => {
  const contenedorListado = document.getElementById("listado-personajes");
  const personajes = await obtenerPersonajes();
  personajes.forEach((personaje) => {
    const contenedorPersonajes = crearContenedorPersonajes(personaje);
    if (contenedorListado !== null) {
      contenedorListado.appendChild(contenedorPersonajes);
    }
  })
}

document.addEventListener("DOMContentLoaded", mostrarListadoDePersonajes)