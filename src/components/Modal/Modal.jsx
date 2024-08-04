export default function Modal({ character, entries, setShowModal }) {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none min-w-[300px] max-w-[350px] mx-auto"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-[1.3rem] font-semibold">
                Ganaste
              </h3>
              <svg viewBox="0 0 24 24" className="hover:cursor-pointer hover:scale-110 transition-transform" width={25} height={25} onClick={() => setShowModal(false)} fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#292929" strokeWidth="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#292929" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
            </div>
            {/*body*/}
            <div className="relative p-4 flex-auto">
              <img src="/Bleach-Guesser/gifs/ichigo_confused.gif" className="w-full mx-auto rounded" alt="" />
              <p className="my-2 text-blueGray-500 leading-relaxed">
                El personaje a adivinar era <span className="italic font-bold">{character.nombre}</span>
              </p>
              <p>Cantidad de intentos: {entries} </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end gap-x-2 p-4 border-t border-solid border-blueGray-200 rounded-b">
            <a 
        href="./"
          class="text-red-500 bg-gray-700 rounded font-bold p-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
        >
          Volver al menu
        </a>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Nuevo personaje
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-35 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}