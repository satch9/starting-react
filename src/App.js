import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import styled from '@emotion/styled'
import { Button } from '@material-ui/core';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.french}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <Button variant="contained" color="primary" onClick={() => onSelect(pokemon)}>select !</Button>
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

const Title = styled.h1`
  text-align: center;
`

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 1rem;
`

const Container = styled.div`
  margin: auto;
  width: 800px;
  paddingTop: 1rem;
`

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`

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

  useEffect(() => {
    fetch('http://localhost:3000/starting-react/pokemon.json')
      .then(response => response.json())
      .then(data => setPokemon(data))
  }, [])

  return (
    <Container>
      <Title>Pokemon search</Title>
      <TwoColumnLayout>
        <div>
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} />
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
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
