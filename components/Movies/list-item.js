import React from 'react';
import {useRouter} from 'next/router'
export default function ListItem({movie}){
    const router = useRouter()
    const redirectToDetails = (movie)=>{
        router.push('/movies/[id]', `/movies/${movie.imdbID}`, { shallow: true });
    }
    return (
        <div className="movie-item">
            <div className="item-detail">
                <img src={movie.Poster!=='N/A' ? movie.Poster : '/images/image.png' } onClick={()=>{
                        redirectToDetails(movie)
                    }}/>
                <div>
                    <h3> <em>Titile: </em>{movie.Title}</h3>
                    <h4><em>Genere: </em>{movie.Type} </h4>
                    <h4><em>Year: </em>{movie.Year}</h4>
                    <a onClick={()=>{
                        redirectToDetails(movie)
                    }}>Read more >></a>
                </div>
                
            </div>
            
        </div>
        
    )
} 