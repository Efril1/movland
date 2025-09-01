export const useMovieStore = defineStore('movie', () => {
    const movies = ref<any[]>([])
  
    async function fetchMovies() {
      const config = useRuntimeConfig()
      const apiKey = config.public.TMDB_API_KEY
  
      const { data } = await useFetch<{ results: any[] }>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      )
  
      if (data.value?.results) {
        movies.value = data.value.results
      }
    }
  
    function getMovieById(id: number) {
      const movie = movies.value.find(m => m.id === id)
      if (!movie)
        throw new Error(`movie ${id} not found`)
      return movie
    }
  
    return {
      movies,
      fetchMovies,
      getMovieById,
    }
  })
  