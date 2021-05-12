import { useState } from 'react'
import styles from './search.module.css'
import Link from 'next/link'

export default function Search() {
    const [ search, setSearch  ] = useState('')
    const [ movies, setMovies] = useState([])

    const searchMovie = async() => {
        if(search !== ''){
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d97a672b8ab1a6e6625881379b8dfd7b&language=en-US&query=${search}&page=1&include_adult=false`)
            const {results} = await response.json()

            setMovies(results)
        }
    }

    return(
        <div
            className={styles.container}>
            <div className={styles.input}>
                <input 
                    onChange={(event) => setSearch(event.target.value)}
                    type="text" placeholder='Search a Movie' 
                />
                <button
                    onClick={ searchMovie}>
                    Search
                </button>
            </div>
                {movies.length > 0 && (
                    <div>
                        <div className={styles.searchresult}>
                            <h2>
                                Resultados de {search}
                            </h2>
                        </div>
                        <ul>
                            {movies.map(movie => (
                                <li key={movie.id}>
                                    {movie.poster_path && ( 
                                        <div>
                                            <Link 
                                                href={`/movie/${movie.id}`}
                                            >
                                                <img 
                                                width={150}
                                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                                            </Link>
                                            <div className={styles.title}>
                                                {movie.title}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
            )}
           
        </div>
    )
} 



