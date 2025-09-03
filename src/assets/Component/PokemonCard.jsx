import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const PokemonCard = ({ pokemonData }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Button - jab click karenge to "show" true ho jayega aur modal open ho jayega */}
      <button onClick={() => setShow(true)}>
        <li className="poke-list">
          <h2 className="fs-5">{pokemonData.name}</h2>
        </li>
      </button>

      {/* React-Bootstrap ka Modal component */}
      <Modal
        show={show} // modal open/close state control
        onHide={() => setShow(false)} // cross button ya outside click karne pe modal close
        dialogClassName="modal-90w" // custom class for modal width
        aria-labelledby="example-custom-modal-styling-title" // accessibility ke liye
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

          {/* Pokemon ki basic stats: Height, Weight, Speed */}
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

          {/* Pokemon ke aur stats: Experience, Attack aur Abilities */}
          <div className="poke-aligns">
            <h2>
              Experience : <span>{pokemonData.base_experience}</span>
            </h2>
            <h2>
              Attack : <span>{pokemonData.stats[1].base_stat}</span>
            </h2>
            <h2>
              Abilities :
              <span>
                {/* abilities array me se naam nikal ke sirf ek (pehli) ability show ki gayi hai */}
                {pokemonData.abilities
                  .map((abilityInfo) => abilityInfo.ability.name)
                  .slice(0, 1) // sirf 1 ability
                  .join(", ")}
              </span>
            </h2>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PokemonCard;
