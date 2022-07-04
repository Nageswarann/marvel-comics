import React, { useState } from 'react'
import Comic from './Comic'
import { useQuery } from 'react-query'
import './Comics.css'

const fetchComics = async (page, searchTerm, selectedCharacterIds) => {
    const comicsUrl = getComicsUrl(page, searchTerm, selectedCharacterIds)
    const res = await fetch(comicsUrl);
    return res.json();
}

const getComicsUrl = (page, searchTerm, selectedCharacterIds) => {
    let url = `https://gateway.marvel.com/v1/public/comics?ts=1&apikey=188617618180f4b393b6504612b3e6ed&hash=5a8f693cd131567560f39ee2293d6eab&offset=${(page-1)*20}`
    if(searchTerm && searchTerm.length) {
        url += `&titleStartsWith=${searchTerm}`
        return url;
    }
    if(selectedCharacterIds && selectedCharacterIds.length) {
        url += `&characters=${selectedCharacterIds}`
    }
    return url;
}


function Comics({searchTerm, selectedCharacterIds, setCharactersIds}) {
    const [page, setPage] = useState(1);
    const { isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData, } = useQuery(['comics', page, searchTerm, selectedCharacterIds], ()=> fetchComics(page, searchTerm, selectedCharacterIds), { keepPreviousData : true });

  return (
    <>
      <div className="comics-container">
        {isLoading ? (
          <div> Loading data ... </div>
        ) : isError ? (
          <div> Error Fetching data {error.message} </div>
        ) : (
          <div className="comics">
            {searchTerm != "" && (
              <div className="help-text search-results">Search Results</div>
            )}
            {selectedCharacterIds && selectedCharacterIds.length > 0 && (
              <div className="char-results">
                <div className="help-text">Character Results</div>
                <button className='filter-btn' onClick={()=>setCharactersIds("")}>Clear all filters</button>
              </div>
            )}
            {data?.data?.results?.map((data) => (
              <Comic key={data.id} data={data} />
            ))}
          </div>
        )}
        {data?.data?.results && data?.data?.results.length > 19 && <div className="pagination">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            <i class="uil uil-angle-left"></i>
          </button>
          <span className="active-page">{page}</span>
          <button
            onClick={() => {
              if (!isPreviousData) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData}
          >
            <i class="uil uil-angle-right-b"></i>
          </button>
           <span className={"loading-txt " + (isFetching && "show")}> Loading...</span>
        </div>}
      </div>
    </>
  );
}

export default Comics