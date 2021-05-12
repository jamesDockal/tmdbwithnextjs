import { GetStaticPaths } from "next"
import styles from './movie.module.css'
import Link from 'next/link'

export default function Movie( { movie } ){
    return (
        <div className={styles.container}>
            {movie && (
                <>
                    <Link
                        href={'/'}
                    >
                        <button>
                            Home
                        </button>
                    </Link>
                    <img 
                        width={300}
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    />
                    <p>
                        {movie.overview}
                    </p>
                </>
            )}
        </div>
    )
} 

export const getStaticPaths : GetStaticPaths = async() =>  {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=d97a672b8ab1a6e6625881379b8dfd7b')
    const data = await response.json()

    const paths = data.results.map(movie => {
        return {
            params: {
                id: movie.id.toString()
            }
        }
    })

    return{
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps( context ) {
    const { id }  = context.params
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d97a672b8ab1a6e6625881379b8dfd7b`)
    const result  = await response.json()

    return{
        props: {
            movie: result
        }
    }
}
