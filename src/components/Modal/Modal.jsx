import { useEffect, useRef } from "react";
import "./Modal.css";

export default function Modal({ showModal, setShowModal, character, answers, setNewCharacter, gameMode }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (showModal) {
      dialog.showModal();
    }
    else {
      dialog.close();
    }
  }, [showModal]);

  return (
    <dialog ref={dialogRef} className="flex flex-col justify-end overflow-visible">
      <div className="flex justify-end">
        <button onClick={() => setShowModal(false)} className="relative text-white border border-white rounded-md px-2 py-1 text-sm cursor-pointer bg-orange-700 hover:bg-orange-800 transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto group-hover:scale-90 transform transition-transform duration-200" fill="#fff" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24">
            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
          </svg>
         <p className="hidden absolute left-1/2 -top-5 transform -translate-x-1/2 -translate-y-1/2 text-xs bg-orange-700 text-white p-1 rounded shadow-lg w-max border border-white ">
              <span className="popover-arrow absolute w-2 h-2 transform -rotate-[135deg] -bottom-1 left-1/2 -translate-x-1/2 border-t border-s border-white"></span>
              Cerrar
            </p>
        </button>
      </div>


      <img src="/Bleach-Guesser/gifs/ichigo_confused.gif" className="w-full rounded-[2.5px] mx-auto my-3" />

      <p className="text-white font-medium text-lg mb-2">
        {gameMode === 'Classic' ? 'El personaje era ' : gameMode === 'Skill' ? 'La habilidad era de ' : gameMode === 'Image' ? 'La imagen era de ' : ''}
        <span className="font-bold text-orange-500 text-xl">{character.nombre}</span></p>
      <p className="text-white font-thin mb-2">Cantidad de intentos: {answers} </p>

      <div className="flex justify-end">
        <button onClick={() => setNewCharacter()} className="relative bg-orange-700 hover:bg-orange-800 transition-colors py-1 px-2 rounded-md border-white border group">
          <svg fill="#fff" className="mx-auto group-hover:scale-90 transform transition-transform duration-200" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17,18.2457306 C18.873179,16.7457534 20,14.4691356 20,12 C20,7.76611275 16.7007403,4.27177627 12.4954564,4.01507576 C12.2198271,3.9982507 12.0100247,3.76116956 12.0268498,3.48554023 C12.0436749,3.2099109 12.280756,3.00010859 12.5563854,3.01693366 C17.2885352,3.30579531 21,7.23670954 21,12 C21,14.7629547 19.7449158,17.3127321 17.6577582,19 L20.5,19 C20.7761424,19 21,19.2238576 21,19.5 C21,19.7761424 20.7761424,20 20.5,20 L16.5,20 C16.2238576,20 16,19.7761424 16,19.5 L16,15.5 C16,15.2238576 16.2238576,15 16.5,15 C16.7761424,15 17,15.2238576 17,15.5 L17,18.2457306 L17,18.2457306 Z M7,5.75425899 C5.12699441,7.25408222 4,9.53070623 4,12 C4,16.2473817 7.31964678,19.7484245 11.5408239,19.987057 C11.816526,20.0026431 12.0273918,20.2387789 12.0118058,20.514481 C11.9962197,20.7901832 11.7600839,21.001049 11.4843818,20.9854629 C6.7344127,20.7169366 3,16.7784637 3,12 C3,9.23687221 4.25526581,6.68710337 6.34222866,5 L3.5,5 C3.22385763,5 3,4.77614237 3,4.5 C3,4.22385763 3.22385763,4 3.5,4 L7.5,4 C7.77614237,4 8,4.22385763 8,4.5 L8,8.5 C8,8.77614237 7.77614237,9 7.5,9 C7.22385763,9 7,8.77614237 7,8.5 L7,5.75425899 Z"></path> </g></svg>
          <p className="hidden absolute left-1/2 transform -translate-x-1/2 translate-y-3 text-xs bg-orange-700 text-white p-1 rounded shadow-lg w-max border border-white ">
            <span className="popover-arrow absolute w-2 h-2 transform rotate-45 -top-1 left-1/2 -translate-x-1/2 border-t border-s border-white"></span>
            Volver a jugar
          </p>
        </button>
      </div>

    </dialog>
  );
}
