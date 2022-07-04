import React, { useState } from 'react'
import './Characters.css'
import { useQuery } from 'react-query'
import Character from './Character';


const fetchCharacters = async (page) => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=188617618180f4b393b6504612b3e6ed&hash=5a8f693cd131567560f39ee2293d6eab&limit=7&offset=${(page-1)*7}`);
    return res.json();
}

function Characters({setCharactersIds, selectedCharacterIds, searchTerm}) {
    const [page, setPage] = useState(1);

    const { isLoading,
        isError,
        error,
        data,
        isPreviousData } = useQuery(['characters', page], ()=> fetchCharacters(page), { keepPreviousData : true });

  return (
      <>
      {isLoading? <div>Loading..</div>:
    <div className='characters-container'>
        <button className='characters-btn'
         onClick={() => setPage(old => Math.max((old-1) , 1))}
         disabled={page === 1}
       >
         <i className="uil uil-arrow-left characters-icon"></i>
       </button>
      {data?.data?.results.map((character) => (
          <Character key={character.id} character={character} setCharactersIds={setCharactersIds} selectedCharacterIds={selectedCharacterIds} searchTerm={searchTerm}/>
      ))}
      <button className='characters-btn'
         onClick={() => {
           if (!isPreviousData) {
             setPage(old => old + 1)
           }
         }}
         disabled={isPreviousData}
       >
         <i className="uil uil-arrow-right characters-icon"></i>
       </button>
    </div>}
    </>
  );
}

export default Characters