import axios from "axios";
import { Personaje } from "./personajes-listado.model";

export const API_URL = "http://localhost:3000";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const personajes = await axios.get(`${API_URL}/personajes`);
    return personajes.data;
  } catch (error) {
    throw new Error("No se ha podido obtener los personajes");
  }
};

export const obtenerImagenDelPersonaje = async (
  nombreDelPersonaje: string
): Promise<string> => {
  try {
    const imagenDelPersonaje = await axios(`${API_URL}/${nombreDelPersonaje}`);
    return imagenDelPersonaje.data;
  } catch (error) {
    throw new Error("No se ha podido obtener las imágenes de los personajes");
  }
};

export const obtenerPersonajesFiltrado = async (
  nombrePersonaje: string
): Promise<Personaje[]> => {
  try {
    const personajes = await axios.get(
      `http://localhost:3000/personajes?nombre_like=${nombrePersonaje}`
    );
    console.log(personajes.data);
    return personajes.data;
  } catch (error) {
    throw new Error("No e ha podido obtener el personaje filtrado");
  }
};
