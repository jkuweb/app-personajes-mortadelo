import axios from "axios";
import { Personaje } from "./personajes-listado.model";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const personajes = await axios.get("https://localhost/3000/personajes")
    return personajes.data
  } catch (error) {
    throw new Error("No se ha podido obtener los personajes")
  }
}