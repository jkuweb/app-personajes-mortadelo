import { API_URL, obtenerImagenDelPersonaje, obtenerPersonajes } from "./personajes-listado.api";
import { Personaje } from "./personajes-listado.model";



const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.classList.add("info-text");
  parrafo.textContent = texto;

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
    const listItem = document.createElement("li")
    listItem.textContent = texto
    listaContenedor.appendChild(listItem)
  })
  return listaContenedor
}

const crearContenedorPersonajes = (personaje: Personaje): HTMLDivElement => {
  const contenedorPersonajes = document.createElement("div");
  const nombre = crearElementoParrafo(personaje.nombre);
  contenedorPersonajes.appendChild(nombre);
  const especialidad = crearElementoParrafo(personaje.especialidad);
  contenedorPersonajes.appendChild(especialidad);
  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre)
  contenedorPersonajes.appendChild(imagen);
  const habilidades = crearElementoLista(personaje.habilidades);
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