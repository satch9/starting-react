import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'


const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.french}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>select !</button>
    </td>
  </tr>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      french: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  onSelect: PropTypes.func.isRequired
}



const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.french}</h1>
    <table>
      <tbody>
        {
          Object.keys(base).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </tbody>

    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    french: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })

}

function App() {
  const [filter, setFilter] = useState("")
  const [pokemon, setPokemon] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  //console.log(filter)
  //console.log(selectedItem)

  useEffect(()=>{
    fetch('http://localhost:3000/starting-react/pokemon.json')
      .then(response=> response.json())
      .then(data => setPokemon(data))
  },[])

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1rem',
      }}
    >
      <h1 className="title">Pokemon search</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          columnGap: '1rem'
        }}
      >
        <div>
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {
                pokemon
                  .filter((pokemon) => pokemon.name.french.toLowerCase().includes(filter.toLowerCase()))
                  .slice(0, 20)
                  .map(pokemon => (
                    <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => setSelectedItem(pokemon)} />
                  ))
              }

            </tbody>
          </table>
        </div>
        {

          selectedItem && (
            <PokemonInfo {...selectedItem} />
          )
        }
      </div>

    </div>
  );
}

export default App;
