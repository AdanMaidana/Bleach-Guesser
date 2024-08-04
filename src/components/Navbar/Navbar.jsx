export default function Navbar() {
  return (
    <nav >
      <ul className="bg-white flex justify-center items-center gap-x-8">
        <li>
          <a href='/Bleach-Guesser/classic'>
            Clásico
          </a>
        </li>
        <li>
          <a href='/Bleach-Guesser/skill'>
            Habilidad
          </a>
        </li>
        <li>
          <a href='/Bleach-Guesser/image'>
            Imagen
          </a>
        </li>
        <li>
          <a href='./'>
            Proximamente
          </a>
        </li>
      </ul>
    </nav>
  )

}