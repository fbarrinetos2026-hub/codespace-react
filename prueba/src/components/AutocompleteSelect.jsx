import { useState, useMemo } from 'react'

export default function AutocompleteSelect({ options = [] }) {
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const [selected, setSelected] = useState('')

  const filtered = useMemo(() => {
    if (!input) return options
    const q = input.toLowerCase()
    return options.filter(o => o.toLowerCase().includes(q))
  }, [input, options])

  function handleChange(e) {
    setInput(e.target.value)
    setShow(true)
    setHighlight(-1)
  }

  function choose(value) {
    setSelected(value)
    setInput(value)
    setShow(false)
    setHighlight(-1)
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => Math.min(h + 1, filtered.length - 1))
      setShow(true)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => Math.max(h - 1, 0))
      setShow(true)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlight >= 0 && highlight < filtered.length) {
        choose(filtered[highlight])
      } else if (input.trim()) {
        // if input matches an option (case-insensitive), prefer that
        const match = options.find(o => o.toLowerCase() === input.trim().toLowerCase())
        choose(match ?? input.trim())
      }
    } else if (e.key === 'Escape') {
      setShow(false)
    }
  }

  return (
    <div className="autocomplete">
      <input
        aria-label="buscar genero"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 150)}
        placeholder="Escribe para filtrar géneros..."
      />

      {show && filtered.length > 0 && (
        <ul className="autocomplete-list">
          {filtered.map((opt, i) => (
            <li
              key={opt}
              className={i === highlight ? 'highlight' : ''}
              onMouseDown={() => choose(opt)}
              onMouseEnter={() => setHighlight(i)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

      <div className="selected-display">
        {selected ? (
          <strong>Género seleccionado: </strong>
        ) : (
          <span>Presiona Enter para seleccionar un género</span>
        )}
        {selected && <div className="pill">{selected}</div>}
      </div>
    </div>
  )
}
