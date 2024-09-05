export default function Navbar() {
  return (
    <nav>
      <ul className="bg-orange-800 flex justify-center items-center mx-auto text-white">
      <li className="px-4 py-2">
          <a href='./'>
            Inicio
          </a>
        </li>
        <li className="px-4 py-2">
          <a href='/Bleach-Guesser/classic'>
            Clásico
          </a>
        </li>
        <li className="px-4 py-2">
          <a href='/Bleach-Guesser/skill'>
            Habilidad
          </a>
        </li>
        <li className="px-4 py-2">
          <a href='/Bleach-Guesser/image'>
            Imagen
          </a>
        </li>
      </ul>
    </nav>
  )

}