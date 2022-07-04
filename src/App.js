import './App.css';
import Marvel from "../src/marvel.png"

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import Characters from './Components/Characters/Characters';
import Comics from './Components/Comics/Comics';

const queryClient = new QueryClient()



function App() {
const [searchTerm, setSearchTerm] = useState("");
const [selectedCharacterIds, setCharactersIds] = useState("");

const debounceSearch = (fn, delay) => {
  let timerID;
  return function(...args) {
    if(timerID)
      clearTimeout(timerID);
    timerID = setTimeout(()=>fn(...args), delay)
  }
}

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <div className="topnav">
        <img src={Marvel} className="marvel-img" />
        <div className="search-container">
        <i className="uil uil-search icon"></i>
          <input className="input-field" type="search" placeholder="Search for comics..." onChange={debounceSearch((e)=>setSearchTerm(e.target.value), 500)}/>
        </div>
      </div>
      <Characters searchTerm={searchTerm} setCharactersIds= {setCharactersIds} selectedCharacterIds={selectedCharacterIds} />
      <Comics searchTerm = {searchTerm} setCharactersIds={setCharactersIds} selectedCharacterIds={selectedCharacterIds}/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
