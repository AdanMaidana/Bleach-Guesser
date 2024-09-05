import "./Guesser.css";
import { useEffect, useState, useRef } from "react";
import BleachCharacters from "../../data/characters.js";
import BleachSkills from "../../data/skills.js";
import Modal from "../Modal/Modal.jsx";

const Guesser = ({ gameMode }) => {
  const [characterToFind, setCharacterToFind] = useState("");
  const [characterSkills, setCharacterSkills] = useState("");
  const [userInput, setUserInput] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [answers, setAnswers] = useState([]);
  const tableRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [gameStatus, setGameStatus] = useState(true);

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

  //SELECCIONAR UN PERSONAJE ALEATORIO
  function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * BleachCharacters.length);
    return BleachCharacters[randomIndex];
  };

  //BUSCAR EL PERSONAJE GUARDADO EN EL ESTADO "CharacterToFind" EN "DATA/SKILLS"
  function getSkillFromRandomCharacter(nombreDelPersonaje) {
    const characterName = nombreDelPersonaje;
    const skill = BleachSkills.find(skill => skill.personaje === characterName);
    console.log('Skill encontrado:', skill); // Verifica si se encuentra la habilidad
    return skill || null;
  }


  //FUNCIÓN PARA QUE SE GENERE OTRO PERSONAJE Y SE BORREN TODOS LOS DATOS DEL VIEJO
  const setNewCharacter = () => {
    setShowModal(false);
    let oldCharacter = characterToFind;

    if (gameMode === 'Classic') {

      let newCharacter;

      setTimeout(() => {

        do {
          newCharacter = getRandomCharacter();
        } while (newCharacter.nombre === oldCharacter.nombre)

        setCharacterToFind(newCharacter);
        setFilteredCharacters([]);
        setAnswers([]);
        setGameStatus(true);
      }, 300)
    }
    else if (gameMode === 'Skill') {

      setTimeout(() => {

        let newCharacter, newSkill;

        do {
          ({ character: newCharacter, skill: newSkill } = getRandomCharacterWithSkill());
        } while (newCharacter.nombre === oldCharacter.nombre)

        setCharacterToFind(newCharacter);
        setCharacterSkills(newSkill);
        setFilteredCharacters([]);
        setAnswers([]);
        setGameStatus(true);
      }, 300)
    }

  }

  // Qué hacer cuando el usuario selecciona un personaje
  const handleCharacterClick = (character) => {
    setUserInput("");
    setFilteredCharacters([]);

    if (character === characterToFind) {
      // Actualizar el estado de personajes guardados
      setAnswers([character, ...answers]);
      setGameStatus(false);
      setShowModal(true);
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



  // Color del fondo de la celda Afiliación
  const getAfiliacionClassName = (characterAfiliacion, characterToFindAfiliacion) => {

    // Función auxiliar para asegurarse de que el valor sea un array
    const ensureArray = (value) => Array.isArray(value) ? value : [value];

    // Convertimos los valores a sets para manejar mejor las comparaciones
    const characterSet = new Set(ensureArray(characterAfiliacion));
    const findSet = new Set(ensureArray(characterToFindAfiliacion));

    // Verifica si todos los valores de characterToFindAfiliacion están en characterAfiliacion
    const containsAll = [...findSet].every(value => characterSet.has(value));

    // Verifica si ambos conjuntos son exactamente iguales en contenido y tamaño
    const isEqualSet = characterSet.size === findSet.size && containsAll;

    // Verifica si al menos uno de los valores de characterToFindAfiliacion está en characterAfiliacion
    const containsSome = [...findSet].some(value => characterSet.has(value));

    // Devuelve la clase apropiada según las condiciones
    return isEqualSet ? "bg-green-600" : containsSome ? "bg-yellow-600" : "bg-red-800";
  };



  // Color del fondo de la celda Habilidades
  const getHabilidadesClassName = (characterHabilidades, characterToFindHabilidades) => {
    // Convertimos los valores a sets para manejar mejor las comparaciones
    const characterSet = new Set(characterHabilidades);
    const findSet = new Set(characterToFindHabilidades);

    // Verifica si todos los valores de characterToFindHabilidades están en characterHabilidades
    const containsAll = [...findSet].every(value => characterSet.has(value));

    // Verifica si ambos conjuntos son exactamente iguales en contenido y tamaño
    const isEqualSet = characterSet.size === findSet.size && containsAll;

    // Verifica si al menos uno de los valores de characterToFindHabilidades está en characterHabilidades
    const containsSome = [...findSet].some(value => characterSet.has(value));

    // Devuelve la clase apropiada según las condiciones
    return isEqualSet ? "bg-green-600" : containsSome ? "bg-yellow-600" : "bg-red-800";
  };


  // Función para obtener un personaje aleatorio con una habilidad asociada
  function getRandomCharacterWithSkill() {
    let character;
    let skill;

    // Sigue buscando hasta encontrar un personaje con habilidades
    do {
      character = getRandomCharacter();
      skill = getSkillFromRandomCharacter(character.nombre);
    } while (!skill);

    return { character, skill };
  }

  useEffect(() => {
    if (gameMode === 'Skill') {
      const { character, skill } = getRandomCharacterWithSkill();
      setCharacterToFind(character);
      setCharacterSkills(skill);
    } else {
      const character = getRandomCharacter();
      setCharacterToFind(character);
    }
  }, [gameMode]);

  return (
    <>
      {showModal === true ?
        <Modal showModal={showModal} setShowModal={setShowModal} character={characterToFind} answers={answers.length} setNewCharacter={setNewCharacter} gameMode={gameMode} />

        : ""
      }

      <ul className="flex gap-x-4 my-4">

        <li className="relative inline-block bg-orange-700 hover:bg-orange-800 transition-colors rounded-full p-1 border-white border group hover:cursor-pointer">
          <a href="./">

            <svg className="mx-auto group-hover:scale-90 transform transition-transform duration-200" width="30px" height="30px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z" fill="#ffffff"></path> </g></svg>

            <p className="hidden absolute left-1/2 transform -translate-x-1/2 translate-y-3 text-xs bg-orange-700 text-white p-1 rounded shadow-lg w-max border border-white ">
              <span className="popover-arrow absolute w-2 h-2 transform rotate-45 -top-1 left-1/2 -translate-x-1/2 border-t border-s border-white"></span>
              Inicio
            </p>
          </a>
        </li>

        <li onClick={setNewCharacter} className={`relative inline-block bg-orange-700 hover:bg-orange-800 transition-colors rounded-full p-1 border-white border group ${gameStatus ? "pointer-events-none opacity-50" : "hover:cursor-pointer"}`}>

          <svg fill="#fff" className="mx-auto group-hover:scale-90 transform transition-transform duration-200" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17,18.2457306 C18.873179,16.7457534 20,14.4691356 20,12 C20,7.76611275 16.7007403,4.27177627 12.4954564,4.01507576 C12.2198271,3.9982507 12.0100247,3.76116956 12.0268498,3.48554023 C12.0436749,3.2099109 12.280756,3.00010859 12.5563854,3.01693366 C17.2885352,3.30579531 21,7.23670954 21,12 C21,14.7629547 19.7449158,17.3127321 17.6577582,19 L20.5,19 C20.7761424,19 21,19.2238576 21,19.5 C21,19.7761424 20.7761424,20 20.5,20 L16.5,20 C16.2238576,20 16,19.7761424 16,19.5 L16,15.5 C16,15.2238576 16.2238576,15 16.5,15 C16.7761424,15 17,15.2238576 17,15.5 L17,18.2457306 L17,18.2457306 Z M7,5.75425899 C5.12699441,7.25408222 4,9.53070623 4,12 C4,16.2473817 7.31964678,19.7484245 11.5408239,19.987057 C11.816526,20.0026431 12.0273918,20.2387789 12.0118058,20.514481 C11.9962197,20.7901832 11.7600839,21.001049 11.4843818,20.9854629 C6.7344127,20.7169366 3,16.7784637 3,12 C3,9.23687221 4.25526581,6.68710337 6.34222866,5 L3.5,5 C3.22385763,5 3,4.77614237 3,4.5 C3,4.22385763 3.22385763,4 3.5,4 L7.5,4 C7.77614237,4 8,4.22385763 8,4.5 L8,8.5 C8,8.77614237 7.77614237,9 7.5,9 C7.22385763,9 7,8.77614237 7,8.5 L7,5.75425899 Z"></path> </g></svg>

          <p className="hidden absolute left-1/2 transform -translate-x-1/2 translate-y-3 text-xs bg-orange-700 text-white p-1 rounded shadow-lg w-max border border-white ">
            <span className="popover-arrow absolute w-2 h-2 transform rotate-45 -top-1 left-1/2 -translate-x-1/2 border-t border-s border-white"></span>
            Volver a jugar
          </p>

        </li>

        <li className="relative inline-block bg-orange-700 hover:bg-orange-800 transition-colors  rounded-full p-1 border-white border group hover:cursor-pointer">
          <a href={`${gameMode === 'Classic' ? './skill' : './classic'}`}>

            <svg className="mx-auto group-hover:scale-90 transform transition-transform duration-200" width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.6492 11.2501L12.7904 6.53852L13.8346 5.46167L20.5774 12.0001L13.8346 18.5385L12.7904 17.4617L17.6492 12.7501H3V11.2501H17.6492Z" fill="#ffffff"></path> </g></svg>

            <p className="hidden absolute left-1/2 transform -translate-x-1/2 translate-y-3 text-xs bg-orange-700 text-white p-1 rounded shadow-lg w-max border border-white ">
              <span className="popover-arrow absolute w-2 h-2 transform rotate-45 -top-1 left-1/2 -translate-x-1/2 border-t border-s border-white"></span>
              Siguiente modo de juego
            </p>
          </a>
        </li>
      </ul>

      {gameMode === 'Skill' && characterSkills && (
        <p className="text-white text-2xl p-2 answers-header text-center">
          De quien es la siguiente habilidad
          <br />
          <q className="text-orange-400 italic text-3xl">
            {characterSkills.habilidad || 'No se encontró la habilidad'}
          </q>
        </p>
      )}



      <div className={`relative w-full max-w-[300px] mx-auto my-4 ${gameStatus ? "" : "hidden"}`}>
        <input
          value={userInput}
          placeholder="Ingrese el nombre del personaje"
          className="w-full max-w-[300px] px-3 py-2 mx-auto block outline-none border-4 border-orange-700 disabled:bg-white placeholder:text-gray-500"
          onChange={handleInputChange}
          maxLength={30}
          disabled={!gameStatus}
        />

        <ul className="max-h-[249px] w-full max-w-[300px] mx-auto overflow-y-auto absolute z-[2000]">
          {filteredCharacters?.map((character, index) => (
            <li
              key={index}
              className="bg-orange-700 w-full flex items-center mx-auto hover:bg-orange-800 transition-colors hover:cursor-pointer p-1"
              onClick={() => handleCharacterClick(character)}
            >
              <img loading="eager" src={character.imagen} alt={character.nombre} className="w-[75px] h-[75px] bg-zinc-800 border border-black" />
              <p className="text-white w-full text-center">{character.nombre}</p>
            </li>
          ))}
        </ul>
      </div>


      {answers.length > 0 && gameMode === "Classic" &&
        <>
          <h3 className="answers-header text-center text-white font-bold text-2xl mx-auto mt-0 mb-4">Tus respuestas</h3>
          <div className="mx-auto w-full max-w-[950px]">
            <table ref={tableRef} className="text-white mx-auto text-center border-separate bg-black">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="border p-2 min-w-24">Personaje</th>
                  <th className="border p-2 min-w-24">Género</th>
                  <th className="border p-2 min-w-32">Afiliación</th>
                  <th className="border p-2 min-w-32">Rol</th>
                  <th className="border p-2 min-w-32">Habilidades</th>
                  <th className="border p-2 min-w-40">Región de origen</th>
                  <th className="border p-2 min-w-40">Saga de aparición</th>
                </tr>
              </thead>

              <tbody>
                {answers.map((character) => (
                  <tr key={character.nombre} className="bg-zinc-900">
                    <td className="border p-2 opacity-0 bg-zinc-900">
                      <img src={character.imagen} alt={character.nombre} className="w-[75px] h-[75px] rounded-sm mx-auto" />
                      {/* <p className="text-center w-full">{character.nombre}</p> */}
                    </td>

                    <td className={`border p-2 opacity-0 ${character.genero === characterToFind.genero ? "bg-green-600" : "bg-red-800"} `}>{character.genero}</td>

                    <td
                      className={`border p-2 opacity-0 ${getAfiliacionClassName(character.afiliacion, characterToFind.afiliacion)} `}
                    >
                      {Array.isArray(character.afiliacion) ? character.afiliacion.join(", ") : character.afiliacion}
                    </td>

                    <td className={`border p-2 opacity-0 ${character.rol === characterToFind.rol ? "bg-green-600" : "bg-red-800"} `}>{character.rol}</td>

                    <td className={`border p-2 opacity-0 ${getHabilidadesClassName(character.habilidades, characterToFind.habilidades)} `}>{character.habilidades.join(", ")}</td>

                    <td className={`border p-2 opacity-0 ${character["region de origen"] === characterToFind["region de origen"] ? "bg-green-600" : "bg-red-800"} `}>{character["region de origen"]}</td>

                    <td className={`border p-2 opacity-0 ${character["saga de aparicion"] === characterToFind["saga de aparicion"] ? "bg-green-600" : "bg-red-800"} `}>{character["saga de aparicion"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }

      {answers.length > 0 && gameMode === "Skill" &&
        <>
          <h3 className="answers-header text-center text-white font-bold text-2xl mx-auto mt-4">Tus respuestas</h3>
          <div className="mx-auto w-full max-w-[950px]">
            <table ref={tableRef} className="text-white mx-auto text-center border-separate border-spacing-2">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="border-2 p-2 min-w-24 text-lg">Personaje</th>
                </tr>
              </thead>

              <tbody>
                {answers.map((character) => (
                  <tr key={character.nombre} className="bg-zinc-900">
                    <td className={`border-2 p-2 opacity-0 bg-zinc-900 ${character.nombre === characterToFind.nombre ? 'border-green-400' : 'border-red-500'} flex items-center`}>
                      <img src={character.imagen} alt={character.nombre} className="w-[100px] h-[100px] rounded-sm mx-auto" />
                      {<p className="text-center font-semibold w-full px-2">{character.nombre}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    </>
  );
};

export default Guesser;
