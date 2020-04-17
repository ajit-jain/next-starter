import React from 'react';
import ListItem from './list-item';
export default function List({movies}){
    return (<React.Fragment>

        { 
            (movies && movies.length) ? 
                movies.map((movie)=>{
                    return (<ListItem  key={movie.imdbID} movie={movie}></ListItem>)
                })
            : (<div className="movie-item">No movies found</div>) 
        }
    </React.Fragment>)
}
