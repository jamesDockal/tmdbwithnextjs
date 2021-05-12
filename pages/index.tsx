import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Search from '../components/search'

export default function Home({movies}) {
  return (
    <div className={styles.container}>
      <Search />
      
      <h1>Destaques</h1>

      <ul>
        
        {movies.results.map(movie => (
          <li key={movie.id}>
            <Link
              href={`/movie/${movie.id}`}
            >
              <img
                onClick={() =>console.log(movie.title)} 
                width={150}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" 
                />
              </Link>
            <div className={styles.title}>
              {movie.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps(){

  const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=d97a672b8ab1a6e6625881379b8dfd7b')
  const data = await response.json()
  
  return{
    props: {
      movies: data
    }
  }


}
//