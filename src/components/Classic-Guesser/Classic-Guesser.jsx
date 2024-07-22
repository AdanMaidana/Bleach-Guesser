import "./Classic-Guesser.css";
import { useEffect, useState, useRef } from "react";
import BleachCharacters from "../../data/characters.js";

const ClassicGuesser = () => {
  const [characterToFind, setCharacterToFind] = useState("");
  const [userInput, setUserInput] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [answers, setAnswers] = useState([]);
  const tableRef = useRef(null);
  const [gameStatus, setGamesStatus] = useState("playing");

  // Manejar la lista de personajes a mostrar según lo que ingresa el usuario
  const handleInputChange = (event) => {
    const input = event.target.value;
    setUserInput(input);

    if (input === "") {
      // Si el input está vacío, mostrar una lista vacía
      setFilteredCharacters([]);
    } else {
      // Filtrar los personajes según la entrada del usuario
      const filtered = BleachCharacters.filter(character =>
        character.nombre.toLowerCase().includes(input.toLowerCase()) && !answers.includes(character)
      );
      setFilteredCharacters(filtered);
    }
  };

  // Función para seleccionar un personaje aleatorio
  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * BleachCharacters.length);
    return BleachCharacters[randomIndex];
  };

  useEffect(() => {
    setCharacterToFind(getRandomCharacter());
  }, []);

  // Qué hacer cuando el usuario selecciona un personaje
  const handleCharacterClick = (character) => {
    setUserInput("");
    setFilteredCharacters([]);

    if (character === characterToFind) {
      // Actualizar el estado de personajes guardados
      setAnswers([character, ...answers]);
    } else {
      // Actualizar el estado de personajes guardados
      setAnswers([character, ...answers]);
    }
  };

  // Animación de las celdas del personaje ingresado
  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      const tbody = tableElement.querySelector("tbody");
      const newRows = tbody.querySelectorAll('tr');
  
      newRows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
          if (!cell.classList.contains('animated')) {
            cell.classList.add('animated');
            cell.classList.remove("opacity-0");
            cell.classList.add('fade-in');
            
            // Configura el retraso de la animación
            const delay = index * 0.7; // Ajusta el retraso según sea necesario
            cell.style.animationDelay = `${delay}s`;
          }
        });
      });
    }
  }, [answers]);


  // Color del fondo de la celda Grupo
  const getGrupoClassName = (characterGrupo, characterToFindGrupo) => {
    // Convertimos los valores a sets para manejar mejor las comparaciones
    const characterSet = new Set(characterGrupo);
    const findSet = new Set(characterToFindGrupo);

    // Verifica si todos los valores de characterToFindGrupo están en characterGrupo
    const containsAll = [...findSet].every(value => characterSet.has(value));

    // Verifica si al menos uno de los valores de characterToFindGrupo está en characterGrupo
    const containsSome = [...findSet].some(value => characterSet.has(value));

    // Devuelve la clase apropiada según las condiciones
    return containsAll ? "bg-green-600" : containsSome ? "bg-yellow-600" : "bg-red-800";
  };

  // Color del fondo de la celda Habilidades
  const getHabilidadesClassName = (characterHabilidades, characterToFindHabilidades) => {
    // Convertimos los valores a sets para manejar mejor las comparaciones
    const characterSet = new Set(characterHabilidades);
    const findSet = new Set(characterToFindHabilidades);

    // Verifica si todos los valores de characterToFindHabilidades están en characterHabilidades
    const containsAll = [...findSet].every(value => characterSet.has(value));

    // Verifica si al menos uno de los valores de characterToFindHabilidades está en characterHabilidades
    const containsSome = [...findSet].some(value => characterSet.has(value));

    // Devuelve la clase apropiada según las condiciones
    return containsAll ? "bg-green-600" : containsSome ? "bg-yellow-600" : "bg-red-800";
  };

  return (
    <>
      <input
        value={userInput}
        placeholder="Ingrese el nombre del personaje"
        className="w-full max-w-[300px] px-3 py-2 mx-auto block outline-none border-4 border-orange-700"
        onChange={handleInputChange}
        maxLength={30}
      />

      <ul className="h-full max-h-[300px] w-full max-w-[300px] mx-auto overflow-y-auto">
        {filteredCharacters?.map((character, index) => (
          <li
            key={index}
            className="bg-orange-700 w-full flex items-center mx-auto hover:bg-opacity-85 transition-colors hover:cursor-pointer p-1"
            onClick={() => handleCharacterClick(character)}
          >
            <img src={character.imagen} alt={character.nombre} className="w-16 h-16 border-2 border-black" />
            <p className="text-white w-full text-center">{character.nombre}</p>
          </li>
        ))}
      </ul>

      <h3 className="text-center text-white font-bold text-xl w-full max-w-[600px] mx-auto my-2">Tus respuestas</h3>

      {answers.length > 0 &&
        <div className="overflow-x-auto w-full">
          <table ref={tableRef} className="text-white mx-auto text-center">
            <thead className="bg-zinc-800">
              <tr>
                <th className="border-2 p-2 min-w-24">Personaje</th>
                <th className="border-2 p-2 min-w-24">Género</th>
                <th className="border-2 p-2 min-w-32">Grupo</th>
                <th className="border-2 p-2 min-w-32">Rol</th>
                <th className="border-2 p-2 min-w-32">Habilidades</th>
                <th className="border-2 p-2 min-w-24">Región</th>
                <th className="border-2 p-2 min-w-24">Arco de aparición</th>
              </tr>
            </thead>

            <tbody>
              {answers.map((character) => (
                <tr key={character.nombre}>
                <td className="border-2 p-2 min-w-24 opacity-0 bg-zinc-800">
                    <img src={character.imagen} alt={character.nombre} className="w-16 h-16 border-2 mx-auto mb-1" />
                    <p className="text-center w-full">{character.nombre}</p>
                  </td>

                  <td className={`border-2 p-2 min-w-24 opacity-0 ${character.genero === characterToFind.genero ? "bg-green-600" : "bg-red-800"} `}>{character.genero}</td>

                  <td
                    className={`border-2 p-2 min-w-24 opacity-0 ${getGrupoClassName(character.grupo, characterToFind.grupo)} `}
                  >
                    {character.grupo}
                  </td>

                  <td className={`border-2 p-2 min-w-24 opacity-0 ${character.rol === characterToFind.rol ? "bg-green-600" : "bg-red-800"} `}>{character.rol}</td>

                  <td className={`border-2 p-2 min-w-24 opacity-0 ${getHabilidadesClassName(character.habilidades, characterToFind.habilidades)} `}>{character.habilidades.join(", ")}</td>

                  <td className={`border-2 p-2 min-w-24 opacity-0 ${character.region === characterToFind.region ? "bg-green-600" : "bg-red-800"} `}>{character.region}</td>

                  <td className={`border-2 p-2 min-w-24 opacity-0 ${character["arco de aparicion"] === characterToFind["arco de aparicion"] ? "bg-green-600" : "bg-red-800"} `}>{character["arco de aparicion"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  );
};

export default ClassicGuesser;
