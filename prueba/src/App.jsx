import MostrarOcultar from './components/MostrarOcultar'
import AutocompleteSelect from './components/AutocompleteSelect'
import './App.css'

function App() {
  const generos = [
    'Acción',
    'Aventuras',
    'Comedia',
    'Drama',
    'Terror',
    'Ciencia ficción',
    'Fantasía',
    'Romance',
    'Documental',
    'Animación',
    'Suspenso',
  ]

  return (
    <div className="app-root">
      <h1>Buscador de géneros</h1>

      <section>
        <h2>Selector tipo autocomplete</h2>
        <AutocompleteSelect options={generos} />
      </section>

      <section>
        <h2>Componente existente</h2>
        <MostrarOcultar />
      </section>
    </div>
  )
}

export default App
