import React from 'react'
import './Comics.css'

function Comic({data}) {
  return (
    <div className="card">
        <img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} className="card-img" />
        <div className="container">
            <b>{data.title}</b>
            <b className='yellow-text'>#{data.issueNumber}</b>
        </div>
      </div>
  )
}

export default Comic