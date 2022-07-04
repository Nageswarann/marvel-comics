import React from 'react'
import './Characters.css'

function Character({ character, setCharactersIds, selectedCharacterIds, searchTerm }) {
  const isSelected = JSON.stringify(selectedCharacterIds).includes(character.id);
  const isSearchTermFound = searchTerm !== "";

  const getCharacterIds = (id) => {
      if(isSearchTermFound) return
    if (selectedCharacterIds.includes(id)) {
      selectedCharacterIds = selectedCharacterIds
        .split(",")
        .filter((cur) => cur != id)
        .join(",");
    } else {
      selectedCharacterIds =
        selectedCharacterIds !== "" ? `${selectedCharacterIds},${id}` : "" + id;
    }
    setCharactersIds(selectedCharacterIds);
  };

//   const assignCharacters = (character) => {
//     if(isSearchTermFound) return;
//     if(isSelected) {
//         selectedCharacters = selectedCharacters.filter((char)=> char.id !== character.id)
//     } else {
//         character.selected = true;
//         selectedCharacters.push(character);
//     }
//     setCharacters(selectedCharacters);
//   }

//   const isCharacterSelected = (id) =>  selectedCharacters.some(char => char.id === id);



  return (
    <div className={"character-image-container " + (isSearchTermFound && "blur-characters") } onClick={() => getCharacterIds(character.id)}>
      <img
        key={character.id}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className={"character-image " + (isSelected && "selected-character")}
      />
      {(isSelected) && (
        <i className="uil uil-check blue-check"></i>
      )}
    </div>
  );
}

export default Character