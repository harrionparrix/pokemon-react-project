import React from 'react'
import {Container,Navbar,Nav,NavDropdown,Form,Button,FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Axios from 'axios';

function Header() {
  const [pokemondata, setpokemondata] = useState({
    name: '',
    species: '',
    imgf: '',
    imgb: '',
    hp: '',
    atk: '',
    def: '',
    satk: '',
    sdef: '',
    spd: '',
    type:'',
})
  const [pokemonName, setpokemonName] = useState('');

  const [pokemonchosen, setpokemonchosen] = useState(false);

 
  const searchPokemon=()=>{
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response)=>{
        setpokemondata({
          name: pokemonName,
          species: response.data.species.name,
          imgf: response.data.sprites.front_default,
          imgb: response.data.sprites.back_default,
          hp: response.data.stats[0].base_stat,
          atk: response.data.stats[1].base_stat,
          def: response.data.stats[2].base_stat,
          satk: response.data.stats[3].base_stat,
          sdef: response.data.stats[4].base_stat,
          spd:response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
        });
        setpokemonchosen(true);
      }
    );
  };

  return( <>
   <Navbar bg="light" expand='lg'>
  <Container fluid>
    <Navbar.Brand href="#home"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png' alt='pokemon' width='100px'></img>
   </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto mx-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#pokemons">Pokemons</Nav.Link>
        <NavDropdown title="Types" id="poke-types">
          <NavDropdown.Item href="#water-type">Water-Type</NavDropdown.Item>
          <NavDropdown.Item href="#fire-type">Fire-Type</NavDropdown.Item>
          <NavDropdown.Item href="#electro-type">Electro-Type</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#legendary-type">Legendary-Type</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      </Navbar.Collapse>
  </Container>
</Navbar>
<div className='row'>
        <div className='text-center py-3'>
        <h1>PokéWorld</h1>
        </div>
   </div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        onChange={(event)=>{
          setpokemonName(event.target.value);
        }}/>
        <Button variant="outline-success" onClick={()=>{
          searchPokemon()
        }}>Search Pokemon</Button>      
      </Form>
    

<div className='container text-center py-1'>
        {!pokemonchosen? (<h1>Please Choose a Pokemon</h1>) :
        <>
          <h1> {pokemondata.name.toUpperCase()} </h1>
          <img src={pokemondata.imgf} alt='Front-image' width='200px'/>
          <img src={pokemondata.imgb} alt='Back-image' width='200px' />
          <h2>TYPE: {pokemondata.type.toUpperCase()} </h2>
          <h2>SPECIES: {pokemondata.species.toUpperCase()} </h2>
          <h2>HEALTH POINTS: {pokemondata.hp} </h2>
          <h2>ATTACK: {pokemondata.atk} </h2>
          <h2>DEFENSE: {pokemondata.def} </h2>
          <h2>SPECIAL ATTACK: {pokemondata.satk}</h2>
          <h2>SPECIAL DEFNSE: {pokemondata.sdef}</h2>
          <h2>SPEED: {pokemondata.spd} </h2>
          </>
        }
        </div>
</>)
}

export default Header