import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
const PokemonCard = ({ pokemonData }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>
        <li className="poke-list">
          <h2 className="fs-5">{pokemonData.name}</h2>
        </li>
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
        <h1> This is {pokemonData.name}</h1>
        </Modal.Header>
        <Modal.Body>
         <div className="pok-img">
          <img 
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          />
         </div>
         <h1 className="pokName">{pokemonData.name}</h1>

         <div className="pokemo-info">
           {pokemonData.types.map((curType) => curType.type.name).join(", ")}
         </div>
         <div className="poke-aligns">
          <h2>
            Height : <span>{pokemonData.height}</span>
          </h2>
          <h2>
            Weight : <span>{pokemonData.weight}</span>
          </h2>
          <h2>
            Speed : <span>{pokemonData.stats[5].base_stat}</span>
          </h2>
         </div>

           <div className="poke-aligns">
          <h2>
            Experience : <span>{pokemonData.base_experience}</span>
          </h2>
          <h2>
            Attack : <span>{pokemonData.stats[1].base_stat}</span>
          </h2>
          <h2>
            Abilities : <span>{pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}</span>
          </h2>
         </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PokemonCard;
