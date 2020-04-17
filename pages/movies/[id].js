import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import fetch from 'node-fetch';
export default function Details(){
    const router = useRouter();
    const [movieData,setMovieData] = useState(null);
    async function fetchMovie() {
        const response = await fetch(`${process.env.OMDB_API}?i=${router.query.id}&apikey=${process.env.OMDB_SECRET_KEY}&r=json`);
        const movie = (await response.json()) || {};
        setMovieData(movie);
    }
    useEffect(()=>{
        fetchMovie()
    },[])

 
    return (
        <React.Fragment>
            <style jsx global>
                {`
                .movie-container{
                    width: 80%;
                    margin: 0 auto;
                }
                .movie-container .movie{
                    width: 70%;
                    display: flex;
                    flex-direction: column;
                }
                .movie-container .movie img{
                    height: 300px;
                    width: 100%;
                }
                `}
            </style>
            <div className="movie-container">{
                (movieData &&  movieData.Response == "True") ? <div className="movie">
                    <h2><em>{movieData.Title}</em> ( {movieData.Year} )</h2>
                    
                    <img src={movieData.Poster!=='N/A' ? movieData.Poster : '/images/image.png'}/>
                    <h4><em>Director: </em>{movieData.Director}</h4>
                    <h4><em>Writer: </em>{movieData.Writer}</h4>
                    <h4><em>Cast: </em>{movieData.Actors}</h4>
                    {movieData.BoxOffice ? (<h4><em>Domestic lifetime gross : </em>{movieData.BoxOffice}</h4>) : null} 
                    <h4 style={{"display": "flex","flex-wrap": "wrap"}}><em>Plot : </em> <p style={{"font-weight": 500}}>{movieData.Plot}</p></h4> 
                    <div><span style={{    "float": "left"}}>Rating: {movieData.imdbRating}/10</span>
                    { movieData.Production ?  (<span style={{    "float": "right"}}>Production: {movieData.Production}</span>) : null }</div>

                </div>  : <div>No movie found</div>
            }</div>
        </React.Fragment>
    
    )
} 
